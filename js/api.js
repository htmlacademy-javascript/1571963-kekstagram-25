import {showMessageError} from './util.js';

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data',)
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
  fetch('https://25.javascript.pages.academy/kekstagram',
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

