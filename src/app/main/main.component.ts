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
import { howManyMinted } from '../graphql/mutations/howManyMinted';
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
  tenSecIntreval:boolean = false;
  balance: any;
  position: any;
  canIMint:any
  howwManyMinted:any;
  ngOnInit(): void {
   
    var tokenn = localStorage.getItem('token');
    console.log(tokenn);
    if (tokenn) {
      this.howManyMinted();
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
            this.position = data;

            console.log(this.position);
          },
          (error) => {
            console.log(error);

            
            this._snackBar.open('Unable to get position in queue', 'try again later', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        );
    } else {
      this.router.navigate(['']);
    }
    
  }
  canMint(){
   
    const htr=this.balance.getBalance.availableHtr
    const hbc=this.balance.getBalance.availableHbc
    
    if ( hbc <1){this.canIMint=false} else {this.canIMint=true}

  }
  redirectH() {
    this.router.navigate(['/deposit']);
  }
  howManyMinted(){
    var tokenn = localStorage.getItem('token');
    this.apollo
      .mutate({
        mutation: howManyMinted,
        variables: {
          token: tokenn,
        },
      })
      .subscribe(
        ({ data  }) => { let x=data as any;
          this.howwManyMinted= x.howManyMinted},
        (error) => {
          console.log(error);

          this._snackBar.open(error, 'Server error, wait while its fixed', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    
  }
  
  checkData() {
    this.canMint();
    this.position.getPositionQueue.time -= 1;
  }
  mint() {
    var tokenn = localStorage.getItem('token');
    this.apollo
      .mutate({
        mutation: MintIt,
        variables: {
          token: tokenn,
        },
      })
      .subscribe(
        ({ data }) => {},
        (error) => {
          console.log(error);

          this._snackBar.open(error, 'try again', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
      window.location.reload();
  }
  redirectProfile(){
    this.router.navigate(['profile']);
  }
  x = setInterval(() => {
    this.checkData();
  }, 1000);
  
 y = setTimeout(() => {
  this.setTenSecIntervalTru();
}, 10000);
 
 setTenSecIntervalTru(){

   this.tenSecIntreval=true
 }
 deleteToken(){
   this.router.navigate(['']);
   localStorage.removeItem("token")
 } 
}
