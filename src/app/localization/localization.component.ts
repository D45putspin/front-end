import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})

export class LocalizationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  allowance: any;
  textActivation = "you need to give localization in order to be able to continue";

  async handlePermission() {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {

      if (result.state == 'granted') {
        this.allowance = "acepted";
      }
      else if (result.state == 'prompt') {

        navigator.geolocation.getCurrentPosition((obj) => {
          let lat = obj.coords.latitude;
          let lon = obj.coords.longitude;
          this.router.navigate(['/food'], { queryParams: { lat: lat, lon: lon } });
        });
        this.allowance = "prompt";
      } else if (result.state == 'denied') {
        this.allowance = "denied";
      }
      else {
        this.allowance = "error";
      }
    });
  }


}





