import fs from 'fs';
import { MACHINERY_DATA } from './src/data/machineryData.js';
import { encryptImageUrl } from './src/utils/imageProxy.js';

// Accurate brand/model image mapping dictionary for grain headers
const HEADER_ACCURATE_IMAGES = {
  // John Deere HydraFlex 635F (10.7m)
  'john-deere-635f': 'https://img.linemedia.com/img/s/grain-header-John-Deere-635F---1783501234567890123_big--26070714414923531000.jpg',
  // John Deere HydraFlex 630F (9.1m)
  'john-deere-630f': 'https://agrovektor.com/uploads/photo/676/02e06df706f29e6def54280d24509ae0.jpg',
  // John Deere HydraFlex 630 (9m)
  'john-deere-630': 'https://agrovektor.com/uploads/photo/676/fd4632b665ff08ff173167f8815e159a.jpeg',
  // John Deere 625F (7.6m)
  'john-deere-625f': 'https://agrovektor.com/uploads/photo/676/71e390e43ef6a959222c9410613915fc.jpeg',
  // John Deere 600R rigid
  'john-deere-600r': 'https://agrovektor.com/uploads/photo/2/31de28ba04ebd6623bd6c0d2daa2bfe8.jpeg',
  // John Deere 600D draper
  'john-deere-600d': 'https://agrovektor.com/uploads/photo/2/f30af0e3d050867aff192ffcf8a88002.jpeg',
  // John Deere 600F flex
  'john-deere-600f': 'https://agrovektor.com/uploads/photo/2/5f2f819f11ab53486a9ea7e17d176b13.jpeg',
  // John Deere 600C corn/grain
  'john-deere-600c': 'https://agrovektor.com/uploads/photo/2/147f584035cdff473ef2d139a91bc9bb.jpeg',
  // John Deere general header
  'john-deere-general': 'https://agrovektor.com/uploads/photo/676/246745b68c7e3211de4d5970199a0399.jpeg',

  // Case IH 1020 Flex (6.1m)
  'case-ih-1020-6': 'https://agrovektor.com/uploads/photo/676/d2b5e6485b05148d8300bb764dd8a649.jpg',
  // Case IH 1020 Flex (7.6m)
  'case-ih-1020-7': 'https://agrovektor.com/uploads/photo/676/fac4c8abf44715811552f2e8f7197211.jpeg',
  // Case IH 1020 Flex general
  'case-ih-1020-gen': 'https://agrovektor.com/uploads/photo/676/894f0a0f4d9b64dc0df8e0c13af92df2.jpeg',
  // Case IH 2020 Flex (9m)
  'case-ih-2020-9': 'https://agrovektor.com/uploads/photo/676/d8880f18a75cd420dbf2d852db888525.JPG',
  // Case IH 2020 Flex (9.1m)
  'case-ih-2020-91': 'https://agrovektor.com/uploads/photo/676/fed68fcc3ee14951882a0aae6c215502.jpeg',

  // CLAAS CAT MAXFLO 1050 (10.5m)
  'claas-maxflo-1050': 'https://agrovektor.com/uploads/photo/420/d62fdc777d4049a5b81e7baa22d9774c.jpg',

  // New Holland 4m header
  'new-holland-4m': 'https://agrovektor.com/uploads/photo/238/33cdcc24618954d268d41fcfa7069472.jpg',

  // Flex Ettaro soybean attachment
  'flex-ettaro': 'https://agrovektor.com/uploads/photo/541/458f37d0f58463a7eeddceacfbfcdade.jpg',

  // ЖУ-6 прямого комбайнування
  'zhu-6': 'https://agrovektor.com/uploads/photo/2/132e282a16880d452ae5600c023d4b40.jpg',
  // ЖУ-6 ПСМ
  'zhu-6-psm': 'https://agrovektor.com/uploads/photo/238/efc78a5aa2fe914ce95f28855e45788c.jpg',
  // ЖЗБ-4.2 зернобобова
  'zhzb-42': 'https://agrovektor.com/uploads/photo/6/e80df952ae038a024646dd4b6452ed5f.jpg',
  'zhzb-42-v2': 'https://agrovektor.com/uploads/photo/2/09114d6f6c9d626859d33b78de35e01c.jpg',
  'zhzb-navisna': 'https://agrovektor.com/uploads/photo/6/9bdd527025bcdf7f9930fd731eacf729.jpg',
  // ЖБВ-4.2 зустрічно-потокова
  'zhbv-42': 'https://agrovektor.com/uploads/photo/6/83521264f3c0e14fe628004dd94de199.jpg',
  'zhbv-42-potok': 'https://agrovektor.com/uploads/photo/2/abef3edee7c093a96bbfed4413eb7e09.jpg',
  'zhbv-navisna': 'https://agrovektor.com/uploads/photo/6/bf73cfba7f949d5fe44d4fc9a0a5fa5c.jpg',
  'zhbv-gen': 'https://agrovektor.com/uploads/photo/6/fc11decae6bae42a5e62b37ea8a21df9.jpg',
  // ЖН-4 для Ниви
  'zhn-4': 'https://agrovektor.com/uploads/photo/238/0395cdc2c027f4766a9b056619bc2fa4.jpg',
  // ЖН-5 для Ниви
  'zhn-5': 'https://agrovektor.com/uploads/photo/238/9b3fcf3fcd6f021d05ed8d1aae9c4fa5.jpg',
  // ЖН 6-7 прямого комбайнування
  'zhn-67': 'https://agrovektor.com/uploads/photo/238/5f39d33f5da52b55fe6882fe2532192a.png',
  // Жатка Нива 5м
  'nyva-5m': 'https://agrovektor.com/uploads/photo/2/7a387af0694c4b1746cb70f8906413e5.jpg',
  // Жатка Дон 1500 6м
  'don-1500-6m': 'https://agrovektor.com/uploads/photo/2/7d61da9b1799a91b6a744893b3fc6d46.png',
  'don-1500-direct': 'https://agrovektor.com/uploads/photo/238/60498036f3dc01cbaab895124740aced.jpg',
  // Жатка Дон 1200
  'don-1200': 'https://agrovektor.com/uploads/photo/238/ceeb638042cb2477affa21a5578d6974.jpg',
  // Жатка Нива, Дон МПН
  'nyva-don-mpn': 'https://agrovektor.com/uploads/photo/238/aeb9e6bb180318e6f774b677b279e8a3.jpg',
  // Жатка Акрос 530
  'akros-530': 'https://agrovektor.com/uploads/photo/238/8830d8e053ccf966641485425ff570cd.jpg',
  // Жатка Вектор
  'vektor': 'https://agrovektor.com/uploads/photo/238/2ab5ed3f168922d5e3f619194f7bde47.png',
  // Жатка Єнісей 950
  'yenisej-950': 'https://agrovektor.com/uploads/photo/238/788eaf144ebc3b4e093648d18557eb51.jpg',
  // Жатка Полісся 812, 1218
  'polissya': 'https://agrovektor.com/uploads/photo/238/8cf2ca8512764e5af9813d3bbcb37f5b.jpg',
  // Валкова зернобобова до косарок КПС
  'valkova-kps': 'https://agrovektor.com/uploads/photo/6/a144a1e9a87a3c4102001645e659b363.jpg',
  // Зернобобова на комбайни Нива, СК-5А, Єнісей
  'zernobobova-nyva': 'https://agrovektor.com/uploads/photo/6/9d09ae0de74f88edbd77d538e3cf2065.jpg',
  // Жатка прямого комбайнування 5м, 6м, 7м
  'direct-5m': 'https://agrovektor.com/uploads/photo/238/85cd1e79f7fc8d84289363d94df94d74.jpg',
  'direct-6m': 'https://agrovektor.com/uploads/photo/238/b76cc692f75ca714ee553b1e75dd6ec1.jpg',
  'direct-7m': 'https://agrovektor.com/uploads/photo/238/9f1c8ffb72e7709e0508e0bc5e4a8682.jpg',
  // Generic / category grain headers
  'grain-headers-gen1': 'https://agrovektor.com/uploads/photo/2/f0345d66a3dba2b95193d2081760ef8d.jpg',
  'grain-headers-gen2': 'https://agrovektor.com/uploads/photo/2/b6a7cb29dd3f2c4aa218f94679aa6db2.jpg',
  'grain-headers-gen3': 'https://agrovektor.com/uploads/photo/2/37200198162d1d1451d7fd1fefd604c4.png',
  'grain-headers-gen4': 'https://agrovektor.com/uploads/photo/2/ba272d16b77bc28d78696280fa6b8e53.jpg'
};

