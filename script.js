'use strict';

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements:  [[200, '2019-11-18T21:31:17.178Z'],
  [455.23, '2019-12-23T07:42:02.383Z',],
  [-306.5, '2020-01-28T09:15:04.904Z'],
  [25000, '2020-04-01T10:17:24.185Z'],
  [-642.21, '2020-05-08T14:11:59.604Z'],
  [-133.9, '2020-05-27T17:01:17.194Z'],
  [79.97, '2020-07-11T23:36:17.929Z'],
  [1300, '2020-07-12T10:51:36.790Z']],
  interestRate: 1.2, // %
  pin: 1111,

 
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [[5000, '2019-11-01T13:15:33.035Z'],
  [3400, '2019-11-30T09:48:16.867Z'],
  [-150, '2019-12-25T06:04:23.907Z'],
  [-790, '2020-01-25T14:18:46.235Z'],
  [-3210, '2020-02-05T16:33:06.386Z'],
  [-1000, '2020-04-10T14:43:26.374Z'],
  [8500, '2020-06-25T18:49:59.371Z'],
  [-30, '2020-07-26T12:01:20.894Z']],
  interestRate: 1.5,
  pin: 2222,

 
  currency: 'USD',
  locale: 'en-US',
};
  
  // const account3 = {
  //   owner: 'Steven Thomas Williams',
  //   movements: [200, -200, 340, -300, -20, 50, 400, -460],
  //   interestRate: 0.7,
  //   pin: 3333,
  // };
  
  // const account4 = {
  //   owner: 'Sarah Smith',
  //   movements: [430, 1000, 700, 50, 90],
  //   interestRate: 1,
  //   pin: 4444,
  // };
  
  // const accounts = [account1, account2, account3, account4];
  const accounts = [account1, account2];
  
  
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  const displayRecords = function(acc , sort=false){
    containerMovements.innerHTML = ' ';
    let movements = acc.movements;
    const movs = sort? movements.slice().sort((a,b)=>a[0]-b[0]) : movements;

    movs.forEach(function(mov , i){
      const type = mov[0]>0 ? 'deposit' : 'withdrawal';
     const date =  new Date(mov[1]);
    //  const day = `${date.getDate()}`.padStart(2,0);
    //  const month = `${date.getMonth()+1}`.padStart(2 , 0);;
    //  const year = date.getFullYear();
    //  const displayDate = `${day}/${month}/${year}`
    //  console.log(date);
    //  console.log(now);
    const displayDate = new Intl.DateTimeFormat(acc.locale).format(date);
      const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
       <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov[0].toFixed(2)}€</div>
    </div>
      `
      containerMovements.insertAdjacentHTML("afterbegin" , html);
    })
  }
  // displayRecords(account1.movements);

  const calcDisplayTotal = function(acc){
    acc.Balance = acc.movements.reduce((mov  , curr)=> mov+curr[0] , 0);
    labelBalance.textContent = `${acc.Balance.toFixed(2)}€`;
  }
  // calcDisplayTotal(accounts);

  const calcDisplaySummary = function(acc){
    const income = acc.movements.filter((mov)=>mov[0]>0).reduce((mov , curr)=> mov+curr[0],0);
    labelSumIn.textContent = `${income.toFixed(2)}€`;
    const out = acc.movements.filter((mov)=>mov[0]<0).reduce((mov , curr)=> mov+curr[0],0);
    labelSumOut.textContent = `${Math.abs(out.toFixed(2))}€`
    const interest = acc.movements.filter((mov)=>mov[0]>0).map(mov=>(mov[0]*acc.interestRate)/100).filter((mov)=> mov>=1).reduce((mov,curr)=>mov+curr,0);
    console.log(interest);
    labelSumInterest.textContent = `${interest.toFixed(2)}€`
  }
  // calcDisplaySummary(account1.movements);
 const createUserName = function(accounts){
  for(const acc of accounts){
   acc.userName = acc.owner.toLowerCase().split(' ').map(mov => mov[0]).join('');
  }
 }
createUserName(accounts);
console.log(accounts);

const updateUI = function(acc){
  displayRecords(acc);
    calcDisplayTotal(acc);
    calcDisplaySummary(acc);
}
let currAccount;

btnLogin.addEventListener('click', function(e){
  e.preventDefault();
  currAccount = accounts.find(mov=>  inputLoginUsername.value===mov.userName);
  if(currAccount?.pin=== Number( inputLoginPin.value)){
    containerApp.style.opacity=100;
    labelWelcome.textContent = `Welcome back, ${currAccount.owner.split(' ')[0]}`;
    const now = new Date();
    // const date = `${now.getDate()}`.padStart(2 , 0);
    // const month = `${now.getMonth()+1}`.padStart(2 , 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min  = now.getMinutes();

    const option={
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month:'numeric',
      year:'numeric',
    }

    labelDate.textContent = new Intl.DateTimeFormat(currAccount.locale, option).format(now);
    // labelDate.textContent = new Intl.DateTimeFormat('en-IN').format(now);
    updateUI(currAccount);
    inputLoginUsername.value='';
    inputLoginPin.value='';
    inputLoginPin.blur();
  }
})

btnTransfer.addEventListener('click' , function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recever = accounts.find(mov=> mov.userName=== inputTransferTo.value);
  console.log(recever);
  if(amount>0 && recever && recever.userName!==currAccount.userName&& currAccount.Balance>=amount){
    currAccount.movements.push([-amount , new Date()]);
    recever.movements.push([amount , new Date()]);
    // currAccount.movementsDates.push(new Date());
    // recever.movementsDates.push(new Date());

    updateUI(currAccount);
    inputTransferAmount.value='';
    inputTransferTo.value='';
  }
})

btnLoan.addEventListener('click' , function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount>0 && currAccount.movements.some(mov=> mov[0]>=amount*0.1)){
    currAccount.movements.push([amount , new Date()]);
    // currAccount.movementsDates.push(new Date());
    updateUI(currAccount);
    inputLoanAmount.value='';
  }
})

btnClose.addEventListener('click' , function(e){
  // e.preventDefault();
if(inputCloseUsername.value===currAccount.userName && currAccount.pin === Number(inputClosePin.value)){
  const index = accounts.findIndex(acc=> acc.userName===currAccount.userName);
  accounts.splice(index , 1);
  containerApp.style.opacity = 0;
  
  console.log('delete');
  inputClosePin.value='';
  inputCloseUsername='';
  labelWelcome.textContent='Log in to get started';
}
})

let sorted = false;
btnSort.addEventListener('click', function(){
  displayRecords(currAccount , !sorted);
  sorted=!sorted;
})