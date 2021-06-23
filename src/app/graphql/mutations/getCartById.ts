import { gql, Apollo, QueryRef } from 'apollo-angular';
export const listCartById = gql`
mutation($id:String!){
 listCartsByIdCart(id:$id){
   id
   menus{
     menuName
   }
 
 }
}`