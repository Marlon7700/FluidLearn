"""
Entrena pesos ligeros para FluidLearn a partir de:
  - essay_dataset.csv (scores de gramática, coherencia, léxico, etc.)
  - ASAP2_train_sourcetexts.csv (ensayos reales + puntuación holística)

Genera: ../assets/data/fluidlearn_ai_weights.json

Uso:
  python export_fluidlearn_weights.py
"""
from __future__ import annotations

import json
import os
import re
import sys
from typing import Dict, List, Tuple

import numpy as np
import pandas as pd

ROOT = os.path.dirname(os.path.abspath(__file__))
ESSAY_DATASET_PATH = os.path.join(ROOT, "essay_dataset.csv")
ASAP2_PATH = os.path.join(ROOT, "ASAP2_train_sourcetexts.csv")
OUT_PATH = os.path.join(ROOT, "..", "assets", "data", "fluidlearn_ai_weights.json")

TARGET_COLUMNS = [
    "cohesion",
    "syntax",
    "vocabulary",
    "phraseology",
    "grammar",
    "conventions",
]

FEATURE_NAMES = [
    "unigram_count",
    "unique_ratio",
    "avg_sentence_length",
    "avg_word_length",
    "punctuation_error_fraction",
    "capitalization_score",
    "line_breaks",
]

PUNCTUATION_CHARACTERS = "'!(),-./:;?\"" + '"'


def scale_5_10_to_ell(x: float) -> float:
    """Convierte puntuaciones ~5–10 (essay_dataset) a escala ELL 1–5."""
    v = (float(x) - 5.0) / 5.0 * 4.0 + 1.0
    return float(np.clip(v, 1.0, 5.0))


def scale_asap_score_to_ell(x: float) -> float:
    """ASAP2 score 1–6 → ELL 1–5."""
    v = (float(x) - 1.0) / 5.0 * 4.0 + 1.0
    return float(np.clip(v, 1.0, 5.0))


def count_punctuation_characters(text: str) -> int:
    return sum(text.count(c) for c in PUNCTUATION_CHARACTERS)


def punctuation_error_fraction(text: str) -> float:
    punct_count = count_punctuation_characters(text)
    if punct_count == 0:
        return 0.0
    missing_trail = len(re.findall(r'[.,!?](?!\s)[^"\n\r\']', text))
    extra_lead = len(re.findall(r"\s[.,!?:;]", text))
    missing_paren = len(re.findall(r"(?<!\s)\(", text))
    paired_err = 0
    for a, b in [("(", ")"), ('"', '"'), ("'", "'")]:
        paired_err += abs(text.count(a) - text.count(b))
    err = missing_trail + extra_lead + missing_paren + paired_err
    return float(np.clip(err / punct_count, 0.0, 2.0))


def capitalization_score(text: str) -> float:
    i_count = len(re.findall(r"\bi\b", text))
    I_count = len(re.findall(r"\bI\b", text))
    total = i_count + I_count
    if total == 0:
        return 3.5
    return 1.0 + (I_count / total) * 4.0


def extract_text_features(text: str) -> Dict[str, float]:
    if not isinstance(text, str) or not text.strip():
        return {k: 0.0 for k in FEATURE_NAMES}

    cleaned = re.sub(r"[\r\n]+", " ", text)
    words = re.findall(r"[a-zA-Z']+", cleaned.lower())
    unigram_count = float(len(words))
    unique_ratio = float(len(set(words)) / max(1, len(words)))
    sentences = [s for s in re.split(r"[.!?]+", text) if s.strip()]
    if sentences:
        lens = [len(re.findall(r"[a-zA-Z']+", s)) for s in sentences]
        avg_sentence_length = float(np.mean(lens))
    else:
        avg_sentence_length = unigram_count
    avg_word_length = (
        float(np.mean([len(w) for w in words])) if words else 0.0
    )
    line_breaks = float(text.count("\n"))
    return {
        "unigram_count": unigram_count,
        "unique_ratio": unique_ratio,
        "avg_sentence_length": avg_sentence_length,
        "avg_word_length": avg_word_length,
        "punctuation_error_fraction": punctuation_error_fraction(text),
        "capitalization_score": capitalization_score(text),
        "line_breaks": line_breaks,
    }


