import { saveAs } from 'file-saver';

export const generateServiceTemplate = (format = 'json') => {
  const templateData = {
    // Basic Info
    titleKey: 'example-service-slug',
    price: '500 MDL',

    // Service Title (multilingual)
    titleEn: 'Service Title in English',
    titleRo: 'Titlul Serviciului in Romana',
    titleRu: 'Название услуги на русском',

    // Service Description (multilingual)
    descEn: 'Full description of the service in English. Explain what the service includes, benefits, and any important details.',
    descRo: 'Descrierea completa a serviciului in romana. Explicati ce include serviciul, beneficiile si orice detalii importante.',
    descRu: 'Полное описание услуги на русском языке. Объясните, что включает услуга, преимущества и важные детали.',

    // Features (multilingual) - one per line or as array
    featuresEn: 'Feature 1\nFeature 2\nFeature 3',
    featuresRo: 'Caracteristica 1\nCaracteristica 2\nCaracteristica 3',
    featuresRu: 'Особенность 1\nОсобенность 2\nОсобенность 3',

    // SEO Meta Description (multilingual) - max 160 characters
    metaDescriptionEn: 'Brief SEO description for search engines (max 160 characters)',
    metaDescriptionRo: 'Scurta descriere SEO pentru motoarele de cautare (max 160 caractere)',
    metaDescriptionRu: 'Краткое SEO описание для поисковых систем (макс 160 символов)',

    // SEO Meta Keywords (multilingual)
    metaKeywordsEn: 'keyword1, keyword2, keyword3',
    metaKeywordsRo: 'cuvant1, cuvant2, cuvant3',
    metaKeywordsRu: 'ключ1, ключ2, ключ3'
  };

  if (format === 'json') {
    const jsonStr = JSON.stringify(templateData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    saveAs(blob, 'service-template.json');
  } else if (format === 'markdown') {
    let markdown = '# Service Template\n\n';
    markdown += '> BASIC INFO\n\n';

    markdown += '## titleKey\n';
    markdown += 'example-service-slug\n\n';

    markdown += '## price\n';
    markdown += '500 MDL\n\n';

    markdown += '> SERVICE TITLE (Multilingual)\n\n';

    markdown += '## titleEn\n';
    markdown += 'Service Title in English\n\n';

    markdown += '## titleRo\n';
    markdown += 'Titlul Serviciului in Romana\n\n';

    markdown += '## titleRu\n';
    markdown += 'Название услуги на русском\n\n';

    markdown += '> SERVICE DESCRIPTION (Multilingual)\n\n';

    markdown += '## descEn\n';
    markdown += 'Full description of the service in English. Explain what the service includes, benefits, and any important details.\n\n';

    markdown += '## descRo\n';
    markdown += 'Descrierea completa a serviciului in romana. Explicati ce include serviciul, beneficiile si orice detalii importante.\n\n';

    markdown += '## descRu\n';
    markdown += 'Полное описание услуги на русском языке. Объясните, что включает услуга, преимущества и важные детали.\n\n';

    markdown += '> FEATURES (Multilingual) - One per line\n\n';

    markdown += '## featuresEn\n';
    markdown += 'Feature 1\n';
    markdown += 'Feature 2\n';
    markdown += 'Feature 3\n\n';

    markdown += '## featuresRo\n';
    markdown += 'Caracteristica 1\n';
    markdown += 'Caracteristica 2\n';
    markdown += 'Caracteristica 3\n\n';

    markdown += '## featuresRu\n';
    markdown += 'Особенность 1\n';
    markdown += 'Особенность 2\n';
    markdown += 'Особенность 3\n\n';

    markdown += '> SEO META DESCRIPTION (Multilingual) - Max 160 characters\n\n';

    markdown += '## metaDescriptionEn\n';
    markdown += 'Brief SEO description for search engines (max 160 characters)\n\n';

    markdown += '## metaDescriptionRo\n';
    markdown += 'Scurta descriere SEO pentru motoarele de cautare (max 160 caractere)\n\n';

    markdown += '## metaDescriptionRu\n';
    markdown += 'Краткое SEO описание для поисковых систем (макс 160 символов)\n\n';

    markdown += '> SEO META KEYWORDS (Multilingual)\n\n';

    markdown += '## metaKeywordsEn\n';
    markdown += 'keyword1, keyword2, keyword3\n\n';

    markdown += '## metaKeywordsRo\n';
    markdown += 'cuvant1, cuvant2, cuvant3\n\n';

    markdown += '## metaKeywordsRu\n';
    markdown += 'ключ1, ключ2, ключ3\n';

    const blob = new Blob([markdown], { type: 'text/markdown' });
    saveAs(blob, 'service-template.md');
  }
};
