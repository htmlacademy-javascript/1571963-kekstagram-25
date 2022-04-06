import {showMessageError} from './util.js';
import {URL_MINIATURES, URL_SUBMIT_FORM} from './const.js';

const getData = (onSuccess) => {
  fetch(URL_MINIATURES)
    .then((response) => {
      if (response.ok){
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((miniatures) => {
      onSuccess(miniatures);
    })
    .catch(() => {
      showMessageError('Произошёл сбой, данные не доступны с ресурса');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SUBMIT_FORM,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => {
    onSuccess();
    onFail();
  });
};

export{getData, sendData};

