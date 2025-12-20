export const parseJSONService = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);

        // Convert features arrays to strings if they are arrays
        const featureFields = ['featuresEn', 'featuresRo', 'featuresRu', 'features'];
        featureFields.forEach(field => {
          if (Array.isArray(jsonData[field])) {
            jsonData[field] = jsonData[field].join('\n');
          }
        });

        // Ensure all expected fields exist (even if empty)
        const expectedFields = [
          'titleKey', 'price',
          'titleEn', 'titleRo', 'titleRu',
          'descEn', 'descRo', 'descRu',
          'metaDescriptionEn', 'metaDescriptionRo', 'metaDescriptionRu',
          'metaKeywordsEn', 'metaKeywordsRo', 'metaKeywordsRu',
          'featuresEn', 'featuresRo', 'featuresRu'
        ];

        expectedFields.forEach(field => {
          if (jsonData[field] === undefined) {
            jsonData[field] = '';
          }
        });

        console.log('Parsed JSON service data:', jsonData);
        resolve(jsonData);
      } catch (error) {
        console.error('JSON parse error:', error);
        reject(new Error('Invalid JSON format'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const parseMarkdownService = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const markdown = e.target.result;
        const service = {};

        const lines = markdown.split('\n');
        let currentField = null;
        let currentValue = '';

        lines.forEach(line => {
          const fieldMatch = line.match(/^##\s+(.+)$/);
          if (fieldMatch) {
            if (currentField) {
              service[currentField] = currentValue.trim();
            }
            currentField = fieldMatch[1].trim();
            currentValue = '';
          } else if (currentField) {
            currentValue += line + '\n';
          }
        });

        if (currentField) {
          service[currentField] = currentValue.trim();
        }

        // Ensure all expected fields exist (even if empty)
        const expectedFields = [
          'titleKey', 'price',
          'titleEn', 'titleRo', 'titleRu',
          'descEn', 'descRo', 'descRu',
          'metaDescriptionEn', 'metaDescriptionRo', 'metaDescriptionRu',
          'metaKeywordsEn', 'metaKeywordsRo', 'metaKeywordsRu',
          'featuresEn', 'featuresRo', 'featuresRu'
        ];

        expectedFields.forEach(field => {
          if (service[field] === undefined) {
            service[field] = '';
          }
        });

        console.log('Parsed Markdown service data:', service);
        resolve(service);
      } catch (error) {
        console.error('Markdown parse error:', error);
        reject(new Error('Failed to parse Markdown'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
