import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import fetch from 'cross-fetch';

const credentials: { accountId: string; secretKey: string } = {
    accountId: process.env.BASTA_API_KEY,
    secretKey: process.env.BASTA_ACCOUNT_ID
}

const managementHttpLink = createHttpLink({
    uri: "https://management.api.basta.ai/",
    fetch,
});

const client = new ApolloClient({
    link: managementHttpLink,
    cache: new InMemoryCache(),
});

const CREATE_AUCTION = gql`

`;

const userId = credentials.accountId;


client
    .query({
        query: CREATE_AUCTION,
        variables: { userId }
    })
    .then(res => {
        console.log("Sucessfully create an auction sale", res.data);
    })
    .catch( err => {
        console.error("Errror creating auction sale", err);
    });

module.exports = client;