def features_to_vector(feat: Dict[str, float]) -> np.ndarray:
    return np.array([feat[n] for n in FEATURE_NAMES], dtype=np.float64)


def ell_targets_from_essay_row(row: pd.Series) -> Dict[str, float]:
    """Mapea columnas de essay_dataset → 6 dimensiones ELL."""
    grammar = scale_5_10_to_ell(row["grammar_score"])
    cohesion = scale_5_10_to_ell(row["coherence_score"])
    vocabulary = scale_5_10_to_ell(row["lexical_richness"] * 10.0)
    syntax = scale_5_10_to_ell(row["avg_sentence_length"])
    phraseology = scale_5_10_to_ell(
        0.6 * row["avg_word_length"] + 0.4 * row["content_relevance_score"]
    )
    conventions = scale_5_10_to_ell(
        0.5 * row["grammar_score"] + 0.5 * row["final_score"]
    )
    return {
        "cohesion": cohesion,
        "syntax": syntax,
        "vocabulary": vocabulary,
        "phraseology": phraseology,
        "grammar": grammar,
        "conventions": conventions,
    }


def load_essay_dataset() -> Tuple[np.ndarray, np.ndarray]:
    df = pd.read_csv(ESSAY_DATASET_PATH)
    X_rows: List[np.ndarray] = []
    Y_rows: List[np.ndarray] = []

    for _, row in df.iterrows():
        text = str(row.get("essay_text", ""))
        feat = extract_text_features(text)
        feat["avg_sentence_length"] = float(row["avg_sentence_length"])
        feat["avg_word_length"] = float(row["avg_word_length"])
        feat["unique_ratio"] = max(
            feat["unique_ratio"], float(row["lexical_richness"])
        )
        X_rows.append(features_to_vector(feat))
        targets = ell_targets_from_essay_row(row)
        Y_rows.append(np.array([targets[c] for c in TARGET_COLUMNS]))

    return np.vstack(X_rows), np.vstack(Y_rows)


def load_asap2_sample(max_rows: int = 12000) -> Tuple[np.ndarray, np.ndarray]:
    df = pd.read_csv(ASAP2_PATH, usecols=["score", "full_text"], nrows=max_rows)
    df = df.dropna(subset=["score", "full_text"])
    X_rows: List[np.ndarray] = []
    Y_rows: List[np.ndarray] = []

    for _, row in df.iterrows():
        text = str(row["full_text"])
        if len(text) < 40:
            continue
        feat = extract_text_features(text)
        holistic = scale_asap_score_to_ell(row["score"])
        # Reparte la nota holística con pesos ligeros según features (como ELL)
        punct = feat["punctuation_error_fraction"]
        targets = {
            "cohesion": holistic * 0.95 + feat["unique_ratio"] * 0.5,
            "syntax": holistic * 0.9 + min(feat["avg_sentence_length"] / 20.0, 0.5),
            "vocabulary": holistic * 0.92 + feat["unique_ratio"] * 0.8,
            "phraseology": holistic * 0.88 + feat["capitalization_score"] / 5.0,
            "grammar": holistic - punct * 0.4,
            "conventions": holistic - punct * 0.55,
        }
        for k in TARGET_COLUMNS:
            targets[k] = float(np.clip(targets[k], 1.0, 5.0))

        X_rows.append(features_to_vector(feat))
        Y_rows.append(np.array([targets[c] for c in TARGET_COLUMNS]))

    return np.vstack(X_rows), np.vstack(Y_rows)


