import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Login } from '../../graphql/mutations/login';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //prod url = 'https://apiv1.hathorbullzclub.io/auth/login'
  url = 'http://localhost:3001/auth/login'
  urlRegister='http://localhost:3001/auth/signup'
  control: any;

  profileForm = new FormGroup({
    walletAddress: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
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
 status:any;
  ngOnInit(): void {
    this.status="login";
  }
changeStatus(){
  if(this.status==="login")this.status="register"
  else this.status="login"
}
registUser(){
  this.httpClient.post<any>(this.urlRegister, {name:this.profileForm.value.name,password:this.profileForm.value.password,walletAddress: this.profileForm.value.walletAddress}).subscribe(data =>{
   this.loginUser(this.profileForm.value.password,this.profileForm.value.walletAddress)
  
  }, error => {
    console.log(error.error.message)
  
  let errorToUse
  
   
  errorToUse=error.error.message
     
      console.log(errorToUse)
      const errorToDisplay=this.typeOfError(errorToUse)
      this._snackBar.open(errorToDisplay, 'Try again', {
        horizontalPosition: "center",
        verticalPosition: "top",
      } )
  ;

  
  
  })}
typeOfError(error){
  console.log(error)
  switch(error){
    
    case "AUTH.USER_ALREADY_EXISTS":
      return "theres already a user with that address"
      break;
      case "Invalid_Address":
        return "theres an error with the Address format"
        break;
      default:
       return "Unknown error contact admins"
   

  }
 
}
  loginUser(password?:string, walletAddress?:string) {
    if(!password && !walletAddress){
      password=this.profileForm.value.password;
      walletAddress= this.profileForm.value.walletAddress
    }
     this.httpClient.post<any>(this.url, {password,walletAddress}).subscribe(data =>{
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
