/* TODO:
    1. HTML element creation
    2. GRID system
    3. "Screen" div that takes numbers and calculations
    4. Function that adds numbers to the screen
    5. Functions that do the different operations (+, -, *, /)
    6. Function that clears the screen
    7. Function that deletes the last input
    8. Click event handlers
    9. Keyboard press event handlers
*/


// Get HTML elements
mainContainer = document.querySelector("#main-container");


// Variables and arrays
const calculatorKeysArray = [
  {
    text: "",
    class: "calculator__key calculator__key--clear"
  },
  {
    text: "<-",
    class: "calculator__key calculator__key--backspace"
  },
  {
    text: "/",
    class: "calculator__key calculator__key--divide"
  },
  {
    text: "7",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "8",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "9",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "*",
    class: "calculator__key calculator__key--multiply"
  },
  {
    text: "4",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "5",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "6",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "-",
    class: "calculator__key calculator__key--subtract"
  },
  {
    text: "1",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "2",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "3",
    class: "calculator__key calculator__key--number"
  },
  {
    text: "+",
    class: "calculator__key calculator__key--add"
  },
  {
    text: "0",
    class: "calculator__key calculator__key--zero"
  },
  {
    text: ".",
    class: "calculator__key calculator__key--decimal"
  },
  {
    text: "=",
    class: "calculator__key calculator__key--equal"
  }
];


// 3. Main logic
const createHTML = () => {
    let keyHTML = ``;

    calculatorKeysArray.forEach(key => {
            keyHTML += `
                <button class="${key.class}">${key.text}</button>
            `;
    });

    let htmlText = `
        <div class="calculator__container">
        <div class="calculator__title">Kasyo-1983</div>
            <div class="calculator__displayFrame">
                <div class="calculator__displayScreen">0</div>
            </div>
            <div class="calculator__keypad">${keyHTML}</div>
        </div>
    `;

    mainContainer.innerHTML = htmlText;
};
createHTML();

/* Get generated HTML elements*/
const displayScreen = document.querySelector(".calculator__displayScreen");
const calculatorKeys = document.querySelectorAll(".calculator__key");
const equalBtn = document.querySelector(".calculator__key--equal");
const backspaceBtn = document.querySelector(".calculator__key--backspace");
const subtractBtn = document.querySelector(".calculator__key--subtract");
const addBtn = document.querySelector(".calculator__key--add");
const divideBtn = document.querySelector(".calculator__key--divide");
const multiplyBtn = document.querySelector(".calculator__key--multiply");
const clearBtn = document.querySelector(".calculator__key--clear");

//let currentNumber = "";

const setEventListeners = () => {

    calculatorKeys.forEach(key => {
        key.addEventListener("click", event => {

            displayScreen.style.color = "var(--displayScreenText)";

            const keyElement = event.target.closest("button");

            if (key.classList.contains("calculator__key--clear")) {
                clearDisplay();
            } else if (key.classList.contains("calculator__key--backspace")) {
                backspace();
            } else if (key.classList.contains("calculator__key--equal")) {
                calculate();
            } else {

                let keyText = keyElement.textContent;

                if (displayScreen.textContent === "0" && keyText !== ".") {
                    displayScreen.textContent = keyText;
                } else {
                    displayScreen.textContent += keyText;
                }
            }
        });
    });
};

setEventListeners();


const calculate = () => {
    try {
        const currentValue = displayScreen.innerHTML;
        const result = eval(currentValue);
        displayScreen.innerHTML = result;
        //currentNumber = result.toString();
    } catch (error) {
        displayScreen.innerHTML = "ERROR";
        displayScreen.style.color = "rgb(255, 67, 67)";
    };
};

const clearDisplay = () => {
    //currentNumber = "0";
    displayScreen.innerHTML = "0";
}

const backspace = () => {
    const currentValue = displayScreen.innerHTML;
    const newValue = displayScreen.innerHTML.slice(0, -1);
    if (newValue.length === 0) {
        displayScreen.innerHTML = "0";
    } else {
        displayScreen.innerHTML = newValue;
    }
};



// 4. Support functions

// 5. Event setting
document.addEventListener("keydown", event => {

    displayScreen.style.color = "var(--displayScreenText)";

    if (event.key === "Enter") {
        event.preventDefault();
        calculate();
        equalBtn.focus();
    };

    if (event.key === "Backspace") {
        event.preventDefault();
        backspace();
        backspaceBtn.focus();
    };

    if (event.key === "Escape") {
        event.preventDefault();
        clearDisplay();
        clearBtn.focus();
    };

    if (event.key >= "0" && event.key <= "9") {
        if (displayScreen.textContent === "0") {
            displayScreen.textContent = event.key;
        } else {
            displayScreen.textContent += event.key;
        }
    };

    if (event.key === "/") {
        displayScreen.textContent += "/";
    } else if (event.key === "*") {
        displayScreen.textContent += "*";
    } else if (event.key === "-") {
        displayScreen.textContent += "-";
    } else if (event.key === "+") {
        displayScreen.textContent += "+";
    };

});