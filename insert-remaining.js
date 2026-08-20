import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';

const additionalItems = [
  {
    id: "part-val-dlya-pryjmalnogo-bunkera-50x700-grimme-rh-tc-076-05615-r",
    slug: "val-dlya-pryjmalnogo-bunkera-50x700-grimme-rh-tc-076-05615-r",
    name: "Grimme RH, TC – 50X700, Вал для приймального бункера 076.05615 R",
    brand: "Grimme",
    model: "076.05615 R",
    activityType: "harvesting",
    machineryType: "parts",
    categoryName: "Запасні частини",
    status: "available",
    badge: "В наявності",
    images: [
      "https://adenaagro.com/wp-content/uploads/2022/11/0_14_result-300x300.jpg",
      "https://adenaagro.com/wp-content/uploads/2022/12/traktor-768x432.webp"
    ],
    pricing: {
      purchasePriceUah: 7800,
      pricePerShiftUah: 390,
      pricePerHaUah: 39
    },
    specs: {
      "Виробник": "Grimme",
      "Модель": "076.05615 R",
      "Категорія": "Запасні частини",
      "Розмір": "50x700 мм",
      "Сумісність": "Приймальні бункери Grimme RH, TC"
    },
    shortDescription: "Оригінальний вал для приймального бункера 50X700 Grimme RH, TC 076.05615 R. Високоякісна сталь, точна геометрія.",
    fullDescription: "Вал для приймального бункера 50X700 Grimme RH, TC (каталожний номер 076.05615 R). Призначений для встановлення в привідні та натяжні вузли сортувальних столів і бункерів Grimme. Виготовлений із загартованої легованої сталі, стійкої до високих навантажень та абразивного зносу.",
    aliases: [
      "val-dlya-pryjmalnogo-bunkera-50x700-grimme-rh-tc-076-05615-r",
      "grimme-val-rh"
    ]
  },
  {
    id: "part-holmer-401051155-prividnyj-val",
    slug: "holmer-401051155-prividnyj-val",
    name: "Holmer 401051155 – Привідний вал бурякозбиральної техніки",
    brand: "Holmer",
    model: "401051155",
    activityType: "harvesting",
    machineryType: "parts",
    categoryName: "Запасні частини",
    status: "available",
    badge: "В наявності",
    images: [
      "https://adenaagro.com/wp-content/uploads/2022/11/bez-bort88_9-300x300.jpg",
      "https://adenaagro.com/wp-content/uploads/2022/12/traktor-768x432.webp"
    ],
    pricing: {
      purchasePriceUah: 18720,
      pricePerShiftUah: 936,
      pricePerHaUah: 93
    },
    specs: {
      "Виробник": "Holmer",
      "Модель": "401051155",
      "Категорія": "Запасні частини",
      "Сумісність": "Бурякозбиральні комбайни Holmer Terra Dos"
    },
    shortDescription: "Привідний вал Holmer 401051155 для бурякозбиральних комбайнів. Оригінальна європейська якість AGRO RENTEX.",
    fullDescription: "Привідний вал Holmer 401051155 забезпечує стабільну передачу крутного моменту в силових вузлах бурякозбиральних комбайнів Holmer. Надійне шліцьове з'єднання та термообробка робочих поверхонь.",
    aliases: [
      "holmer-401051155-prividnyj-val",
      "holmer-401051155"
    ]
  },
  {
    id: "warehouse-adena-agro-perekydach-kontejneriv-z-ovochamy",
    slug: "adena-agro-perekydach-kontejneriv-z-ovochamy",
    name: "AGRO RENTEX – Перекидач контейнерів з овочами",
    brand: "AGRO RENTEX",
    model: "ПК-1200",
    activityType: "sorting",
    machineryType: "warehouse",
    categoryName: "Складська техніка",
    status: "available",
    badge: "В наявності",
    images: [
      "https://adenaagro.com/wp-content/uploads/2022/12/traktor-768x432.webp"
    ],
    pricing: {
      purchasePriceUah: 145600,
      pricePerShiftUah: 7280,
      pricePerHaUah: 728
    },
    specs: {
      "Виробник": "AGRO RENTEX",
      "Модель": "ПК-1200",
      "Категорія": "Складська техніка",
      "Вантажопідйомність": "до 1200 кг",
      "Кут перекидання": "до 135°",
      "Привід": "Гідравлічний / Електричний"
    },
    shortDescription: "Гідравлічний перекидач контейнерів з овочами для завантаження сортувальних столів, приймальних бункерів та мийок.",
    fullDescription: "Перекидач контейнерів призначений для безпечного, плавного та безтравматичного вивантаження картоплі, моркви, цибулі та буряку з дерев'яних або пластикових контейнерів у бункери ліній сортування та фасування.",
    aliases: [
      "adena-agro-perekydach-kontejneriv-z-ovochamy",
      "adena-perekydach",
      "perekydach-kontejneriv"
    ]
  }
];

const existingSlugs = new Set(MACHINERY_DATA.map(m => m.slug));
const toAdd = additionalItems.filter(item => !existingSlugs.has(item.slug));

const merged = [...MACHINERY_DATA, ...toAdd];

const out = `// Auto-generated comprehensive machinery and parts catalog from adenaagro.com
// Total Products: ${merged.length}

export const MACHINERY_DATA = ${JSON.stringify(merged, null, 2)};
`;

fs.writeFileSync('./src/data/machineryData.js', out, 'utf-8');
console.log(`Added ${toAdd.length} additional items! Total products: ${merged.length}`);
