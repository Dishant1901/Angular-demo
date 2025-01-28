import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/service/movie-service.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  movieForm:any
  movie:any
  id:any
  router:Router

  constructor(private fb:FormBuilder, private _movieService:MovieService,private _router:Router, private _route:ActivatedRoute){
    this.router = _router

    this.movieForm = fb.group({
      title:['',[Validators.required]],
      director:['',[Validators.required]],
      year:['',[Validators.required,Validators.min(1900)],Validators.max(new Date().getFullYear())]
    })
  }


  // Fetch Movie by Id and assign it to movie variable when component get created
  ngOnInit(): void {
     this.id  = +this._route.snapshot.paramMap.get('id')!

// 


// 

    this._movieService.getMovieById(this.id).subscribe({
      next:(res) =>{
        // this.movie = res
        console.log("========ngOnInt of edit component=========")
        this.movieForm.patchValue(res)
      }
    })
  }

  




  // Now call update service to update movie field

  onUpdate():void{
    if(this.movieForm.valid){
      this._movieService.updateMovie({...this.movieForm.value,id:this.id}).subscribe({
        next:()=>{
          this._router.navigate(['/'])
        }
      })
    }
  }


}
