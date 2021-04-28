import { Component, OnInit } from '@angular/core';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CheckUser } from '../graphql/mutations/checkuser';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(private router: Router, private apollo: Apollo) { }

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
      })
    }
    else {
      this.router.navigate([''])
    }
  }

}

