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

To attach logic functions to a field, Angular provides several `logic binding functions` (e.g. `validate()`, `required()`, `disabled()`). These binding functions allow you to register your logic functions declaratively and control the field’s behavior as part of the schema.

Here is an overview of how all these are connected:

![Create form](assets/images/field-logic.png)

{{ NgDocActions.demo("FieldLogic", {expanded: true}) }}

#### Conditionally applied field logic 🚧

#### Built-in logic logic binding functions 🚧

### Custom validators 🚧

### Async validation 🚧

### Schema composition 🚧
