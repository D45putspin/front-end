import { gql, Apollo, QueryRef } from 'apollo-angular';
export const GetStoreItemsByLocation = gql`
mutation($lat:String!,$lon:String!,$foodType:String!,$token:String!){
  checkStoreLatituteLongitude(lat:$lat,lon:$lon,foodType:$foodType,token:$token){
        _id
menuDescription
  price
  salePrice
  foodType
  imgB64
  }
}`