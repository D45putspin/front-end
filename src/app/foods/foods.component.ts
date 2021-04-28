/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetStoreItemsByLocation } from '../graphql/mutations/getMenus';
@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})

export class FoodsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let foodtype = "";
    let lat = "";
    let long = ""
    this.route.queryParams
      .subscribe(params => {
        lat = params.lat;
        long = params.long;
        console.log(lat + long)
      }
      );
  }

}
