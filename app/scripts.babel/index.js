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
    previewTemplate: '<div><img data-dz-thumbnail></div>',
    sending: (file, xhr, fd) => {
      const d = new Date();
      fd.append('token', token);
      fd.append('key', `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}/${file.name}`);
    },
    success: (f, res) => {
      const url = `http://${domain}/${res.key}`;
      const markdown = `![${f.name}](${url})`;
      $url.value = url;
      $('#markdown').value = markdown;
      copyURL($url);
    },
    error: e => {
      debugger;
      alert(e.xhr.responseText);
    },
  });
}

$('#result').addEventListener('click', e => {
  if (!/^a$/i.test(e.target.tagName)) return;
  e.preventDefault();
  const target = e.target.dataset.target;
  copyURL($(target));
  e.target.innerHTML = '已复制';
});

function copyURL($dom) {
  $('.result').classList.add('active');
  $dom.focus();
  document.execCommand('selectAll');
  document.execCommand('copy');
}
