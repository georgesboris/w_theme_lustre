import lustre
import lustre/attribute
import lustre/element
import lustre/element/html
import w_theme

pub fn main() {
  let app =
    lustre.element(
      html.div([], [
        w_theme.base_styles(),
        w_theme.base_classes(),
        w_theme.dark_theme()
          |> w_theme.to_global_styles(),
        html.button([attribute.class("w-primary")], [
          element.text("clicky me pls"),
        ]),
      ]),
    )

  let assert Ok(_) = lustre.start(app, "#app", Nil)

  Nil
}
