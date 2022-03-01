import { gql, Apollo, QueryRef } from 'apollo-angular';
export const stakeNft = gql`
  mutation ($nftId: String!, $poolId: String!) {
    insertNftToStakePool(nftId: $nftId, poolId: $poolId)
  }
`;
