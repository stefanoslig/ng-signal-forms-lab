---
title: Signal Forms - Field Logic
keyword: FieldLogicPage
---

## Core concepts

In the previous page, we introduced the Core Concepts of Angular Signal Forms, including the basics of `*CoreConcepts#field-logic`. If you haven't checked that section yet, it's recommended to do so before continuing. In this page, we take a deeper look at the `Field Logic` and explore its full range of features in detail.

### Logic Functions

To add logic to a field, we use the `schema` function. Inside the `schema` definition, we can register multiple `logic functions`. These functions are evaluated together to compute the field’s derived state — for example whether it should be visible, required, or disabled.

Each `logic function` receives a `FieldContext` as input. The `FieldContext` is one of the most important tools when working with field logic. As you’ll see in later sections, it becomes very useful for things like building custom validators, performing cross-field validation, and managing dynamic behavior within the form.

| FieldContext property | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| value                 | A signal containing the value of the current field.                  |
| state                 | The state of the current field.                                      |
| field                 | The current field.                                                   |
| valueOf               | Gets the value of the field represented by the given path.           |
| stateOf               | Gets the state of the field represented by the given path.           |
| fieldTreeOf           | Gets the field represented by the given path.                        |
| pathKeys              | The list of keys that lead from the root field to the current field. |
| key                   | The key of the current field in its parent field.                    |
| index                 | The index of the current field in its parent array field.            |

### Logic Binding Functions

To attach logic functions to a field, Angular provides several built-in `logic binding functions` (e.g. `validate()`, `required()`, `disabled()`). These binding functions allow you to register your logic functions declaratively and control the field’s behavior as part of the schema.

Here is an overview of how all these are connected:

![Create form](assets/images/field-logic.png 'Create form')

{{ NgDocActions.demo("FieldLogic", {expanded: true}) }}

Here is a list of all the available built-in logic binding functions:

| Logic Binding Function | Description                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| disabled               | Binds logic that reactively determines whether the field is disabled.                          |
| hidden                 | Binds logic that reactively determines whether the field is hidden.                            |
| readonly               | Binds logic that reactively determines whether the field is read-only.                         |
| debounce               | Binds logic that delays the synchronization of values from the UI control to the model.        |
| metadata               | Binds logic that calculates and attaches custom metadata values to the field.                  |
| validate               | Binds a synchronous validation function to the field.                                          |
| validateTree           | Binds a synchronous validation function that can apply errors to the field or its descendants. |
| validateAsync          | Binds an asynchronous validation function (using a Resource) to the field.                     |
| validateHttp           | Binds logic that triggers an HTTP request to validate the field.                               |
| required               | Binds a validator that checks if the field has a non-empty value.                              |
| min                    | Binds logic that validates if a numeric value meets a minimum threshold.                       |
| max                    | Binds logic that validates if a numeric value meets a maximum threshold.                       |
| minLength              | Binds logic that validates if a string or array meets a minimum length.                        |
| maxLength              | Binds logic that validates if a string or array meets a maximum length.                        |
| pattern                | Binds logic that validates if a string matches a specific regular expression.                  |
| email                  | Binds logic that validates if a string matches standard email formatting.                      |
| validateStandardSchema | Binds a Standard Schema (e.g. Zod) validator to the field.                                     |

### Schema composition 🚧

Imagine building a shipping form for a logistics platform (e.g. FedEx). While building this form, you would very quickly start to encounter a few challenges. The form would naturally grow very large, especially when handling international shipments, where many additional fields are required to comply with different regional regulations.

In such cases, it becomes important to split validation and logic rules into smaller, more readable schema blocks that can be composed together when building the form (for example, one schema definition for the contact details data structure and another for the package details data structure). Additionally, we often want to reuse the same schema for common form structures, such as recipient details and sender details.

Angular Signal Forms give us the tools to build complex validation and logic rules by composing smaller, reusable schema blocks. These tools are the following functions:

| Schema composition API | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `apply()`              | Apply a schema to a specific path                  |
| `applyWhen()`          | Conditionally apply a schema                       |
| `applyEach()`          | Apply a schema to every item in an array or object |
| `applyWhenValue()`     | Apply a schema when the value matches a condition  |

#### Apply a schema to a specific path - apply()

We can create reusable chunks of schema and bind them to a specific path within a parent schema definition. This is especially useful when parts of a form share the same data structure and logic.

For example, in the shipping form, both the sender and recipient address details follow the same structure. Instead of duplicating the scehma definition, we can define a reusable child schema for address details and then bind it to the corresponding path in the parent schema.

When doing so, the child schemas are merged into the parent form schema. This allows the parent schema to still define its own logic. For instance, in the following example, the parent schema defines a metadata logic function, while the address-specific logic is provided by the reusable child schema.

{{ NgDocActions.demo("ApplyLogic", {expanded: true}) }}

### Custom validators 🚧

### Async validation 🚧
