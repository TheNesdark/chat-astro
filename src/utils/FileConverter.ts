  export const getBlob = (Data): Promise<Blob | null> => {
    return new Promise((resolve) => {
      Data.toBlob((blob) => {
        resolve(blob);  
      }, 'image/jpeg', 0.9);
    });
  };
