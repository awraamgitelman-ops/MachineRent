import https from 'https';

const url = 'https://agro-ukraine.com/imgs/board/29/1230229-1.jpg';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://agro-ukraine.com/'
  }
};

https.get(url, options, (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = [];
  res.on('data', chunk => data.push(chunk));
  res.on('end', () => {
    const buffer = Buffer.concat(data);
    console.log('Body length:', buffer.length);
    console.log('Is HTML (block)?', buffer.toString('utf8').slice(0, 100));
  });
}).on('error', (err) => {
  console.error('Error fetching:', err);
});
