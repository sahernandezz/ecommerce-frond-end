import { GraphQLClient, gql } from 'graphql-request';
import { OrderInput } from '@/lib/types';

const endpoint = 'http://localhost:8080/graphql';

let authToken: string | null = null;
export const setAuthToken = (token: string | null) => {
    authToken = token;
};

const getClient = () => new GraphQLClient(endpoint, {
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
});

const CREATE_ORDER = gql`
    mutation createOrder($input: InputOrderRequest!) {
        createOrder(input: $input)
    }
`;

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
            token
        }
    }
`;

export const createOrder = async (input: OrderInput) => {
    try {
        await getClient().request(CREATE_ORDER, { input });
        return 0;
    } catch (error) {
        return 1;
    }
};

export const loginUser = async (email: string, password: string) => {
    const data: any = await getClient().request(LOGIN, { email, password });
    return data.login.token as string;
};
