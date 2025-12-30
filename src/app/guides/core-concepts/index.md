---
title: Signal Forms - Core Concepts
keyword: CoreConcepts
---

### Data Model

One of the most important concepts in the Angular Signal Forms is the `Data Model`. Everything starts from there. When we create a Signal Form, it uses the Data Model as the **source of truth** for the values of the form fields. There is no internal copy of the data maintained from the Signals Forms library. That means that updating the `Data Model` will update automatically a form field's value. In the same way, changing the value of form field, will directly modify the `Data Model`.

When creating a Signal Form, a structured called `FieldTree` is returned which will match the shape of the `Data Model`.

> **Note**
> The `FieldTree` is an important concept in Angular Signal Forms. It is a `Proxy` of an internal `FieldNode` structure and allows us to navigate to specific fields at runtime and access the derived state for each one of them. We will explore it more in the following sections.

To create a form, use the `form` function and pass the `Data Model` which should be a `WritableSignal` as an argument.

![Create form](assets/images/create-form.png 'Create form')

> **Note**
> If the `form()` factory is not defined inside an injection context (e.g contructor), an injector can be passed in the form options object
> `form(signal({username: ''}, {injector: this.injector}));`

### Binding form fields to UI elements

After defining the data model and generating the form's `FieldTree`, the next step is to bind each field to its corresponding `UI element`. Angular provides the `Field` directive to accomplish this.

A UI element can be one of the three:

| UI element                       | Description                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| Native HTML form element         | A standard browser form control                                                            |
| Signal forms custom control      | A custom form control built using Angular signal-based forms                               |
| `ControlValueAccessor` component | A component implementing `ControlValueAccessor` for Angular Reactive/Template-driven forms |

This directive will:

```md
1. Create a two way binding between the native UI element's value and the form field's value.
2. Synchronize the field state (disabled, touched, required, etc.) with the native UI element.
```

You can see how the `Field` directive is used in the HTML file of the following example:

{{ NgDocActions.demo("FieldTree", {expanded: true}) }}

### Field Logic

Now that every field node is synchronized with the corresponding UI element using the `[field]` directive, we can add logic to it. We can add the follwing types of logic in our form fields.

| Type of logic                       | Description                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| hide fields                         | Logic that determines if the field is hidden.                                                                       |
| disable fields                      | Logic that determines reasons for the field being disabled.                                                         |
| readonly fields                     | Logic that determines if the field is read-only.                                                                    |
| validation errors                   | Logic that produces synchronous validation errors for the field.                                                    |
| validation errors (field's subtree) | Logic that produces synchronous validation errors for the field's subtree.                                          |
| asynchronous validation errros      | Logic that produces asynchronous validation results (errors or `'pending'` if the validation is still in progress). |

To add logic like this to our form we need to use a `Schema`. In the `Schema` we declaretively define the logic of our form. You can think the `Schema` as a function that accepts a `SchemaPath` and defines the logic for it.

> **Note**
> `SchemaPath` is an object that represents a location in the `FieldTree` structure. It is used within a Schema to bind logic (such as validation or disabled rules) to that location.

![Create Schema](assets/images/form-schema.png 'Form Schema')

**_We explore the `*FieldLogicPage` topic in depth in the next page, with additional examples and detailed explanations._**

### Field State

Based on the logic we have defined using the `Schema` and the state derived from user actions (`touched`, `dirty`), we get the `FieldState` for every node in the `FieldTree`. To retrieve the `FieldState`, navigate to a node in the `FieldTree` and invoke it as a function.

```md
- `form.username()` — returns the `FieldState` object for the `username` field
- `form.username().disabled()` — reads the value of the `disabled` signal
- `form.username().errors()` — reads the value of the validation errors signal
```

{{ NgDocActions.demo("FieldLogic", {expanded: true, tabs: ["HTML"]}) }}

The `Field State` includes the following state which is derived from the `Field Logic`. Here is a reference of all the available Field states we can get:

| Field State         | Description                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `dirty()`           | A signal indicating whether field value has been changed by user.                                                |
| `hidden()`          | A signal indicating whether a field is hidden.                                                                   |
| `errorSummary()`    | A signal containing the errors of the field and its descendants                                                  |
| `errors()`          | A signal containing the current errors for the field.                                                            |
| `valid()`           | A signal indicating whether the field is valid.                                                                  |
| `invalid()`         | A signal indicating whether the field is invalid.                                                                |
| `submitting()`      | A signal indicating whether the field is currently in the process of being submitted.                            |
| `pending()`         | A signal indicating whether there are any validators still pending for this field.                               |
| `disabled()`        | A signal indicating whether the field is currently disabled.                                                     |
| `disabledReasons()` | A signal containing the reasons why the field is currently disabled.                                             |
| `max()`             | A signal indicating the field's maximum value, if applicable (numeric/date inputs & custom controls).            |
| `maxLength()`       | A signal indicating the field's maximum string length, if applicable (`<input>`, `<textarea>`, custom controls). |
| `min()`             | A signal indicating the field's minimum value, if applicable (numeric/date inputs & custom controls).            |
| `minLength()`       | A signal indicating the field's minimum string length, if applicable (`<input>`, `<textarea>`, custom controls). |
| `name()`            | A signal containing the field's unique name, typically based on its parent field name.                           |
| `pattern()`         | A signal indicating patterns the field must match (array of RegExp).                                             |
| `readonly()`        | A signal indicating whether the field is currently readonly.                                                     |
| `required()`        | A signal indicating whether the field is required.                                                               |
| `touched()`         | A signal indicating whether the field has been touched by the user.                                              |
| `value()`           | A writable signal containing the field’s value; updates sync with the bound data model.                          |
