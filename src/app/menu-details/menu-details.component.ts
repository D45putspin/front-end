import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { gql, Apollo, QueryRef } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { getMenubyID } from '../graphql/mutations/getMenuById';
import { getStoreById } from '../graphql/mutations/getAssociatedStore'
import { MatListOption } from '@angular/material/list'
@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})

export class MenuDetailsComponent implements OnInit {
  OptionsSelected: any = [];
  optionsPaymentSelected: string;
  storeAssociated: string;
  foodType: any;
  foodDesc: any;
  paymentTypes: any[] = [

  ];
  NList: any[] = [

  ];
  DList: any[] = [

  ];
  PaymentForm: FormControl;
  NForm: FormControl;
  DForm: FormControl;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.NForm = new FormControl([this.NList[0]], Validators.required);
    this.DForm = new FormControl([this.DList[0]]);
    this.PaymentForm = new FormControl([this.paymentTypes[0]]);
  }
  submit() {
    this.OptionsSelected = [];
    //this.OptionsSelected.push(this.NForm.value.map((o: any) => { o }))
    for (let i = 0; i < this.NForm.value.length; i++) {
      this.OptionsSelected.push(this.NForm.value[i]);
    }
    for (let i = 0; i < this.DForm.value.length; i++) {
      this.OptionsSelected.push(this.DForm.value[i]);
    }
    for (let i = 0; i < this.PaymentForm.value.length; i++) {
      this.optionsPaymentSelected = this.PaymentForm.value[i];
    }
    console.log(this.OptionsSelected);
    console.log(this.optionsPaymentSelected);

  }
  ngOnInit(): void {
    let id: any
    this.route.queryParams
      .subscribe(params => {
        id = params.menu_id;
      });

    this.apollo.mutate({ //cria mutate
      mutation: getMenubyID,//mutation é
      variables: {
        id: id
      }
    }).subscribe(({ data }) => {
      let x = data as any;
      for (let i = 0; i < x.listMenuById.optionsN.length; i++) {
        this.NList.push(x.listMenuById.optionsN[i])
      }
      for (let i = 0; i < x.listMenuById.optionsDesc.length; i++) {
        this.DList.push(x.listMenuById.optionsDesc[i])
      }
      this.foodType = x.listMenuById.foodType;
      this.foodDesc = x.listMenuById.menuDescription;
      this.storeAssociated = x.listMenuById.idStoreAssociated;
      this.test(this.storeAssociated);

    })


  }
  test(id: string) {
    this.apollo.mutate({ //cria mutate
      mutation: getStoreById,//mutation é
      variables: {
        id
      }
    }).subscribe(({ data }) => {
      let x = data as any
      for (let i = 0; i < x.listStoreById.paymentType.length; i++) {
        this.paymentTypes.push(x.listStoreById.paymentType[i])
      }

    })
  }
}



/*export class MenuDetailsComponent implements OnInit {
  MenuForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private apollo: Apollo) {

    this.MenuForm =

      this.fb.group({
        optionsDesc: this.fb.array([]),
        optionsN: this.fb.array([]),
      });

  }
  get menus(): FormArray {
    return this.MenuForm.get("optionsN") as FormArray
  }
  newMenu(val: any): FormGroup {
    return this.fb.group({
      optionN: [val.optionsN],
      optionsDesc: [val.optionsDesc]
    })
  }


  ngOnInit(): void {
    let id: any
    this.route.queryParams
      .subscribe(params => {
        id = params.menu_id;
      });

    this.apollo.mutate({ //cria mutate
      mutation: getMenubyID,//mutation é
      variables: {
        id: id
      }
    }).subscribe(({ data }) => {
      let x = data as any;

      this.menus.push(this.newMenu(x.listMenuById))
      console.log("aqui");
      console.log(this.MenuForm)
    })
  }

}

menu: any = {}


}*/