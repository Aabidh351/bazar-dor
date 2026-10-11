export async function getCatagories(){
    const apiData = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  return apiData.json();
}

export async function getProducts(){
    const apiData = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  return apiData.json();
}

export async function getSingleProduct(id:string){
  const apiData =  await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`);
    return apiData.json();
}