/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetStoreItemsByLocation } from '../graphql/mutations/getMenus';
import { Apollo } from 'apollo-angular'
@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})

export class FoodsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) { }
  existentMenus: any = [];
  ngOnInit() {
    let foodtype = "healthy";
    let lat = "";
    let lon = ""
    this.route.queryParams
      .subscribe(params => {
        lat = params.lat;
        lon = params.lon;
        this.getITems(lat, lon, foodtype);
      }

      )
  }

  getITems(lat: String, lon: String, foodType: String) {

    this.apollo.mutate({ //cria mutate
      mutation: GetStoreItemsByLocation,//mutation é 
      variables: {
        lat: lat,
        lon: lon,
        foodType: foodType
      }
    }).subscribe(({ data }) => {
      var datAny = data as any;
      datAny.checkStoreLatituteLongitude.forEach((x: any) => {
        this.existentMenus.push(x);
      });
      console.log(this.existentMenus);
    })
  }
  seeFullMenu(menu_id: any) {
    console.log(menu_id);
    this.router.navigate(['/detail'], { queryParams: { menu_id: menu_id } });
  }
}
