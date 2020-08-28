import { fillSelectOptions, printExchanges } from "./ui.js";
import setUpDate from "./date.js";

const d = document;

d.addEventListener("DOMContentLoaded", () => {
  fillSelectOptions();
  setUpDate();
});

d.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches(".exchange-form")) {
    printExchanges(e.target.bases.value, e.target.date.value);
  }
});








