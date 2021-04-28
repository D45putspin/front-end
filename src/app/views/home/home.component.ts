import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Login } from '../../graphql/mutations/login';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  control: any;

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
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


  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {

    this.apollo.mutate({ //cria mutate
      mutation: Login,//mutation é 
      variables: {
        password: this.profileForm.value.password,
        email: this.profileForm.value.email
      }
    }).subscribe(({ data }) => {
      const token = (data as any)
      localStorage.setItem("token", token.loginUser.token);
      this.router.navigate(['/teste'])
    })
  }

}
