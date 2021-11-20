import { Component, OnInit } from '@angular/core';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CheckUser } from '../graphql/mutations/checkuser';
import { CheckBalance } from '../graphql/mutations/checkBalance';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getPositionQueue } from '../graphql/mutations/queue';
import { MintIt } from '../graphql/mutations/mint';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
    private apollo: Apollo,
    private _snackBar: MatSnackBar
  ) {}
  balance: any;
  position: any;
  

  ngOnInit(): void {
    var tokenn = localStorage.getItem('token');
    console.log(tokenn);
    if (tokenn) {
      this.apollo
        .mutate({
          mutation: CheckBalance,
          variables: {
            token: tokenn,
          },
        })
        .subscribe(
          ({ data }) => {
            this.balance = data;
            console.log(this.balance);
          },
          (error) => {
            console.log(error);

            this.router.navigate(['']);
            this._snackBar.open('Authentication ersror', 'Login again', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
      this.apollo
        .mutate({
          mutation: getPositionQueue,
          variables: {
            token: tokenn,
          },
        })
        .subscribe(
          ({ data }) => {
            this.position = data ;
            
            console.log(this.position);
          },
          (error) => {
            console.log(error);

            this.router.navigate(['']);
            this._snackBar.open('Authenticatfion error', 'Login again', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
    } else {
      this.router.navigate(['']);
    }
  }
  redirectH() {
    this.router.navigate(['/local']);
  }
checkData(){
  this.position.getPositionQueue.time-=1
}
mint(){
  var tokenn = localStorage.getItem('token');
  this.apollo
  .mutate({
    mutation: MintIt,
    variables: {
      token: tokenn,
    },
  })
  .subscribe(
    ({ data }) => {
      
    },
    (error) => {
      console.log(error);

      this.router.navigate(['']);
      this._snackBar.open('Authenticatison errorr', 'Login again', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  );
}
  x = setInterval(() => { this.checkData(); }, 1000);
}
