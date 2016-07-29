'use strict';
(function () {
  function save_options(e, key) {
    chrome.storage.sync.set({
      [key]: document.querySelector(`#${key}`).value.trim(),
    }, () => {
      e.target.innerText = '设置成功';
    });
  }

  function restore_options() {
    chrome.storage.sync.get({
      token: null,
      domain: null,
    }, function(items) {
      document.querySelector('#token').value = items.token;
      document.querySelector('#domain').value = items.domain;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.querySelector('#save-token').addEventListener('click', e => save_options(e, 'token'));
  document.querySelector('#save-domain').addEventListener('click', e => save_options(e, 'domain'));
})();
