---
title: Simple Form
keyword: SimpleFormPage
---

## Introduction to Signal Forms

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

{{ NgDocActions.demo("FieldTree") }}

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

To add logic like this to our form we need to use a `Schema`. In the `Schema` we declaretively define the logic of our form. You can think the `Schema` as a function that accepts a `FieldPath` and defines logic for it.

> **Note**
> `FieldPath<T>` is an object that represents a location in the `FieldTree` form structure and is used to bind logic to a particular part of the structure prior to the creation of the form. Because the `FieldPath` exists prior to the form's creation, it cannot be used to access any of the field state.

//make it a table
value: A WritableSignal representing the current value of the field.
valid: A Signal indicating whether the field and its descendants are currently valid.
errors: A Signal containing the list of FormError associated with the field. (A FormError is any object of type {kind: string, message?: string}).
disabled: A Signal indicating whether the field or any of its parents are disabled.
disabledReasons: A Signal indicating containing a list of reasons for the current field's disablement. Each reason consists of both the field that is the source of the disablement (the current field or one of its parents), as well as an optional reason string that may be shown to the user.
touched: A Signal indicating whether the user has interacted with the field or any of its descendants.

Based on the Field Logic we have defined, we get the Field state 

{{ NgDocActions.demo("FieldLogic") }}

{{ NgDocActions.demo("SimpleForm") }}
