---
title: Signal Forms - Custom Controls
keyword: CustomControlsPage
---

In Angular’s signal-based forms, a custom control is any component that implements the `FormValueControl` or `FormCheckboxControl` interface. Once implemented, the form’s `FieldTree` can bind to the component using the `[Field]` directive, just like it would with any native UI control.

In the same way as with native UI controls, the `[field]` directive creates a two-way binding between the custom control’s value and the form field’s value, and it synchronizes the field state (disabled, touched, required, etc.) with the custom control’s state.

### Example Custom Control - Slider

In the following example we can see how easy is to implement a Custom Control and to integrate it in our form. We start by creating a simple slider component:

```typescript {17} file="./demos/slider.ts"#L4-

```

The `FormValueControl` interface requires a value property and it's the only mandatory property. Although the contract supports additional properties such as `errors`, `disabled`, `required`, etc, only `value` must be implemented. The `value` property should be a `ModelSignal`. In this way, the `[Field]` directive can keep in sync the value of the Custom Control with the value of the bound `FieldTree`.

> **Note**
> Similarly, for the `FormCheckboxControl` contract, the only required property is `checked`. 

By implementing the `FormValueControl` contract and by adding the `value` property we can now integrate this slider custom control with the form as we can see in the following demo.

{{ NgDocActions.demo("CustomControlDemo") }}
