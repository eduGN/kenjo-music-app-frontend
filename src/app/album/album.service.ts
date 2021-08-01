import { Album } from './album.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private urlEndPoint: string = environment.apiUrl;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get(`${this.urlEndPoint}/albums/all`).pipe(
      map((res: any) => res as Album[]),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      })
    )
  }

  saveAlbum(album: Album): Observable<Album> {

    return this.http.post(`${this.urlEndPoint}/album`, album, { headers: this.httpHeaders }).pipe(
      map((res: any) => res as Album),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      }))

  }

  updateAlbum(album: Album):Observable<Album>{
    return this.http.put(`${this.urlEndPoint}/album/${album._id}`, album, { headers: this.httpHeaders }).pipe(
      map((res: any) => res as Album),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      }))
  }

  deleteAlbum(albumId: string): Observable<Album> {
    return this.http.delete(`${this.urlEndPoint}/album/${albumId}`, {headers: this.httpHeaders}).pipe(
      map((res: any) => res as Album),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e)
        }
        return throwError(e)
      }))
  }
}
