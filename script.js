
// Tom array
let activityArray = [];

const activityEl = document.getElementById('activityName');
const categoryEl = document.getElementById('activityCategory')
const button = document.getElementById('addBtn');
const selectEl = document.getElementById('categoryFilter');
const bucketForm = document.getElementById('bucketForm');

bucketForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Mitt object
  const activityItem = {
    name: activityEl.value,
    category: categoryEl.value
  };

  // Pusha object till array
  activityArray.push(activityItem);

  // Reset input
  activityEl.value = "";
  categoryEl.value = "";

})

// Lägg till ny aktivitet
function addListeners() {
  button.addEventListener('click', addEntry, false);
  selectEl.addEventListener('change', filterEntries, false);
}

function addEntry() {
  let inputValue = activityEl.value
  let inputValue2 = categoryEl.value;

  // Lägg till en ny rad
  let table = document.getElementById('bucketTable');
  let trEl = document.createElement('tr');
  table.appendChild(trEl);

  //checkbox ruta
  let checkboxEl = document.createElement('input');
  checkboxEl.type = "checkbox";
  checkboxEl.addEventListener('click', done, false);
  let tdEl1 = document.createElement('td');
  tdEl1.appendChild(checkboxEl);
  trEl.appendChild(tdEl1);

  // Namnen på aktiviteterna
  let tdEl2 = document.createElement('td');
  tdEl2.innerText = inputValue;
  trEl.appendChild(tdEl2);

  // Category cell - VIsar de olika kategorierna
  let tdEl3 = document.createElement('td');
  tdEl3.innerText = inputValue2;
  trEl.appendChild(tdEl3);

  // delete cell genom att trycka på soptunnan
  let spanEl = document.createElement('span');
  spanEl.innerText = "delete";
  spanEl.classList = "material-symbols-outlined";
  spanEl.addEventListener('click', deleteItem, false);
  let tdEl4 = document.createElement('td');
  tdEl4.appendChild(spanEl);
  trEl.appendChild(tdEl4);

  function deleteItem(event) {
    const row = event.target.closest('tr');
    row.remove();
  }

  // Klarmarkerar genom att klicka i checkboxen
  function done(event) {
    const row = event.target.closest('tr');
    row.classList.toggle('strike');
  }
}

// Här är filtreringen där användaren kan välja att se alla kategorier eller samtliga
function filterEntries() {
  let selection = selectEl.value;

  let rows = document.getElementsByTagName('tr');
  Array.from(rows).forEach((row, index) => {
    if (index === 0) 
      return; 

    if (selection === "") {
      row.style.display = "";
    } else {
      
      let category = row.getElementsByTagName('td')[2].innerText.trim();

      if (category === selection) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
}

addListeners();