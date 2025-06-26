import { Component, computed, input, InputSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
  standalone: true,
})
export class AuthFormComponent implements OnInit {

  title: InputSignal<string> = input('');

  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  readonly isFormValid: Signal<boolean> = computed(() => {
    return (this.loginForm.get('email')?.valid ?? false) &&
      (this.loginForm.get('password')?.valid ?? false);
  }
  );

  loginForm = new FormGroup(
    {
      email: new FormControl<string>(''),
      password: new FormControl<string>(''),
    }
  );

  ngOnInit(): void {
  }
}
