import { Artist } from './artist.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private urlEndPoint : string = environment.apiUrl;
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'})

  constructor(private http: HttpClient) { }

  getAllArtist() : Observable<Artist[]> {
    return this.http.get(`${this.urlEndPoint}/artists/all`).pipe(
      map((res:any) => res as Artist[]),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      })
    )
  }

  getArtistById(id: string): Observable<Artist> {
    return this.http.get(`${this.urlEndPoint}/artist/${id}`).pipe(
      map((res:any) => res as Artist ),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      })
    )
  }

  saveArtist(artist: Artist): Observable<Artist> {

    return this.http.post(`${this.urlEndPoint}/artist`, artist, { headers: this.httpHeaders }).pipe(
      map((res: any) => res as Artist),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      }))

  }

  updateArtist(artist: Artist):Observable<Artist>{
    return this.http.put(`${this.urlEndPoint}/artist/${artist._id}`, artist, { headers: this.httpHeaders }).pipe(
      map((res: any) => res as Artist),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      }))
  }

  deleteArtist(artistId: string): Observable<Artist> {
    return this.http.delete(`${this.urlEndPoint}/artist/${artistId}`, {headers: this.httpHeaders}).pipe(
      map((res: any) => res as Artist),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      }))
  }
}
