// show or hide sidebar
const menuBtn=document.querySelector('#menu-btn')
const closeBtn=document.querySelector('#close-btn')
const sidebar=document.querySelector('aside')

menuBtn.addEventListener('click',()=>{
    sidebar.style.display= 'block'
})

closeBtn.addEventListener('click',() =>{
    sidebar.style.display= 'none'
})


// change theme
const themeBtn=document.querySelector('.theme-btn')
themeBtn.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme')
    themeBtn.querySelector('span:first-child').classList.toggle('active')
    themeBtn.querySelector('span:last-child').classList.toggle('active')
})


let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

//Set Budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    //Set Budget
    amount.innerHTML = tempAmount;
    //Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    //Clear Input Box
    totalAmount.value = "";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
  updateChart();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  //empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(userAmount.value);
  //Total expense (existing + new)
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //Create list
  listCreator(productTitle.value, userAmount.value);
  //Empty inputs
  productTitle.value = "";
  userAmount.value = "";
  updateChart();
});

//Function To Update Chart
const updateChart = () => {
  let expenseAmounts = document.querySelectorAll(".amount");
  let expenseAmountArray = Array.from(expenseAmounts);
  let expenseValues = expenseAmountArray.map((element) => parseInt(element.innerText));
  let totalExpenses = expenseValues.reduce((acc, cur) => acc + cur, 0);
  let balanceAmount = parseInt(amount.innerHTML) - totalExpenses;
  let balancePercentage = (balanceAmount / parseInt(amount.innerHTML)) * 100;
  let expensePercentages = expenseValues.map((value) => (value / totalExpenses) * 100);
  let chartData = expensePercentages.concat([balancePercentage]);
  let pieChart = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(pieChart, {
    type: "doughnut",
    data: {
      labels: [...expenseAmountArray.map((element) => element.previousSibling.innerText), "Balance"],
      datasets: [
        {
          label: "Expense Chart",
          data: chartData,
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#cc65fe",
            "#ffce56",
            "#4bc0c0",
            "#9966FF",
            "#FF99FF",
            "#99CCFF",
            "#CCFFFF",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
      plugins: {
        title: {
          display: true,
          text: "Expenses Chart",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem, data) {
              let value = data.datasets[0].data[tooltipItem.index];
              return data.labels[tooltipItem.index] + ": " + value.toFixed(2) + "%";
            },
          },
        },
      },
    },
  });
};



const chart= document.querySelector("#chart").getContext('2d');

//create a new chart instance
new Chart(chart, {
  type: 'line',
  data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [
          {
              label: 'Expense',
              data: [29374,33537,49631,59095,57828,36684,33572,39974,48847,48116,61004],
              borderColor:'red',
              borderWidth: 2
          },
          {
              label: 'Turnover',
              data: [2937,3353,4963,5909,5782,3668,3357,3997,4884,4811,6100],
              borderColor: 'blue',
              borderWidth: 2
          },
          {
              label: 'Savings',
              data: [9374,3537,9631,9095,7828,6684,3572,9974,8847,8116,1004],
              borderColor: 'green',
              borderWidth: 2
          },
          {
            label: 'Cash Withdrawal',
            data: [3374,8537,2631,6095,3828,9684,6572,1974,7847,2116,5004],
            borderColor: 'purple',
            borderWidth: 2
          }
      ]
  },
  options: {
      responsive: true
  }
})