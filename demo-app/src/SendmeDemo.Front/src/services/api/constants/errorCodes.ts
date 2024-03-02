
// TODO Update according to the backend error codes
export enum ErrorCodes {
    UNKNOWN = 0,

    TOKEN_EXPIRED = 1,
    USER_NOT_VERIFIED = 2,
    NOT_AUTHENTICATED = 3,

    NOT_AUTHORIZED_ROLE = 10,
    NOT_AUTHORIZED_PERMISSION = 11,
}
