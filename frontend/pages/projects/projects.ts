import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, ProjectsService } from '../service/project-service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { title: '', description: '', image: '' };
  updatedProject: Project = {} as Project;
  editModeIndex: number | null = null;
  loading = false;

  constructor(private svc: ProjectsService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.svc.getProjects().subscribe({
      next: data => {
        this.projects = data;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to load projects:', err);
        this.loading = false;
      }
    });
  }

  addNewProject() {
    if (!this.newProject.title.trim()) return;

    this.loading = true;
    this.svc.addProject(this.newProject).subscribe({
      next: () => {
        this.newProject = { title: '', description: '', image: '' };
        this.loadProjects();
      },
      error: err => {
        console.error('Failed to add project:', err);
        this.loading = false;
      }
    });
  }

  enableEdit(i: number) {
    this.editModeIndex = i;
    this.updatedProject = { ...this.projects[i] };
  }

  saveChanges() {
    if (!this.updatedProject._id) return;

    this.loading = true;
    this.svc.updateProject(this.updatedProject._id, this.updatedProject).subscribe({
      next: () => {
        this.editModeIndex = null;
        this.loadProjects();
      },
      error: err => {
        console.error('Failed to update project:', err);
        this.loading = false;
      }
    });
  }

  cancelEdit() {
    this.editModeIndex = null;
    this.updatedProject = {} as Project;
  }

  deleteProject(id?: string) {
    if (!id) return;

    if (confirm('are you sure')) {
      this.loading = true;
      this.svc.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: err => {
          console.error('Failed to delete project:', err);
          this.loading = false;
        }
      });
    }
  }
}
