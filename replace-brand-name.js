import fs from 'fs';
import path from 'path';

const TARGET_DIRS = ['./src', './public'];
const TARGET_FILES = ['./index.html', './server.js', './generate-sitemap.js', './README.md'];

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      if (
        filePath.endsWith('.js') ||
        filePath.endsWith('.jsx') ||
        filePath.endsWith('.html') ||
        filePath.endsWith('.json') ||
        filePath.endsWith('.txt') ||
        filePath.endsWith('.xml') ||
        filePath.endsWith('.css') ||
        filePath.endsWith('.md')
      ) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const allFiles = [...TARGET_FILES.filter(f => fs.existsSync(f)), ...TARGET_DIRS.flatMap(d => getAllFiles(d))];

let totalReplacements = 0;
let modifiedFiles = 0;

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // Replace case variations
  // 1. ALL CAPS: AGRO RENTEX -> AGRORENTEX
  const match1 = (content.match(/AGRO\s+RENTEX/g) || []).length;
  content = content.replace(/AGRO\s+RENTEX/g, 'AGRORENTEX');

  // 2. Title Case: Agro Rentex -> Agrorentex
  const match2 = (content.match(/Agro\s+Rentex/g) || []).length;
  content = content.replace(/Agro\s+Rentex/g, 'Agrorentex');

  // 3. Lower Case: agro rentex -> agrorentex
  const match3 = (content.match(/agro\s+rentex/g) || []).length;
  content = content.replace(/agro\s+rentex/g, 'agrorentex');

  const fileReplacements = match1 + match2 + match3;
  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    totalReplacements += fileReplacements;
    modifiedFiles++;
    console.log(`Updated [${filePath}]: ${fileReplacements} replacements`);
  }
}

console.log(`\n🎉 Completed! Replaced ${totalReplacements} brand name instances across ${modifiedFiles} files.`);
