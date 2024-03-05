
export const Errors = {
    SESSION_EXPIRED: 'Your session has been expired, please log in again.',
    MISMATCH_PERMISSION: 'You don\'t have matching permissions to perform this operation.',

    PASSWORD_TOO_SIMPLE: 'Password has to be at least 8 characters long and contain at least one uppercase & lowercase letter, one digit and one special symbol',
    LOGIN_NOT_FOUND: 'Invalid login credentials.',
} as const;
