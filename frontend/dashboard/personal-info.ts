import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalInfoService } from '../../services/personal-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css'
})
export class PersonalInfo implements OnInit {
  personalForm!: FormGroup;
  selectedImage: File | null = null;
  selectedCv: File | null = null;
  image: string | null = null;
  cvLink: string | null = null;
  
  constructor(private fb: FormBuilder, private _personalS: PersonalInfoService) { }
  
  ngOnInit(): void {
    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      title: [''],
      bio: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      github: [''],
      linkedin: [''],
      facebook: [''],
      instagram: [''],
    });

    this._personalS.getPersonalInfo().subscribe(data => {
      if (data) {
        this.personalForm.patchValue({
          ...data,
          github: data.socialLinks?.github || '',
          facebook: data.socialLinks?.facebook || '',
          instagram: data.socialLinks?.instagram || '',
          linkedin: data.socialLinks?.linkedin || ''
        });

        if (data.image) {
        this.image = this._personalS.getImageUrl(data.image);
      }

      if (data.cv) {
        this.cvLink = this._personalS.getImageUrl(data.cv);
      }
      }
    });
  }

  onSubmit(): void {
    if (this.personalForm.valid) {
      const formData = new FormData();
      formData.append('name', this.personalForm.value.name);
      formData.append('title', this.personalForm.value.title || '');
      formData.append('bio', this.personalForm.value.bio || '');
      formData.append('email', this.personalForm.value.email);
      formData.append('phone', this.personalForm.value.phone || '');
      formData.append('address', this.personalForm.value.address || '');
      const socialLinks = {
      github: this.personalForm.value.github || '',
      linkedin: this.personalForm.value.linkedin || '',
      facebook: this.personalForm.value.facebook || '',
      instagram: this.personalForm.value.instagram || ''
    };


    formData.append('socialLinks', JSON.stringify(socialLinks));

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      if (this.selectedCv) {
        formData.append('cv', this.selectedCv);
      }

      this._personalS.savePersonalInfo(formData).subscribe({
        next: (res) => {
          console.log('Saved ', res);
        },
        error: (err) => {
          console.error('Error, Not Saved', err);
        }
      });
    }
  }
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onCvSelected(event: any) {
    this.selectedCv = event.target.files[0];

  }
}
