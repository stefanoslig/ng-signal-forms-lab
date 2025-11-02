---
title: Signal Forms - Custom Controls
keyword: CustomControlsPage
---

In Angular’s signal-based forms, a custom control is any component that implements the `FormValueControl` or `FormCheckboxControl` interface. Once implemented, the form’s `FieldTree` can bind to the component using the `[Field]` directive, just like it would with any native UI control.

In the same way as with native UI controls, the `[field]` directive creates a two-way binding between the custom control’s value and the form field’s value, and it synchronizes the field state (disabled, touched, required, etc.) with the custom control’s state.

### Example Custom Control - Slider

In the following example we can see how easy is to implement a Custom Control and to integrate it in our form. We start by creating a simple slider component:

```typescript {22, 23} file="./demos/slider.ts"#L4-

```

The `FormValueControl` interface requires a value property and it's the only mandatory property. Although the contract supports additional properties such as `errors`, `disabled`, `required`, etc, only `value` must be implemented. The `value` property should be a `ModelSignal`. In this way, the `[Field]` directive can keep in sync the value of the Custom Control with the value of the bound `FieldTree`.

> **Note**
> Similarly, for the `FormCheckboxControl` contract, the only required property is `checked`.

The `FormValueControl` and the `FormCheckboxControl` contracts include also a number of other optional set of properties that you can implement (you can find the full list of these proporties in the following table). The only thing you have to do is to add the corresponding property in your custom control. All of them as you can see are input signals (except `touched` which is model signal). The `Field` directive will update automatically the value of all these input/model signals for you.

| Property        | Type                                                               |
| --------------- | ------------------------------------------------------------------ |
| errors          | InputSignal<ValidationError>[]>                                    |
| disabled        | InputSignal<boolean>                                               |
| disabledReasons | InputSignal<DisabledReason>[]>                                     |
| readonly        | InputSignal<boolean>                                               |
| hidden          | InputSignal<boolean>                                               |
| invalid         | InputSignal<boolean>                                               |
| pending         | InputSignal<boolean>                                               |
| touched         | ModelSignal<boolean> \| InputSignal<boolean> \| OutputRef<boolean> |
| dirty           | InputSignal<boolean>                                               |
| name            | InputSignal<string>                                                |
| required        | InputSignal<boolean>                                               |
| min             | InputSignal<number \| undefined>                                   |
| minLength       | InputSignal<number \| undefined>                                   |
| max             | InputSignal<number \| undefined>                                   |
| maxLength       | InputSignal<number \| undefined>                                   |
| pattern         | InputSignal<RegExp[]>                                              |

### Demo

In this demo, you can see how the custom `Slider` control integrates with our form. In addition to the `value` property, we've also implemented a `disabled` property to demonstrate synchronization of other control states as well.

{{ NgDocActions.demo("CustomControlDemo") }}
