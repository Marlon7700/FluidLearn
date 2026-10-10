export function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <img
      src="/google-icon.png"
      alt=""
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )
}
