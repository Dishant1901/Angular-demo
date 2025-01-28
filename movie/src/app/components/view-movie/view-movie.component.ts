import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie.model';
import { MovieService } from 'src/app/service/movie-service.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit  {

  moviesArray:Movie[] = []
  filteredMoviesArray:Movie[] = []
  search:any
  sortBy:string="title"
  isAscending:boolean = true
  // movieService:MovieService

  constructor(private _movieService:MovieService,private _router:Router){}

  ngOnInit(): void {
    // this.movie = 
    this._movieService.getMovies().subscribe({
      next:(res) =>{
        this.moviesArray = res
        this.filteredMoviesArray = [...this.moviesArray]
        console.log(this.moviesArray)
        this.sortMovies()
      }
    })
  }

  // to delete movie by Id

  // try diffrerent logic as well
  // deleteMovie(id:number):void{
  //   this._movieService.deleteMovieById(id).subscribe({
  //     next:(res) =>{
  //       this.moviesArray.filter(movie => movie.id!= id)
  //     }
  //   })
  // }

  deleteMovie(id:number){
    this._movieService.deleteMovieById(id).subscribe(()=>{
     this.filteredMoviesArray= this.moviesArray.filter(movie => movie.id!= id)
      // this._router.navigate([''])
    }
    
    )
  }


  // edit movei to redirect t uodate compoisnent
  updateMovie(id:number):void{
    this._router.navigate([`/edit-movie/${id}`])
  }
  

  // Funtions to sort & search movies
  filterMovies():void{
    if(this.search){
      console.log(this.search)
      this.filteredMoviesArray = this.moviesArray.filter((movie)=>{
        console.log(movie)
        return movie.title.toLowerCase().includes(this.search.toLowerCase()) ||
         movie.director.toLowerCase().includes(this.search.toLowerCase()) ||
         movie.year ==this.search
      })
    } else{
      this.filteredMoviesArray = [...this.moviesArray]
    }
    this.sortMovies()
    // sort movies as well
  }


  // Function to sort moive 
  // sortMovies():void{

  //   this.filteredMoviesArray.sort((a,b)=>{
  //     if(a[this.sortBy] > b[this.sortBy]) {
  //       return this.isAscending ? 1:-1
  //     } else if(a[this.sortBy] < b[this.sortBy]){
  //       return this.isAscending ? -1:1
  //     }
  //     return 0
  //   })

  // }

  // sortMovies():void{
  //  let  term:string = this.sortBy
  //   this.filteredMoviesArray.sort((a,b)=>{
  //     if(term === "title"){
  //       a.title.localeCompare(b.title)
  //     } else if(term ==="director"){
  //       a.director.localeCompare(b.director)
  //     }
  //   })
  // }

  sortMovies(): void {
    const term = this.sortBy;
    this.filteredMoviesArray.sort((a, b) => {
      let comparison = 0;
  
      if (term === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (term === "director") {
        comparison = a.director.localeCompare(b.director);
      } else if (term === "year") {
        comparison = a.year - b.year;
      }
  
      return this.isAscending ? comparison : -comparison;
    });
  }
  

  

}
