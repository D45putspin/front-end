/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetStoreItemsByLocation } from '../graphql/mutations/getMenus';
import { Apollo } from 'apollo-angular'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})

export class FoodsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }
  existentMenus: any = [];

  ngOnInit() {

    let foodtype = "";

    let lat = "";
    let lon = ""
    let token: any = localStorage.getItem("token")
    this.route.queryParams
      .subscribe(params => {
        lat = params.lat;
        lon = params.lon;
        foodtype = params.type;
        this.getITems(lat, lon, foodtype, token);
      }

      )
  }

  getITems(lat: String, lon: String, foodType: String, token: String) {

    this.apollo.mutate({ //cria mutate
      mutation: GetStoreItemsByLocation,//mutation é 
      variables: {
        lat: lat,
        lon: lon,
        foodType: foodType,
        token: token
      }
    }).subscribe(({ data }) => {
      var datAny = data as any;
      console.log(datAny)
      if (datAny.checkStoreLatituteLongitude.length == 0) {
        this.router.navigate(['main']);
        this._snackBar.open('there are no stores available close to you', 'try again later', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
      datAny.checkStoreLatituteLongitude.forEach((data: any) => {

        let imgSrc = data.imgB64;
        let res = { ...data, imgSrc }
        res.imgSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.imgSrc}`);
        console.log(res)
        this.existentMenus.push(res);
      });

    }, error => {

      if (error.message == "e.token.auth") {
        this.router.navigate(['']);
        this._snackBar.open('Authentication error', 'Login again', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
    })
  }
  seeFullMenu(menu_id: any) {
    console.log(menu_id);
    this.router.navigate(['/detail'], { queryParams: { menu_id: menu_id } });
  }
}
