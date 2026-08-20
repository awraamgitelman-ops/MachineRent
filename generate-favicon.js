import fs from 'fs';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#800020"/>
  <text x="50%" y="55%" dominant-baseline="central" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="900" fill="#ffffff">R</text>
</svg>`;

fs.writeFileSync('./public/favicon.svg', svgContent, 'utf-8');
console.log('Saved public/favicon.svg');
