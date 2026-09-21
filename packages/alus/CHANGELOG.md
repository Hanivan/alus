# Changelog

## 0.3.0

### BREAKING CHANGES

- **`Switch`**: `onchange` renamed to `onCheckedChange`. The prop receives a `boolean`, not a DOM event. Migrate `onchange={(checked) => …}` to `onCheckedChange={(checked) => …}`.
- **`FileInput`**: `onchange` renamed to `onFilesChange`. The prop receives a `FileList`. Migrate `onchange={(files) => …}` to `onFilesChange={(files) => …}`.
- **`NumberInput`**: `onchange` renamed to `onValueChange`. The prop receives a `number`. Migrate `onchange={(value) => …}` to `onValueChange={(value) => …}`.

  These three redefined a native handler name with custom semantics, which is incompatible with the attribute passthrough below.

  **Native-event caveat:** `NumberInput` and `Switch` forward a native `onchange` to their host, so passing `onchange` reaches it. `FileInput` does **not** — its host `<input>` sets `onchange={handleChange}` itself and `rest` is spread first, so a consumer-supplied `onchange` is overridden and never called.

- **`ColorPicker`, `DateRange`, `DateRangePicker`, `TimePicker`, `Compare`**: `onChange` renamed to `onValueChange`.
- **`Calendar`, `DatePicker`, `AutoComplete`**: `onSelect` renamed to `onValueChange`.

  These eight passed a value under a name that did not match the library's own convention (`onValueChange` is already used by `Rating`, `Select`, `Accordion`, and `Slider`) or shadcn-svelte's. They are pure renames — behaviour is unchanged. `onSelect` on `CommandMenu`, `CommandMenuItem`, and `ContextMenu` is deliberately unchanged, matching cmdk; on those components `onSelect` is a field of an item descriptor rather than a value-carrying prop.

### Added

