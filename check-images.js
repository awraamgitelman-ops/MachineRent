import fs from 'fs';

const testImages = [
  'https://adenaagro.com/wp-content/uploads/2025/01/we30plus_02.jpg',
  'https://adenaagro.com/wp-content/uploads/2025/01/090-90-0_result_result.jpg',
  'https://adenaagro.com/wp-content/uploads/2025/01/8bfa9c62c331a5a3aa08d3f43fdaf8ec_big-1_result_result.jpg',
  'https://adenaagro.com/wp-content/uploads/2025/01/cef8f76bcd14064b9f156c5d77327f6e_result_result.jpg',
  'https://adenaagro.com/wp-content/uploads/2025/01/ff8238771ee73dc541cf1b89b624348b_result_result.jpg',
  'https://adenaagro.com/wp-content/uploads/2025/01/b121eabb8981656f064375850bff5cb9_result_result.jpg',
  'https://adenaagro.com/wp-content/uploads/2025/01/be37c365ad800d8abb85be71e23aa70b_result_result.jpg',
  'https://adenaagro.com/wp-content/uploads/2026/08/we30plus_03.jpg',
  'https://adenaagro.com/wp-content/uploads/2025/01/we30plus_03.jpg'
];

async function check() {
  for (const img of testImages) {
    try {
      const res = await fetch(img, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(res.status, img);
    } catch (e) {
      console.log('ERR', img);
    }
  }
}

check();
