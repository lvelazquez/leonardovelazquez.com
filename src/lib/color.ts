/** "#RRGGBB" (or "RRGGBB") to an rgba() string. Returns transparent for malformed input. */
export function hexToRgba(hex: string, opacity = 0.65): string {
  const h = hex.replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(h)) return 'transparent'
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16))
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
