/**
 * Universal Search & Filtering Engine for AGRORENTEX Catalog
 * Supports multi-attribute matching, Cyrillic/Latin transliteration, and robust faceted filtering.
 */

// Phonetic and multilingual dictionary mappings
const SYNONYM_MAP = {
  // Brands
  'грімме': ['grimme', 'гримме', 'гріме', 'гриме'],
  'гримме': ['grimme', 'грімме', 'гріме', 'гриме'],
  'гріме': ['grimme', 'грімме', 'гримме'],
  'гриме': ['grimme', 'грімме', 'гримме'],
  'grimme': ['grimme', 'грімме', 'гримме'],

  'струїк': ['struik', 'струик', 'струйк'],
  'струик': ['struik', 'струїк', 'струйк'],
  'струйк': ['struik', 'струїк', 'струик'],
  'struik': ['struik', 'струїк', 'струик'],

  'домаш': ['domasz', 'домаж'],
  'домаж': ['domasz', 'домаш'],
  'domasz': ['domasz', 'домаш'],

  'клаас': ['claas', 'клас'],
  'claas': ['claas', 'клаас', 'клас'],

  'кейс': ['case', 'кейсі'],
  'case': ['case', 'кейс', 'кейсі'],

  'джон дір': ['john deere', 'джон дир'],
  'john deere': ['john deere', 'джон дір', 'джон дир'],

  'девюльф': ['dewulf', 'девульф'],
  'dewulf': ['dewulf', 'девюльф', 'девульф'],

  'авр': ['avr'],
  'avr': ['avr', 'авр'],

  'зібо': ['zibo', 'зибо'],
  'зибо': ['zibo', 'зібо'],
  'zibo': ['zibo', 'зібо', 'зибо'],

  // Machinery Types / Synonyms
  'жатка': ['жатка', 'жатки', 'zhatka', 'zhatky', 'жу-6', 'жзб'],
  'жатки': ['жатка', 'жатки', 'zhatka', 'zhatky', 'жу-6', 'жзб'],
  'zhatka': ['жатка', 'жатки', 'zhatka', 'zhatky'],
  'zhatky': ['жатка', 'жатки', 'zhatka', 'zhatky'],

  'картопля': ['картопл', 'картоф', 'potato', 'картофел'],
  'картоплі': ['картопл', 'картоф', 'potato'],
  'картошка': ['картопл', 'картоф', 'potato'],
  'картофелеуборочный': ['картоплезбиральн', 'картопл', 'grimme'],

  'морква': ['моркв', 'морков', 'carrot'],
  'морковь': ['моркв', 'морков', 'carrot'],

  'буряк': ['буряк', 'свекл', 'beet'],
  'свекла': ['буряк', 'свекл', 'beet'],

  'цибуля': ['цибул', 'лук', 'onion'],
  'лук': ['цибул', 'лук', 'onion'],

  'транспортер': ['транспортер', 'стрічк', 'лент', 'полотно', 'прутков'],
  'лента': ['транспортер', 'стрічк', 'лент', 'прутков'],
  'стрічка': ['транспортер', 'стрічк', 'лент', 'прутков'],

  'підгортач': ['підгортач', 'гребнеутворювач', 'гребнеутворювачів', 'super', 'окучник'],
  'окучник': ['підгортач', 'гребнеутворювач', 'окучник', 'super'],

  'комбайн': ['комбайн', 'комбайна', 'combine', 'harvester', 'se-260', 'se 260'],
  'саджалка': ['саджалка', 'картоплесаджалка', 'planter', 'gl 32', 'gl 34']
};

/**
 * Expand a user query word into all known variants/synonyms
 */
function expandWordVariants(word) {
  const clean = word.toLowerCase().trim();
  if (!clean) return [];

  const variants = new Set([clean]);

  // Check direct synonym match
  if (SYNONYM_MAP[clean]) {
    SYNONYM_MAP[clean].forEach((v) => variants.add(v.toLowerCase()));
  }

  // Check partial keys in synonym map
  Object.entries(SYNONYM_MAP).forEach(([key, list]) => {
    if (clean.includes(key) || key.includes(clean)) {
      list.forEach((v) => variants.add(v.toLowerCase()));
    }
  });

  return Array.from(variants);
}

