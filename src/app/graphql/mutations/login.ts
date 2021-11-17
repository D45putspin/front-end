import { gql, Apollo, QueryRef } from 'apollo-angular';
export const Login = gql`
mutation($password:String!,$address:String!){
  login(password:$password,walletAddress:$address) {
   token
  }
}`