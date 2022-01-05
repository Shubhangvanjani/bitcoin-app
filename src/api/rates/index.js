import api from '../index'
import config from '../../config/apiUrls'
export default {
    get: () => {
        return api.request('get',config.default.ratesUrl, null, null, null,null)
    },
    getRatesById: (id) => {
        return api.request('get',config.default.ratesUrl + id, null, null, null,null)
    },
}