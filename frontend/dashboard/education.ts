import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IEducation } from '../../models/education.model';
import { EducationService } from '../../services/education.service';

@Component({
  selector: 'app-education',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education implements OnInit{
  education!: IEducation[];
  newEducationField!: FormGroup;
  educationForms: FormGroup[] = [];
newEducationForm!: FormGroup;


  constructor(private fb: FormBuilder, private _educationS: EducationService) { }
  ngOnInit(): void {
    
    this.loadAll();
  }

  loadAll() {
  this._educationS.getEducationInfo().subscribe(data => {
    this.education = data;

    this.educationForms = this.education.map(edu =>
      this.fb.group({
        school: [edu.school],
        degree: [edu.degree],
        startDate: [this.formatDate(edu.startDate)],
    endDate: [this.formatDate(edu.endDate)],
        description: [edu.description]
      })
    );
  });
}

addEducationField() {
  if (this.newEducationForm.valid) {
    this._educationS.addEducationField(this.newEducationForm.value).subscribe(() => {
      this.loadAll();
      this.newEducationForm.reset();
    });
  }
}


  updateEducationField(edu: IEducation) {
    this._educationS.updateEducationField(edu).subscribe(data => {
      console.log(data);
      this.loadAll();
    });
  }
  deleteEducationField(id: string, index: number) {
    this._educationS.deleteEducationField(id).subscribe(data => {
      console.log(data);
      this.education.splice(index, 1);
    })
  }
  
  addNewForm() {
  this.newEducationForm = this.fb.group({
    school: [''],
    degree: [''],
    startDate: [''],
    endDate: [''],
    description: ['']
  });
}

  cancel() {
    this.newEducationForm.reset();
  }

  formatDate(date: string | Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
}
