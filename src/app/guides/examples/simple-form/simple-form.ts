import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, FieldPath, form, required, schema } from '@angular/forms/signals';

interface LoginForm {
  username: string;
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
  protected readonly loginForm = form(signal<LoginForm>({ username: '', password: '' }), schema<LoginForm>((path: FieldPath<LoginForm>) => {
      required(path.username, { message: 'Username is required' });
      required(path.password, { message: 'Password is required' });
    }),);
}
