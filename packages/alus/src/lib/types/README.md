# Type-safe Usage Examples

## Using Constants Instead of Magic Strings

### (x_x) Before (Magic Strings)

```svelte
<Button
  type="button"
  formenctype="application/x-www-form-urlencoded"
  formmethod="post"
/>

<Input
  type="email"
  autocomplete="email"
  inputmode="email"
  aria-expanded="true"
/>
```

### (^_^) After (Type-safe Constants)

```svelte
<script>
  import { Button, Input, CONSTANTS } from 'alus';
</script>

<Button
  type={CONSTANTS.BUTTON_TYPE.BUTTON}
  formenctype={CONSTANTS.FORM_ENCTYPE.URLENCODED}
  formmethod={CONSTANTS.FORM_METHOD.POST}
/>

<Input
  type={CONSTANTS.INPUT_TYPE.EMAIL}
  autocomplete={CONSTANTS.AUTOCOMPLETE.EMAIL}
  inputmode={CONSTANTS.INPUT_MODE.EMAIL}
  aria-expanded={CONSTANTS.ARIA_BOOLEAN.TRUE}
/>
```

## Common Form Field Patterns

### Email Field

```svelte
<script>
  import { Input, CONSTANTS } from 'alus';
  import { generateId, labelAttrs } from 'alus/a11y';

  const labelId = generateId('label');
  let email = $state('');
</script>

<Input
  id="email"
  bind:value={email}
  type={CONSTANTS.INPUT_TYPE.EMAIL}
  autocomplete={CONSTANTS.AUTOCOMPLETE.EMAIL}
  inputmode={CONSTANTS.INPUT_MODE.EMAIL}
  placeholder="you@example.com"
  {...labelAttrs({ labelledby: labelId })}
  required
/>
<label id={labelId} for="email">Email Address</label>
```

### Password Field

```svelte
<script>
  import { Input, CONSTANTS } from 'alus';
  import { generateId, labelAttrs } from 'alus/a11y';

  const labelId = generateId('label');
  let password = $state('');
</script>

<Input
  id="password"
  bind:value={password}
  type={CONSTANTS.INPUT_TYPE.PASSWORD}
  autocomplete={CONSTANTS.AUTOCOMPLETE.NEW_PASSWORD}
  placeholder="Enter password"
  {...labelAttrs({ labelledby: labelId })}
  required
/>
<label id={labelId} for="password">Password</label>
```

### Phone Field

```svelte
<script>
  import { Input, CONSTANTS } from 'alus';
  import { generateId, labelAttrs } from 'alus/a11y';

  const labelId = generateId('label');
  let phone = $state('');
</script>

<Input
  id="phone"
  bind:value={phone}
  type={CONSTANTS.INPUT_TYPE.TEL}
  autocomplete={CONSTANTS.AUTOCOMPLETE.PHONE}
  inputmode={CONSTANTS.INPUT_MODE.TEL}
  placeholder="+1 (555) 123-4567"
  {...labelAttrs({ labelledby: labelId })}
/>
<label id={labelId} for="phone">Phone Number</label>
```

### Name Fields

```svelte
<script>
  import { Input, CONSTANTS } from 'alus';
  import { generateId, labelAttrs } from 'alus/a11y';

  const firstNameId = generateId('label');
  const lastNameId = generateId('label');

  let firstName = $state('');
  let lastName = $state('');
</script>

<div class="name-fields">
  <div>
    <Input
      id="first-name"
      bind:value={firstName}
      type={CONSTANTS.INPUT_TYPE.TEXT}
      autocomplete={CONSTANTS.AUTOCOMPLETE.FIRST_NAME}
      placeholder="John"
      {...labelAttrs({ labelledby: firstNameId })}
    />
    <label id={firstNameId} for="first-name">First Name</label>
  </div>

  <div>
    <Input
      id="last-name"
      bind:value={lastName}
      type={CONSTANTS.INPUT_TYPE.TEXT}
      autocomplete={CONSTANTS.AUTOCOMPLETE.LAST_NAME}
      placeholder="Doe"
      {...labelAttrs({ labelledby: lastNameId })}
    />
    <label id={lastNameId} for="last-name">Last Name</label>
  </div>
</div>
```

