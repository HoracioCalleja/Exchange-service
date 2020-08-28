import { getBases, getExchanges } from "./exchanges.js";

const d = document,
  $basesSelectOption = d.getElementById("bases"),
  $loader = d.querySelector(".loader"),
  $rates = d.querySelector(".exchange-rate");

function updateExchanges() {
  $loader.innerHTML = `<img src="../assets/tail-spin.svg" />`;
  $rates.textContent = "";
}

export async function printExchanges(base, date) {
  updateExchanges();
  let $fragment = d.createDocumentFragment();
  let exchanges = await getExchanges(base, date);
  $loader.textContent = " ";
  exchanges.rates.forEach((rate) => {
    let $li = d.createElement("li");
    $li.className = "list-group-item my-2 bg-primary border border-dark";
    $li.innerHTML = `<b>${rate}</b>`;
    $fragment.appendChild($li);
  });
  $rates.appendChild($fragment);
}

export async function fillSelectOptions() {
  const $fragment = d.createDocumentFragment();
  let bases = await getBases();
  bases.sort().forEach((base, index) => {
    let $option = d.createElement("option");
    $option.value = base.toUpperCase();
    $option.textContent = base.toUpperCase();
    if (index === 0) {
      $option.selected = true;
    }
    $fragment.appendChild($option);
  });
  $basesSelectOption.appendChild($fragment);
}
