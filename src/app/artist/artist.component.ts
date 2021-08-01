import { SubsContainer } from './../subs-container';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';
import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {

  allArtists: Artist[] = []
  filteredArtists: Artist[] = []
  selectedArtist = new Artist()
  mForm: FormGroup
  isSent: boolean = false
  subs = new SubsContainer()

  constructor(private artistService: ArtistService,private modal: NgbModal,
    private fb: FormBuilder) {
      this.mForm = this.fb.group({
        name: [this.selectedArtist.name, [Validators.required, Validators.pattern(/^[a-záéíóúA-ZÁÉÍÓÚ][a-záéíóúA-ZÁÉÍÓÚ0-9\s]+[a-záéíóúA-ZÁÉÍÓÚ0-9]$/)]],
        photoUrl: [this.selectedArtist.photoUrl, [Validators.required/*  Validators.pattern(/^[a-záéíóúA-ZÁÉÍÓÚ0-9][a-záéíóúA-ZÁÉÍÓÚ0-9-_\.]+\.[a-záéíóúA-ZÁÉÍÓÚ0-9]{2,4}/) */]],
        birthdate: [this.selectedArtist.birthdate, [Validators.required, Validators.pattern(/^\d{4}([./-])\d{2}\1\d{2}$/)]],
        deathDate: [this.selectedArtist.deathDate, [Validators.required,  Validators.pattern(/^\d{4}([./-])\d{2}\1\d{2}$/)]],
      })
    }

  ngOnInit(): void {
    this.loadArtists()
  }

  openModalForm(content: TemplateRef<any>) {
    this.mForm.reset()
    this.modal.open(content)
  }

  setArtist(artist: Artist): void {
    this.selectedArtist = artist
  }

  loadArtists(): void {

    this.artistService.getAllArtist().pipe(
      tap((response: Artist[]) => {
        this.allArtists = response.map(artist => new Artist(artist))
        this.filteredArtists = [...this.allArtists]
        console.log(this.allArtists)
      })).subscribe()
  }

  get f() {
    return this.mForm.controls
  }

  filterArtists(query: string): void {

     const reg = new RegExp(`(${query})`, 'gi')
     this.filteredArtists = this.allArtists.filter(artist => artist.name.match(reg))

  }


  onSubmitCreate() {

    this.isSent = true
    if (this.mForm.invalid) {
      console.log("Formulario Inválido");
      return
    }
    console.log("Enviar form");
    console.log(this.f)

    const artist = new Artist()

    artist.name = this.f.name.value
    artist.photoUrl = this.f.photoUrl.value
    artist.birthdate = this.f.birthdate.value
    artist.deathDate = this.f.deathDate.value

    this.saveArtist(artist)
    this.isSent = false

  }

  onSubmitUpdate(){
    this.isSent = true
    if (this.mForm.invalid) {
      console.log("Formulario Inválido");
      return
    }

    console.log(this.f)

    const artist = new Artist()

    artist._id = this.selectedArtist._id
    artist.name = this.f.name.value
    artist.photoUrl = this.f.photoUrl.value
    artist.birthdate = this.f.birthdate.value
    artist.deathDate = this.f.deathDate.value

    this.updateArtist(artist)
    this.isSent = false
  }

  saveArtist(artist: Artist): void {
    this.subs.add = this.artistService.saveArtist(artist).pipe(
      tap(res => console.log(res))
    ).subscribe(res=>{
      this.loadArtists()
    })
  }

  updateArtist(artist: Artist):void {
    this.subs.add = this.artistService.updateArtist(artist).pipe(
      tap(res => console.log(res))
    ).subscribe(res=>{
      this.loadArtists()
    })
  }

  deleteArtist(artistId: string | undefined):void{

   if(!artistId) return
   this.subs.add = this.artistService.deleteArtist(artistId).subscribe(res =>{
     console.log('Deleted Artist',res)
     this.loadArtists()
    })
  }

  ngOnDestroy(): void {
    this.subs.dispose()
    console.log(this.subs)
  }

}
