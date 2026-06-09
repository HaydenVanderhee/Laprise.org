export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <img
      src="/favicon-no-background.png"
      alt=""
      aria-hidden="true"
      style={{ display: 'block', width: size, height: size }}
    />
  )
}
