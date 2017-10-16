import { Component } from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.component.html'
})
export class RegisterFormComponent {

  text: string;

  constructor() {
    console.log('Hello RegisterFormComponent Component');
    this.text = 'Hello World';
  }

  register(): void {

  }

}
