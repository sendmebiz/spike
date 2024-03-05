import axios from 'axios';
import { setDefaults, buildApiCaller } from '@zajno/common/api';
import { ApiEndpoint } from './endpoints/_base';

axios.defaults.baseURL = '/api'; // 'http://localhost:5276/'; // TODO ENV
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.timeout = 30_000;

setDefaults({
    templateArgPrefix: ':',
    basePrefix: '/',
});

export * as Apis from './endpoints/_all';

export const callApi = buildApiCaller({
    bodyValidation: (api, input) => {
        if (api instanceof ApiEndpoint && api.validationBody) {
            return api.validationBody.validate(input);
        }
        return Promise.resolve();
    },
    request: config => {
        return axios.request(config);
    },
});

export {
    cleanupProcessors,
    registerPreProcessor,
    registerPostProcessor,
} from '@zajno/common/api/register';
