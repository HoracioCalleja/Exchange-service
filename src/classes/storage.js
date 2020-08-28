export default function checkCache(keyCache){
  try{
    let cachedItem = localStorage.getItem(keyCache);
    if(cachedItem) return cachedItem;
    throw Error(`No existe la clave ${keyCache}`);
  }catch(e){
    // console.error(e);
    return;
  }
}
