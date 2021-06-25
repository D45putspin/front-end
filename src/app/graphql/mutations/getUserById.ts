import { gql, Apollo, QueryRef } from 'apollo-angular';
export const getUserById = gql`
mutation($Token:String!){
 listUserId(Token:$Token){
 name
 email
 nif
 adressInfo{
     adress,
     adress2
 }
 imgB64
 }
}`