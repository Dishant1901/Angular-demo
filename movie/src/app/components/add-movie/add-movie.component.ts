import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie-service.service';

import { Movie } from 'src/app/model/movie.model';
@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {

  movieForm:any
  movieService:MovieService
  router:Router
  m:any
  movie:Movie[] =[]

  constructor(private _movieService:MovieService,private _router:Router,private fb:FormBuilder){

    this.movieForm = fb.group({
      title:['',[Validators.required]],
      director:['',[Validators.required]],
      year:['',[Validators.required,Validators.min(1900),Validators.max(new Date().getFullYear())]]
    })

    this.movieService = _movieService
    this.router = _router

    
  }

  onAddMovie(){

    if(this.movieForm.valid) {

     this.movieService.getMovies().subscribe({
      next:(res)=>{
        this.movie = res
        console.log("length of movie array is:",this.movie.length)
      }
     })
    // this.movieForm.value.id = this.
   
    this.movieService.addMovie(this.movieForm.value).subscribe(()=>{
      // console.log(`====Movie added successfully=====\n ${this.movieForm.value}`)
      console.log(this.movieForm)
      console.log("showing form details ",this.movieForm.value)
      
      this.router.navigate(['/'])
    })
  }
    // this.m = this.movieService.getMovies().subscribe({
    //   next:(res)=>{
    //     console.log("caled ")
    //     console.log(res)
    //   }
    // })
  }

  


}
