import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { disabled, Field, FieldPath, form, schema } from '@angular/forms/signals';
import { Slider } from './slider';
import { JsonPipe } from '@angular/common';

interface MyDataModel {
  disableForm: boolean;
  range: number;
}

@Component({
  selector: 'custom-control-demo',
  templateUrl: './custom-control-demo.html',
  imports: [Field, Slider, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomControlDemo {
  protected readonly myForm = form(
    signal<MyDataModel>({
      disableForm: false,
      range: 0,
    }),
    schema<MyDataModel>((path: FieldPath<MyDataModel>) => {
      disabled(path.range, ({ valueOf }) => {
        return valueOf(path.disableForm) ? 'Range cannot be changed' : false;
      });
    }),
  );
}
