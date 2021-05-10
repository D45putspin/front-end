import { gql, Apollo, QueryRef } from 'apollo-angular';
export const getMenubyID = gql`
mutation($id:String!){
 listMenuById(_id:$id){
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
     
     
 }
}`