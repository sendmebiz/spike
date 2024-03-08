import { Nullable } from '@zajno/common/types/misc';
import dateFormat from 'dateformat';
import { getDate } from '@zajno/common/dates/parse';

const CurrencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
const CurrencyFormatterBig = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function formatCurrency(value: number, forceFull?: boolean): string {
    const billions = (value / 1_000_000_000);
    return (value >= 1_000_000 && !forceFull)
        ? (billions >= 1 ? `$${billions.toFixed(2)}B` : CurrencyFormatterBig.format(value))
        : CurrencyFormatter.format(value);
}

export function shortenAddress(address: Nullable<string>): Nullable<string> {
    if (!address || address.length < 30) {
        return address;
    }

    return address.slice(0, 12) + '...' + address.slice(-10);
}

export function shortenAddressHard(address: Nullable<string>): Nullable<string> {
    if (!address || address.length < 10) {
        return address;
    }

    return address.slice(0, 5) + '...' + address.slice(-3);
}

export function capitalize(value: string): string {
    return value[0].toUpperCase() + value.slice(1);
}

export function formatDate(date: Date | string | number, format: formatDate.Formats = formatDate.Formats.DayMonthYear) {
    return dateFormat(getDate(date), format);
}

export namespace formatDate {
    export enum Formats {
        DayMonth = 'dd.mm',
        DayMonthYear = 'mm/dd/yyyy',
		DayShortMonth = 'dd mmm',
		DayShortMonthTime = 'dd mmm HH:MM',
        TimeDayMonthYear = 'HH:MM mm/dd/yy',
        TimeDayMonth = 'HH:MM dd.mm',
        TimeWeekDayMonth = 'HH:MM ddd dd.mm',
        Time = 'HH:MM',
        Month = 'mmmm',
        MonthYear = 'mmmm yyyy',
        DayFull = 'dddd, dd',
    }
}
