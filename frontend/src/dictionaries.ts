import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  'es-AR': () => import('./dictionaries/es-AR.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'es-AR') => dictionaries[locale]();