/**
 * Check if a machine matches a search query
 */
export function matchesSearch(machine, query) {
  if (!query || typeof query !== 'string' || !query.trim()) return true;

  const rawWords = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (rawWords.length === 0) return true;

  const searchableText = [
    machine.name || '',
    machine.brand || '',
    machine.model || '',
    machine.categoryName || '',
    machine.shortDescription || '',
    machine.fullDescription || '',
    machine.id || '',
    machine.slug || '',
    machine.badge || '',
    Object.values(machine.specs || {}).join(' ')
  ].join(' ').toLowerCase();

  // For every query word entered by the user, at least one of its variants must appear
  return rawWords.every((word) => {
    const variants = expandWordVariants(word);
    return variants.some((variant) => searchableText.includes(variant));
  });
}

/**
 * Standardized Filter Function
 */
export function filterMachinery(items, {
  activityType = 'all',
  machineryType = 'all',
  selectedBrand = 'all',
  selectedModel = 'all',
  selectedServiceType = 'all',
  searchTerm = '',
  sortBy = 'popular',
  currentCategoryType = null
}) {
  const filtered = items.filter((machine) => {
    // 1. Primary Category Filter (from URL route or filter bar)
    const activeMachineryType = currentCategoryType || machineryType;
    if (activeMachineryType && activeMachineryType !== 'all') {
      if (machine.machineryType !== activeMachineryType) {
        return false;
      }
    }

    // 2. Activity / Agricultural Operation Filter
    if (activityType && activityType !== 'all') {
      const mac = machine.activityType || '';
      if (activityType === 'soil_prep' || activityType === 'soil_preparation') {
        if (mac !== 'soil_prep' && mac !== 'soil_preparation') return false;
      } else if (mac !== activityType) {
        return false;
      }
    }

    // 3. Brand Filter (Flexible matching)
    if (selectedBrand && selectedBrand !== 'all') {
      const itemBrand = (machine.brand || '').toLowerCase();
      const targetBrand = selectedBrand.toLowerCase();
      if (!itemBrand.includes(targetBrand) && !targetBrand.includes(itemBrand)) {
        return false;
      }
    }

    // 4. Model Filter (Flexible matching)
    if (selectedModel && selectedModel !== 'all') {
      const itemModel = (machine.model || machine.name || '').toLowerCase();
      const targetModel = selectedModel.toLowerCase();
      if (!itemModel.includes(targetModel)) {
        return false;
      }
    }

    // 5. Search Query
    if (searchTerm && searchTerm.trim()) {
      if (!matchesSearch(machine, searchTerm)) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  return filtered.sort((a, b) => {
    if (sortBy === 'price_asc') {
      const priceA = a.pricing?.purchasePriceUah || a.pricing?.pricePerShiftUah || 0;
      const priceB = b.pricing?.purchasePriceUah || b.pricing?.pricePerShiftUah || 0;
      return priceA - priceB;
    }
    if (sortBy === 'price_desc') {
      const priceA = a.pricing?.purchasePriceUah || a.pricing?.pricePerShiftUah || 0;
      const priceB = b.pricing?.purchasePriceUah || b.pricing?.pricePerShiftUah || 0;
      return priceB - priceA;
    }
    if (sortBy === 'name_asc') {
      return (a.name || '').localeCompare(b.name || '', 'uk');
    }
    if (sortBy === 'power') {
      const powerA = parseInt((a.specs?.powerHp || '').replace(/\D/g, '')) || 0;
      const powerB = parseInt((b.specs?.powerHp || '').replace(/\D/g, '')) || 0;
      return powerB - powerA;
    }
    return 0; // 'popular' / default order
  });
}
