'use strict';

Dropzone.autoDiscover = false;

const $ = x => document.querySelector(x);

const $uploader = $('#uploader');

chrome.storage.sync.get({
  token: null,
}, d => {
  if (d.token === null) {
    alert('请先配置 token');
    return;
  }

  $('#uploader input[name=token]').value = d.token;
});

const dropzone = new Dropzone('#uploader', {
  url: 'http://upload.qiniu.com',
  method: 'POST',
  uploadMultiple: false,
  success: (...args) => {
    console.log(args);
  },
  error : e => {
    alert(e.xhr.responseText);
  }
});
