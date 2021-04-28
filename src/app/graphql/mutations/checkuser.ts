import { gql, Apollo, QueryRef } from 'apollo-angular';
export const CheckUser = gql`
mutation($token:String!){
 CheckUser(token:$token) 
}`