### Submit Button with Form Encoding

```svelte
<script>
  import { Button, CONSTANTS } from 'alus';
</script>

<Button
  type={CONSTANTS.BUTTON_TYPE.SUBMIT}
  formenctype={CONSTANTS.FORM_ENCTYPE.MULTIPART}
  formmethod={CONSTANTS.FORM_METHOD.POST}
>
  Upload File
</Button>
```

### Toggle Button with ARIA States

```svelte
<script>
  import { Button, CONSTANTS } from 'alus';
  import { interactiveStateAttrs } from 'alus/a11y';

  let isPressed = $state(false);
</script>

<Button
  onclick={() => isPressed = !isPressed}
  aria-label="Toggle mute"
  {...interactiveStateAttrs({ pressed: isPressed })}
>
  {#if isPressed}
    Muted
  {:else}
    Unmuted
  {/if}
</Button>
```

### Dropdown Menu Button

```svelte
<script>
  import { Button, CONSTANTS, type AriaHaspopup } from 'alus';
  import { interactiveStateAttrs, widgetAttrs, mergeAttrs } from 'alus/a11y';

  let isOpen = $state(false);
  const menuId = 'options-menu';
</script>

<Button
  aria-label="Options menu"
  {...mergeAttrs(
    interactiveStateAttrs({ expanded: isOpen }),
    widgetAttrs({
      haspopup: CONSTANTS.ARIA_BOOLEAN.TRUE as AriaHaspopup,
      controls: menuId
    })
  )}
  onclick={() => isOpen = !isOpen}
>
  Options
</Button>

{#if isOpen}
  <ul id={menuId} role="menu">
    <li role="menuitem">Option 1</li>
    <li role="menuitem">Option 2</li>
    <li role="menuitem">Option 3</li>
  </ul>
{/if}
```

### Search Field with Live Results

```svelte
<script>
  import { Input, CONSTANTS } from 'alus';
  import { labelAttrs, widgetAttrs } from 'alus/a11y';

  let searchQuery = $state('');
  let results = $state([]);
</script>

<Input
  id="search"
  bind:value={searchQuery}
  type={CONSTANTS.INPUT_TYPE.SEARCH}
  inputmode={CONSTANTS.INPUT_MODE.SEARCH}
  placeholder="Search..."
  {...labelAttrs({ label: 'Search products' })}
  {...widgetAttrs({
    live: CONSTANTS.ARIA_LIVE.POLITE,
    controls: 'search-results'
  })}
/>

{#if results.length > 0}
  <ul id="search-results" role="listbox" aria-label="Search results">
    {#each results as result}
      <li role="option">{result.name}</li>
    {/each}
  </ul>
{/if}
```

## Benefits of Using Constants

(^_^) **Type Safety**: Autocomplete helps you find the right value
(^_^) **No Typos**: Can't misspell a constant value
(^_^) **Refactoring**: Change values in one place
(^_^) **Discoverability**: IDE shows all available options
(^_^) **Documentation**: Constants serve as inline documentation
(^_^) **Consistency**: Same values throughout your app

## Exported Types

You can also import and use the types directly:

```ts
import type {
  InputType,
  InputMode,
  AutocompleteValue,
  ButtonType,
  FormEncType,
  FormMethod,
  FormTarget,
  AriaBoolean,
  AriaTristate,
  AriaHaspopup,
  AriaLive,
  AriaOrientation
} from 'alus';

// Use in your own components
function createInput(type: InputType) {
  return { type };
}
```

## Type Exports for Extension

```ts
import type { FormFieldConfig, LabelConfig, ValidationConfig } from 'alus';

// Extend for your custom components
interface MyCustomFieldConfig extends FormFieldConfig {
  customProp: string;
  labelConfig: LabelConfig;
  validationConfig: ValidationConfig;
}
```
