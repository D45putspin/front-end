import { gql, Apollo, QueryRef } from 'apollo-angular';

export const addItemToCart = gql`
mutation($menu:[menuObjInput],
         $idUserAssociated: String!
         $paymentType:String!,
         $numberMenus:Int
      )
      {
addItemToCart(idUserAssociated:$idUserAssociated,
  menus:$menu,paymentType:$paymentType,numberMenus:$numberMenus){
    id,
    lastUpdated

}
}`
