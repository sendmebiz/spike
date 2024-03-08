import { createLogger } from '@/logger';
import { setTimeoutAsync } from '@zajno/common/async/timeout';
import { Nullable } from '@zajno/common/types';

const logger = createLogger('[DataRefresher]');

export async function refreshData<T>(name: string, current: Nullable<T>, getter: () => Promise<T>, hashFn?: (v: T) => string) {
    if (!current) {
        return false;
    }

    const getHash = (data: T) => hashFn ? hashFn(data) : JSON.stringify(data);

    const Timeout = 5000;
    const MaxRetries = 10;

    logger.log('Refreshing data for name =', name, ' timeout =', Timeout, 'ms, max retries =', MaxRetries);

    const hash = getHash(current);
    let nextData = await getter();

    let repeatTimes = MaxRetries;

    while (getHash(nextData) === hash && repeatTimes-- > 0) {
        await setTimeoutAsync(Timeout);
        nextData = await getter();
    }

    if (repeatTimes > 0) { // not timed out
        logger.log('Data for name =', name, 'refreshed after', MaxRetries - repeatTimes + 1, 'retries');

        return nextData;
    } else {
        logger.warn('Data refresh timed out, name =', name);
        return false;
    }
}
