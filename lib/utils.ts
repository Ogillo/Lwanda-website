export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === "string") {
      classes.push(input)
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(" ")
}

export function cva(
  base: string,
  config?: {
    variants?: Record<string, Record<string, string>>
    defaultVariants?: Record<string, string>
  },
) {
  return (props?: Record<string, string | undefined>) => {
    const variants = config?.variants || {}
    const defaultVariants = config?.defaultVariants || {}
    const mergedProps = { ...defaultVariants, ...props }

    let result = base

    for (const [key, value] of Object.entries(mergedProps)) {
      if (variants[key] && variants[key][value]) {
        result += " " + variants[key][value]
      }
    }

    return result
  }
}

export type VariantProps<T> = T extends (props?: infer P) => any ? P : never
