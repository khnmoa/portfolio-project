import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ISkill } from '../../models/skill.model';
import { SkillsService } from '../../services/skills.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {

  skills: ISkill[] = [];
  skillForms: FormGroup[] = [];
  newSkillForm!: FormGroup ;

  constructor(private fb: FormBuilder, private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills() {
    this.skillsService.getSkills().subscribe(data => {
      this.skills = data;
      this.skillForms = this.skills.map(skill => this.createSkillForm(skill));
    });
  }

  createSkillForm(skill: ISkill): FormGroup {
    return this.fb.group({
      name: [skill.name, Validators.required],
      level: [skill.level, Validators.required],
      category: [skill.category || '']
    });
  }

  editSkill(index: number) {
    const form = this.skillForms[index];
    if (form.valid) {
      const updatedSkill = { ...this.skills[index], ...form.value };
      this.skillsService.updateSkill(updatedSkill._id!, updatedSkill).subscribe(() => {
        this.loadSkills();
      });
    } else {
      alert('Please fill all required fields');
    }
  }

  deleteSkill(id: string, index: number) {
    this.skillsService.deleteSkill(id).subscribe(() => {
      this.skills.splice(index, 1);
      this.skillForms.splice(index, 1);
    });
  }

  addNewSkill() {
    this.newSkillForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      category: ['']
    });
  }

  saveNewSkill() {
    if (this.newSkillForm?.valid) {
      console.log(this.newSkillForm.value)
      this.skillsService.addSkill(this.newSkillForm.value).subscribe(() => {
      this.newSkillForm =this.fb.group({});
        this.loadSkills();
      });
    } else {
      alert('Please fill all required fields');
    }
  }

  cancelNewSkill() {
    this.newSkillForm = this.fb.group({
      name: [''],
      level: [''],
      category: ['']});
  }

}
