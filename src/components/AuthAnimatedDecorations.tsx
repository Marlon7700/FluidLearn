import { Crown, Eraser, FolderOpen, Pencil } from 'lucide-react'
import type { CSSProperties } from 'react'

const leftPhrases = ['Learn every day', 'Your goals start here', 'English opens doors']
const rightPhrases = ['Speak with confidence', 'Practice makes progress', 'Discover your potential']

export function AuthAnimatedDecorations({ admin = false }: { admin?: boolean }) {
  if (admin) {
    return <AdminAnimatedDecorations />
  }

  return (
    <>
      <span className="login-visual-layer login-visual-wave" aria-hidden />
      <span className="login-visual-layer login-visual-glow" aria-hidden />
      <span className="login-visual-layer login-visual-particles" aria-hidden />
      <div className="login-floating-phrases" aria-hidden>
        <PhraseColumn phrases={leftPhrases} side="left" />
        <PhraseColumn phrases={rightPhrases} side="right" />
        <FallingObjects side="left" />
        <FallingObjects side="right" />
      </div>
    </>
  )
}

function AdminAnimatedDecorations() {
  return (
    <>
      <span className="login-visual-layer admin-visual-network" aria-hidden />
      <span className="login-visual-layer admin-visual-glow" aria-hidden />
      <div className="admin-floating-folders" aria-hidden>
        <div className="admin-folder-column admin-folder-column-left">
          <FolderOpen className="admin-floating-folder admin-folder-one" size={54} />
          <FolderOpen className="admin-floating-folder admin-folder-two" size={42} />
          <FolderOpen className="admin-floating-folder admin-folder-three" size={62} />
        </div>
        <div className="admin-folder-column admin-folder-column-right">
          <FolderOpen className="admin-floating-folder admin-folder-four" size={58} />
          <FolderOpen className="admin-floating-folder admin-folder-five" size={44} />
          <FolderOpen className="admin-floating-folder admin-folder-six" size={64} />
        </div>
      </div>
    </>
  )
}

function PhraseColumn({ phrases, side }: { phrases: string[]; side: 'left' | 'right' }) {
  return (
    <div className={`login-phrase-column login-phrase-column-${side}`}>
      {phrases.map((phrase, index) => (
        <span key={phrase} className="login-floating-phrase" style={{ '--phrase-index': index } as CSSProperties}>
          {phrase}
        </span>
      ))}
    </div>
  )
}

function FallingObjects({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`login-falling-objects login-falling-objects-${side}`}>
      {side === 'left' ? (
        <>
          <Crown className="login-falling-object login-falling-crown" size={30} />
          <Eraser className="login-falling-object login-falling-eraser" size={28} />
          <Pencil className="login-falling-object login-falling-pencil" size={30} />
        </>
      ) : (
        <>
          <Pencil className="login-falling-object login-falling-pencil" size={30} />
          <Crown className="login-falling-object login-falling-crown" size={30} />
          <Eraser className="login-falling-object login-falling-eraser" size={28} />
        </>
      )}
    </div>
  )
}
