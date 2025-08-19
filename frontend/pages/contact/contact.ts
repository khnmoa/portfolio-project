import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalInfoService } from '../../services/personal-info.service';
import { IPersonalInfo } from '../../models/personal-info.model';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit{

  contactForm!: FormGroup;
  personalInfo!: IPersonalInfo;
  constructor(private fb: FormBuilder,private _messageS: ContactService,private _personalS:PersonalInfoService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          subject: ['',Validators.required],
          message: ['',Validators.required],
  
    });
    this._personalS.getPersonalInfo().subscribe(data => {
      this.personalInfo = data;
    });
  }
  
  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = new FormData();
      formData.append('name', this.contactForm.value.name);
      formData.append('email', this.contactForm.value.email);
      formData.append('subject', this.contactForm.value.subject);
      formData.append('message', this.contactForm.value.message );

      this._messageS.addMessage(this.contactForm.value).subscribe({
        next: (res) => {
          console.log('Message is Added ', res);
        },
        error: (err) => {
          console.error('Error, Message is Not Added', err);
        }
      });
    }
  }

}
