// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Experience, ExperienceService } from '../service/experiance-service';

// @Component({
//   selector: 'app-experience',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './experience.html',
//   styleUrls: ['./experience.css']
// })
// // export class ExperienceComponent implements OnInit {

//   experiences: Experience[] = [];

//   newExperience: Experience = { company: '', role: '', startDate: '', endDate: '', description: '' };

//   editIndex: number | null = null;
//   editExperience: Experience = { company: '', role: '', startDate: '', endDate: '', description: '' };

//   constructor(private experienceService: ExperienceService) {}

//   ngOnInit(): void {
//     this.loadExperiences();
//   }

//   loadExperiences(): void {
//     this.experienceService.getExperiences().subscribe(data => {
//       this.experiences = data;
//     });
//   }

//   addExperience(): void {
//     if (!this.newExperience.company || !this.newExperience.role || !this.newExperience.startDate) return;

//     this.experienceService.addExperience(this.newExperience).subscribe(exp => {
//       this.experiences.push(exp);
//       this.resetNewExperience();
//     });
//   }

//   startEdit(index: number): void {
//     this.editIndex = index;
//     this.editExperience = { ...this.experiences[index] };
//   }

//   saveEdit(): void {
//     if (this.editIndex === null || !this.experiences[this.editIndex]._id) return;

//     this.experienceService.updateExperience(this.experiences[this.editIndex]._id!, this.editExperience).subscribe(updated => {
//       this.experiences[this.editIndex!] = updated;
//       this.cancelEdit();
//     });
//   }

//   deleteExperience(id?: string): void {
//     if (!id) return;

//     this.experienceService.deleteExperience(id).subscribe(() => {
//       this.experiences = this.experiences.filter(exp => exp._id !== id);
//     });
//   }

//   cancelEdit(): void {
//     this.editIndex = null;
//     this.editExperience = { company: '', role: '', startDate: '', endDate: '', description: '' };
//   }

//   private resetNewExperience(): void {
//     this.newExperience = { company: '', role: '', startDate: '', endDate: '', description: '' };
//   }
// }


