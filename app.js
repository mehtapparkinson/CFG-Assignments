const startButton = document.getElementById("start-button");
const introContainer = document.querySelector(".intro-container");
const welcomeMessageArea = document.querySelector(".welcome-message");
const inputsContainer = document.querySelector(".inputs-container");
const inputDescription = document.getElementById("description");
const inputAmount = document.getElementById("amount");
const inputType = document.getElementById("type");
const addButton = document.getElementById("add-button");
const message = document.getElementById("message");
const totalIncome = document.querySelector(".total-income");
const totalExpenses = document.querySelector(".total-expenses");
const transactionsContainer = document.querySelector(".transactions");
const undoButton = document.getElementById("undo-button");
const appContainer = document.querySelector(".app-container");
const userNameInput = document.getElementById("user-name");
const totalBudgetArea = document.querySelector('.total-budget');

function startBudget() {
  const userNameandSurnameArray = userNameInput.value.split(' '); //Split used here
  const userName = userNameandSurnameArray[0];
  console.log(userName)
  if (userName) {
    appContainer.style.display = "block";
    introContainer.style.display = "none";
    const welcomeMessage = document.createElement("p");
    const formattedName = userName[0].toUpperCase() + userName.slice(1);
    console.log(`user ${formattedName} started budgeting app`);
    welcomeMessage.textContent = `Hi ${formattedName.trim()}, welcome to your budgeting app!`;
    welcomeMessageArea.appendChild(welcomeMessage);
  } else {
    alert("Please enter your name to start budgeting.");
    const message = document.createElement("p");
    message.textContent = "Please enter your name";
    message.style.color = "red";
    message.style.fontWeight = "800";
    introContainer.appendChild(message);
  }
}

let transactionsArray = [];

addButton.addEventListener("click", addTransaction);
function addTransaction() {
  const description = inputDescription.value.trim();
  const amount = parseInt(inputAmount.value.trim());
  const type = inputType.value;
  if (description && amount && type) {
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
  } else {
    message.textContent = "";
    const failedMessage = "Please fill all fields!";
    alert("Please fill all fields!");
    message.textContent = failedMessage;
    message.style.color = "red";
    message.style.fontWeight = "800";
  }
}

function showTransactions() {
  transactionsContainer.textContent = "";
  transactionsArray.forEach((element) => {
    const transactionElement = document.createElement("p");
    transactionElement.classList.add("transaction");
    transactionElement.textContent = `${element.description}  -------------- ${element.amount}`;
    transactionElement.style.color =
      element.type === "income" ? "green" : "red";
    transactionsContainer.appendChild(transactionElement);
  });
}

function calculateBudget() {
  let totalIncomeValue = 0;
  let totalExpenseValue = 0;
  let totalBudget = 0;

  for (let index = 0; index < transactionsArray.length; index++) {
    const element = transactionsArray[index];
    if (element.type === "income") {
      totalIncomeValue = totalIncomeValue + element.amount;
    } else if (element.type === "expense") {
      totalExpenseValue = totalExpenseValue + element.amount;
    }
  }
  totalIncome.textContent = `Total Income: €${totalIncomeValue}`;
  totalExpenses.textContent = `Total Expenses: €${totalExpenseValue}`;
  totalBudgetArea.textContent =`Your Budget: ${totalIncomeValue-totalExpenseValue}`;
}



undoButton.addEventListener("click", undoTransaction);

function undoTransaction() {
  if (transactionsArray.length > 0) {
    transactionsArray.pop();
    showTransactions();
    calculateBudget();
    console.log(`User removed a transaction`);
  }
  undoButton.style.display = transactionsArray.length > 0 ? "block" : "none";
}
