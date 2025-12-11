import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput implements FormValueControl<any> {
  inputType = input.required<'text' | 'email' | 'textarea' | 'tel' | 'checkbox'>();
  placeholder = input<string>('');
  id = input<string>('');

  value = model<string | number | boolean>('');

  toggle(event: any) {
    this.value.set(event.target.checked);
  }

  changeAddress(event: any) {
    this.value.set(event.target.value);
  }
}
