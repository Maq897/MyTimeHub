  function appendNumber(number) {
    document.getElementById('display').value += number;  // Use '+=' to append the number to the current value
  }

  function appendOperator(operator) {
    document.getElementById('display').value += ' ' + operator + ' ';  // Adding spaces around operators for better clarity
  }

  function clearDisplay() {
    document.getElementById('display').value = '';  // Clear the display
  }

  function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);  // Use eval to compute the expression
    } catch {
        display.value = 'Error';  // Handle errors (e.g., invalid input)
    }
  }


// Science calculator's JS

  // Get the display element
  const display = document.getElementById("display1");

  // Function to append value to the display
  function appendValue(value) {
    display.value += value;
  }

  // Function to clear the display
  function clearDisplay() {
    display.value = "";
  }

  // Function to calculate the result
  function calculate() {
    try {
      // Evaluate the expression
      let result = eval(display.value);
      display.value = result;
    } catch (error) {
      display.value = "Error";
    }
  }

// the square and cubed

function sq() {
  
}