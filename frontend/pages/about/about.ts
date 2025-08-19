import { Component, OnInit } from '@angular/core';
import { IEducation } from '../../models/education.model';
import { IPersonalInfo } from '../../models/personal-info.model';
import { IExperience } from '../../models/experience.model';
import { ISkill } from '../../models/skill.model';
import { PersonalInfoService } from '../../services/personal-info.service';
import { EducationService } from '../../services/education.service';
import { ExperienceService } from '../../services/experience.service';
import { SkillsService } from '../../services/skills.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule,DatePipe],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  personalInfo!: IPersonalInfo;
  skills!: ISkill[];
  groupedSkills: { category: string; skills: ISkill[] }[] = [];
  education!: IEducation[];
  experience!: IExperience[];

  constructor(
    private _personalS: PersonalInfoService,
    private _skillsS: SkillsService,
    private _educationS: EducationService,
    private _experienceS: ExperienceService
  ) { }

  ngOnInit(): void {
    this._personalS.getPersonalInfo().subscribe(data => {
      this.personalInfo = data;
      this.personalInfo.cv = this._personalS.getCvUrl(data.cv);
    });
    this._skillsS.getSkills().subscribe(data => {
      this.skills = data;
      this.groupSkillsByCategory();
    });
    this._educationS.getEducationInfo().subscribe(data => {
      this.education = data;
    });
    this._experienceS.getExperienceInfo().subscribe(data => {
      this.experience = data;
    });
  }
  
  groupSkillsByCategory(): void {
    const groups: { [key: string]: ISkill[] } = {};

    this.skills.forEach(skill => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });

    this.groupedSkills = Object.keys(groups).map(cat => ({
      category: cat,
      skills: groups[cat]
    }));
  }

  getLevelPercent(level?: string): number {
    switch (level) {
      case 'Beginner': return 25;
      case 'Intermediate': return 50;
      case 'Advanced': return 75;
      case 'Expert': return 100;
      default: return 0;
    }

  }
}
