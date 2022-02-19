const WARNING_MESSAGE_DURATION = 5000;

/**
 * Handler invoked when the calculate button is clicked
 */
function handleCalculateHacorScore() {
  const heartRateElement = document.getElementById('heartRate');
  const heartRatePoints = Number(heartRateElement.selectedIndex === 0 ? 0 : heartRateElement.querySelectorAll('option')[heartRateElement.selectedIndex].value);

  const pHElement = document.getElementById('pH');
  const pHPoints = Number(pHElement.selectedIndex === 0 ? 0 : pHElement.querySelectorAll('option')[pHElement.selectedIndex].value);

  const glasgowElement = document.getElementById('glasgow');
  const glasgowPoints = Number(glasgowElement.selectedIndex === 0 ? 0 : glasgowElement.querySelectorAll('option')[glasgowElement.selectedIndex].value);

  const pao2Fio2Element = document.getElementById('pao2Fio2');
  const pao2Fio2Points = Number(pao2Fio2Element.selectedIndex === 0 ? 0 : pao2Fio2Element.querySelectorAll('option')[pao2Fio2Element.selectedIndex].value);

  const rrElement = document.getElementById('rr');
  const rrPoints = Number(rrElement.selectedIndex === 0 ? 0 : rrElement.querySelectorAll('option')[rrElement.selectedIndex].value);

  if (heartRateElement.selectedIndex === 0 && pHElement.selectedIndex === 0 && glasgowElement.selectedIndex === 0 && pao2Fio2Element.selectedIndex === 0 && rrElement.selectedIndex === 0) {
    generateWarningMessage(
      'Please select values for generating HACOR score.'
    );
    return;
  } else if (heartRateElement.selectedIndex === 0 || pHElement.selectedIndex === 0 || glasgowElement.selectedIndex === 0 || pao2Fio2Element.selectedIndex === 0 || rrElement.selectedIndex === 0) {
    generateWarningMessage(
      'Some values have not been selected! Please select all values for accurate HACOR score.'
    );
  }

  const hacorScore = heartRatePoints + pHPoints + glasgowPoints + pao2Fio2Points + rrPoints;
  document.getElementById('hacorScore').innerHTML = hacorScore;
}

/**
 * Handler invoked when the clear button is clicked
 */
function handleClearSelections() {
  const selectElements = document.querySelectorAll('.form-select');
  for (const element of selectElements) {
    element.querySelectorAll('option')[0].selected = true;
  }
  document.getElementById('hacorScore').innerHTML = '';
  removeWarningMessage(0);
}

/**
 * Generates a temporary warning message for the form
 */
function generateWarningMessage(message) {
  const warningElement = document.getElementById('formWarning');
  requestAnimationFrame(() => {
    warningElement.innerHTML = message;
    warningElement.classList.add('form-warning-active');
  });

  removeWarningMessage(WARNING_MESSAGE_DURATION);
}

/**
 * Removes the warning message from the form with a timeout
 */
function removeWarningMessage(timeout = 0) {
  const warningElement = document.getElementById('formWarning');
  requestAnimationFrame(() => {
    if (timeout === 0) {
      warningElement.innerHTML = '';
      warningElement.classList.remove('form-warning-active');
    } else {
      setTimeout(() => {
        warningElement.innerHTML = '';
        warningElement.classList.remove('form-warning-active');
      }, timeout);
    }
  });
}