- HTML attribute and event handler passthrough on 141 components. Every component that renders a host element now forwards unknown attributes and handlers to it:
  - arbitrary `on*` event handlers — `onblur`, `onfocus`, `ondblclick`, `oncontextmenu`, `onpointerdown`, `onwheel`, and any other DOM event **the component does not already handle on that element**
  - arbitrary `data-*` attributes, for test hooks (`data-testid`) and analytics markers
  - native attributes that were previously not declared as props — `id`, `name`, `form`, `tabindex`, `autofocus`, `spellcheck`, `enterkeyhint`, `min`, `max`, `step`, `pattern`, `list`, and others
  - `class` on the components that did not previously declare it, and `style` on the majority that did not
  - a spread props object, so wrapper and design-system layers can pass props through

  `{...rest}` is applied before the component's own attributes, so a component's computed `role`, `aria-*`, and default values still win. Consumer-supplied values win for anything the component does not set.

  **The one exception is an event handler the component sets on that same element.** `rest` is spread first, so the component's handler wins and a consumer's handler for that same event is **silently never called**. This affects **35 of the 141** components — measured 2026-09-21 by parsing every element that receives `{...rest}` and listing the `on*` attributes it already sets. The other **106** forward every event they do not handle themselves.

  | Component                                                                                                                                                   | Handler it owns                                                              | Consequence                                                       |
  | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
  | `FileInput`                                                                                                                                                 | `onchange`                                                                   | a consumer's `onchange` fires **0** times                         |
  | `Switch`                                                                                                                                                    | `onclick`, `onkeydown`                                                       | consumer `onclick`/`onkeydown` discarded                          |
  | `Image`                                                                                                                                                     | `onload`, `onerror`                                                          | consumer `onload`/`onerror` discarded                             |
  | `Draggable`, `Droppable`                                                                                                                                    | `ondragstart`/`ondragend`; `ondragover`/`ondrop`/`ondragenter`/`ondragleave` | the drag interaction is the component's                           |
  | `Compare`, `Swipeable`, `SplitViewHandle`                                                                                                                   | `onpointerdown`/`onpointermove`/`onpointerup`/`onpointercancel`              | the pointer gesture is the component's                            |
  | `ContextMenu`                                                                                                                                               | `oncontextmenu`                                                              | consumer `oncontextmenu` discarded                                |
  | `CarouselNext`, `CarouselPrev`, `ModalClose`, `ModalTrigger`, `Tab`, `AccordionTrigger`, `MenuTrigger`, `SelectTrigger`, `CommandMenuTrigger`               | `onclick`                                                                    | consumer `onclick` discarded — use the component's own callback   |
  | `CarouselIndicators`, `Rating`, `TreeView`, `TreeItem`, `MenuItem`, `SelectOption`, `CommandMenuItem`, `CommandMenuInput`, `SubMenu`, `Overlay`, `Carousel` | assorted keyboard/pointer handlers                                           | see the component's source                                        |
  | `TooltipTrigger`                                                                                                                                            | `onpointerenter`, `onpointerleave`, `onfocus`, `onblur`, `onkeydown`         | the entire open/close interaction is the component's              |
  | `TooltipContent`                                                                                                                                            | `onpointerenter`, `onpointerleave`                                           | keeps the tooltip open while hovered                              |
  | `PopoverTrigger`                                                                                                                                            | `onclick`                                                                    | consumer `onclick` discarded — use the component's own open state |
  | `MenuContent`, `SelectContent`                                                                                                                              | `onkeydown`                                                                  | roving-tabindex navigation is the component's                     |
  | `DateRange`                                                                                                                                                 | `onpointerleave`                                                             | clears the hover-preview range                                    |

  **Two components handle an event AND still call yours.** `ToggleButton` declares `onclick` as a prop, destructures it out of `rest`, and invokes it from its own handler (`ToggleButton.svelte:44`); `Slider` does the same for `onkeydown` (`Slider.svelte:68`). A consumer's handler runs on both, after the component's own logic — so neither is in the table above. They are the only two that work this way.

  Every component still accepts the full attribute surface (`data-*`, `id`, `class`, `style`, ARIA, and all non-handler attributes); only the handler attributes listed above are shadowed on the 35 components above.

  **`style` merges rather than replaces on the thirteen components whose receiving element writes its own** — `FileInput`, `SelectContent`, `MenuContent`, `PopoverContent`, `TooltipContent`, `Textarea`, `AspectRatio`, `Compare`, `TableCaption`, `LiveRegion`, `Resizable`, `SplitViewPane`, `VisuallyHidden`. On these, a consumer's `style` is appended to the component's own value instead of being dropped. `class` still replaces everywhere (unchanged behaviour).

### Notes

- **`Input` no longer accepts a `children` prop.** `Input` declares `Omit<HTMLInputAttributes, 'children'>`; the inherited `children` slot was silently accepted and silently ignored. It is now a type error. No consumer in this repo passes one. The same `Omit` is applied to every component in this release, so any component whose `children` you relied on being _ignored_ now rejects it instead.

- **`buildAriaAttrs` (exported helper) now drops `null` alongside `undefined`.** Passing `null` for an `aria-*` key used to stringify it and render the literal text `"null"`; it now removes the attribute, matching Svelte's own semantics. This is a behaviour change on public API (`alus-ui` re-exports it from `$utils/a11y`), so it is called out here. Consumers who relied on the previous stringification should pass a string instead.

- **A consumer-supplied `aria-*` that the component derives to `undefined` is REMOVED, not just overridden.** `{...rest}` goes first, so a component-owned attribute wins — but where the component computes the value as `undefined`, Svelte does not fall back to the consumer's: `if (value == null) element.removeAttribute(attribute)`. So passing `aria-disabled="true"` to `NotificationBell`, whose host writes `aria-disabled={disabled || undefined}`, yields **no** `aria-disabled` attribute at all. The same shape appears on `Badge` and `Alert`. This is the sanctioned consequence of the component-wins contract, not a defect — the supported route is the component's own prop (`disabled`), which carries the same meaning.

- **`VisuallyHidden` deleted five declared props** — `role`, `aria-live`, `aria-atomic`, `aria-relevant`, `aria-label` — which now arrive through `{...rest}` instead of an explicit declaration. Every inherited type is equal-or-wider than what it replaced, so no existing call site breaks. Not a breaking change; listed here as a prop-surface change.

