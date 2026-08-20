import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1193\\content.md', 'utf-8');

const cleanHtml = html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '');

const blocks = [...cleanHtml.matchAll(/<(?:p|h1|h2|h3|h4|li|span|div)[^>]*>([\s\S]*?)<\/(?:p|h1|h2|h3|h4|li|span|div)>/gi)]
  .map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .filter(t => t.length > 10);

console.log('Clean text blocks in contact us:');
console.log([...new Set(blocks)].slice(0, 30).join('\n\n'));
