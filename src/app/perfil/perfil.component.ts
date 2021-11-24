import { Component, OnInit } from '@angular/core';
import { MatInputCounterModule } from '@angular-material-extensions/input-counter';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { getUserById } from '../graphql/mutations/getUserById'
import { MatListOption } from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar';
import { mintedByMe } from '../graphql/mutations/mintedByUser';
import { JsonpClientBackend } from '@angular/common/http';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }
  user: any;
  mintedByME: any;
  ngOnInit(): void {
    let token = localStorage.getItem("token")

    this.apollo.mutate({ //cria mutate
      mutation: mintedByMe,//mutation é
      
    }).subscribe(async ({ data }) => {
      let datAny = data as any
      //fazer isto direito um loop para todos
      const minted=datAny.mintedByMe[0].nftData.data
      const newMinted=minted.replace("ipfs://ipfs/","https://ipfs.io/ipfs/")
      const x=  await fetch(newMinted)
    console.log(x)
    

    })
  }
  getback() {
    history.back()
  }

}

