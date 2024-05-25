import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnChanges {
  @Input() isEdit = false;
  @Input() annonce!: Annonce;
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    if (this.isEdit) {
      this.patchForm();
    }
  }

  patchForm() {
    this.contactForm?.patchValue({
      adresseMail: this.annonce.adresseMail,
      userName: this.annonce.userName,
      telephone: this.annonce.telephone,
    });
  }

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
