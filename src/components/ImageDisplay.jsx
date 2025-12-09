import { convertFileToBase64 } from 'api/operation-with-files-object';
import { useEffect, useState } from 'react';

const ImageDisplay = ({ file }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    if (file && file instanceof File) {
      convertFileToBase64(file)
        .then((src) => setImageSrc(src))
        .catch((error) => console.error('Error reading file:', error));
    }
  }, [file]);

  return <div>{imageSrc ? <img src={imageSrc} alt="Review" style={{ height: '200px' }} /> : <p>No image available</p>}</div>;
};

export default ImageDisplay;
