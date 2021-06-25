import { Component, OnInit } from '@angular/core';
import { MatInputCounterModule } from '@angular-material-extensions/input-counter';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { getUserById } from '../graphql/mutations/getUserById'
import { MatListOption } from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }
  user: any;
  ngOnInit(): void {
    let token = localStorage.getItem("token")

    this.apollo.mutate({ //cria mutate
      mutation: getUserById,//mutation é
      variables: {
        Token: token
      }
    }).subscribe(({ data }) => {
      let datAny = data as any

      this.user = datAny.listUserId
      this.user.imgB64 = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.user.imgB64}`);;

    })
  }
  getback() {
    history.back()
  }

}

