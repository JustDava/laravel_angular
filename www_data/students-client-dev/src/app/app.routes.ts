import { Routes } from '@angular/router';
import {StudentFormComponent} from "./student-form/student-form.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'student', component: StudentFormComponent },
  { path: 'student/:id', component: StudentFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
