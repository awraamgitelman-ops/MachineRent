import fs from 'fs';
import path from 'path';

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.html')) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

// Regex matching common emojis
const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F680}-\u{1F6FF}\u{1F7E0}-\u{1F7EB}\u{1F170}-\u{1F251}]/gu;

const files = getAllFiles('./src');
files.push('./index.html');

let totalEmojiCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const matches = content.match(emojiRegex);
  if (matches && matches.length > 0) {
    console.log(`\nFound ${matches.length} emojis in [${file}]:`);
    console.log(matches.slice(0, 10).join(' '));
    totalEmojiCount += matches.length;
  }
}

console.log(`\nTotal emojis found in code: ${totalEmojiCount}`);
