import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import {Me} from "../graphql/mutations/Me"
@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css']
})

export class LocalizationComponent implements OnInit {
  public myAngularxQrCode: any ;
  constructor(private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar,private apollo: Apollo) { }
  type = ""
  ngOnInit(): void {
    var tokenn = localStorage.getItem("token");
    console.log(tokenn)
    if (tokenn) {
    this.apollo.mutate({
      mutation: Me,
      variables: {
        token: tokenn
      }
    }).subscribe(({ data }) => {
     const  dataa=data as any
     this.myAngularxQrCode = 'hathor:'+dataa.me.bullzGeneratedAddress;
    }, error => {

     
        this.router.navigate(['']);
        this._snackBar.open('Authentication error', 'Login again', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      
    })
  }

 

}

redirectH() {
  this.router.navigate(['/main']);
}
informCopy(){
  this._snackBar.open('Copied to clipboard',"thanks!",{
    horizontalPosition: "center",
    verticalPosition: "top",
  });
}


}