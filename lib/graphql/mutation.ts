import {GraphQLClient, gql} from 'graphql-request';
import {OrderInput} from '@/lib/types';

const endpoint = 'http://localhost:8080/graphql'; // Ensure this is the correct endpoint

const client = new GraphQLClient(endpoint);

const CREATE_ORDER = gql`
    mutation createOrder($input: InputOrderRequest!) {
        createOrder(input: $input)
    }
`;

export const createOrder = async (input: OrderInput) => {
    try {
        await client.request(CREATE_ORDER, {input});
        return 0;
    } catch (error) {
        return 1;
    }
};