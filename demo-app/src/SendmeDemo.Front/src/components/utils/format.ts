import { Nullable } from '@zajno/common/types/misc';

const CurrencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatCurrency(value: number): string {
    return CurrencyFormatter.format(value);
}

export function shortenAddress(address: Nullable<string>): Nullable<string> {
    if (!address || address.length < 30) {
        return address;
    }

    return address.slice(0, 12) + '...' + address.slice(-10);
}

export function capitalize(value: string): string {
    return value[0].toUpperCase() + value.slice(1);
}
