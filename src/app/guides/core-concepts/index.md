---
title: Signal Forms - Core Concepts
keyword: CoreConcepts
---

### Data Model

One of the most important concepts in the Angular Signal Forms is the `Data Model`. Everything starts from there. When we create a Signal Form, it uses the Data Model as the **source of truth** for the values of the form fields. There is no internal copy of the data maintained from the Signals Forms library. That means that updating the `Data Model` will update automatically a form field's value. In the same way, changing the value of form field, will directly modify the `Data Model`.

Also, when creating a Signal Form, the resulting form structure (FieldTree) will match the shape of the `Data Model`.

![Create form](assets/images/create-form.png)

> **Note**
> If the `form()` factory is not defined inside an injection context (e.g contructor), an injector can be passed in the form options object. `form(signal({username: ''}, {injector: this.injector}));`.

### Binding form fields to UI elements

After defining the data model and generating the form field tree, the next step is to bind each field to its corresponding `UI element`. Angular provides the `Field` directive to accomplish this.

A UI element can be one of the three:

| UI element                       | Description                                                             |
| -------------------------------- | ----------------------------------------------------------------------- |
| Native HTML form element         | A standard browser form control                                         |
| Signal forms custom control      | A custom form control built using Angular signal-based forms            |
| `ControlValueAccessor` component | A component implementing CVA for Angular Reactive/Template-driven forms |

This directive will:

- Create a two way binding between the native UI element's value and the form field's value.
- Synchronize the field state (disabled, touched, required, etc.) with the native UI element.

{{ NgDocActions.demo("FieldTree", {expanded: true}) }}

### Field Logic

Now that every field node is synchronized with the corresponding UI element using the `[field]` directive, we can add logic to it. We can add the follwing types of logic in our form fields.

| Type of logic                       | Description                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| hide fields                         | Logic that determines if the field is hidden.                                |
| disable fields                      | Logic that determines reasons for the field being disabled.                  |
| readonly fields                     | Logic that determines if the field is read-only.                             |
| validation errors                   | Logic that produces synchronous validation errors for the field.             |
| validation errors (field's subtree) | Logic that produces synchronous validation errors for the field's subtree.   |
| asynchronous validation errros      | Logic that produces asynchronous validation results (errors or `'pending'`). |

To add logic like this to our form we need to use a `Schema`. In the `Schema` we declaretively define the logic of our form. You can think the `Schema` as a function that accepts a `FieldPath` and defines the logic for it.

> **Note**
> `FieldPath<T>` is an object that represents a location in the `FieldTree` form structure and is used to bind logic to a particular part of the structure prior to the creation of the form.

![Create Schema](assets/images/form-schema.png)

**_We explore the `*FieldLogicPage` topic in depth in the next page, with additional examples and detailed explanations._**

### Field State

Based on the `Field Logic` we have defined using the `Schema`, we get the `Field State`. To access the state associated with a field, call it as a function as you can see in the following demo:

{{ NgDocActions.demo("FieldLogic", {expanded: true}) }}

The `Field State` includes the following state which is derived from the `Field Logic`. Here is a reference of all the available Field states we can get:

| Field State       | Description                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `errors`          | A signal containing the current errors for the field.                                                            |
| `invalid`         | A signal indicating whether the field is valid.                                                                  |
| `disabled`        | A signal indicating whether the field is currently disabled.                                                     |
| `disabledReasons` | A signal containing the reasons why the field is currently disabled.                                             |
| `max`             | A signal indicating the field's maximum value, if applicable (numeric/date inputs & custom controls).            |
| `maxLength`       | A signal indicating the field's maximum string length, if applicable (`<input>`, `<textarea>`, custom controls). |
| `min`             | A signal indicating the field's minimum value, if applicable (numeric/date inputs & custom controls).            |
| `minLength`       | A signal indicating the field's minimum string length, if applicable (`<input>`, `<textarea>`, custom controls). |
| `name`            | A signal containing the field's unique name, typically based on its parent field name.                           |
| `pattern`         | A signal indicating patterns the field must match (array of RegExp).                                             |
| `readonly`        | A signal indicating whether the field is currently readonly.                                                     |
| `required`        | A signal indicating whether the field is required.                                                               |
| `touched`         | A signal indicating whether the field has been touched by the user.                                              |
| `value`           | A writable signal containing the field’s value; updates sync with the bound data model.                          |