- **`Droppable` and `VirtualList` no longer declare `aria-label` explicitly** — both now inherit it from their native attribute base and receive it through `{...rest}`. Behaviour-preserving for consumers who pass `aria-label`; listed as a prop-surface change, not a behaviour change.

- **Known issue, pre-existing and out of scope for this release: `Droppable` renders `aria-dropeffect`** at five sites (`interactive/droppable/Droppable.svelte:89,103,117,131,145`). `aria-dropeffect` is deprecated in ARIA 1.1 and implemented by no assistive technology. This predates the attribute-passthrough work in this release and removing it is an accessibility behaviour change, not an attribute-passthrough change — it is recorded here so it is not mistaken for a regression introduced by this branch.

- Nine components are unaffected and do not forward attributes, because they render no host element: `CommandMenu`, `Menu`, `Modal`, `Popover`, `Tooltip`, `Conditional`, `Select`, `Dialog`, `Drawer`. The six content components reach the DOM through `ModalContent`, `DrawerContent`, `PopoverContent`, `TooltipContent`, `MenuContent`, and `CommandMenuContent`, which do forward, and `Select`'s consumers reach it through `SelectTrigger` / `SelectContent` / `SelectOption`.

- **Four components forward in some branches and not others**, because their host element is conditional. In the branch that renders no host, attributes passed through `rest` are silently discarded — there is nowhere to put them. This is a known ceiling, not a defect: hoisting the host outside the branch would change the DOM for existing consumers. `NumberInput` and `SearchInput` render their wrapper `div` only in the `{:else}` branch, so a consumer passing a `children` snippet gets no host; `Portal` renders its `div` only when `disabled` is false; and `Image` renders no host in its `error` + `fallback` branch. Prefer the component's own props over `rest` for anything load-bearing on these four.

## [0.2.2](https://github.com/Hanivan/alus/compare/v0.2.1...v0.2.2) (2026-06-20)

### Bug Fixes