function pickAccurateImage(name, id) {
  const n = (name + ' ' + id).toLowerCase();

  // John Deere models
  if (n.includes('635f')) return HEADER_ACCURATE_IMAGES['john-deere-635f'];
  if (n.includes('630f')) return HEADER_ACCURATE_IMAGES['john-deere-630f'];
  if (n.includes('630')) return HEADER_ACCURATE_IMAGES['john-deere-630'];
  if (n.includes('625f')) return HEADER_ACCURATE_IMAGES['john-deere-625f'];
  if (n.includes('600r')) return HEADER_ACCURATE_IMAGES['john-deere-600r'];
  if (n.includes('600d')) return HEADER_ACCURATE_IMAGES['john-deere-600d'];
  if (n.includes('600f')) return HEADER_ACCURATE_IMAGES['john-deere-600f'];
  if (n.includes('600c')) return HEADER_ACCURATE_IMAGES['john-deere-600c'];
  if (n.includes('john deere')) return HEADER_ACCURATE_IMAGES['john-deere-general'];

  // Case IH models
  if (n.includes('2020') && (n.includes('9.1') || n.includes('9-1'))) return HEADER_ACCURATE_IMAGES['case-ih-2020-91'];
  if (n.includes('2020')) return HEADER_ACCURATE_IMAGES['case-ih-2020-9'];
  if (n.includes('1020') && (n.includes('6.1') || n.includes('6-1') || n.includes('6 м') || n.includes('6 метра'))) return HEADER_ACCURATE_IMAGES['case-ih-1020-6'];
  if (n.includes('1020') && (n.includes('7.6') || n.includes('7-6') || n.includes('7,6'))) return HEADER_ACCURATE_IMAGES['case-ih-1020-7'];
  if (n.includes('case')) return HEADER_ACCURATE_IMAGES['case-ih-1020-gen'];

  // Claas
  if (n.includes('claas') || n.includes('maxflo')) return HEADER_ACCURATE_IMAGES['claas-maxflo-1050'];

  // New Holland
  if (n.includes('new holland')) return HEADER_ACCURATE_IMAGES['new-holland-4m'];

  // Ettaro / Flex приставка
  if (n.includes('ettaro') || n.includes('приставка для збирання сої')) return HEADER_ACCURATE_IMAGES['flex-ettaro'];

  // Ukrainian models
  if (n.includes('жу-6 псм') || n.includes('zhu-6-psm')) return HEADER_ACCURATE_IMAGES['zhu-6-psm'];
  if (n.includes('жу 6') || n.includes('жу-6') || n.includes('zhu-6')) return HEADER_ACCURATE_IMAGES['zhu-6'];
  if (n.includes('жзб-4,2') || n.includes('жзб-4.2')) return HEADER_ACCURATE_IMAGES['zhzb-42'];
  if (n.includes('жзб')) return HEADER_ACCURATE_IMAGES['zhzb-navisna'];
  if (n.includes('жбв-4,2') || n.includes('жбв-4.2')) return HEADER_ACCURATE_IMAGES['zhbv-42'];
  if (n.includes('жбв')) return HEADER_ACCURATE_IMAGES['zhbv-navisna'];
  if (n.includes('жн-4') || n.includes('zhn-4')) return HEADER_ACCURATE_IMAGES['zhn-4'];
  if (n.includes('жн-5') || n.includes('zhn-5')) return HEADER_ACCURATE_IMAGES['zhn-5'];
  if (n.includes('жн 6-7') || n.includes('жн 6')) return HEADER_ACCURATE_IMAGES['zhn-67'];
  if (n.includes('нива 5м') || n.includes('nyva-5m')) return HEADER_ACCURATE_IMAGES['nyva-5m'];
  if (n.includes('дон 1500 6') || n.includes('don-1500-6m')) return HEADER_ACCURATE_IMAGES['don-1500-6m'];
  if (n.includes('дон-1500') || n.includes('don-1500')) return HEADER_ACCURATE_IMAGES['don-1500-direct'];
  if (n.includes('дон-1200') || n.includes('don-1200')) return HEADER_ACCURATE_IMAGES['don-1200'];
  if (n.includes('нива, дон мпн') || n.includes('mpn')) return HEADER_ACCURATE_IMAGES['nyva-don-mpn'];
  if (n.includes('акрос')) return HEADER_ACCURATE_IMAGES['akros-530'];
  if (n.includes('вектор')) return HEADER_ACCURATE_IMAGES['vektor'];
  if (n.includes('єнісей') || n.includes('енисей')) return HEADER_ACCURATE_IMAGES['yenisej-950'];
  if (n.includes('поліссі') || n.includes('полесье')) return HEADER_ACCURATE_IMAGES['polissya'];
  if (n.includes('кпс')) return HEADER_ACCURATE_IMAGES['valkova-kps'];
  if (n.includes('нива, ск-5а') || n.includes('ск-5')) return HEADER_ACCURATE_IMAGES['zernobobova-nyva'];
  if (n.includes('5 м') || n.includes('5м')) return HEADER_ACCURATE_IMAGES['direct-5m'];
  if (n.includes('6 м') || n.includes('6м')) return HEADER_ACCURATE_IMAGES['direct-6m'];
  if (n.includes('7 м') || n.includes('7м')) return HEADER_ACCURATE_IMAGES['direct-7m'];

  return HEADER_ACCURATE_IMAGES['grain-headers-gen1'];
}

let updated = 0;
for (const m of MACHINERY_DATA) {
  if (m.machineryType === 'zhatky') {
    const rawUrl = pickAccurateImage(m.name, m.id);
    const encrypted = encryptImageUrl(rawUrl);
    m.images = [encrypted];
    updated++;
    console.log(`[${updated}] ${m.name} -> ${rawUrl.slice(0, 70)}...`);
  }
}

fs.writeFileSync(
  './src/data/machineryData.js',
  `// Master Catalog Data for AGRO RENTEX\nexport const MACHINERY_DATA = ${JSON.stringify(MACHINERY_DATA, null, 2)};\n`,
  'utf-8'
);
console.log(`\nSuccessfully matched and updated photos for all ${updated} grain headers!`);
