import { gql, Apollo, QueryRef } from 'apollo-angular';
export const getStoreById = gql`
mutation($id:String!,$token:String!){
listStoreById(_id:$id token:$token){
    paymentType{
        paymentType
    }
}
}`