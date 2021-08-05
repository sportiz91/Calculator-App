//Class calculator
class Calculator {
  //Constructor method is mandatory. If not determined, is gonna be auto-completed with null values. In this case, we use it to initialize
  //currentOperandTextElement and previousOperandTextElement properties (which contains the divs of the display). We are gonna use those properties
  //when updating displays divs innerText. We execute this.reset() method too, which in turn let us create currentOperand and previousOperand ->
  //properties used to concatenate the string number.
  constructor(currentOperandTextElement, previousOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement; //creating calculator.currentOperandTextElement propertie which is the div.
    this.previousOperandTextElement = previousOperandTextElement; //this properties are gonna be used to modify the text of the div (in conjuction with
    //innerText). For example. this.currentOperandTextElement.innerText = something.
    this.reset(); //when we load the page, we reset the display
  }

  //this method is executed when someone clicks reset button or when page is loaded. When page is loaded in order to create the calculator.currentOperand
  //calculator.previousOperand and calculator.operation. When user clicks reset button, to clear display.
  reset() {
    this.currentOperand = ""; //when we load the page, property calculator.currentOperand and calculator.previousOperand are created with "" values.
    this.previousOperand = "";
    this.operation = null; //same for operation.
    this.currentOperandTextElement.innerText = "";
    this.previousOperandTextElement.innerText = "";
  }

  appendNumber(string) {
    if (
      this.currentOperandTextElement.innerText == "NaN. Press DEL and restart"
    )
      return;
    if (string === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += string.toString();
  }

  updateDisplay() {
    if (this.currentOperand == "NaN. Press DEL and restart") {
      this.currentOperandTextElement.innerText = "NaN. Press DEL and restart";
      this.currentOperandTextElement.style.fontSize = "1.6rem";
      return;
    }

    const totalNumber = this.currentOperand.toString();
    const integerPart = parseFloat(totalNumber.split(".")[0]); // "." gives NaN. "" gives NaN
    const decimalPart = totalNumber.split(".")[1]; // "." gives "". "" gives undefined == null
    let toDisplay;

    if (isNaN(integerPart)) {
      if (decimalPart == "") {
        toDisplay = ".";
        this.currentOperandTextElement.innerText = toDisplay;
        return;
      } else if (decimalPart == null) {
        toDisplay = "";
        this.currentOperandTextElement.innerText = toDisplay;
        return;
      } else if (decimalPart != null) {
        toDisplay = `.${decimalPart}`;
        this.currentOperandTextElement.innerText = toDisplay;
        return;
      }
    }

    if (decimalPart == null) {
      toDisplay = integerPart.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
      this.currentOperandTextElement.innerText = toDisplay;
      return;
    } else {
      toDisplay = `${integerPart.toLocaleString("en", {
        maximumFractionDigits: 0,
      })}.${decimalPart}`;
      this.currentOperandTextElement.innerText = toDisplay;
      return;
    }
  }

  equal() {
    if (this.currentOperand == ".") return;
    if (
      this.currentOperand === "0" &&
      this.previousOperand.toString() === "0"
    ) {
      this.reset();
      this.currentOperand = "NaN. Press DEL and restart";
      return;
    }
    if (this.currentOperand !== "" && this.previousOperand !== "") {
      this.computation(
        this.previousOperand,
        this.currentOperand,
        this.operation
      );
      this.previousOperand = "";
      this.operation = null;
    }
  }

  oper(symbol) {
    if (
      this.currentOperandTextElement.innerText == "NaN. Press DEL and restart"
    )
      return;
    if (this.previousOperand === "" && this.currentOperand === "") return;
    if (this.currentOperand == ".") return;

    //in this case, we have to put !== because 0 == "". So, in case you want to do 10 - 10 and then result - 10.
    //you gonna have problems.
    if (this.currentOperand !== "") {
      if (this.previousOperand !== "") {
        if (
          this.currentOperand.toString() === "0" &&
          this.previousOperand.toString() === "0"
        ) {
          this.reset();
          this.currentOperand = "NaN. Press DEL and restart";
          return;
        } else {
          this.computation(
            this.previousOperand,
            this.currentOperand,
            this.operation
          );
          this.operation = symbol;
          this.previousOperandTextElement.innerText = `${this.currentOperandTextElement.innerText} ${this.operation}`;
          this.currentOperand = "";
        }
      } else {
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        this.operation = symbol;
        this.previousOperandTextElement.innerText = `${this.currentOperandTextElement.innerText} ${this.operation}`;
      }
    }
  }

  computation(previous, current, operation) {
    let result;
    let numPrevious = parseFloat(previous);
    let numCurrent = parseFloat(current);
    switch (operation) {
      case "+":
        result = numPrevious + numCurrent;
        break;

      case "-":
        result = numPrevious - numCurrent;
        break;

      case "x":
        result = numPrevious * numCurrent;
        break;

      case "/":
        result = numPrevious / numCurrent;
        break;

      default:
        return;
    }

    this.reset();
    this.currentOperand = result;
    this.previousOperand = result;
    this.updateDisplay();
  }

  deleteNumber() {
    if (
      this.currentOperandTextElement.innerText == "NaN. Press DEL and restart"
    )
      return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
}

//DOM Queries:
const numbersButton = document.querySelectorAll("[number-button]"); //nodeList
const operationButton = document.querySelectorAll("[operation-button]"); //nodeList
const deleteButton = document.querySelector("[delete-button]"); //button
const resetButton = document.querySelector("[reset-button]"); //button
const equalButton = document.querySelector("[equal-button]"); //button
const previousOperandTextElement = document.querySelector("[previous-operand]"); //div
const currentOperandTextElement = document.querySelector("[current-operand]"); //div

//Creating new calculator object (defined through Class)
const calculator = new Calculator(
  currentOperandTextElement,
  previousOperandTextElement
);

//DOM Event Listeners:

//When pressing a number or "." (from now on, decimal).
numbersButton.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText); //appending number to the number string
    calculator.updateDisplay(); //updating display with the correct format
  });
});

//When pressing an operationButton (+ - * /)
operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.oper(operation.innerText);
    calculator.updateDisplay();
  });
});

//When pressing DEL button
deleteButton.addEventListener("click", () => {
  calculator.deleteNumber();
  calculator.updateDisplay();
});

//When pressing RESET button
resetButton.addEventListener("click", () => {
  calculator.reset();
  calculator.updateDisplay();
});

//When pressing EQUAL button
equalButton.addEventListener("click", () => {
  calculator.equal();
  calculator.updateDisplay();
});
