import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Skill, SkillService } from '../service/skill-service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css']
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  newSkill: Skill = { name: '', level: '' };
  editIndex: number | null = null;
  editSkill: Skill = { name: '', level: '' };

  constructor(private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills() {
    this.skillService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }

  addSkill() {
    if (!this.newSkill.name || !this.newSkill.level) return;
    this.skillService.addSkill(this.newSkill).subscribe(skill => {
      this.skills.push(skill);
      this.newSkill = { name: '', level: '' };
    });
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.editSkill = { ...this.skills[index] };
  }

  saveEdit() {
    if (this.editIndex === null || !this.skills[this.editIndex]._id) return;
    this.skillService.updateSkill(this.skills[this.editIndex]._id!, this.editSkill).subscribe(updated => {
      this.skills[this.editIndex!] = updated;
      this.editIndex = null;
    });
  }

  deleteSkill(id?: string) {
    if (!id) return;
    this.skillService.deleteSkill(id).subscribe(() => {
      this.skills = this.skills.filter(skill => skill._id !== id);
    });
  }
}
