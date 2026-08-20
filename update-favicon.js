import fs from 'fs';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#c8562d"/>
  <text x="50%" y="55%" dominant-baseline="central" text-anchor="middle" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, Arial, sans-serif" font-size="44" font-weight="900" fill="#ffffff">R</text>
</svg>`;

fs.writeFileSync('./public/favicon.svg', svgContent, 'utf-8');
console.log('Updated public/favicon.svg with #c8562d');
