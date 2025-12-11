import { Component, signal } from '@angular/core';
import {
  form,
  Field,
  required,
  email,
  pattern,
  submit,
  applyEach,
} from '@angular/forms/signals';

interface PersonalForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hobbies: string[];
  address: string;
  isAddressRequired: boolean;
}

@Component({
  selector: 'app-home',
  imports: [Field],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly personalFormModel = signal<PersonalForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hobbies: [''],
    isAddressRequired: false,
    address: '',
  });

  readonly personalForm = form(this.personalFormModel, (schemaPath) => {
    required(schemaPath.firstName, { message: 'First name is required' });
    required(schemaPath.lastName, { message: 'Last name is required' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Invalid email format' });
    required(schemaPath.phone, { message: 'Phone number is required' });
    pattern(schemaPath.phone, /^\+?[0-9]{1,3}?[-.\s]?[0-9]{7,14}$/, {
      message: 'Invalid phone number format',
    });
    applyEach(schemaPath.hobbies, (itemSchema) => {
      required(itemSchema, { message: 'Hobby is required' });
    });
    required(schemaPath.address, {
      message: 'Address is required',
      when: ({ valueOf }) => valueOf(schemaPath.isAddressRequired)
    });
  });

  submit() {
    submit(this.personalForm, async () => {
      if (this.personalForm().invalid()) {
        this.personalForm().markAsTouched();
      }
    });
  }

  removeHobby(index: number) {
    const hobbies = this.personalFormModel().hobbies.slice();
    hobbies.splice(index, 1);
    this.personalFormModel.update((model) => ({
      ...model,
      hobbies,
    }));
  }

  addHobby() {
    const hobbies = this.personalFormModel().hobbies.slice();
    hobbies.push('');
    this.personalFormModel.update((model) => ({
      ...model,
      hobbies,
    }));
  }
}
