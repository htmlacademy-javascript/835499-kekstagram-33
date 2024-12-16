import { BASE_URL, ROUTE, METHOD, ERROR_TEXT } from './init.js';

const load = (route, errorText, method = METHOD.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(ROUTE.GET_DATA, ERROR_TEXT.GET_DATA);

const sendData = (body) => load(ROUTE.SEND_DATA, ERROR_TEXT.SEND_DATA, METHOD.POST, body);

export {getData, sendData};
