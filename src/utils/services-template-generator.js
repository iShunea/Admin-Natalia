import { saveAs } from 'file-saver';

export const generateServiceTemplate = (format = 'json') => {
  const templateData = {
    titleKey: '',
    price: '',
    titleEn: '',
    titleRo: '',
    titleRu: '',
    descriptionEn: '',
    descriptionRo: '',
    descriptionRu: '',
    metaDescriptionEn: '',
    metaDescriptionRo: '',
    metaDescriptionRu: '',
    metaKeywordsEn: '',
    metaKeywordsRo: '',
    metaKeywordsRu: '',
    featuresEn: '',
    featuresRo: '',
    featuresRu: ''
  };
  
  if (format === 'json') {
    const jsonStr = JSON.stringify(templateData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    saveAs(blob, 'service-template.json');
  } else if (format === 'markdown') {
    let markdown = '# Service Template\n\n';
    markdown += '## titleKey\n\n\n';
    markdown += '## price\n\n\n';
    markdown += '## titleEn\n\n\n';
    markdown += '## titleRo\n\n\n';
    markdown += '## titleRu\n\n\n';
    markdown += '## descriptionEn\n\n\n';
    markdown += '## descriptionRo\n\n\n';
    markdown += '## descriptionRu\n\n\n';
    markdown += '## metaDescriptionEn\n\n\n';
    markdown += '## metaDescriptionRo\n\n\n';
    markdown += '## metaDescriptionRu\n\n\n';
    markdown += '## metaKeywordsEn\n\n\n';
    markdown += '## metaKeywordsRo\n\n\n';
    markdown += '## metaKeywordsRu\n\n\n';
    markdown += '## featuresEn\n\nFeature 1\nFeature 2\n\n';
    markdown += '## featuresRo\n\nCaracteristică 1\nCaracteristică 2\n\n';
    markdown += '## featuresRu\n\nОсобенность 1\nОсобенность 2\n';
    const blob = new Blob([markdown], { type: 'text/markdown' });
    saveAs(blob, 'service-template.md');
  }
};
