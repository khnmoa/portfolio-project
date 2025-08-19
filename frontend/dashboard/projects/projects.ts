import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProject } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-dashboard-projects',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard-projects.html',
  styleUrl: './dashboard-projects.css'
})
export class Projects implements OnInit{

  projects!: IProject[];
  project!: IProject;
  projectForm!: FormGroup;
  newProjectForm!: FormGroup;
  selectedProjectId: string | null = null;
  selectedImage: File | null = null;
  showNewProjectForm = false;
  currentImage: string | null = null;
  
  constructor(private fb: FormBuilder, private _projectS: ProjectsService) { }
  ngOnInit(): void {

    this.getAllProjects();

    this.projectForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      technologies: this.fb.array([]),
      image: [''],
      link: [''],
      date: ['']
    });

    this.newProjectForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      technologies: this.fb.array([]),
      image: [''],
      link: [''],
      date: ['']
    });
    
  }
  getAllProjects() {
    this._projectS.getProjects().subscribe(data => {
      this.projects = data;
    })
  }

  get editTechnologies(): FormArray {
    return this.projectForm.get('technologies') as FormArray;
  }

  get newTechnologies(): FormArray {
    return this.newProjectForm.get('technologies') as FormArray;
  }

  addEditTechnologyField() {
    this.editTechnologies.push(this.fb.control(''));
  }

   removeEditTechnologyField(index: number) {
    this.editTechnologies.removeAt(index);
  }

  addNewTechnologyField() {
    this.newTechnologies.push(this.fb.control(''));
  }

  removeNewTechnologyField(index: number) {
    this.newTechnologies.removeAt(index);
  }

  onProjectSelected(event: Event) {
     const target = event.target as HTMLSelectElement;
     this.selectedProjectId = target.value;
     console.log(this.selectedProjectId);
     
    this.showNewProjectForm = false; 
    if (!this.selectedProjectId) {
      this.projectForm.reset();
      this.clearFormArray(this.editTechnologies);
      return;
     }
     
     this._projectS.getProject(this.selectedProjectId).subscribe(data => {
       this.project = data;
       console.log(data);
       this.currentImage = this._projectS.getImageUrl(this.project.image);
       console.log(this.currentImage);
       this.projectForm.patchValue({
         id: this.project._id,
         title: this.project.title,
         category:this.project.category,
         description: this.project.description,
         image: this.project.image,
         link: this.project.link,
         date: this.formatDate(this.project.date)
       });
   
       this.clearFormArray(this.editTechnologies);
       this.project.technologies.forEach(tech => this.editTechnologies.push(this.fb.control(tech)));
    })
   
  }

  openNewProjectForm() {
    this.showNewProjectForm = true;
    this.selectedProjectId = null;  
    this.newProjectForm.reset();
    this.clearFormArray(this.newTechnologies);
    this.addNewTechnologyField();
    this.newProjectForm.get('link')?.setValue('');
  }

onNewProjectTitleChange() {
    const title = this.newProjectForm.get('title')?.value || '';
    const link = title.trim().toLowerCase().replace(/\s+/g, '-');
    this.newProjectForm.get('link')?.setValue(link);
  }


  saveEditProject() {
    if (this.projectForm.invalid) return;

    const val = this.projectForm.value;
    val.technologies = val.technologies.filter((t: string) => t.trim() !== '');

    console.log('Save Edit Project:', val);

    this._projectS.updateProject(this.selectedProjectId,this.projectForm.value).subscribe(data => console.log(data));

    this.getAllProjects();
    this.projectForm.reset();
    this.clearFormArray(this.editTechnologies);
    this.selectedProjectId = null;
  }


  deleteProject() {
    if (!this.selectedProjectId) return;

    console.log('Delete Project ID:', this.selectedProjectId);

    this._projectS.deleteProject(this.selectedProjectId).subscribe(data => console.log(data));

    this.getAllProjects();
    this.projectForm.reset();
    this.clearFormArray(this.editTechnologies);
    this.selectedProjectId = null;
  }

  saveNewProject() {
  if (this.newProjectForm.invalid) return;

  const val = this.newProjectForm.value;
  val.technologies = val.technologies.filter((t: string) => t.trim() !== '');

  const formData = new FormData();
  formData.append('title', val.title);
  formData.append('category', val.category);
  formData.append('description', val.description);
  val.technologies.forEach((tech: string, idx: number) => formData.append(`technologies[${idx}]`, tech));
  formData.append('link', val.link);
  formData.append('date', val.date || '');

  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }

  this._projectS.addProject(formData).subscribe(data => {
    console.log(data);
    this.showNewProjectForm = false;
    this.getAllProjects();
    this.selectedImage = null;
    this.newProjectForm.reset();
    this.clearFormArray(this.newTechnologies);
  });
}


  cancelNewProject() {
    this.showNewProjectForm = false;
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length) {
      formArray.removeAt(0);
    }
  }

formatDate(date: string | Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
  
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
}
