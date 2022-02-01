import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.page.html',
  styleUrls: ['./map-page.page.scss'],
})
export class MapPagePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  infoIkusi(){
    this.route.navigate(['/info-page'])
  }
}
