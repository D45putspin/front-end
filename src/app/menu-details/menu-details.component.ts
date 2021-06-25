import { Component, OnInit } from '@angular/core';
import { MatInputCounterModule } from '@angular-material-extensions/input-counter';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { getMenubyID } from '../graphql/mutations/getMenuById';
import { addItemToCart } from '../graphql/mutations/addToCart';
import { getStoreById } from '../graphql/mutations/getAssociatedStore'
import { MatListOption } from '@angular/material/list'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})

export class MenuDetailsComponent implements OnInit {
  OptionsNSelected: any = [];
  OptionsDSelected: any = [];
  optionsPaymentSelected: string;
  storeAssociated: string;
  NumberMenusVar: any;
  foodType: any;
  foodDesc: any;
  price: any;
  image: any;//sanitized
  uImage: any;//unsanitized

  menuDescription: any;
  objectToSend: any;
  paymentTypes: any[] = [

  ];
  payment: any;
  NList: any[] = [

  ];
  DList: any[] = [

  ];
  PaymentForm: FormControl;
  NForm: FormControl;
  DForm: FormControl;
  NumberMenus: FormControl;

  constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo, private _snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    this.NForm = new FormControl([this.NList[0]], Validators.required);
    this.DForm = new FormControl([this.DList[0]]);
    this.PaymentForm = new FormControl([this.paymentTypes[0]]);
    this.NumberMenus = new FormControl('')
  }
  submit() {
    this.OptionsNSelected = [];
    this.OptionsDSelected = [];
    //this.OptionsSelected.push(this.NForm.value.map((o: any) => { o }))
    for (let i = 0; i < this.NForm.value.length; i++) {
      if (this.NForm.value[i] != undefined) {
        if (this.NForm.value[i].__typename)
          delete this.NForm.value[i].__typename;
      }
      this.OptionsNSelected.push(this.NForm.value[i]);
    }
    for (let i = 0; i < this.DForm.value.length; i++) {
      if (this.DForm.value[i] != undefined) {
        if (this.DForm.value[i].__typename)
          delete this.DForm.value[i].__typename;
      }
      this.OptionsDSelected.push(this.DForm.value[i]);
    }
    for (let i = 0; i < this.PaymentForm.value.length; i++) {
      if (this.PaymentForm.value[0] != undefined)
        this.optionsPaymentSelected = this.PaymentForm.value[0].paymentType;
      else {
        this._snackBar.open('choose a payment type', 'Okay', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
    }
    let tokeDec = decode(localStorage.getItem("token"))

    let id = tokeDec.id;
    if (this.NumberMenus.value > 0) {
      this.NumberMenusVar = this.NumberMenus.value;
      this.apollo.mutate({ //cria mutate
        mutation: addItemToCart,//mutation é
        variables: {
          idUserAssociated: id,//buscar id do user ainda!!!
          menu: {
            menuName: this.foodType,
            numberMenus: this.NumberMenusVar,
            optionsN: this.OptionsNSelected,
            optionsDesc: this.OptionsDSelected,
            price: this.price,
            menuDescription: this.menuDescription,
            imgB64: this.uImage
          },
          paymentType: this.optionsPaymentSelected,
          numberMenus: this.NumberMenusVar
        }
      }).subscribe(({ data }) => {
        this.router.navigate(['/sucess'])
      }, error => {
        this._snackBar.open('payment Type and Number of menus must be filled', '', {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 3000
        });

      })
    }
    else {
      this._snackBar.open('Number of menus have to be greater than 0', 'Okay', {
        horizontalPosition: "center",
        verticalPosition: "top",
      });

    }





  }


  ngOnInit(): void {
    let id: any
    this.route.queryParams
      .subscribe(params => {
        id = params.menu_id

      });

    this.apollo.mutate({ //cria mutate
      mutation: getMenubyID,//mutation é
      variables: {
        id: id,
        token: localStorage.getItem("token")
      }
    }).subscribe(({ data }) => {
      let x = data as any;

      for (let i = 0; i < x.listMenuById.optionsN.length; i++) {
        this.NList.push(x.listMenuById.optionsN[i])
      }
      for (let i = 0; i < x.listMenuById.optionsDesc.length; i++) {
        this.DList.push(x.listMenuById.optionsDesc[i])
      }
      this.menuDescription = x.listMenuById.menuDescription
      this.foodType = x.listMenuById.foodType;
      this.foodDesc = x.listMenuById.menuDescription;
      this.price = x.listMenuById.salePrice
      this.storeAssociated = x.listMenuById.idStoreAssociated;
      this.image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${x.listMenuById.imgB64}`);
      this.uImage = x.listMenuById.imgB64;
      this.getStore(this.storeAssociated);

    })

  }
  getStore(id: string) {
    let token = localStorage.getItem("token")
    this.apollo.mutate({ //cria mutate
      mutation: getStoreById,//mutation é
      variables: {
        id,
        token
      }
    }).subscribe(({ data }) => {
      let x = data as any
      for (let i = 0; i < x.listStoreById.paymentType.length; i++) {
        this.paymentTypes.push(x.listStoreById.paymentType[i]);
      }

    }, error => {

      if (error.message == "e.token.auth") {
        this.router.navigate(['']);
        this._snackBar.open('Authentication error', 'Login again', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
      else {
        this.router.navigate(['']);
        localStorage.removeItem("token")
        this._snackBar.open('unknown error', 'Login again', {
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }
    })
  }
}
function decode(input: any) {
  var base64Url = input.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}