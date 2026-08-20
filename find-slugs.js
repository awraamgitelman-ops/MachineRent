import fs from 'fs';
import path from 'path';

const toRemove = [
  'rolyk-1131002797-r-holmer',
  'holmer-401051155-prividnyj-val',
  'val-dlya-pryjmalnogo-bunkera-50x700-grimme-rh-tc-076-05615-r',
  'zirochka-564230024-bolko-karlik'
];

function searchDir(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchDir(full);
    } else if (f.endsWith('.js') || f.endsWith('.jsx')) {
      const content = fs.readFileSync(full, 'utf-8');
      for (const slug of toRemove) {
        if (content.includes(slug)) {
          console.log(`Found "${slug}" in ${full}`);
        }
      }
    }
  }
}

searchDir('./src');
