import { Component, OnInit } from '@angular/core';
import { IExperience } from '../../models/experience.model';
import { ExperienceService } from '../../services/experience.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class  Experience implements OnInit{
  experience!: IExperience[];
  experienceForms: FormGroup[] = [];
  newExperienceForm!: FormGroup;
  
  
    constructor(private fb: FormBuilder, private _experienceS: ExperienceService) { }
    ngOnInit(): void {
      
      this.loadAll();
    }
  
    loadAll() {
    this._experienceS.getExperienceInfo().subscribe(data => {
      this.experience = data;
  
      this.experienceForms = this.experience.map(ex =>
        this.fb.group({
          company: [ex.company],
          title: [ex.title],
          startDate: [this.formatDate(ex.startDate)],
    endDate: [this.formatDate(ex.endDate)],
          description: [ex.description],
        })
      );
    });
  }
  
  addExperienceField() {
    if (this.newExperienceForm.valid) {
      this._experienceS.addExperienceField(this.newExperienceForm.value).subscribe(() => {
        this.loadAll();
        this.newExperienceForm.reset();
      });
    }
  }
  
  
    updateExperienceField(ex: IExperience) {
      this._experienceS.updateExperienceField(ex).subscribe(data => {
        console.log(data);
        this.loadAll();
      });
    }
    deleteExperienceField(id: string, index: number) {
      this._experienceS.deleteExperienceField(id).subscribe(data => {
        console.log(data);
        this.experience.splice(index, 1);
      })
    }
    
    addNewForm() {
    this.newExperienceForm = this.fb.group({
      company: [''],
          title: [''],
          startDate: [''],
          endDate: [''],
          description: [''],
    });
  }
  
    cancel() {
      this.newExperienceForm.reset();
    }

  formatDate(date: string | Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
}
