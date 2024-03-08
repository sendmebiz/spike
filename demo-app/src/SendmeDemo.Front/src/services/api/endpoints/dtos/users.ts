
export type User = {
    name: string;
    address: string;
    properties: string[];
    balance: number;
    totalSupply?: number;
};

export type UserTransaction = {
    id: string;
    from: string;
    to: string;
    timeStamp: number;
    value: number;
    type: TransactionType;
    isOut?: boolean;
};

export enum TransactionType {
    Transfer = 'Transfer',
    Issue = 'Issue',
    Burn = 'Burn',
}
