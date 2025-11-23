import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, Field, form, schema } from '@angular/forms/signals';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';

interface MyDataModel {
  disableForm: boolean;
  username: string;
}

@Component({
  selector: 'field-logic',
  templateUrl: './field-logic.html',
  imports: [Field, FormInspectorComponent, DemoLayout],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLogic {
  protected readonly myForm = form(
    signal<MyDataModel>({
      disableForm: false,
      username: 'My username',
    }),
    schema<MyDataModel>((schemaPath) => {
      disabled(schemaPath.username, ({ valueOf, stateOf, field, value, key, fieldTreeOf }) => {
        console.log('Field Context:', {
          valueOf: valueOf(schemaPath.disableForm),
          stateOf: stateOf(schemaPath.disableForm),
          field: field(),
          value: value(),
          key: key(),
          fieldTreeOf: fieldTreeOf(schemaPath.disableForm),
        });
        return valueOf(schemaPath.disableForm) ? 'Username cannot be changed' : false;
      });
    }),
  );
}
