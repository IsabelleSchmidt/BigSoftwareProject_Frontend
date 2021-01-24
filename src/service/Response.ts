interface JwtToken {
    email: string;
    roles: Array<string>;
    accessToken: string;
}

interface MessageResponse {
    message: string;
    field: string;
}

interface OrderResponse {
    message: string;
    field: string;
    orderid: number;
}