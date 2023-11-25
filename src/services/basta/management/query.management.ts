import { graphql }  from './_generated';

const GetSalesFromAccount = graphql(`
    query GetSalesFromAccount {
        sale(
            accountId: "e212355d-d25f-492d-aaa1-e19b2234a27b",
            id: "b7bcfe09f-6177a7000002000a",
        ) {
            id,
            accountId,
            title,
            description,
            currency,
            status,
        }
    }
`)