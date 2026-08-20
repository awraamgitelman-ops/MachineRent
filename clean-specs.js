import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const TRANSLATION_MAP = {
  'powerHp': 'Необхідна потужність трактора',
  'workingWidth': 'Робоча ширина / Кількість рядів',
  'requiredTractorHp': 'Вимоги до трактора',
  'engineHours': 'Напрацювання',
  'year': 'Рік випуску',
  'weightKg': 'Маса агрегату (кг)',
  'performanceHaPerHour': 'Продуктивність'
};

const IGNORED_KEYS = new Set([
  'operatorIncluded',
  'fuelIncluded',
  'minRentDays',
  'depositUah'
]);

const cleaned = MACHINERY_DATA.map((item) => {
  const newSpecs = {};

  if (item.specs) {
    for (const [k, v] of Object.entries(item.specs)) {
      if (IGNORED_KEYS.has(k)) continue;
      const ukrKey = TRANSLATION_MAP[k] || k;
      newSpecs[ukrKey] = v;
    }
  }

  return {
    ...item,
    specs: newSpecs
  };
});

const output = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${cleaned.length}

export const MACHINERY_DATA = ${JSON.stringify(cleaned, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', output, 'utf-8');
console.log('Cleaned all machineryData specs successfully!');