- **a11y:** patch missing attrs, ARIA, and WCAG gaps across components ([ce3f431](https://github.com/Hanivan/alus/commit/ce3f43118b1ae9fb1e4d350e8f5b9cb76052eb25))

## [0.2.1](https://github.com/Hanivan/alus/compare/v0.2.0...v0.2.1) (2026-06-01)

### Documentation

- **alus:** add MCP server badge and setup section to README ([4f545cd](https://github.com/Hanivan/alus/commit/4f545cd14e37a4471a9a803a6b5578fe3e5ab9a4))

## [0.2.0](https://github.com/Hanivan/alus/compare/v0.1.3...v0.2.0) (2026-05-31)

### Features

- add MCP server packages and HTTP endpoint for alus-ui ([56485d7](https://github.com/Hanivan/alus/commit/56485d714a15119f4f3bb17138cb781bc01fe1bb))
- **mcp:** pre-bundle component data at build time for npx usage ([0d080bc](https://github.com/Hanivan/alus/commit/0d080bc3cda02c86dcece8856274aa884f61d7d1))

### Bug Fixes

- bundle all deps into dist to fix npx workspace:\* error ([cd0bb6f](https://github.com/Hanivan/alus/commit/cd0bb6fede67dfc2c9f33ff12b05ebca300b183a))
- fix MCP stdio transport and update dev/docs config ([fd89705](https://github.com/Hanivan/alus/commit/fd897054ea4f353113174129c1bd33f3601ccfa3))
- lazy-load MCP server to prevent CF Workers crash on node:fs imports ([c51db1e](https://github.com/Hanivan/alus/commit/c51db1e0e9f725d480e1992cfc0566a4eb7947db))
- **lint:** fix all 190 ESLint errors and configure ignore patterns ([1c045da](https://github.com/Hanivan/alus/commit/1c045dad8f6743b38a9d4cc70524290a05f27867))
- **lint:** implement svelte/no-navigation-without-resolve across all routes and components ([5b2cd39](https://github.com/Hanivan/alus/commit/5b2cd395088e5bf3c45e61a2705d56f61aaeaf89))
- resolve build warnings and remove SvelteKit dep from library components ([19e1e6d](https://github.com/Hanivan/alus/commit/19e1e6d4a5872d0ba243009cf2e0ac1908c45ef8))
- use semantic HTML tags and fix HttpTransport type ([f57176d](https://github.com/Hanivan/alus/commit/f57176d0448c661569dd485406225b124c6cc7e6))

### Documentation

- add Cloudflare deploy instructions ([6805266](https://github.com/Hanivan/alus/commit/680526678b5443b29f578ed46e58db0c65164af1))

## [0.1.3](https://github.com/Hanivan/alus/compare/v0.1.2...v0.1.3) (2026-05-18)

### Refactors

- Integrate untrack for improved reactivity in components ([0cae61e](https://github.com/Hanivan/alus/commit/0cae61e697f8b9610093721e01679548d9929be9))

## [0.1.2](https://github.com/Hanivan/alus/compare/v0.1.1...v0.1.2) (2026-05-18)

### Documentation

- Update contributing guidelines and README for component structure and accessibility ([ae6e277](https://github.com/Hanivan/alus/commit/ae6e2778f0b65554e34a93cf7fc9bc465bba758f))

## 0.1.1 (2026-05-18)

### Features

- Add Button and Input components with accessibility features ([7569b61](https://github.com/Hanivan/alus/commit/7569b612ee52e0127e0c44db1aeb35eff6dc8a48))
- Add Calendar, DatePicker, TimePicker, ColorPicker, and VirtualList components ([5515eea](https://github.com/Hanivan/alus/commit/5515eea386688c442a9141d37b4a5e5863a4fd2d))
- Add Carousel and Stepper components with accessibility features ([852843c](https://github.com/Hanivan/alus/commit/852843cee9742dcd7b849a970b603956a836456a))
- Add Compare, Sortable, Swipeable, Resizable, and SplitView components with accessibility features ([e24979e](https://github.com/Hanivan/alus/commit/e24979e2b4764d571c6a14b63914fdf48b61b7ec))
- Add DateRange and DateRangePicker components with enhanced functionality ([12d8627](https://github.com/Hanivan/alus/commit/12d862792684c5b625320020402754bcfdedaeb1))
- Add layout components including Stack, Flex, Grid, Container, Spacer, and Columns ([c2dac51](https://github.com/Hanivan/alus/commit/c2dac5137a9bced17da169118e07caf7788d59b7))
- Add LiveRegion, NotificationBell, and Toaster components with accessibility features ([92f2bc7](https://github.com/Hanivan/alus/commit/92f2bc796ebe15fc5cbfecba2fcc72b1844b13dc))
- Add new Card, Image, List, DataList, InputGroup, and Rating components with accessibility features ([c129037](https://github.com/Hanivan/alus/commit/c129037fb65feafeaeb7665b9ef2626d9dab8811))
- Add new components and enhance documentation ([973edc5](https://github.com/Hanivan/alus/commit/973edc5cb867ee89a336b5a32321000f7d14d9ed))
- Add new components including Banner, InlineMessage, Frame, Timestamp, CodeBlock, and StatCard ([31f17cd](https://github.com/Hanivan/alus/commit/31f17cde2e7938783ba20f13eef83d0cd26a0f3f))
- Add new components including ToggleButton, AutoComplete, Navigation, SubMenu, and ContextMenu ([bc6cd0f](https://github.com/Hanivan/alus/commit/bc6cd0f9960ee65bf1ade84b0a5f0efb954b8d42))
- Add new feedback and form components with accessibility features ([49b044b](https://github.com/Hanivan/alus/commit/49b044b21d3bdba36f86051ee80fff687d923f67))
- Add new form and navigation components with accessibility features ([eda5227](https://github.com/Hanivan/alus/commit/eda5227430af459fbb19cc61bcf8d6583a30ace7))
- Add new form components and enhance accessibility features ([3f1524d](https://github.com/Hanivan/alus/commit/3f1524df7024a7a31f1cd9d967ab98bf9af9cd81))
- Add new IconButton, ExternalLink, Kbd, AspectRatio, and Callout components with accessibility features ([8c65369](https://github.com/Hanivan/alus/commit/8c65369fa365f0a8529275cb713680f066aa77cc))
- Add Table, TreeView, and Timeline components with accessibility features ([ff6c0d7](https://github.com/Hanivan/alus/commit/ff6c0d7eb83c83df8e2d89c2a70e31edcf3f78c5))
- Enhance accessibility and interactivity across various components ([cc5950a](https://github.com/Hanivan/alus/commit/cc5950a3380243f0f3fa1f88df23392bd3040d42))
- Introduce Checkbox and Radio components with accessibility support ([67a6d64](https://github.com/Hanivan/alus/commit/67a6d64686795dd7265c052ccc586d5ef31910b7))
- Introduce DemoFooter component for enhanced documentation and accessibility ([825d81d](https://github.com/Hanivan/alus/commit/825d81d3cf547c341cc395d0f74165156ccfcdc7))
- Introduce overlay components including Modal, Dialog, Drawer, Tooltip, Popover, and Dropdown ([9f33a6d](https://github.com/Hanivan/alus/commit/9f33a6de83267649a1917d2542ffbf256821df2f))

### Refactors

- Remove Navbar and Footer components, update layout structure ([b61401b](https://github.com/Hanivan/alus/commit/b61401bff5a63ff1ac386e322ad4d8cec5b25034))
- Rename and restructure the component library to alus-ui ([18cc9cc](https://github.com/Hanivan/alus/commit/18cc9cc13b8729afe05ac30532c78f415ff53797))
- Simplify component property destructuring and improve code readability ([e267728](https://github.com/Hanivan/alus/commit/e267728067f0ff1abaa5e81432ec38c81f774a54))
- Standardize component structure and improve accessibility ([57bd8d5](https://github.com/Hanivan/alus/commit/57bd8d55f21c33fc5a2a083d66823a3eac777772))

### Documentation

- Enhance documentation and structure for Alus component library ([2fdef25](https://github.com/Hanivan/alus/commit/2fdef25d42e44d107cb4fb16d85fa8521c90b9e1))
- Remove planned components section from README.md ([684aa46](https://github.com/Hanivan/alus/commit/684aa46fedfdaeb507a92eec33d9699e8382e58f))
- Update documentation and enhance component descriptions ([75f4544](https://github.com/Hanivan/alus/commit/75f454490e84e7ba01ae3c12b29e874c860ede09))
- Update documentation and improve component descriptions ([4e8c630](https://github.com/Hanivan/alus/commit/4e8c630a20eaed0a3f4bc81b99ecc3b0bb5b90cc))

## 0.1.0 (2026-05-18)

### Features

- Add Button and Input components with accessibility features ([7569b61](https://github.com/Hanivan/alus/commit/7569b612ee52e0127e0c44db1aeb35eff6dc8a48))
- Add Calendar, DatePicker, TimePicker, ColorPicker, and VirtualList components ([5515eea](https://github.com/Hanivan/alus/commit/5515eea386688c442a9141d37b4a5e5863a4fd2d))
- Add Carousel and Stepper components with accessibility features ([852843c](https://github.com/Hanivan/alus/commit/852843cee9742dcd7b849a970b603956a836456a))
- Add Compare, Sortable, Swipeable, Resizable, and SplitView components with accessibility features ([e24979e](https://github.com/Hanivan/alus/commit/e24979e2b4764d571c6a14b63914fdf48b61b7ec))
- Add DateRange and DateRangePicker components with enhanced functionality ([12d8627](https://github.com/Hanivan/alus/commit/12d862792684c5b625320020402754bcfdedaeb1))
- Add layout components including Stack, Flex, Grid, Container, Spacer, and Columns ([c2dac51](https://github.com/Hanivan/alus/commit/c2dac5137a9bced17da169118e07caf7788d59b7))
- Add LiveRegion, NotificationBell, and Toaster components with accessibility features ([92f2bc7](https://github.com/Hanivan/alus/commit/92f2bc796ebe15fc5cbfecba2fcc72b1844b13dc))
- Add new Card, Image, List, DataList, InputGroup, and Rating components with accessibility features ([c129037](https://github.com/Hanivan/alus/commit/c129037fb65feafeaeb7665b9ef2626d9dab8811))
- Add new components and enhance documentation ([973edc5](https://github.com/Hanivan/alus/commit/973edc5cb867ee89a336b5a32321000f7d14d9ed))
- Add new components including Banner, InlineMessage, Frame, Timestamp, CodeBlock, and StatCard ([31f17cd](https://github.com/Hanivan/alus/commit/31f17cde2e7938783ba20f13eef83d0cd26a0f3f))
- Add new components including ToggleButton, AutoComplete, Navigation, SubMenu, and ContextMenu ([bc6cd0f](https://github.com/Hanivan/alus/commit/bc6cd0f9960ee65bf1ade84b0a5f0efb954b8d42))
- Add new feedback and form components with accessibility features ([49b044b](https://github.com/Hanivan/alus/commit/49b044b21d3bdba36f86051ee80fff687d923f67))
- Add new form and navigation components with accessibility features ([eda5227](https://github.com/Hanivan/alus/commit/eda5227430af459fbb19cc61bcf8d6583a30ace7))
- Add new form components and enhance accessibility features ([3f1524d](https://github.com/Hanivan/alus/commit/3f1524df7024a7a31f1cd9d967ab98bf9af9cd81))
- Add new IconButton, ExternalLink, Kbd, AspectRatio, and Callout components with accessibility features ([8c65369](https://github.com/Hanivan/alus/commit/8c65369fa365f0a8529275cb713680f066aa77cc))
- Add Table, TreeView, and Timeline components with accessibility features ([ff6c0d7](https://github.com/Hanivan/alus/commit/ff6c0d7eb83c83df8e2d89c2a70e31edcf3f78c5))
- Enhance accessibility and interactivity across various components ([cc5950a](https://github.com/Hanivan/alus/commit/cc5950a3380243f0f3fa1f88df23392bd3040d42))
- Introduce Checkbox and Radio components with accessibility support ([67a6d64](https://github.com/Hanivan/alus/commit/67a6d64686795dd7265c052ccc586d5ef31910b7))
- Introduce DemoFooter component for enhanced documentation and accessibility ([825d81d](https://github.com/Hanivan/alus/commit/825d81d3cf547c341cc395d0f74165156ccfcdc7))
- Introduce overlay components including Modal, Dialog, Drawer, Tooltip, Popover, and Dropdown ([9f33a6d](https://github.com/Hanivan/alus/commit/9f33a6de83267649a1917d2542ffbf256821df2f))

### Refactors

- Remove Navbar and Footer components, update layout structure ([b61401b](https://github.com/Hanivan/alus/commit/b61401bff5a63ff1ac386e322ad4d8cec5b25034))
- Rename and restructure the component library to alus-ui ([18cc9cc](https://github.com/Hanivan/alus/commit/18cc9cc13b8729afe05ac30532c78f415ff53797))
- Simplify component property destructuring and improve code readability ([e267728](https://github.com/Hanivan/alus/commit/e267728067f0ff1abaa5e81432ec38c81f774a54))
- Standardize component structure and improve accessibility ([57bd8d5](https://github.com/Hanivan/alus/commit/57bd8d55f21c33fc5a2a083d66823a3eac777772))

### Documentation

- Enhance documentation and structure for Alus component library ([2fdef25](https://github.com/Hanivan/alus/commit/2fdef25d42e44d107cb4fb16d85fa8521c90b9e1))
- Remove planned components section from README.md ([684aa46](https://github.com/Hanivan/alus/commit/684aa46fedfdaeb507a92eec33d9699e8382e58f))
- Update documentation and enhance component descriptions ([75f4544](https://github.com/Hanivan/alus/commit/75f454490e84e7ba01ae3c12b29e874c860ede09))
- Update documentation and improve component descriptions ([4e8c630](https://github.com/Hanivan/alus/commit/4e8c630a20eaed0a3f4bc81b99ecc3b0bb5b90cc))
