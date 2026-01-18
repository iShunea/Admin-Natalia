import runtimeConfig from '../config/runtime-config';

const urlToFileImage = async (url) => {
  const response = await fetch(runtimeConfig.API_URL + url);
  const blob = await response.blob();
  const fileName = url.split('/').pop();
  const mimeType = blob.type || 'image/jpeg'; // Default to 'image/jpeg' if type is not available
  return new File([blob], fileName, { type: mimeType });
};

const returnImageObject = (value) => {
  const isImageObject = (obj) => {
    return obj && obj.type && obj.type.startsWith('image/');
  };

  const fetchFile = async (file) => {
    const convertedFile = await urlToFileImage(file);
    return convertedFile;
  };

  if (isImageObject(value)) {
    return value;
  }

  if (value && typeof value === 'string') {
    // For relative paths, convert to File object
    if (value.startsWith('/')) {
      return fetchFile(value);
    }
    // For absolute URLs (R2/external), return as-is (string)
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }
  }

  return null;
};

export default returnImageObject;
