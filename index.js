// Bài 1
function bai_01() {
  //Số nguyên n gọi là số đối xứng nếu đọc từ trái qua phải, hay từ phải qua trái đều được số giống nhau.
  const str = prompt("Type your string here:");

  const reversedStr = str.split("").reverse().join("");
  console.log(reversedStr);

  const outputEl = document.querySelector("#result_1");

  if (str === reversedStr) {
    outputEl.innerHTML = `${str} là chuổi đối xứng`;
  } else {
    outputEl.innerHTML = `${str} không phải là chuổi đối xứng`;
  }
}

function bai_02() {
  const input = prompt("Type your input here:");
  console.log(input);
  //"this" "is" "A" "Test"
  for (let letter of input.split("")) {
    console.log(letter);
  }
}

function bai_03() {
  const moneyAmountEl = document.getElementById("money-amount");
  const timeAmountEl = document.getElementById("time-amount");

  const interestRate = 0.07;
  let interest = "";

  function interestCacl(money, interestRate, time) {
    console.log(time);
    let numberOfDays = "";
    const [amount, year] = time.split(" ");
    if (year.toLowerCase().trim() === "tháng") {
      numberOfDays = (amount / 12) * 365;
    } else if (year.toLowerCase().trim() === "năm") {
      numberOfDays = amount * 365;
    }
    console.log(numberOfDays);
    return (interest = money * interestRate * numberOfDays);
  }
  const result = interestCacl(
    moneyAmountEl.value,
    interestRate,
    timeAmountEl.value
  );

  document.getElementById("result_3").innerHTML = `${result}`;
}

function bai_04() {
  const arr = [5, 2, 3, 4, 1];

  let max = 0;
  const newArr = [];

  for (let item of arr) {
    max = max > item ? max : item;
  }
  newArr.push(max);
  console.log(newArr);
}
