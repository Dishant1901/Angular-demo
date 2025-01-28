import { Injectable } from '@angular/core';
// import {HttpClient}
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService{


  constructor(private http:HttpClient ) { }

  // private apiUrl = 'http://localhost:3000/movies';
  private apiUrl = 'https://turbo-couscous-67vwg79744qc6rq-3000.app.github.dev/movies'

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiUrl)

  }

  //

  getMovieById(id:number):Observable<Movie | undefined> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`)
  }

  //

  addMovie(movie:Movie):Observable<Movie>{
    return this.http.post<Movie>(this.apiUrl,movie)
  }

  //

  
  updateMovie(movie:Movie): Observable<Movie>{
    return this.http.put<Movie>(`${this.apiUrl}/${movie.id}`,movie)
  }

 deleteMovieById(id:number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`)
 }
   
}
