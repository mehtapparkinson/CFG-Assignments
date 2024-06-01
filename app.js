const startButton = document.getElementById("start-button");
const introContainer = document.querySelector(".intro-container");
const welcomeMessageArea = document.querySelector(".welcome-message");
const inputsContainer = document.querySelector(".inputs-container");
const inputDescription = document.getElementById("description");
const inputAmount = document.getElementById("amount");
const inputType = document.getElementById("type");
const addButton = document.getElementById("add-button");
const shiftButton = document.getElementById("shift-button");
const unshiftButton = document.getElementById("unshift-button");
const message = document.getElementById("message");
const totalIncome = document.querySelector(".total-income");
const totalExpenses = document.querySelector(".total-expenses");
const transactionsContainer = document.querySelector(".transactions");
const undoButton = document.getElementById("undo-button");
const appContainer = document.querySelector(".app-container");
const userNameInput = document.getElementById("user-name");
const totalBudgetArea = document.querySelector(".total-budget");

function startBudget() {
  const userNameandSurnameArray = userNameInput.value.split(" "); //Split used here
  const userName = userNameandSurnameArray[0];
  console.log(userName);
  if (userName) {
    appContainer.style.display = "block"; //style changed with JS
    introContainer.style.display = "none";
    const welcomeMessage = document.createElement("p");
    const formattedName = userName[0].toUpperCase() + userName.slice(1);
    console.log(`user ${formattedName} started budgeting app`);
    welcomeMessage.textContent = `Hi ${formattedName.trim()}, welcome to your budgeting app!`;
    welcomeMessageArea.appendChild(welcomeMessage);
  } else {
    alert("Please enter your name to start budgeting."); //allert used here
    const message = document.createElement("p");
    message.textContent = "Please enter your name";
    message.style.color = "red"; //style changed with JS
    message.style.fontWeight = "800";
    introContainer.appendChild(message);
  }
}

let transactionsArray = [];         //array created here

addButton.addEventListener("click", addTransaction);      //event listeners added
function addTransaction() {                             //created functions
  const description = inputDescription.value.trim();    //inputs listened here
  const amount = parseInt(inputAmount.value.trim());
  const type = inputType.value;
  if (description && amount && type) {  //if boolean used here
    message.textContent = "";
    const transaction = {
      description,
      amount,
      type,
    };
    transactionsArray.push(transaction);
    console.log(`User added a transaction`);
    showTransactions();
    calculateBudget();
    undoButton.style.display = "block";
    shiftButton.style.display = "block"; //style changed with JS
    unshiftButton.style.display = "block";
    addButton.textContent = "Add to the end"; //changed HTML with JS
  } else {
    message.textContent = "";
    const failedMessage = "Please fill all fields!";
    alert("Please fill all fields!");
    message.textContent = failedMessage;
    message.style.color = "red"; //style changed with JS
    message.style.fontWeight = "800";
  }
}

function showTransactions() {
  transactionsContainer.textContent = "";
  transactionsArray.forEach((element) => {
    //for each used here
    const transactionElement = document.createElement("p");  //changed HTML with JS
    transactionElement.classList.add("transaction");
    transactionElement.textContent = `${element.description}  -------------- ${element.amount}`;
    transactionElement.style.color =
      element.type === "income" ? "green" : "red"; //style changed with JS
    transactionsContainer.appendChild(transactionElement);
  });
}

function calculateBudget() {
  let totalIncomeValue = 0;
  let totalExpenseValue = 0;

  for (let index = 0; index < transactionsArray.length; index++) {
    //for loop here
    const element = transactionsArray[index];
    if (element.type === "income") {
      //if boolean used here
      totalIncomeValue = totalIncomeValue + element.amount;
    } else if (element.type === "expense") {
      totalExpenseValue = totalExpenseValue + element.amount;
    }
  }
  totalIncome.textContent = `Total Income: €${totalIncomeValue}`;
  totalExpenses.textContent = `Total Expenses: €${totalExpenseValue}`;
  totalBudgetArea.textContent = `Your Budget: ${
    totalIncomeValue - totalExpenseValue
  }`;
}

undoButton.addEventListener("click", undoTransaction);

function undoTransaction() {
  if (transactionsArray.length > 0) {
    //if comparison used here
    transactionsArray.pop(); //pop used here
    showTransactions();
    calculateBudget();
    console.log(`User removed a transaction`); //console logging messages
  }
  undoButton.style.display = transactionsArray.length > 0 ? "block" : "none"; //ternary operator used
}

shiftButton.addEventListener("click", removeFromBeginning);
function removeFromBeginning() {
  if (transactionsArray.length > 0) {
    transactionsArray.shift(); //shift used here
    showTransactions();
    calculateBudget();
    console.log(`User removed a transaction`);
  }
  shiftButton.style.display = transactionsArray.length > 0 ? "block" : "none";
}

unshiftButton.addEventListener("click", addToBeginning);
function addToBeginning() {
  const description = inputDescription.value.trim();
  const amount = parseInt(inputAmount.value);
  const type = inputType.value;
  if (description && amount && type) {
    const transaction = {
      description,
      amount,
      type,
    };
    transactionsArray.unshift(transaction); //unshift used here
    console.log(`User added a transaction`);
    showTransactions();
    calculateBudget();
  } else {
    message.textContent = "";
    const failedMessage = "Please fill all fields!";
    alert("Please fill all fields!");
    message.textContent = failedMessage;
    message.style.color = "red";
    message.style.fontWeight = "800";
  }
}
