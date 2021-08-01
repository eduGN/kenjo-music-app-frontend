export class Album {

  _id?: string;
  artistName?:string
  title: string;
  artistId: string;
  coverUrl: string;
  year: number;
  genre: string;


  constructor(albumJson?: any) {

    if(albumJson) {
      this._id = albumJson._id
      this.title = albumJson.title
      this.artistId = albumJson.artistId
      this.coverUrl = albumJson.coverUrl
      this.year = albumJson.year
      this.genre = albumJson.genre
      this.artistName = albumJson.artistName
    }
  }
}
