// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Function
// Hiển thị tiền gửi, rút
const displayMovements = (movements) => {
    containerMovements.innerHTML = "";
    movements.forEach((mov, i) => {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}€</div>
        </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};

// Gộp 2 chữ đầu tên
const createUsernames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};
createUsernames(accounts);

//
const deposits = movements.filter((mov) => {
    return mov > 0;
});
const withdrawals = movements.filter((move) => {
    return move < 0;
});

// Tính số dư
const calcDisplayBalance = (acc) => {
    acc.balance = acc.movements.reduce((acc, cur, i, arr) => {
        return acc + cur;
    }, 0);
    labelBalance.textContent = `${acc.balance}€`;
};

// Hiển thị tổng tiền vào tiền ra
const calcDisplaySummary = (acc) => {
    const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, cur) => acc + cur, 0);
    labelSumIn.textContent = `${incomes}€`;
    const out = acc.movements.filter((mov) => mov < 0).reduce((acc, cur) => acc + cur, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;
    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * 1.2) / 100)
        .filter((int) => {
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
};

// PIPELINE
const eurToUsd = 1.1;
const totalDepositsUSD = movements
    .filter((mov) => mov > 0)
    .map((move) => {
        return move * eurToUsd;
    })
    .reduce((acc, cur) => acc + cur, 0);

// SỬ LÝ SỰ KIỆN
const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};
// Tiếp tục với Bankist app. Xử lý sự kiện Login
let currentAccount;

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Hiển thị lời chào
        labelWelcome.textContent = `Xin Chào ${currentAccount.owner.split(" ")[0]}`;
        // Hiển thị body
        containerApp.style.opacity = 100;
        //
        updateUI(currentAccount);
    }
});

// Tiếp tục với Bankist app. Xử lý sự kiện Transfers
btnTransfer.addEventListener("click", (e) => {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiveAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
    console.log(amount, receiveAcc);

    // Khi chuyển thì làm trống input
    inputTransferAmount.value = inputTransferTo.value = "";
    if (
        amount > 0 &&
        receiveAcc &&
        currentAccount.balance >= amount &&
        receiveAcc?.username !== currentAccount.username
    ) {
        // Chuyển tiền và trừ tiền
        currentAccount.movements.push(-amount);
        receiveAcc.movements.push(amount);
        updateUI(currentAccount);
    }
});

// LAB4.3:
// 1.
const bankDepositSum = accounts
    .flatMap((acc) => acc.movements)
    .filter((mov) => mov > 0)
    .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2
const numDeposits1000 = accounts
    .flatMap((acc) => acc.movements)
    .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposits1000);

// 3
const { deposit, withdrawal } = accounts
    .flatMap((acc) => acc.movements)
    .reduce(
        (sums, cur) => {
            sums[cur > 0 ? "deposit" : "withdrawal"] += cur;
            return sums;
        },
        { deposit: 0, withdrawal: 0 }
    );
console.log(deposit, withdrawal);

// 4
const convertTitleCase = function (title) {
    const capitzalize = (str) => str[0].toUpperCase() + str.slice(1);
    const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];
    const titleCase = title
        .toLowerCase()
        .split(" ")
        .map((word) => (exceptions.includes(word) ? word : capitzalize(word)))
        .join(" ");
    return capitzalize(titleCase);
};
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
