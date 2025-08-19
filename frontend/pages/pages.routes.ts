
import { Routes } from '@angular/router';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Services } from './services/services';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';
import { ProjectDetails } from './project-details/project-details';

export const pagesRoutes: Routes = [
  { path: '', component: Hero },
  { path: 'about', component: About },
  { path: 'services', component: Services },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  { path: 'project/:link', component: ProjectDetails }
];
