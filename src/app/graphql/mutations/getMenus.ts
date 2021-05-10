import { gql, Apollo, QueryRef } from 'apollo-angular';
export const GetStoreItemsByLocation = gql`
mutation($lat:String!,$lon:String!,$foodType:String!){
  checkStoreLatituteLongitude(lat:$lat,lon:$lon,foodType:$foodType){
        _id
menuDescription
  price
  salePrice
  foodType
  }
}`