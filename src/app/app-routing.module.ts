import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { DocumentationComponent } from './documentation/documentation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'documentation', component: DocumentationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
