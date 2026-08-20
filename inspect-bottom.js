import fs from 'fs';

const html = fs.readFileSync('./home_page_raw.html', 'utf-8');

// Find text sections at bottom
const textSectionMatch = html.match(/<div class="elementor-element elementor-element-2f9543e[\s\S]*?<\/article>/i) ||
                         html.match(/Продаж сільськогосподарської техніки[\s\S]*?<\/article>/i);

if (textSectionMatch) {
  console.log('Found bottom text section snippet:');
  console.log(textSectionMatch[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 1500));
} else {
  // Let's search for "Чому ми"
  const idx = html.indexOf('Чому ми');
  if (idx !== -1) {
    console.log('Snippet around Чому ми:');
    console.log(html.slice(idx - 200, idx + 1200).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  }
}
