# Style and Layout

## Component Style

All RN core components accept a `style` property. The value is an object whose property names are CSS style names and values are CSS values. Because JavaScript doesn't allow `-` in a property name, you should use camel casing names. For example, use `backgroundColor` instead of `background-color`, use `fontSize` instead of `font-size`.

The common practice is to use `StyleSheet.create` define several styles for subcomponents in one place.

The [RN style document](https://reactnative.dev/docs/style) has a style example.

## Layout with Flexbox

CSS uses box model for UI style. Flexbox stands for flexible box that is a W3C recommended method to lay out, align and distribute space among items in a container.

You can learn the basics from [a complete guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). Pay attention to concepts such as `main axis`, `cross axis`, `flex direction`, `align items` and `justify content`. There are properties for the container and properties for the items.

You can ues [Flexbox Froggy](https://flexboxfroggy.com/) to play and learn the layout.

RN uses the CSS flexbox layout with a few exceptions. The defaults are different, with flexDirection defaulting to column instead of row, alignContent defaulting to flex-start instead of stretch, the `flex` parameter only supporting a single number.

Check RN [Layout with Flexbox](https://reactnative.dev/docs/flexbox) for detail information and examples.
