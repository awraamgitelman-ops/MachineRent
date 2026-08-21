import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

function getAllJsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllJsxFiles(filePath, fileList);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getAllJsxFiles(SRC_DIR);
let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Replace borderRadius: '...' (except if 50% inside small status dot)
  // Let's replace any borderRadius: 'var(--radius-*)' or 'Xpx' with '0px'
  content = content.replace(/borderRadius:\s*['"](var\(--radius-[^)]+\)|\d+px)['"]/g, "borderRadius: '0px'");
  content = content.replace(/borderRadius:\s*['"]\d+['"]/g, "borderRadius: '0px'");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    modifiedCount++;
    console.log(`Updated [${file}]`);
  }
}

console.log(`\n🎉 Processed ${modifiedCount} JSX/JS files with square borders!`);
