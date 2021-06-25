import { Component, OnInit } from '@angular/core';
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { listOrderById } from '../graphql/mutations/GetOrdersById'
import { listCartById } from '../graphql/mutations/getCartById'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-see-orders',
  templateUrl: './see-orders.component.html',
  styleUrls: ['./see-orders.component.css']
})
export class SeeOrdersComponent implements OnInit {

  constructor(private apollo: Apollo, private router: Router, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer) { }
  menus: any[] = [];

  optionsN: any[] = [];
  optionsDesc: any[] = [];
  objectAll: any[] = [];
  ngOnInit(): void {

    let token: any = localStorage.getItem('token');

    this.apollo.mutate({ //cria mutate
      mutation: listOrderById,//mutation é
      variables: {
        token: token
      }
    }).subscribe(async ({ data }) => {
      let formated = data as any;

      console.log(data)
      let menu = formated.listOrderByIdUser
      let priceDesc = 0;
      let priceN = 0;




      for (let i = 0; i < menu.length; i++) {




        for (let z = 0; z < menu[i].menus.optionsDesc.length; z++) {

          if (menu[i].menus.optionsDesc[z] != null) {
            if (menu[i].menus.optionsDesc[z].price != null)

              priceDesc += menu[i].menus.optionsDesc[z].price
          }
        }
        for (let z = 0; z < menu[i].menus.optionsN.length; z++) {
          if (menu[i].menus.optionsN[z] != null) {
            if (menu[i].menus.optionsN[z].price != null)

              priceN += menu[i].menus.optionsN[z].price
          }
        }
        let priceOpt = priceDesc + priceN

        let price = menu[i].menus.price + priceOpt;
        let thisobj = {
          idCart: menu[i].idCart,
          paymentType: menu[i].paymentType,
          orderStatus: menu[i].orderStatus,
          createdAt: menu[i].createdAt,
          menus: menu[i].menus,
          img: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${menu[i].menus.imgB64}`),
          totalPrice: price
        }

        let sendingobj = { ...thisobj };

        this.menus.push(sendingobj);

        priceDesc = 0
        priceN = 0

      }





    }, error => {
      console.log(error.message)
      this._snackBar.open('Auth Error', 'login to continue', {
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      this.router.navigate([''])
    })
  }

  getback() {
    history.back()
  }

}


