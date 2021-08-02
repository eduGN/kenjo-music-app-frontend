import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: ArtistComponent, pathMatch: "full"},
  { path: "albums", component: AlbumComponent },
  { path: "artists", component: ArtistComponent },
  {path: "artist/:id", component: AlbumDetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
