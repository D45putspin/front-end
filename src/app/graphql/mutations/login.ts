import { gql, Apollo, QueryRef } from 'apollo-angular';
export const Login = gql`
  mutation ($password: String!, $walletAddress: String!) {
    login(password: $password, walletAddress: $address) {
      token
    }
  }
`;
