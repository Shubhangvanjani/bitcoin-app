import axios from 'axios';

export default {
  request: async (
    method ,
    uri,
    headers,
    params,
    data,
    paramsSerializer,
  ) => {
    if (method === undefined) {
      return 'Please provide method to make api call';
    } else if (uri === undefined) {
      return 'Please provide url';
    } else {
      return axios({
        method: method,
        url: uri,
        headers: headers,
        params: params,
        data: data,
        paramsSerializer: paramsSerializer,
      });
    }
  },
};
