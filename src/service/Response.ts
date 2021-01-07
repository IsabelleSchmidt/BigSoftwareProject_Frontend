interface JwtToken{
    email: string;
    roles: Array<string>;
    accessToken: string;
}

interface MessageResponse{
    message: string;
    field: string;
}