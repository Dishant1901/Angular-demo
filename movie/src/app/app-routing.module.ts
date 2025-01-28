import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewMovieComponent } from './components/view-movie/view-movie.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { DeleteMovieComponent } from './components/delete-movie/delete-movie.component';

const routes: Routes = [

  {path:'',component:ViewMovieComponent,pathMatch:"full"},
  {path:'add-movie',component:AddMovieComponent},
  {path:'edit-movie/:id',component:EditMovieComponent},
  {path:'delete-movie',component:DeleteMovieComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
