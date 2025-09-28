export const getBlob = (Data: any): Promise<Blob | null> => {
  return new Promise((resolve) => {
    Data.toBlob((blob: Blob) => {
      resolve(blob);  
    }, 'image/jpeg', 0.9);
  });
};
