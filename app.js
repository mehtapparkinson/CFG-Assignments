const inputsContainer = document.querySelector(".inputs-container");
const inputDescription = document.getElementById("description");
const inputAmount = document.getElementById("amount");
const inputType = document.getElementById("type");
const addButton = document.getElementById("add-button");
const message = document.getElementById("message");
const totalIncome = document.querySelector(".total-income");
const totalExpenses = document.querySelector(".total-expenses");
const transactionsContainer = document.querySelector(".transactions");

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
    console.log(transactionsArray);
    showTransactions();
  } else {
    message.textContent = "";
    const failedMessage = "Please fill all fields!";
    message.textContent = failedMessage;
    message.style.color = 'red';
    message.style.fontWeight = '800';
  }
}

function showTransactions () {
  transactionsContainer.textContent = '';
  transactionsArray.forEach(element => {
    const transactionElement = document.createElement('p');
    transactionElement.classList.add('transaction');
    transactionElement.textContent = `${element.description}  -------------- ${element.amount}`
     transactionElement.style.color = element.type === 'income' ? 'green' : 'red';
    transactionsContainer.appendChild(transactionElement);
  });
}
