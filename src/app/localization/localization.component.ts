import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})

export class LocalizationComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }
  type = ""
  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.type = params.type

      }

      )
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      console.log(result.state);
      if (result.state == 'granted') {
        navigator.geolocation.getCurrentPosition((obj) => {
          let lat = obj.coords.latitude;
          let lon = obj.coords.longitude;
          this.router.navigate(['/food'], { queryParams: { lat: lat, lon: lon, type: this.type } });
        });
      }
    });
  }
  allowance: any;
  textActivation = "you need to give localization in order to be able to continue";

  async handlePermission() {

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {

      if (result.state == 'granted') {
        this.allowance = "acepted";
        console.log("acepted already")
        navigator.geolocation.getCurrentPosition((obj) => {
          let lat = obj.coords.latitude;
          let lon = obj.coords.longitude;
          this.router.navigate(['/food'], { queryParams: { lat: lat, lon: lon, type: this.type } });
        });
      }
      else if (result.state == 'prompt') {

        navigator.geolocation.getCurrentPosition((obj) => {
          let lat = obj.coords.latitude;
          let lon = obj.coords.longitude;
          this.router.navigate(['/food'], { queryParams: { lat: lat, lon: lon, type: this.type } });
        });
        this.allowance = "prompt";
      } else if (result.state == 'denied') {
        this.allowance = "denied";
        this._snackBar.open('you have to give location acess to continue', 'try again', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
      else {
        this.allowance = "error";
        this._snackBar.open('Unknown error', 'try again later', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
    });
  }


}





