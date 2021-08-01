import { ArtistService } from './../artist/artist.service';
import { SubsContainer } from './../subs-container';
import { tap } from 'rxjs/operators';
import { AlbumService } from './album.service';
import { Album } from './album.model';

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  allAlbums: Album[] = []
  selectedAlbum = new Album()
  filteredAlbums: Album[] = []
  subs = new SubsContainer()

  constructor(private albumService: AlbumService, private artistService: ArtistService) { }

  ngOnInit(): void {

    this.getAlbums()
  }

  ngOnDestroy(): void {
   this.subs.dispose()

  }

  getAlbums(): void {
    this.subs.add = this.albumService.getAllAlbums().pipe(
      tap((res: Album[]) => {
        res.forEach(album => this.setCurrArtistName(album))
      })
    ).subscribe()
  }

  setCurrArtistName(album: Album): void {
    this.subs.add = this.artistService.getArtistById(album.artistId)
    .subscribe(res => {
      album.artistName = res.name
      const formatedAlbum = new Album(album)
      this.allAlbums = [...this.allAlbums, formatedAlbum]
      this.filteredAlbums = [...this.allAlbums]

      console.log('All Albums', this.allAlbums)
      console.log('Filtered Albums', this.filteredAlbums)

    })
  }

  filterAllAlbums(query: string): void {

    const reg = new RegExp(`(${query})`, 'gi')
    this.filteredAlbums = this.allAlbums.filter(album => album.title.match(reg))

  }


}

