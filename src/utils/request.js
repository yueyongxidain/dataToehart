import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
const requestHeader = {
    'Accept': '',
    'Content-Type': 'application/json;charset=utf-8',
    // 'mode': "cors",
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
 function POST(url, params) {
    return request(url, {
        method: "POST",
        headers: requestHeader,
        body: JSON.stringify(params),
        credentials: 'include',
    })
}
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      console.log('data',data)
      return data
    })
    .catch(err => {
      console.log('err',err.name)
    });
}
export default POST
