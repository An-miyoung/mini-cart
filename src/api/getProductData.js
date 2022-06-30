const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    const errData = await res.json();
    throw errData;
  } catch (e) {
    console.log(e);
  }
};

const getProductData = async () => {
  return await request('./api/productData.json');
};
export default getProductData;
