class Calculator {
  constructor() {
    this.PI = Math.PI;
    this.E = Math.E;
    this.resultValue = "0";
    this.error = null; // Initialize error to null
    this.previousOperator = null; // Initialize previousOperator to null
    

   

   // Falls der Code in der Node.js-Umgebung ausgeführt wird, verwenden Sie die Konsole für die Ausgabe
   if (typeof document !== "undefined") {
  
    this.resultArea = document.getElementById("resultArea"); // Get the result area element
    this.resultValue = "0"; // Standardmäßig "0" anzeigen
      this.updateResult(); // Initialisiere das Ergebnisfeld mit "0"
    }
  }

  appendToResult(value) {
    if (value === "." && this.resultValue === "0") {
      // Wenn "." gedrückt wird und das Ergebnisfeld "0" ist, setzen wir "0." in das Ergebnisfeld
      this.resultValue = "0" + value;
    } else if (value === "." && this.resultValue.includes(".")) {
      // Wenn der Wert "." ist und bereits ein Punkt im Ergebnis vorhanden ist, ignorieren wir den Punkt
      return;
    } else if (this.resultValue === "0") {
      // Wenn das Ergebnisfeld "0" ist und der gedrückte Wert nicht ".", setzen wir den Wert direkt ein
      this.resultValue = value;
    } else {
      // Ansonsten aktualisieren Sie das Ergebnisfeld basierend auf der Eingabe
      this.resultValue += value;
    }
  
    this.clearError(); // Lösche den Fehler, bevor eine neue Eingabe hinzugefügt wird
  
    if (/[\+\-\*\/]/.test(value)) {
      // Wenn ein Operator eingegeben wurde
      if (/[\+\-\*\/]/.test(this.resultValue.slice(-1))) {
        // Wenn der letzte Eintrag im Ergebnis ebenfalls ein Operator ist
        this.resultValue = this.resultValue.slice(0, -1); // Entfernen wir den letzten Operator
      }
     
    }
  
    this.updateResult();
  }

  clearError() {
    this.error = null;
    this.updateResult();
  }

  clearResult() {
    this.resultValue = ""; // Clear the result value
   

    this.updateResult(); // Update the result area to clear the displayed result
  }

  convertOperator(operator) {
    if (operator === '÷') return '/';
   
    return operator;
  }

  calculate(operator) {

    operator = this.convertOperator(operator);
 
    if (operator === "=") {
      
      if (this.previousOperator !== "=") {
        try {
          const result = this.evaluateExpression(this.resultValue);
          this.resultValue = result.toString();
          
   
        } catch (error) {
          this.resultValue = "ERROR";
        }
      }
    } else if (operator === 'sqrt') {
      try {
        const value = this.evaluateExpression(this.resultValue);
        if (value < 0) {
          throw new Error("ÜNGÜLTIGE EINGABE");
        }
        const result = Math.sqrt(value);
        this.resultValue = result.toString();
      } catch (error) {
        this.resultValue = "ÜNGÜLTIGE EINGABE";
      }
    } else if (operator === 'percentage') {
      try {
        const result = this.evaluateExpression(this.resultValue) / 100;
        this.resultValue = result.toString();
      } catch (error) {
        this.resultValue = "ERROR";
      }
    } else {
      if (this.resultValue !== "" && /[\+\-\*\/]/.test(this.resultValue.slice(-1))) {
        // Wenn der letzte Eintrag im Ergebnis ebenfalls ein Operator ist
        this.resultValue = this.resultValue.slice(0, -1); // Entfernen wir den letzten Operator
      }
      this.resultValue += operator.trim();
    }
    this.previousOperator = operator; // Speichere den aktuellen Operator als vorherigen Operator
   
    this.updateResult();
  }

  updateResult() {
    if (this.error) {
      
      this.resultArea.innerText = ""; // Clear the result area if there's an error
    } else {
      
      this.resultArea.innerText = this.resultValue; // Display the result
    }
  }

  evaluateExpression(expression) {
    return Function('"use strict";return (' + expression + ')')();
  }

  percentage(x, y) {
    if (y === 0) {
      return 'Error: Divisor cannot be zero';
    }
    const percentageValue = (x / y) * 100;
    return `${percentageValue}%`;
  }


  // This Methods are for the node environment
  add(x, y) {
    return x + y;
  }

  subtract(x, y) {
    return y - x;
  }

  multiply(x, y) {
    return x * y;
  }

  divide(x, y) {
    if (y === 0) {
      return 'Error: Divisor cannot be zero';
    }
    return x / y;
  }

  remainder(x, y) {
    if (y === 0) {
      return 'Error: Divisor cannot be zero';
    }
    return x % y;
  }

  elevate(x, y) {
    return Math.pow(x, y);
  }

  sqrt(x) {
    if (x < 0) {
      return 'Error: Cannot calculate the square root of a negative number';
    }
    return Math.sqrt(x);
  }
}
  const calculator = new Calculator();
  
  // Funktionen für die Tasten des Taschenrechners


  function appendToResult(value) {
    calculator.appendToResult(value);
  }

  function calculate(operator) {
    calculator.calculate(operator);
  }





  
   // Testing the Calculator class
  const calc = new Calculator();
  
  console.log(calc.percentage(250, 500)); // 50%
  console.log(calc.percentage(3, 0)); // infinity
  console.log(calc.add(5, 7)); // 12
  console.log(calc.subtract(5, 7)); // 2
  console.log(calc.multiply(5, 7)); // 35
  console.log(calc.divide(35, 7)); // 5
  console.log(calc.remainder(7, 5)); // 2
  console.log(calc.elevate(5, 3)); // 125
  console.log(calc.sqrt(25)); // 5
  console.log(calc.sqrt(-25)); // error
  console.log(calc.add(1, 1));



  



  
  























  
  

  