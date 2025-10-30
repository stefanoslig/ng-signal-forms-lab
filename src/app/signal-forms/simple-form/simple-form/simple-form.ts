import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Field, form } from '@angular/forms/signals';

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
  protected readonly loginForm = form(signal<LoginForm>({ username: '', password: '' }));
}
