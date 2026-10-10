export function Logo({ size = 64 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="FluidLearn"
      width={size}
      height={size}
      className="rounded-[24%] object-cover"
      style={{ width: size, height: size }}
    />
  )
}
