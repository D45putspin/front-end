import { gql, Apollo, QueryRef } from 'apollo-angular';
export const listOrderById = gql`
mutation($token:String!){
 listOrderByIdUser(token:$token){
 
  orderStatus
menus{
     _id
    menuDescription
    menuName
    price
numberMenus
    optionsN {
      _id
      description
      amount
      Limit
      option
      price
      typename
    }
    optionsDesc {
      _id
      description
      amount
      Limit
      option
      price
      typename
    }
    imgB64
   }
createdAt
  paymentType
 }
}`