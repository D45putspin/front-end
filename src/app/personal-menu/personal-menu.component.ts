import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';

@Component({
  selector: 'app-personal-menu',
  templateUrl: './personal-menu.component.html',
  styleUrls: ['./personal-menu.component.css']
})
export class PersonalMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  signOut() {
    console.log("click")
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
