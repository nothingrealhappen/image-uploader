function generatePutPolicy({ bucket, expire }) {
  const deadline = (Date.now() / 1000 | 0) + expire;
  return JSON.stringify({ bucket, deadline });
}

const putPolicyString = generatePutPolicy({ bucket: 'blog', expire: 3600 * 24 * 365 });
