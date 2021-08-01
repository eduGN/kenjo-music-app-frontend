export class Artist {

  _id?: string;
  name: string;
  photoUrl: string
  birthdate: Date;
  deathDate: Date;

  constructor(artistJson?: any) {

    if(artistJson) {
      this._id = artistJson._id
      this.name = artistJson.name
      this.photoUrl = artistJson.photoUrl
      this.birthdate = artistJson.birthdate
      this.deathDate = artistJson.deathDate
    }
  }
}
