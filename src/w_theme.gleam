import gleam/float
import gleam/int
import gleam/list
import gleam/pair
import gleam/string
import gleam_community/colour
import lustre/attribute
import lustre/element
import lustre/element/html
import w_theme/color

// ----------------------------------------------------------------------------
// Creating Themes
// ----------------------------------------------------------------------------

///
///
pub opaque type Theme {
  Theme(
    id: String,
    use_dark_color_scheme: Bool,
    font_families: FontFamilies,
    border_radius: SizeScale,
    border_radius_scale: Float,
    spacing: SizeScale,
    spacing_scale: Float,
    base: ColorScale,
    primary: ColorScale,
    secondary: ColorScale,
    success: ColorScale,
    warning: ColorScale,
    danger: ColorScale,
    extra_css_variables: List(#(String, String)),
  )
}

// ----------------------------------------------------------------------------
// Creating Themes - Dark Mode
// ----------------------------------------------------------------------------

///
///
pub opaque type DarkModeSource {
  DarkModeFromSystemPreferences
  DarkModeFromClass(String)
}

///
///
pub fn from_system_preferences() {
  DarkModeFromSystemPreferences
}

///
///
pub fn from_class(class: String) {
  DarkModeFromClass(class)
}

// ----------------------------------------------------------------------------
// Creating Themes - Colors
// ----------------------------------------------------------------------------

///
///
pub type ColorScale =
  color.ColorScale

// ----------------------------------------------------------------------------
// Creating Themes - Font Families
// ----------------------------------------------------------------------------

type FontFamilies {
  FontFamilies(heading: String, text: String, code: String)
}

const default_font_families = FontFamilies(
  heading: default_sans_serif,
  text: default_sans_serif,
  code: "monospace",
)

const default_sans_serif = "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""

// ----------------------------------------------------------------------------
// Creating Themes - Size Scales, Spacing & Border Radius
// ----------------------------------------------------------------------------

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

type SizeScaleRem {
  SizeScaleRem(
    xs: Float,
    sm: Float,
    md: Float,
    lg: Float,
    xl: Float,
    xl_2: Float,
    xl_3: Float,
  )
}

const empty_size_scale = SizeScale(
  xs: "",
  sm: "",
  md: "",
  lg: "",
  xl: "",
  xl_2: "",
  xl_3: "",
)

const default_border_radius = SizeScaleRem(
  xs: 0.125,
  sm: 0.25,
  md: 0.375,
  lg: 0.5,
  xl: 0.75,
  xl_2: 1.0,
  xl_3: 1.5,
)

const default_spacing = SizeScaleRem(
  xs: 0.25,
  sm: 0.5,
  md: 0.75,
  lg: 1.0,
  xl: 0.5,
  xl_2: 2.5,
  xl_3: 4.0,
)

// ----------------------------------------------------------------------------
// Creating Themes
// ----------------------------------------------------------------------------

///
///
pub fn light_theme() {
  Theme(
    id: "light",
    use_dark_color_scheme: False,
    font_families: default_font_families,
    border_radius: empty_size_scale,
    border_radius_scale: 1.0,
    spacing: empty_size_scale,
    spacing_scale: 1.0,
    base: color.slate(),
    primary: color.pink(),
    secondary: color.cyan(),
    success: color.green(),
    warning: color.yellow(),
    danger: color.red(),
    extra_css_variables: [],
  )
}

///
///
pub fn dark_theme() {
  Theme(
    id: "dark",
    use_dark_color_scheme: True,
    font_families: default_font_families,
    border_radius: empty_size_scale,
    border_radius_scale: 1.0,
    spacing: empty_size_scale,
    spacing_scale: 1.0,
    base: color.slate_dark(),
    primary: color.pink_dark(),
    secondary: color.cyan_dark(),
    success: color.green_dark(),
    warning: color.yellow_dark(),
    danger: color.red_dark(),
    extra_css_variables: [],
  )
}

// ----------------------------------------------------------------------------
// Creating Themes - Id
// ----------------------------------------------------------------------------

/// You can give your theme an `id` so it shows up when using debugging tools.
///
pub fn with_id(theme: Theme, value: String) -> Theme {
  Theme(..theme, id: value)
}

// ----------------------------------------------------------------------------
// Creating Themes - Font Families
// ----------------------------------------------------------------------------

///
///
pub fn with_heading_font_families(theme: Theme, value: String) -> Theme {
  Theme(
    ..theme,
    font_families: FontFamilies(..theme.font_families, heading: value),
  )
}

///
///
pub fn with_text_font_families(theme: Theme, value: String) -> Theme {
  Theme(
    ..theme,
    font_families: FontFamilies(..theme.font_families, text: value),
  )
}

///
///
pub fn with_code_font_families(theme: Theme, value: String) -> Theme {
  Theme(
    ..theme,
    font_families: FontFamilies(..theme.font_families, code: value),
  )
}

// ----------------------------------------------------------------------------
// Creating Themes - Border Radius
// ----------------------------------------------------------------------------

///
///
pub fn with_border_radius_scale_factor(theme: Theme, value: Float) -> Theme {
  Theme(..theme, border_radius_scale: value)
}

///
///
pub fn with_border_radius_scale(
  theme: Theme,
  update: fn(SizeScale) -> SizeScale,
) -> Theme {
  Theme(..theme, border_radius: update(theme.border_radius))
}

// ----------------------------------------------------------------------------
// Creating Themes - Spacing
// ----------------------------------------------------------------------------

///
///
pub fn with_spacing_scale_factor(theme: Theme, value: Float) -> Theme {
  Theme(..theme, spacing_scale: value)
}

///
///
pub fn with_spacing_scale(
  theme: Theme,
  update: fn(SizeScale) -> SizeScale,
) -> Theme {
  Theme(..theme, border_radius: update(theme.spacing))
}

// ----------------------------------------------------------------------------
// Creating Themes - Colors
// ----------------------------------------------------------------------------

///
///
pub fn with_base(theme: Theme, update: fn(ColorScale) -> ColorScale) -> Theme {
  Theme(..theme, base: update(theme.base))
}

///
///
pub fn with_primary(theme: Theme, update: fn(ColorScale) -> ColorScale) -> Theme {
  Theme(..theme, primary: update(theme.primary))
}

///
///
pub fn with_secondary(
  theme: Theme,
  update: fn(ColorScale) -> ColorScale,
) -> Theme {
  Theme(..theme, secondary: update(theme.secondary))
}

///
///
pub fn with_success(theme: Theme, update: fn(ColorScale) -> ColorScale) -> Theme {
  Theme(..theme, success: update(theme.success))
}

///
///
pub fn with_warning(theme: Theme, update: fn(ColorScale) -> ColorScale) -> Theme {
  Theme(..theme, warning: update(theme.warning))
}

///
///
pub fn with_danger(theme: Theme, update: fn(ColorScale) -> ColorScale) -> Theme {
  Theme(..theme, danger: update(theme.danger))
}

// ----------------------------------------------------------------------------
// Creating Themes - Extra CSS Variables
// ----------------------------------------------------------------------------

///
///
pub fn with_extra_css_variables(
  theme: Theme,
  update: fn(List(#(String, String))) -> List(#(String, String)),
) -> Theme {
  Theme(..theme, extra_css_variables: update(theme.extra_css_variables))
}

// ----------------------------------------------------------------------------
// Using Themes
// ----------------------------------------------------------------------------

fn theme_style(css: String) -> element.Element(a) {
  html.style([attribute.attribute("data-w-theme", "true")], css)
}

///
///
pub fn to_global_styles(theme: Theme) -> element.Element(a) {
  theme_style("body { " <> to_css_string(theme) <> "}")
}

///
///
pub fn to_class_styles(theme: Theme, class: String) -> element.Element(a) {
  theme_style("." <> class <> " { " <> to_css_string(theme) <> "}")
}

///
///
pub fn to_global_styles_with_dark_mode(
  light_theme: Theme,
  dark_theme: Theme,
  dark_mode_source: DarkModeSource,
) -> element.Element(a) {
  let light_styles = "body { " <> to_css_string(light_theme) <> "}"

  let dark_styles = case dark_mode_source {
    DarkModeFromSystemPreferences ->
      "@media (prefers-color-scheme: dark) { body { "
      <> to_css_string(dark_theme)
      <> "} }"
    DarkModeFromClass(dark_mode_class) ->
      "body."
      <> dark_mode_class
      <> ", ."
      <> dark_mode_class
      <> " { "
      <> to_css_string(dark_theme)
      <> "}"
  }

  theme_style(light_styles <> " " <> dark_styles)
}

///
///
pub fn to_class_styles_with_dark_mode(
  light_theme: Theme,
  dark_theme: Theme,
  dark_mode_source: DarkModeSource,
  class: String,
) -> element.Element(a) {
  let light_styles = "." <> class <> " { " <> to_css_string(light_theme) <> "}"

  let dark_styles = case dark_mode_source {
    DarkModeFromSystemPreferences ->
      "@media (prefers-color-scheme: dark) { ."
      <> class
      <> " { "
      <> to_css_string(dark_theme)
      <> "} }"
    DarkModeFromClass(dark_mode_class) ->
      "@media (prefers-color-scheme: dark) { body."
      <> dark_mode_class
      <> ", ."
      <> class
      <> "."
      <> dark_mode_class
      <> ", "
      <> "."
      <> dark_mode_class
      <> " ."
      <> class
      <> " { "
      <> to_css_string(dark_theme)
      <> "} }"
  }

  theme_style(light_styles <> " " <> dark_styles)
}

pub fn base_styles() {
  html.style(
    [],
    "body { background:"
      <> css_color_value("base-bg")
      <> ";color:"
      <> css_color_value("base-text")
      <> ";font-family:"
      <> css_var_value("font-text")
      <> ";}"
      <> "h1, h2, h3, h4, h5, h6 {"
      <> css_var_value("font-heading")
      <> ";}"
      <> "code {"
      <> css_var_value("font-code")
      <> ";}",
  )
}

pub fn base_classes() {
  html.style(
    [],
    ["base", "primary", "secondary", "success", "warning", "danger"]
      |> list.map(fn(variant) {
      // .w-variant
      ".w-"
      <> variant
      <> " {"
      <> "background-color:"
      <> css_color_value(variant <> "-tint")
      <> ";border-color:"
      <> css_color_value(variant <> "-accent")
      <> ";color:"
      <> css_color_value(variant <> "-text")
      <> ";}"
      // .w-variant (anchors and buttons) - hover
      <> ".w-"
      <> variant
      <> ":is(a,button):hover {"
      <> "background-color:"
      <> css_color_value(variant <> "-tint-strong")
      <> ";border-color:"
      <> css_color_value(variant <> "-accent-strong")
      <> ";}"
      // .w-variant (anchors and buttons) - active / focus
      <> ".w-"
      <> variant
      <> ":is(a,button):is(:active:focus) {"
      <> "background-color:"
      <> css_color_value(variant <> "-tint-subtle")
      <> ";border-color:"
      <> css_color_value(variant <> "-accent-subtle")
      <> ";}"
      // .w-variant.w-solid
      <> " .w-"
      <> variant
      <> ".w-solid {"
      <> "background-color:"
      <> css_color_value(variant <> "-solid")
      <> ";color:"
      <> css_color_value(variant <> "-solid-text")
      <> ";}"
      // .w-variant.w-solid (anchors and buttons) - hover
      <> ".w-"
      <> variant
      <> ".w-solid:is(a,button):hover {"
      <> "background-color:"
      <> css_color_value(variant <> "-solid-strong")
      <> ";}"
      // .w-variant.w-solid (anchors and buttons) - active / focus
      <> ".w-"
      <> variant
      <> ".w-solid:is(a,button):is(:active:focus) {"
      <> "background-color:"
      <> css_color_value(variant <> "-solid-subtle")
      <> ";}"
    })
      |> string.join(""),
  )
}

// ----------------------------------------------------------------------------
// Transforming Themes into CSS strings
// ----------------------------------------------------------------------------

fn to_css_string(theme: Theme) -> String {
  [
    [#("--w-id", theme.id)],
    to_color_scheme_var(theme),
    to_font_family_vars(theme),
    to_border_radius_vars(theme),
    to_spacing_vars(theme),
    to_color_scale_vars("base", theme.base),
    to_color_scale_vars("primary", theme.primary),
    to_color_scale_vars("secondary", theme.secondary),
    to_color_scale_vars("success", theme.success),
    to_color_scale_vars("warning", theme.warning),
    to_color_scale_vars("danger", theme.danger),
    list.map(theme.extra_css_variables, pair.map_first(_, css_var)),
  ]
  |> list.concat()
  |> to_css_defs()
}

fn to_color_scheme_var(theme: Theme) -> List(#(String, String)) {
  case theme.use_dark_color_scheme {
    True -> [#("color-scheme", "dark")]
    False -> [#("color-scheme", "light")]
  }
}

fn to_css_defs(defs: List(#(String, String))) -> String {
  list.fold(defs, "", fn(acc, kv) { kv.0 <> ":" <> kv.1 <> ";" <> acc })
}

fn to_font_family_vars(theme: Theme) -> List(#(String, String)) {
  [
    #("font-heading", theme.font_families.heading),
    #("font-text", theme.font_families.text),
    #("font-code", theme.font_families.code),
  ]
}

fn to_border_radius_vars(theme: Theme) -> List(#(String, String)) {
  to_size_vars(
    "radius",
    theme.border_radius,
    default_border_radius,
    theme.border_radius_scale,
  )
}

fn to_spacing_vars(theme: Theme) -> List(#(String, String)) {
  to_size_vars("spacing", theme.spacing, default_spacing, theme.spacing_scale)
}

fn to_size_vars(
  name: String,
  sizes: SizeScale,
  default: SizeScaleRem,
  scale_factor: Float,
) -> List(#(String, String)) {
  [
    #(css_var(name <> "-xs"), to_size_var(sizes.xs, default.xs, scale_factor)),
    #(css_var(name <> "-sm"), to_size_var(sizes.sm, default.sm, scale_factor)),
    #(css_var(name <> "-md"), to_size_var(sizes.md, default.md, scale_factor)),
    #(css_var(name <> "-lg"), to_size_var(sizes.lg, default.lg, scale_factor)),
    #(css_var(name <> "-xl"), to_size_var(sizes.xl, default.xl, scale_factor)),
    #(
      css_var(name <> "-2xl"),
      to_size_var(sizes.xl_2, default.xl_2, scale_factor),
    ),
    #(
      css_var(name <> "-3xl"),
      to_size_var(sizes.xl_3, default.xl_3, scale_factor),
    ),
  ]
}

fn to_size_var(user_value: String, default_value: Float, scale_factor: Float) {
  case user_value {
    "" -> float.to_string(default_value *. scale_factor) <> "rem"
    _ -> user_value
  }
}

const namespace = "w"

fn css_var(id: String) -> String {
  "--" <> namespace <> "-" <> id
}

fn css_var_value(id: String) -> String {
  "var(" <> css_var(id) <> ")"
}

fn css_color_value(id: String) -> String {
  "rgb(" <> css_var_value(id) <> ")"
}

fn css_color(color: colour.Color) -> String {
  let #(r, g, b, _) = colour.to_rgba(color)

  rgba_to_255(r) <> " " <> rgba_to_255(g) <> " " <> rgba_to_255(b)
}

fn rgba_to_255(value: Float) -> String {
  value *. 255.0
  |> float.round()
  |> int.to_string()
}

fn to_color_scale_vars(
  name: String,
  color_scale: ColorScale,
) -> List(#(String, String)) {
  [
    #(css_var(name <> "-bg"), css_color(color_scale.bg)),
    #(css_var(name <> "-bg-subtle"), css_color(color_scale.bg_subtle)),
    #(css_var(name <> "-tint"), css_color(color_scale.tint)),
    #(css_var(name <> "-tint-subtle"), css_color(color_scale.tint_subtle)),
    #(css_var(name <> "-tint-strong"), css_color(color_scale.tint_strong)),
    #(css_var(name <> "-accent"), css_color(color_scale.accent)),
    #(css_var(name <> "-accent-subtle"), css_color(color_scale.accent_subtle)),
    #(css_var(name <> "-accent-strong"), css_color(color_scale.accent_strong)),
    #(css_var(name <> "-solid"), css_color(color_scale.solid)),
    #(css_var(name <> "-solid-subtle"), css_color(color_scale.solid_subtle)),
    #(css_var(name <> "-solid-strong"), css_color(color_scale.solid_strong)),
    #(css_var(name <> "-solid-text"), css_color(color_scale.solid_text)),
    #(css_var(name <> "-text"), css_color(color_scale.text)),
    #(css_var(name <> "-text-subtle"), css_color(color_scale.text_subtle)),
  ]
}
