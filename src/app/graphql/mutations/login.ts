import { gql, Apollo, QueryRef } from 'apollo-angular';
export const Login = gql`
mutation($password:String!,$email:String!){
  loginUser(password:$password,email:$email) {
   token
  }
}`