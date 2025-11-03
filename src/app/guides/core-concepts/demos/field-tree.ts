import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';

interface MyDataModel {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
  };
}

@Component({
  selector: 'field-tree',
  templateUrl: './field-tree.html',
  imports: [Field, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldTree {
  protected readonly myForm = form(
    signal<MyDataModel>({
      firstName: 'Stef',
      lastName: 'Modify me',
      address: { street: '123 Main St', city: 'Anytown' },
    }),
  );
}
