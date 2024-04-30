let display = document.getElementById('display');
let historyList = document.getElementById('history-list');

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLastDigit() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;
    let result = eval(expression);
    display.value = result;
    saveToHistory(expression + " = " + result);
  } catch (error) {
    display.value = 'Error';
  }
}

function saveToHistory(operation) {
  let listItem = document.createElement('li');
  listItem.textContent = operation;
  historyList.appendChild(listItem);

  // Guardar en localStorage
  let history = localStorage.getItem('history');
  if (history) {
    history = JSON.parse(history);
  } else {
    history = [];
  }
  history.push(operation);
  localStorage.setItem('history', JSON.stringify(history));
}


// Cargar historial desde localStorage al cargar la página
window.onload = function() {
  let history = localStorage.getItem('history');
  if (history) {
    history = JSON.parse(history);
    history.forEach(operation => {
      let listItem = document.createElement('li');
      listItem.textContent = operation;
      historyList.appendChild(listItem);
    });
  }
};

// Borrar el historial
function borrarHistorial() {
  localStorage.removeItem('history');
  historyList.innerHTML = ''; // Limpiar la lista en la interfaz
}


