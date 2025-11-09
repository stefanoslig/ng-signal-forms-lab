import { Signal, WritableSignal } from '@angular/core';
import { DisabledReason, Field, FieldTree, ValidationError } from '@angular/forms/signals';

export interface FieldNodeStructure {
  logic: any;
  children(): Iterable<FieldNode>;
}

export interface FieldNode {
  readonly structure: FieldNodeStructure;
  readonly fieldProxy: FieldTree<any>;
  get logicNode(): any;
  get value(): WritableSignal<unknown>;
  get errors(): Signal<ValidationError[]>;
  get errorSummary(): Signal<ValidationError[]>;
  get pending(): Signal<boolean>;
  get valid(): Signal<boolean>;
  get invalid(): Signal<boolean>;
  get dirty(): Signal<boolean>;
  get touched(): Signal<boolean>;
  get disabled(): Signal<boolean>;
  get disabledReasons(): Signal<readonly DisabledReason[]>;
  get hidden(): Signal<boolean>;
  get readonly(): Signal<boolean>;
  get fieldBindings(): Signal<readonly Field<unknown>[]>;
  get submitting(): Signal<boolean>;
  get name(): Signal<string>;
  get max(): Signal<number | undefined> | undefined;
  get maxLength(): Signal<number | undefined> | undefined;
  get min(): Signal<number | undefined> | undefined;
  get minLength(): Signal<number | undefined> | undefined;
  get pattern(): Signal<readonly RegExp[]> | undefined;
  get required(): Signal<boolean> | undefined;
  get keyInParent(): Signal<any>;
}
