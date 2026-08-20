import fs from 'fs';
import path from 'path';

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkDir(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (emojiRegex.test(line)) {
          console.log(`${fullPath}:${idx + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

checkDir('./src');
