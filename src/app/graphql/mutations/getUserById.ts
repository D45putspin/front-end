import { gql, Apollo, QueryRef } from 'apollo-angular';
export const getUserById = gql`
  mutation ($Token: String!) {
    listUserId(Token: $Token) {
      name
      address
      nif
      walletAddressInfo {
        walletAddress
        walletAddress2
      }
      imgB64
    }
  }
`;
