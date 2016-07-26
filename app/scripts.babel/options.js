'use strict';
(function () {
  function save_options(e) {
    chrome.storage.sync.set({
      token: document.querySelector('#token').value,
    }, () => {
      e.target.innerText = '设置成功';
    });
  }

  function restore_options() {
    chrome.storage.sync.get({
      token: null,
    }, function(items) {
      document.querySelector('#token').value = items.token;
    });
  }

  document.addEventListener('DOMContentLoaded', restore_options);
  document.querySelector('#save').addEventListener('click', save_options);
})();
