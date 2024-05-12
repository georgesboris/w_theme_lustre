///
pub type FontFamily {
  FontFamily(heading: String, text: String, code: String)
}

///
pub type SizeScale {
  SizeScale(
    xs: String,
    sm: String,
    md: String,
    lg: String,
    xl: String,
    xl_2: String,
    xl_3: String,
  )
}

/// Font family CSS variables
///
pub const font = FontFamily(
  heading: "var(--w-theme-heading)",
  text: "var(--w-theme-text)",
  code: "var(--w-theme-code)",
)

/// Border Radius CSS variables
///
pub const border_radius = SizeScale(
  xs: "var(--w-radius-xs)",
  sm: "var(--w-radius-sm)",
  md: "var(--w-radius-md)",
  lg: "var(--w-radius-lg)",
  xl: "var(--w-radius-xl)",
  xl_2: "var(--w-radius-xl_2)",
  xl_3: "var(--w-radius-xl_3)",
)

/// Spacing CSS variables
///
pub const spacing = SizeScale(
  xs: "var(--w-spacing-xs)",
  sm: "var(--w-spacing-sm)",
  md: "var(--w-spacing-md)",
  lg: "var(--w-spacing-lg)",
  xl: "var(--w-spacing-xl)",
  xl_2: "var(--w-spacing-xl_2)",
  xl_3: "var(--w-spacing-xl_3)",
)

///
pub type ColorScale {
  ColorScale(
    bg: String,
    bg_subtle: String,
    tint: String,
    tint_subtle: String,
    tint_strong: String,
    accent: String,
    accent_subtle: String,
    accent_strong: String,
    solid: String,
    solid_subtle: String,
    solid_strong: String,
    solid_text: String,
    text: String,
    text_subtle: String,
  )
}

/// Base Color CSS variables
///
pub const base = ColorScale(
  bg: "rgb(var(--w-base-bg))",
  bg_subtle: "rgb(var(--w-base-bg_subtle))",
  tint: "rgb(var(--w-base-tint))",
  tint_subtle: "rgb(var(--w-base-tint_subtle))",
  tint_strong: "rgb(var(--w-base-tint_strong))",
  accent: "rgb(var(--w-base-accent))",
  accent_subtle: "rgb(var(--w-base-accent_subtle))",
  accent_strong: "rgb(var(--w-base-accent_strong))",
  solid: "rgb(var(--w-base-solid))",
  solid_subtle: "rgb(var(--w-base-solid_subtle))",
  solid_strong: "rgb(var(--w-base-solid_strong))",
  solid_text: "rgb(var(--w-base-solid_text))",
  text: "rgb(var(--w-base-text))",
  text_subtle: "rgb(var(--w-base-text_subtle))",
)

/// Primary Color CSS variables
///
pub const primary = ColorScale(
  bg: "rgb(var(--w-primary-bg))",
  bg_subtle: "rgb(var(--w-primary-bg_subtle))",
  tint: "rgb(var(--w-primary-tint))",
  tint_subtle: "rgb(var(--w-primary-tint_subtle))",
  tint_strong: "rgb(var(--w-primary-tint_strong))",
  accent: "rgb(var(--w-primary-accent))",
  accent_subtle: "rgb(var(--w-primary-accent_subtle))",
  accent_strong: "rgb(var(--w-primary-accent_strong))",
  solid: "rgb(var(--w-primary-solid))",
  solid_subtle: "rgb(var(--w-primary-solid_subtle))",
  solid_strong: "rgb(var(--w-primary-solid_strong))",
  solid_text: "rgb(var(--w-primary-solid_text))",
  text: "rgb(var(--w-primary-text))",
  text_subtle: "rgb(var(--w-primary-text_subtle))",
)

/// Secondary Color CSS variables
///
pub const secondary = ColorScale(
  bg: "rgb(var(--w-secondary-bg))",
  bg_subtle: "rgb(var(--w-secondary-bg_subtle))",
  tint: "rgb(var(--w-secondary-tint))",
  tint_subtle: "rgb(var(--w-secondary-tint_subtle))",
  tint_strong: "rgb(var(--w-secondary-tint_strong))",
  accent: "rgb(var(--w-secondary-accent))",
  accent_subtle: "rgb(var(--w-secondary-accent_subtle))",
  accent_strong: "rgb(var(--w-secondary-accent_strong))",
  solid: "rgb(var(--w-secondary-solid))",
  solid_subtle: "rgb(var(--w-secondary-solid_subtle))",
  solid_strong: "rgb(var(--w-secondary-solid_strong))",
  solid_text: "rgb(var(--w-secondary-solid_text))",
  text: "rgb(var(--w-secondary-text))",
  text_subtle: "rgb(var(--w-secondary-text_subtle))",
)

/// Success Color CSS variables
///
pub const success = ColorScale(
  bg: "rgb(var(--w-success-bg))",
  bg_subtle: "rgb(var(--w-success-bg_subtle))",
  tint: "rgb(var(--w-success-tint))",
  tint_subtle: "rgb(var(--w-success-tint_subtle))",
  tint_strong: "rgb(var(--w-success-tint_strong))",
  accent: "rgb(var(--w-success-accent))",
  accent_subtle: "rgb(var(--w-success-accent_subtle))",
  accent_strong: "rgb(var(--w-success-accent_strong))",
  solid: "rgb(var(--w-success-solid))",
  solid_subtle: "rgb(var(--w-success-solid_subtle))",
  solid_strong: "rgb(var(--w-success-solid_strong))",
  solid_text: "rgb(var(--w-success-solid_text))",
  text: "rgb(var(--w-success-text))",
  text_subtle: "rgb(var(--w-success-text_subtle))",
)

/// Warning Color CSS variables
///
pub const warning = ColorScale(
  bg: "rgb(var(--w-warning-bg))",
  bg_subtle: "rgb(var(--w-warning-bg_subtle))",
  tint: "rgb(var(--w-warning-tint))",
  tint_subtle: "rgb(var(--w-warning-tint_subtle))",
  tint_strong: "rgb(var(--w-warning-tint_strong))",
  accent: "rgb(var(--w-warning-accent))",
  accent_subtle: "rgb(var(--w-warning-accent_subtle))",
  accent_strong: "rgb(var(--w-warning-accent_strong))",
  solid: "rgb(var(--w-warning-solid))",
  solid_subtle: "rgb(var(--w-warning-solid_subtle))",
  solid_strong: "rgb(var(--w-warning-solid_strong))",
  solid_text: "rgb(var(--w-warning-solid_text))",
  text: "rgb(var(--w-warning-text))",
  text_subtle: "rgb(var(--w-warning-text_subtle))",
)

/// Danger Color CSS variables
///
pub const danger = ColorScale(
  bg: "rgb(var(--w-danger-bg))",
  bg_subtle: "rgb(var(--w-danger-bg_subtle))",
  tint: "rgb(var(--w-danger-tint))",
  tint_subtle: "rgb(var(--w-danger-tint_subtle))",
  tint_strong: "rgb(var(--w-danger-tint_strong))",
  accent: "rgb(var(--w-danger-accent))",
  accent_subtle: "rgb(var(--w-danger-accent_subtle))",
  accent_strong: "rgb(var(--w-danger-accent_strong))",
  solid: "rgb(var(--w-danger-solid))",
  solid_subtle: "rgb(var(--w-danger-solid_subtle))",
  solid_strong: "rgb(var(--w-danger-solid_strong))",
  solid_text: "rgb(var(--w-danger-solid_text))",
  text: "rgb(var(--w-danger-text))",
  text_subtle: "rgb(var(--w-danger-text_subtle))",
)
