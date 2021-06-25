import { gql, Apollo, QueryRef } from 'apollo-angular';
export const getMenubyID = gql`
mutation($id:String!,$token:String){
 listMenuById(_id:$id,token:$token){
    price,
  foodType,
  salePrice,
  menuDescription
  idStoreAssociated
  optionsN {
    _id
    description
    amount
    option
    price
    Limit
  },
  optionsDesc {
    _id
    description
    amount
    option
    price
    Limit
  }
  imgB64
     
     
 }
}`