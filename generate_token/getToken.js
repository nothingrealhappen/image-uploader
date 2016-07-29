function generatePutPolicy({ bucket, expire }) {
  const deadline = (Date.now() / 1000 | 0) + (+expire | 0);
  const policy = { scope: bucket, deadline };
  return window.btoa(JSON.stringify(policy));
}

function generateSign({ sk, policyStr }) {
  const sign = CryptoJS.HmacSHA1(policyStr, sk);
  return urlSafeBase64(CryptoJS.enc.Base64.stringify(sign));
}

function generateUploadToken({ ak, sign, policyStr }) {
  return `${ak}:${sign}:${policyStr}`;
}

function autoGenerate({ bucket, expire, ak, sk }) {
  const policyStr = generatePutPolicy({ bucket, expire });
  return generateUploadToken({
    ak,
    policyStr,
    sign: generateSign({ sk, policyStr }),
  });
}

function urlSafeBase64(str) {
  return str.replace(/\//g, '_').replace(/\+/g, '-');
}

let haveEmpty = false;

const $ = x => document.querySelector(x);
const getValue = x => {
  const value = $(x).value.trim();
  if (value.length === 0) {
    alert(`${x}不能为空`);
    haveEmpty = true;
  }
  return value;
};

$('#generate').addEventListener('click', e => {
  e.preventDefault();

  const data = {
    bucket: getValue('#bucket'),
    expire: getValue('#expires'),
    ak: getValue('#ak'),
    sk: getValue('#sk'),
  };

  if (haveEmpty) return;

  const token = autoGenerate(data);
  const $token = $('#token');
  $token.classList.add('active');
  $token.value = token;
  $token.focus();
  document.execCommand('selectAll');
  document.execCommand('copy');
  e.target.innerHTML = '已复制';
});

