import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const generateBlogTemplate = (format = 'excel') => {
  const templateData = {
    id: '',
    publishingDate: '',
    label: '',
    titleImagePath: '',
    titleImageAltTextEn: '',
    titleImageAltTextRo: '',
    titleImageAltTextRu: '',
    blogTitleEn: '',
    blogTitleRo: '',
    blogTitleRu: '',
    blogIntroEn: '',
    blogIntroRo: '',
    blogIntroRu: '',
    firstSubheadingTitleEn: '',
    firstSubheadingTitleRo: '',
    firstSubheadingTitleRu: '',
    firstSubheadingTextEn: '',
    firstSubheadingTextRo: '',
    firstSubheadingTextRu: '',
    secondSubheadingTitleEn: '',
    secondSubheadingTitleRo: '',
    secondSubheadingTitleRu: '',
    secondSubheadingTextEn: '',
    secondSubheadingTextRo: '',
    secondSubheadingTextRu: '',
    thirdSubheadingTitleEn: '',
    thirdSubheadingTitleRo: '',
    thirdSubheadingTitleRu: '',
    thirdSubheadingTextEn: '',
    thirdSubheadingTextRo: '',
    thirdSubheadingTextRu: '',
    conclusionEn: '',
    conclusionRo: '',
    conclusionRu: '',
    metaDescriptionEn: '',
    metaDescriptionRo: '',
    metaDescriptionRu: '',
    metaKeywordsEn: '',
    metaKeywordsRo: '',
    metaKeywordsRu: ''
  };
  
  if (format === 'excel') {
    const worksheet = XLSX.utils.json_to_sheet([templateData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Blog Template');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    saveAs(blob, 'blog-article-template.xlsx');
  } else if (format === 'json') {
    const jsonStr = JSON.stringify(templateData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    saveAs(blob, 'blog-article-template.json');
  } else if (format === 'markdown') {
    let markdown = '# Blog Article Template\n\n';
    Object.keys(templateData).forEach(key => {
      markdown += `## ${key}\n\n\n`;
    });
    const blob = new Blob([markdown], { type: 'text/markdown' });
    saveAs(blob, 'blog-article-template.md');
  }
};
