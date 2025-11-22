import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, Field, form, required, schema } from '@angular/forms/signals';

interface MyDataModel {
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'field-logic',
  templateUrl: './field-logic.html',
  imports: [Field, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldLogic {
  protected readonly myForm = form(
    signal<MyDataModel>({
      firstName: 'Delete me',
      lastName: 'Disabled',
    }),
    schema<MyDataModel>((schemaPath) => {
      required(schemaPath.firstName);
      disabled(schemaPath.lastName, 'Last name cannot be changed');
    }),
  );
}