def _build_improvement_playbook(
    feature_names: List[str],
    X: np.ndarray,
    Y: np.ndarray,
    X_high: np.ndarray,
    X_low: np.ndarray,
    dimension_stats: Dict[str, dict],
) -> Dict[str, object]:
    """Consejos en español derivados de ensayos débiles vs fuertes (essay_dataset + ASAP2)."""
    feat_high = X_high.mean(axis=0) if len(X_high) else X.mean(axis=0)
    feat_low = X_low.mean(axis=0) if len(X_low) else X.mean(axis=0)

    feature_tips: Dict[str, str] = {}
    labels = {
        "unigram_count": "extensión del texto",
        "unique_ratio": "variedad de vocabulario",
        "avg_sentence_length": "longitud media de oración",
        "avg_word_length": "palabras más precisas",
        "punctuation_error_fraction": "errores de puntuación",
        "capitalization_score": "uso de mayúsculas (p. ej. I)",
        "line_breaks": "organización en párrafos",
    }
    for j, name in enumerate(feature_names):
        h, lo = float(feat_high[j]), float(feat_low[j])
        label = labels.get(name, name)
        if name == "punctuation_error_fraction":
            feature_tips[name] = (
                f"En ensayos con mejor nota, los {label} son menores "
                f"({h:.2f} vs {lo:.2f} en ensayos débiles). Revisa comas, puntos y espacios."
            )
        elif name == "unique_ratio":
            feature_tips[name] = (
                f"Los ensayos fuertes del dataset muestran mayor {label} "
                f"({h:.0%} vs {lo:.0%}). Evita repetir las mismas palabras."
            )
        elif name in ("unigram_count", "avg_sentence_length"):
            feature_tips[name] = (
                f"La {label} de referencia en ensayos exitosos ronda {h:.0f} "
                f"(vs {lo:.0f} en ensayos débiles). Desarrolla ideas con oraciones completas."
            )
        else:
            feature_tips[name] = (
                f"Mejora tu {label}: referencia del dataset {h:.2f} "
                f"frente a {lo:.2f} en respuestas débiles."
            )

    dimension_tips: Dict[str, List[str]] = {}
    for i, dim in enumerate(TARGET_COLUMNS):
        dim_high = Y[:, i][Y[:, i] >= dimension_stats[dim]["p75"]]
        dim_low = Y[:, i][Y[:, i] <= dimension_stats[dim]["p25"]]
        tips = []
        if len(dim_high) and len(dim_low):
            tips.append(
                f"Estudiantes con alta {_dim_es(dim)} en el dataset suelen puntuar "
                f"≥{dimension_stats[dim]['p75']:.1f}/5 (tú puedes apuntar a ese rango)."
            )
        tips.extend(_static_dimension_tips(dim))
        dimension_tips[dim] = tips

    return {
        "feature_tips": feature_tips,
        "dimension_tips": dimension_tips,
        "mcq_error_templates": {
            "listening": "Confundiste detalles del audio. Escucha otra vez y anota números, horas y sustantivos clave antes de elegir.",
            "reading": "La opción correcta exige leer con detalle el pasaje. Busca sinónimos y paráfrasis, no solo palabras iguales.",
            "writing": "Revisa reglas gramaticales y convenciones (mayúsculas, tiempos verbales) como en los ensayos calificados del dataset.",
            "speaking": "Tu frase no coincidió lo suficiente con el modelo. Divide la frase en grupos de palabras y repite despacio.",
        },
    }


def _dim_es(dim: str) -> str:
    return {
        "cohesion": "cohesión",
        "syntax": "sintaxis",
        "vocabulary": "vocabulario",
        "phraseology": "expresión oral/escrita",
        "grammar": "gramática",
        "conventions": "convenciones",
    }.get(dim, dim)


def _static_dimension_tips(dim: str) -> List[str]:
    return {
        "cohesion": [
            "Une ideas con conectores: however, therefore, for example (patrón frecuente en ASAP2).",
            "Responde primero la idea principal; luego el detalle (como en ensayos con alta coherence_score).",
        ],
        "syntax": [
            "Usa una idea por oración; evita enredar dos tiempos verbales (error común en ensayos score 1–2).",
        ],
        "vocabulary": [
            "Sustituye palabras repetidas por sinónimos; el dataset premia lexical_richness alto.",
        ],
        "phraseology": [
            "Imita colocaciones naturales del enunciado (frases hechas correctas, no traducción literal).",
        ],
        "grammar": [
            "Verifica concordancia sujeto–verbo y tiempo verbal (grammar_score bajo en essay_dataset correlaciona con más errores).",
        ],
        "conventions": [
            "Puntuación y mayúsculas: los ensayos ASAP2 con score bajo tienen más punctuation_error_fraction.",
        ],
    }.get(dim, [])


def fit_ridge(X: np.ndarray, y: np.ndarray, alpha: float = 1.0) -> Tuple[float, np.ndarray]:
    """Regresión ridge: y ≈ intercept + X @ coef."""
    n, p = X.shape
    X_mean = X.mean(axis=0)
    X_std = X.std(axis=0)
    X_std[X_std < 1e-6] = 1.0
    Xn = (X - X_mean) / X_std
    X_aug = np.hstack([np.ones((n, 1)), Xn])
    I = np.eye(X_aug.shape[1])
    I[0, 0] = 0.0
    beta = np.linalg.solve(X_aug.T @ X_aug + alpha * I, X_aug.T @ y)
    intercept = float(beta[0])
    coef = beta[1:]
    return intercept, coef, X_mean, X_std


