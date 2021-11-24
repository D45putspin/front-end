import { gql, Apollo, QueryRef } from 'apollo-angular';
export const mintedByMe = gql`
query{mintedByMe{status,nftData{name,data}}}`