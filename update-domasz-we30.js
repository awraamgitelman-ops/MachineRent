import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

// The exact parsed data from https://adenaagro.com/product/zvazhuvalno-pakuvalna-mashyna-elektronna/
const domaszWe30Data = {
  id: 'adena-domasz-we30-plus',
  slug: 'zvazhuvalno-pakuvalna-mashyna-elektronna',
  name: 'Domasz WE-30 PLUS – Зважувально-пакувальна машина',
  brand: 'Domasz',
  model: 'WE-30 PLUS',
  activityType: 'sorting',
  machineryType: 'warehouse',
  categoryName: 'Складська техніка',
  status: 'available',
  badge: 'В наявності',
  images: [
    'https://adenaagro.com/wp-content/uploads/2026/08/we30plus_03.jpg',
    'https://adenaagro.com/wp-content/uploads/2025/01/we30plus_02.jpg',
    'https://adenaagro.com/wp-content/uploads/2025/01/090-90-0_result_result.jpg',
    'https://adenaagro.com/wp-content/uploads/2025/01/8bfa9c62c331a5a3aa08d3f43fdaf8ec_big-1_result_result.jpg',
    'https://adenaagro.com/wp-content/uploads/2025/01/cef8f76bcd14064b9f156c5d77327f6e_result_result.jpg',
    'https://adenaagro.com/wp-content/uploads/2025/01/ff8238771ee73dc541cf1b89b624348b_result_result.jpg',
    'https://adenaagro.com/wp-content/uploads/2025/01/b121eabb8981656f064375850bff5cb9_result_result.jpg',
    'https://adenaagro.com/wp-content/uploads/2025/01/be37c365ad800d8abb85be71e23aa70b_result_result.jpg'
  ],
  pricing: {
    purchasePriceUah: 218400,
    pricePerShiftUah: 17500,
    pricePerHaUah: 1450
  },
  specs: {
    'Виробник': 'Domasz (Польща)',
    'Модель': 'WE-30 PLUS',
    'Тип техніки': 'Підготовка (мийка) / упаковка / зважування',
    'Вид с/г діяльності': 'Вирощування картоплі, моркви, цибулі, зберігання та фасування',
    'Діапазон зважування': '1 – 30 кг',
    'Продуктивність': 'до 10 т/год (для порцій по 20 кг)',
    'Режими роботи': 'Автоматичний / Ручний',
    'Регулювання швидкості висипання': '5 швидкостей стрічки з плавним регулюванням',
    'Об’єм мішків': 'від 5 до 30 кг',
    'Сумісність': 'Мішкозашивальні машини, автоматичні пакувальники'
  },
  shortDescription: 'Ваговий мішконаповнювач Domasz WE-30 PLUS для зважування та наповнення мішків овочами (картопля, цибуля, морква, буряк). Продуктивність: до 10 тон/год. Формування порцій від 1 до 30 кг. Автоматичний та ручний режими роботи.',
  fullDescription: `Електронний ваговий мішконаповнювач Domasz WE-30 PLUS – це сучасний високоефективний пристрій для зважування та наповнення мішків овочами, такими як картопля, цибуля, буряк, морква тощо.
Машина працює незалежно та забезпечує точне зважування продукту в самотаруючих ємностях із можливістю автоматичного або ручного висипання.

Основні переваги та характеристики WE-30 PLUS:
• Діапазон зважування: від 1 до 30 кг.
• Продуктивність: до 10 тон/год для мішків по 20 кг.
• Режими роботи: автоматичне або ручне висипання.
• Регульована швидкість висипання: 5 швидкостей головної стрічки та стрічки кінцевого зважування з можливістю плавного регулювання.
• Об'єм мішків: від 5 до 30 кг.
• Дільник завантажувального пристрою: для максимально точного дозування продукту.
• Сумісність: пристосований до роботи з мішкозашивальною машиною або автоматичними пакувальниками.

Завдяки високій точності, простоті використання та надійності європейських компонентів, WE-30 PLUS є еталонним рішенням для агропромислових підприємств та складських комплексів.`
};

let matched = false;
const updatedList = MACHINERY_DATA.map((item) => {
  const nameLower = (item.name || '').toLowerCase();
  const slugLower = (item.slug || '').toLowerCase();

  if (
    slugLower === 'zvazhuvalno-pakuvalna-mashyna-elektronna' ||
    slugLower.includes('we-30') ||
    slugLower.includes('we30') ||
    (nameLower.includes('domasz') && nameLower.includes('we-30')) ||
    (nameLower.includes('we-30') && nameLower.includes('plus')) ||
    (nameLower.includes('зважувально') && nameLower.includes('пакувальна'))
  ) {
    matched = true;
    console.log(`Matched existing item: ${item.name} (${item.slug}) -> Updating with exact WE-30 PLUS data`);
    return {
      ...item,
      ...domaszWe30Data
    };
  }
  return item;
});

if (!matched) {
  console.log('Inserting Domasz WE-30 PLUS into catalog...');
  updatedList.unshift(domaszWe30Data);
}

const output = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${updatedList.length}

export const MACHINERY_DATA = ${JSON.stringify(updatedList, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', output, 'utf-8');
console.log(`Successfully updated Domasz WE-30 PLUS in catalog (Total: ${updatedList.length})!`);
