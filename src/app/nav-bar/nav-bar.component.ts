import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  items: any[] = [{
    path: '',
    name: 'Home'
  },
  {
    path: 'albums',
    name: 'Albums'
  },
  {
    path: 'artists',
    name: 'Artists'
  },
  {
    path: '',
    name: 'Incomming Features'
  }]


  ngOnInit(): void {
  }

}
