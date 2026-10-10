export async function getCatagories(){
    const apiData = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  return apiData.json();
}