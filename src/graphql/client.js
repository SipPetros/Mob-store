import ApolloClient  from "apollo-boost";

const client = new ApolloClient({
    uri: 'https://moob-store.herokuapp.com/v1/graphql'
})

export default client;