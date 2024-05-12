# w_theme_lustre

```gleam
import lustre
import lustre/attribute
import lustre/element
import lustre/element/html
import w_theme
import w_theme/color

fn light_theme() -> w_theme.Theme {
  w_theme.light_theme()
  |> w_theme.with_primary(fn(_) { color.pink() })
}

fn dark_theme() -> w_theme.Theme {
  w_theme.dark_theme()
  |> w_theme.with_base(fn(_) { color.gray_dark() })
  |> w_theme.with_primary(fn(_) { color.pink_dark() })
}

fn theme_styles() -> element.Element(a) {
  w_theme.to_global_styles_with_dark_mode(
    light_theme(),
    dark_theme(),
    w_theme.from_system_preferences(),
  )
}

pub fn main() {
  let assert Ok(_) =
    html.div([], [
      // Theme tokens will be applied here
      // Dark theme will be selected based on system preferences
      // (we could also choose to change it based on a CSS class)
      theme_styles(),
      // Style base html elements using theme tokens
      // e.g. body background and text colors and font families.
      w_theme.base_styles(),
      // Add class based styles for quickly styling elements based on color variants.
      w_theme.base_classes(),
      // This button will be fully themed (including hover and active states)
      html.button([attribute.class("w-primary w-solid")], [
        element.text("click me please"),
      ]),
    ])
    |> lustre.element()
    |> lustre.start("#app", Nil)

  Nil
}
```
