import { gql, Apollo, QueryRef } from 'apollo-angular';
export const CheckBalance = gql`
query{
 getBalance{availableHtr,availableHbc}
}`