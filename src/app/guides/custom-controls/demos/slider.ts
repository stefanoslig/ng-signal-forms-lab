import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'slider',
  template: `
    <label for="disabled-range" class="input-label">{{ title() }}</label>
    <input
      id="disabled-range"
      type="range"
      [value]="value()"
      (input)="value.set($event.target.valueAsNumber)"
      class="input-slider"
    />
  `,
  host: {
    '[class.disabled]': 'disabled()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Slider implements FormValueControl<number> {
  readonly title = input.required<string>();
  readonly value = model(0);
  readonly disabled = input(false);
}
