import { gql } from 'apollo-boost'

export const GET_ITEMS = gql`
         query getItems {
  items {
    name
    img
    desc
    price
    id
    sdesc
    count
  }
}
`