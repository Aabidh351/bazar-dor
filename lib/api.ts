export async function getCatagories(){
    const apiData = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );
  return apiData.json();
}

export async function getProducts(){
    const apiData = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );
  return apiData.json();
}