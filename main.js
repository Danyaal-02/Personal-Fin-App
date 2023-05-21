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
            }
        ]
    },
    options: {
        responsive: true
    }
})


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