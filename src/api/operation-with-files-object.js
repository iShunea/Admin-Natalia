// Function to convert File object to Data URL
export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Recursive function to iterate through the object and handle File objects
async function convertObjectWithBase64(obj) {
  if (Array.isArray(obj)) {
    // Handle arrays: Map over array and return a new array
    return await Promise.all(
      obj.map(async (item) => {
        return await convertObjectWithBase64(item);
      })
    );
  } else if (typeof obj === 'object' && obj !== null) {
    // Handle objects: Map over object keys and return a new object
    const newObj = {};
    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (value instanceof File) {
        // If the value is a File, convert it to base64
        newObj[key] = await convertFileToBase64(value);
      } else {
        // Otherwise, recurse
        newObj[key] = await convertObjectWithBase64(value);
      }
    }
    return newObj;
  } else {
    // Return primitive values as-is
    return obj;
  }
}

export async function getAxiosObject(obj) {
  // const convertedObject = await convertObjectWithBase64(obj);
  const convertedObject = JSON.stringify(await convertObjectWithBase64(obj));
  console.log("converted obj:", convertedObject);
  return obj;
}
