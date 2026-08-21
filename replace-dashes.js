import fs from 'fs';
import path from 'path';

const TARGET_DIRS = ['./src', './public'];
const TARGET_FILES = ['./index.html', './server.js', './telegram-bot.js', './generate-sitemap.js'];

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
        filePath.endsWith('.xml')
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

  // 1. Time / numerical ranges with em-dash or en-dash: e.g. 08:00 — 19:00 -> 08:00 - 19:00, 12–24 -> 12-24, 2023–2024 -> 2023-2024
  content = content.replace(/(\d+:\d+)\s*[—–]\s*(\d+:\d+)/g, '$1 - $2');
  content = content.replace(/(\d+)\s*[—–]\s*(\d+)\s*(годин|дні|робочих|м\/г|га\/год|ряд|м\b|см|т\/год|кг)/g, '$1-$2 $3');
  content = content.replace(/(\d{4})\s*[—–]\s*(\d{4})/g, '$1-$2');

  // 2. Specific Ukrainian legal phrases: надалі — «...» -> надалі: «...»
  content = content.replace(/надалі\s*[—–]\s*/g, 'надалі: ');
  content = content.replace(/далі\s*[—–]\s*/g, 'далі: ');

  // 3. Navbar / Footer phone labels: "— Відділ продажу" -> "• Відділ продажу" or "(Відділ продажу)"
  content = content.replace(/>\s*[—–]\s*Відділ продажу/g, '> Відділ продажу');
  content = content.replace(/—\s*Відділ продажу/g, 'Відділ продажу');

  // 4. " — це " / " – це " -> ": це " or ": "
  content = content.replace(/\s+[—–]\s+це\s+/g, ': це ');

  // 5. General " — " (space em-dash space) and " – " (space en-dash space) -> ": "
  content = content.replace(/\s+—\s+/g, ': ');
  content = content.replace(/\s+–\s+/g, ': ');

  // 6. Any isolated em-dash "—" -> ":"
  content = content.replace(/—/g, ':');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    modifiedFiles++;
    console.log(`Updated [${filePath}]`);
  }
}

console.log(`\n🎉 Completed! Cleaned dashes across ${modifiedFiles} files.`);
