import Exchange from "./classes/exchange.js";
import checkCache from "./classes/storage.js";

const URL = `https://api.exchangeratesapi.io`;

async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    if (!response.ok) throw { status: response.status };
    return data;
  } catch (error) {
    alert(`Eror ${error.status}`);
  }
}


export async function getExchanges(base = "EUR", date = "latest") {

  let keyCache = `${base}_${date}`;
  let cachedExchange = checkCache(keyCache)
  if(cachedExchange) return JSON.parse(cachedExchange);

  let exchangesData = await fetchData(`${URL}/${date}?base=${base}`);

  let rates = Object.entries(exchangesData.rates).map(rate => `${rate.join(" <-----> $")}`)

  console.log(rates)

  let exchange = new Exchange(base,date,rates)

  localStorage.setItem(keyCache,JSON.stringify(exchange));

  return exchange;
}

export async function getBases() {
  
  let cachedBases = checkCache("bases");
  if(cachedBases) return JSON.parse(cachedBases);

  let data = await fetchData("https://api.exchangeratesapi.io/latest");
  let bases = Object.keys(data.rates).map((key) => key);
  bases.push(data.base);
  
  localStorage.setItem("bases",JSON.stringify(bases));

  return bases;
}
