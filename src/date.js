const $date = document.getElementById("date");

export default function setUpDate() {

  let today = new Date().toISOString();
  today = today.substring(0,today.indexOf("T"));

  $date.setAttribute("max",today);
  $date.value = today;

}
