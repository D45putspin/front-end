import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Login } from '../../graphql/mutations/login';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url = 'http://localhost:3001/auth/login'
  control: any;

  profileForm = new FormGroup({
    walletAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get password() { return this.profileForm.get('password'); }
  get confirmPassword() { return this.profileForm.get('confirmPassword'); }


  get patternInvalidation() {
    return this.control?.dirty && this.control?.errors?.pattern
  }

  invalidationSwitch(value: string): boolean {
    this.control = this.profileForm.get(value);
    return this.control?.invalid && this.control?.dirty || this.control?.errors?.pattern
  }

  get switchInvalidOne() { return this.patternInvalidation == undefined }
  get switchInvalidTwo() { return this.patternInvalidation != undefined }


  constructor(private apollo: Apollo, private router: Router, private _snackBar: MatSnackBar,private httpClient: HttpClient) { }
 
  ngOnInit(): void {
  }

  loginUser() {
    
     this.httpClient.post<any>(this.url, {password:this.profileForm.value.password,walletAddress: this.profileForm.value.walletAddress}).subscribe(data =>{
      const token = (data as any)
      console.log(token)
      localStorage.setItem("token", token.access_token);
      this.router.navigate(['/main'])
    },error => {
      console.log(error.message)
      this._snackBar.open('Wrong Info', 'Try again', {
        horizontalPosition: "center",
        verticalPosition: "top",
      } )
  
     /*.subscribe(({ data }) => {
      const token = (data as any)
      localStorage.setItem("token", token.loginUser.token);
      this.router.navigate(['/main'])
    }, error => {
      console.log(error.message)
      this._snackBar.open('Wrong Info', 'Try again', {
        horizontalPosition: "center",
        verticalPosition: "top",
      });

    })*/
  })}

}
