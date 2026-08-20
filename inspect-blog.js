import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\Maxim\\.gemini\\antigravity\\brain\\b64e2507-e603-4fc9-ab3a-e772c0683ebf\\.system_generated\\steps\\1225\\content.md', 'utf-8');

const posts = [...html.matchAll(/<article[^>]*>([\s\S]*?)<\/article>/gi)];
console.log('Found articles on adena blog:', posts.length);

for (let i = 0; i < posts.length; i++) {
  const p = posts[i][1];
  const title = (p.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/i) || [])[1];
  const link = (p.match(/href="([^"]*)"/i) || [])[1];
  const img = (p.match(/src="([^"]*)"/i) || [])[1];
  const excerpt = (p.match(/<div class="entry-content[^"]*">([\s\S]*?)<\/div>/i) || [])[1];
  console.log(`\n--- Article ${i + 1} ---`);
  console.log('Title:', title ? title.replace(/<[^>]+>/g, '').trim() : 'N/A');
  console.log('Link:', link);
  console.log('Img:', img);
}
