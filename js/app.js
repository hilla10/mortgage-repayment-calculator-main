const clearBtn = document.querySelector('#clear');
const amount = document.querySelector('#amount');
const term = document.querySelector('#term');
const rate = document.querySelector('#rate');
const errors = document.querySelectorAll('.error_msg');
const repayment = document.querySelector('#repayment');
const interest = document.querySelector('#interest');
const calculatorBtn = document.querySelector('#calculator');
const empty = document.querySelector('#empty');
const showResult = document.querySelector('#showResult');
const value = document.querySelector('.value');
const total = document.querySelector('.total-value');
const inputControls = document.querySelectorAll('.select');

// clear the input filed value
clearBtn.addEventListener('click', clearInput);

function clearInput() {
  amount.value = '';
  term.value = '';
  rate.value = '';
  empty.style.display = 'block';
  showResult.style.display = 'none';
  removeClass();
}

inputControls.forEach((inputControl) => {
  inputControl.classList.remove('checked');

  inputControl.addEventListener('click', (e) => {
    removeClass();

    if (e.target.parentElement || e.target) {
      e.target.parentElement.classList.add('checked');
      e.target.classList.add('checked');
    }
  });
});

function removeClass() {
  inputControls.forEach((control) => control.classList.remove('checked'));
}

calculatorBtn.addEventListener('click', validation);

function validation(e) {
  e.preventDefault();

  const amountValue = amount.value;
  const rateValue = amount.value;
  const termValue = amount.value;

  const isAmountValidNumber =
    !isNaN(amountValue) &&
    amountValue.trim() !== '' &&
    Number.isFinite(Number(amountValue));
  const isRateValidNumber =
    !isNaN(rateValue) &&
    rateValue.trim() !== '' &&
    Number.isFinite(Number(rateValue));
  const isTermValidNumber =
    !isNaN(termValue) &&
    termValue.trim() !== '' &&
    Number.isFinite(Number(termValue));

  isSelected = false;

  inputControls.forEach((control) => {
    if (control.classList.contains('checked')) {
      isSelected = true;
    }
  });

  if (
    isAmountValidNumber &&
    isRateValidNumber &&
    isTermValidNumber &&
    isSelected
  ) {
    errors.forEach((error) => (error.style.display = 'none'));
    calculate();
  } else {
    errors.forEach((error) => (error.style.display = 'block'));
  }
}

function calculate() {
  const principal = Number(amount.value);
  const mortTerm = Number(term.value);
  const mortRate = Number(rate.value);
  let type;

  inputControls.forEach((control) => {
    if (control.classList.contains('checked')) {
      type = control.firstElementChild.value;
    }
  });

  if (type === 'Repayments') {
    const { monthlyPayment, totalRepayment } = calculateMOrtgageYear(
      principal,
      mortRate,
      mortTerm
    );
    value.textContent = monthlyPayment;
    total.textContent = totalRepayment;
  } else if (type === 'Interest-Only') {
    const { interestPayment, totalRepayment } =
      calculateInterestOnlyTotalRepayment(principal, mortRate, mortTerm);
    value.textContent = interestPayment;
    total.textContent = totalRepayment;
  }

  empty.style.display = 'none';
  showResult.style.display = 'block';
}

function calculateMOrtgageYear(principal, annualInterestRate, years) {
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalPayments = years * 12;
  const monthlyPayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalPayments)) /
    (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayments: totalPayments,
    totalRepayment: (monthlyPayment * totalPayments).toFixed(2),
  };
}

function calculateInterestOnlyTotalRepayment(
  principal,
  annualInterestRate,
  years
) {
  // Convert annual interest rate to a monthly rate
  const monthlyInterestRate = annualInterestRate / 100 / 12;

  // Calculate the interest-only payment
  const interestPayment = principal * monthlyInterestRate;

  // Total number of payments (months)
  const totalPayments = years * 12;

  // Calculate the total repayment
  const totalRepayment = interestPayment * totalPayments + principal; // Add principal as it needs to be repaid

  return {
    interestPayment: interestPayment.toFixed(2),
    totalRepayment: totalRepayment.toFixed(2),
  };
}
