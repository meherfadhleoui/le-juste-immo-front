import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      adresseMail: this.fb.control('', [Validators.required, Validators.email]),
      userName: this.fb.control('', [Validators.required]),
      telephone: this.fb.control(null, [Validators.required]),
    });
  }

  getValue() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return null;
    }

    return this.contactForm.value;
  }
}
