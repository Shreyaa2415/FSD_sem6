import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../models/utils/passwordValidators';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formbuilder: FormBuilder) {
    this.registerForm = this.formbuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator },
    );
  }

  get rf() {
    return this.registerForm.controls;
  }

  registerSubmit() {
    if (this.registerForm.valid) {
      console.log('Success' + this.registerForm.value);
      console.log('Success' + JSON.stringify(this.registerForm.value));
    } else {
      console.log(this.registerForm.errors);
      this.printErrors();
    }
  }

  printErrors() {
    const controls = this.registerForm.controls;

    for (const controllerName in controls) {
      const control = controls[controllerName];
      if (control && control.invalid && control.touched) {
        const errors = control.errors;
        if (errors) {
          console.log(`${controllerName} has the following errors:`);
          for (const error in errors) {
            console.log(`- ${error}: ${JSON.stringify(errors[error])}`);
          }
        }
      }
    }
  }
}
