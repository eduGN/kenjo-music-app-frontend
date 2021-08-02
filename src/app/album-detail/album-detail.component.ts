import { faPlusCircle, faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { SubsContainer } from './../subs-container';
import { ArtistService } from './../artist/artist.service';
import { Artist } from './../artist/artist.model';
import { Album } from './../album/album.model';
import { AlbumService } from './../album/album.service';
import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  allAlbums: Album[] = []
  selectedAlbum = new Album()
  filteredAlbums: Album[] = []
  artist = new Artist()
  mForm: FormGroup
  isSent: boolean = false
  subs = new SubsContainer()

  faPlus = faPlusCircle
  faTrash = faTrash
  faEdit = faEdit
  faTimes = faTimes


  constructor(private albumService: AlbumService, private artistService: ArtistService,
    private activatedRoute: ActivatedRoute, private modal: NgbModal,
    private fb: FormBuilder) {

    this.mForm = this.fb.group({
      title: [this.selectedAlbum.title, [Validators.required, Validators.pattern(/^[a-záéíóúA-ZÁÉÍÓÚ][a-záéíóúA-ZÁÉÍÓÚ0-9\s]+[a-záéíóúA-ZÁÉÍÓÚ0-9]$/)]],
      coverUrl: [this.selectedAlbum.coverUrl, [Validators.required/*  Validators.pattern(/^[a-záéíóúA-ZÁÉÍÓÚ0-9][a-záéíóúA-ZÁÉÍÓÚ0-9-_\.]+\.[a-záéíóúA-ZÁÉÍÓÚ0-9]{2,4}/) */]],
      year: [this.selectedAlbum.year, [Validators.required, Validators.pattern(/^(1909|19[1-9][0-9]|20[1-2][0-9]|200[0-9]|2030)$/)]],
      genre: [this.selectedAlbum.genre, [Validators.required, Validators.pattern(/^[a-záéíóúA-ZÁÉÍÓÚ][a-záéíóúA-ZÁÉÍÓÚ0-9,\-\s]+[a-záéíóúA-ZÁÉÍÓÚ0-9]$/)]],
    })
  }


  openModalForm(content: TemplateRef<any>) {
    this.mForm.reset()
    this.modal.open(content)
  }

  ngOnInit(): void {
    this.getAlbumOfArtist()
  }

  getAlbumOfArtist(): void {

    this.subs.add = this.activatedRoute.params.subscribe(params => {
      const id = params['id'] ? params['id'] as string : ''
      this.getAlbums(id)
      this.getArtist(id)
    })
  }

  getAlbums(id: string): void {
    this.subs.add = this.albumService.getAllAlbums().pipe(
      tap((res: Album[]) => {
        this.allAlbums = res.filter(album => album.artistId === id)
        this.allAlbums = this.allAlbums.map((album: any) => new Album(album))
        this.filteredAlbums = [...this.allAlbums]
      })
    ).subscribe()
  }

  getArtist(id: string): void {
    this.subs.add = this.artistService.getArtistById(id).pipe().subscribe(res => {
      this.artist = new Artist(res)
    })
  }

  saveAlbum(album: Album): void {
    this.subs.add = this.albumService.saveAlbum(album).pipe(
      tap(res => console.log(res))
    ).subscribe(res => {
      this.getAlbumOfArtist()
    })
  }

  setAlbum(album: Album): void {
    this.selectedAlbum = album
  }

  get f() {
    return this.mForm.controls
  }

  onSubmitCreate() {

    this.isSent = true
    if (this.mForm.invalid) {
      return
    }
    const album = new Album()

    album.artistId = this.artist._id as string
    album.title = this.f.title.value
    album.coverUrl = this.f.coverUrl.value
    album.year = this.f.year.value
    album.genre = this.f.genre.value

    this.saveAlbum(album)
    this.isSent = false

  }

  onSubmitUpdate() {
    this.isSent = true
    if (this.mForm.invalid) {
      return
    }
    const album = new Album()

    album._id = this.selectedAlbum._id
    album.artistId = this.artist._id as string
    album.title = this.f.title.value
    album.coverUrl = this.f.coverUrl.value
    album.year = this.f.year.value
    album.genre = this.f.genre.value

    this.updateAlbum(album)
    this.isSent = false
  }

  updateAlbum(album: Album): void {
    this.subs.add = this.albumService.updateAlbum(album).pipe(
      tap(res => console.log(res))
    ).subscribe(res => {
      this.getAlbumOfArtist()
    })
  }

  deleteAlbum(albumId: string | undefined): void {

    if (!albumId) return
    this.subs.add = this.albumService.deleteAlbum(albumId).subscribe(res => {
      this.getAlbumOfArtist()
    })
  }

  filterAlbums(query: string): void {

    const reg = new RegExp(`(${query})`, 'gi')
    this.filteredAlbums = this.allAlbums.filter(album => album.title.match(reg))

  }

  ngOnDestroy(): void {
    this.subs.dispose()
  }

}
