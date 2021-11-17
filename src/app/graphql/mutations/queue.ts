import { gql, Apollo, QueryRef } from 'apollo-angular';
export const getPositionQueue= gql`
query{getPositionQueue{position,time}}`