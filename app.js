const inputsContainer = document.querySelector(".inputs-container");
const inputDescription = document.getElementById("description");
const inputAmount = document.getElementById("amount");
const inputType = document.getElementById("type");
const addButton = document.getElementById("add-button");
const message = document.getElementById("message");
const totalIncome = document.querySelector(".total-income");
const totalExpenses = document.querySelector(".total-expenses");
const transactions = document.querySelector(".transactions");

let transactionsArray = [];

addButton.addEventListener("click", addTransaction);
function addTransaction() {
  const description = inputDescription.value.trim();
  const amount = parseInt(inputAmount.value.trim());
  const type = inputType.value;
  if (description && amount && type) {
    const transaction = {
      description,
      amount,
      type,
    };
    transactionsArray.push(transaction);
  } else {
    message.textContent = "";
    const failedMessage = "Please fill all fields!";
    message.textContent = failedMessage;
  }
}
