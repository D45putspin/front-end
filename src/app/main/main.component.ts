import { Component, OnInit } from '@angular/core';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CheckUser } from '../graphql/mutations/checkuser';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(private router: Router, private apollo: Apollo, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    var tokenn = localStorage.getItem("token");
    if (tokenn) {
      this.apollo.mutate({ //cria mutate
        mutation: CheckUser,//mutation é 
        variables: {
          token: tokenn
        }
      }).subscribe(({ data }) => {
        const tokeninfo = (data as any)
        if (tokeninfo.CheckUser != null) {
          this.router.navigate([''])
        };
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
    else {
      this.router.navigate([''])
    }
  }
  redirectH() {
    this.router.navigate(['/local'], { queryParams: { type: 'healthy' } });
  }
  redirectU() {
    this.router.navigate(['/local'], { queryParams: { type: 'unhealthy' } });
  }
}

