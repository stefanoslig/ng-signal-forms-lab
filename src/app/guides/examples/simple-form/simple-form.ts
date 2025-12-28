import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { customError, email, Field, form, required, schema, submit } from '@angular/forms/signals';
import { delay, firstValueFrom, of } from 'rxjs';
import { FormInspectorComponent } from '../../../ui/form-inspector.ts/form-inspector';
import { DemoLayout } from '../../../ui/demo-layout/demo-layout';
import { FieldErrors } from '../../../ui/field-errors';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'simple-form',
  standalone: true,
  templateUrl: './simple-form.html',
  imports: [Field, FormInspectorComponent, DemoLayout, FieldErrors],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleForm {
  protected readonly loginForm = form(
    signal<LoginForm>({ email: '', password: '' }),
    schema<LoginForm>((schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });
      required(schemaPath.password, { message: 'Password is required' });
      email(schemaPath.email, { message: 'Invalid email format' });
    }),
  );

  protected submitForm(event: Event) {
    event.preventDefault();

    submit(this.loginForm, async (form) => {
      try {
        await firstValueFrom(of(form().value()).pipe(delay(4000)));
        return undefined;
      } catch (error) {
        return customError({ message: 'Submission failed. Please try again.' });
      }
    });
  }
}
