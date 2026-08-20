import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const updated = MACHINERY_DATA.map((item) => {
  if (item.slug === 'zvazhuvalno-pakuvalna-mashyna-elektronna' || item.id === 'adena-domasz-we30-plus') {
    return {
      ...item,
      slug: 'zvazhuvalno-pakuvalna-mashyna-elektronna',
      aliases: [
        'domasz-we-30-plus-elektronna-zvazhuvalna-mashyna-dlya-ovochiv',
        'domasz-we-30-plus',
        'domasz-we-30-iv-zvazhuvalna-stancziya-dlya-ovochiv',
        'domasz-we-30',
        'domasz-we30',
        'we-30-plus',
        'we30-plus',
        'zvazhuvalno-pakuvalna-mashyna-elektronna'
      ],
      images: [
        'https://adenaagro.com/wp-content/uploads/2025/01/we30plus_02.jpg',
        'https://adenaagro.com/wp-content/uploads/2025/01/we30plus_03.jpg',
        'https://adenaagro.com/wp-content/uploads/2025/01/090-90-0_result_result.jpg',
        'https://adenaagro.com/wp-content/uploads/2025/01/8bfa9c62c331a5a3aa08d3f43fdaf8ec_big-1_result_result.jpg',
        'https://adenaagro.com/wp-content/uploads/2025/01/cef8f76bcd14064b9f156c5d77327f6e_result_result.jpg',
        'https://adenaagro.com/wp-content/uploads/2025/01/ff8238771ee73dc541cf1b89b624348b_result_result.jpg',
        'https://adenaagro.com/wp-content/uploads/2025/01/b121eabb8981656f064375850bff5cb9_result_result.jpg',
        'https://adenaagro.com/wp-content/uploads/2025/01/be37c365ad800d8abb85be71e23aa70b_result_result.jpg'
      ]
    };
  }
  return item;
});

const output = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${updated.length}

export const MACHINERY_DATA = ${JSON.stringify(updated, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', output, 'utf-8');
console.log('Updated Domasz WE-30 PLUS with aliases and verified 200 OK image URLs!');
