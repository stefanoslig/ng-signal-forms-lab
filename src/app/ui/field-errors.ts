import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'field-errors',
  standalone: true,
  template: `
    @if (fieldState().touched()) {
      @for (error of fieldState().errors(); track $index) {
        <p class="input-error">{{ error.message }}</p>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldErrors {
  readonly fieldState = input.required<FieldState<unknown>>();
}
