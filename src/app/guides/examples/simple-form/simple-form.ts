import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  customError,
  email,
  Field,
  FieldPath,
  form,
  required,
  schema,
  submit,
} from '@angular/forms/signals';
import { delay, firstValueFrom, of } from 'rxjs';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'simple-form',
  standalone: true,
  templateUrl: './simple-form.html',
  imports: [Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleForm {
  protected readonly loginForm = form(
    signal<LoginForm>({ email: '', password: '' }),
    schema<LoginForm>((path: FieldPath<LoginForm>) => {
      required(path.email, { message: 'Email is required' });
      required(path.password, { message: 'Password is required' });
      email(path.email, { message: 'Invalid email format' });
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
