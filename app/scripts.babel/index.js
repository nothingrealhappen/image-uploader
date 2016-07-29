'use strict';

Dropzone.autoDiscover = false;

const $ = x => document.querySelector(x);

const $uploader = $('#uploader');
const $url = $('#url');

chrome.storage.sync.get({
  token: null,
  domain: null,
}, d => {
  if (d.token === null || d.domain === null) {
    alert('请先配置插件');
    return;
  }

  onReady(d.token, d.domain);
});


function onReady(token, domain) {
  const dropzone = new Dropzone('#uploader', {
    maxFiles: 1,
    url: 'http://upload.qiniu.com',
    method: 'POST',
    uploadMultiple: false,
    previewTemplate: '<div></div>',
    sending: (file, xhr, fd) => {
      const d = new Date();
      fd.append('token', token);
      fd.append('key', `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/${file.name}`);
    },
    success: (f, res) => {
      const url = `http://${domain}/${res.key}`;
      $url.value = url;
      copyURL();
    },
    error: e => {
      debugger;
      alert(e.xhr.responseText);
    },
  });
}

function copyURL() {
  $url.focus();
  document.execCommand('selectAll');
  document.execCommand('copy');
  $('#status').classList.add('active');
}
