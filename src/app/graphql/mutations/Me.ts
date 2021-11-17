import { gql, Apollo, QueryRef } from 'apollo-angular';
export const Me = gql`
query{me{bullzGeneratedAddress,name,wastedHBC,wastedHTR}}`