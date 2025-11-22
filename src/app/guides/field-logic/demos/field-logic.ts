import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, Field, form, schema } from '@angular/forms/signals';

interface MyDataModel {
  disableForm: boolean;
  username: string;
}

@Component({
  selector: 'field-logic',
  templateUrl: './field-logic.html',
  imports: [Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLogic {
  protected readonly myForm = form(
    signal<MyDataModel>({
      disableForm: false,
      username: 'Disabled',
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
        return valueOf(schemaPath.disableForm) ? 'Range cannot be changed' : false;
      });
    }),
  );
}