def main() -> int:
    if not os.path.isfile(ESSAY_DATASET_PATH):
        print(f"Falta: {ESSAY_DATASET_PATH}")
        return 1
    if not os.path.isfile(ASAP2_PATH):
        print(f"Falta: {ASAP2_PATH}")
        return 1

    print("Cargando essay_dataset.csv …")
    X1, Y1 = load_essay_dataset()
    print(f"  {len(X1)} muestras")

    print("Cargando ASAP2_train_sourcetexts.csv (muestra) …")
    X2, Y2 = load_asap2_sample()
    print(f"  {len(X2)} muestras")

    X = np.vstack([X1, X2])
    Y = np.vstack([Y1, Y2])

    global_mean = X.mean(axis=0)
    global_std = X.std(axis=0)
    global_std[global_std < 1e-6] = 1.0

    models: Dict[str, dict] = {}
    for i, dim in enumerate(TARGET_COLUMNS):
        intercept, coef, _, _ = fit_ridge(X, Y[:, i], alpha=2.5)
        pred = intercept + ((X - global_mean) / global_std) @ coef
        rmse = float(np.sqrt(np.mean((pred - Y[:, i]) ** 2)))
        models[dim] = {
            "intercept": round(intercept, 6),
            "coefficients": {
                FEATURE_NAMES[j]: round(float(coef[j]), 6) for j in range(len(FEATURE_NAMES))
            },
            "rmse": round(rmse, 4),
        }

    dimension_stats = {}
    for i, dim in enumerate(TARGET_COLUMNS):
        s = Y[:, i]
        dimension_stats[dim] = {
            "mean": round(float(s.mean()), 4),
            "std": round(float(s.std()), 4),
            "p25": round(float(np.percentile(s, 25)), 4),
            "p75": round(float(np.percentile(s, 75)), 4),
        }

    holistic = Y.mean(axis=1)
    q25, q75 = float(np.percentile(holistic, 25)), float(np.percentile(holistic, 75))
    low_mask = holistic <= q25
    high_mask = holistic >= q75
    X_high = X[high_mask]
    X_low = X[low_mask]

    feature_benchmarks = {
        FEATURE_NAMES[j]: round(float(np.percentile(X_high[:, j], 75)), 6)
        for j in range(len(FEATURE_NAMES))
    }

    improvement_playbook = _build_improvement_playbook(
        FEATURE_NAMES, X, Y, X_high, X_low, dimension_stats
    )

    payload = {
        "version": 3,
        "sources": [
            "Training_IA/essay_dataset.csv",
            "Training_IA/ASAP2_train_sourcetexts.csv",
        ],
        "n_samples": int(len(X)),
        "n_essay_dataset": int(len(X1)),
        "n_asap2": int(len(X2)),
        "feature_names": FEATURE_NAMES,
        "feature_norm": {
            "mean": {FEATURE_NAMES[i]: round(float(global_mean[i]), 6) for i in range(len(FEATURE_NAMES))},
            "std": {FEATURE_NAMES[i]: round(float(global_std[i]), 6) for i in range(len(FEATURE_NAMES))},
        },
        "dimension_stats": dimension_stats,
        "regression_models": models,
        "feature_benchmarks": feature_benchmarks,
        "improvement_playbook": improvement_playbook,
        "skill_primary_dimensions": {
            "listening": ["cohesion", "vocabulary", "syntax"],
            "reading": ["vocabulary", "cohesion", "syntax"],
            "writing": ["grammar", "conventions", "vocabulary"],
            "speaking": ["phraseology", "vocabulary", "grammar"],
        },
        "strength_threshold": 3.55,
        "weakness_threshold": 2.8,
        "essay_dataset_mapping": {
            "grammar_score": "grammar",
            "coherence_score": "cohesion",
            "lexical_richness": "vocabulary",
            "avg_sentence_length": "syntax",
            "content_relevance_score": "phraseology",
        },
    }

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2)
    print(f"Escrito: {OUT_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
