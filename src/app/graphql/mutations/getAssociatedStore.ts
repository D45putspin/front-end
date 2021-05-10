import { gql, Apollo, QueryRef } from 'apollo-angular';
export const getStoreById = gql`
mutation($id:String!){
listStoreById(_id:$id){
    paymentType{
        paymentType
    }
}
}`