import { Component, OnInit } from '@angular/core';
import { MatInputCounterModule } from '@angular-material-extensions/input-counter';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';

import { getUserById } from '../graphql/mutations/getUserById'
import { MatListOption } from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo, private _snackBar: MatSnackBar) { }
  user: any;
  ngOnInit(): void {
    let token = localStorage.getItem("token")
    console.log(token)
    this.apollo.mutate({ //cria mutate
      mutation: getUserById,//mutation é
      variables: {
        Token: token
      }
    }).subscribe(({ data }) => {
      let datAny = data as any
      console.log(datAny)
      this.user = datAny.listUserId
      console.log(this.user)
    })
  }
  getback() {
    history.back()
  }

}

