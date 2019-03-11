//const exercises = require("..exercises");
const multiplesComments =
  "If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 or 5 below 1000.";

function multiples(sum = 0, i = 0, limit = 1000) {
  var sum = sum;
  if (i < limit) {
    if (i % 3 == 0 || i % 5 == 0) {
      sum = sum + i;
    }
    i++;
    return multiples(sum, i);
  }
  return {
    sum,
    comments: multiplesComments,
    name: "Multiples of 3 and 5"
  };
}

const fibonacciComments =
  "Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ... By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.";

function fibonacci(prev = 1, curr = 2, sum = 0, limit = 4000000) {
  var prev = prev,
    curr = curr,
    sum = sum,
    temp;
  if (curr % 2 == 0) sum = sum + curr;
  temp = curr + prev;
  if (temp >= limit) {
    return {
      sum,
      name: "Even Fibonacci numbers",
      comments: fibonacciComments
    };
  }
  return fibonacci(curr, curr + prev, sum);
}
const lpfComments =
  "The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143 ?";
function lpf(num = 600851475143) {
  var lpf;
  var sum = 1;
  for (let i = 2; i < Math.floor(Math.sqrt(num)); i++) {
    for (let j = 2; j <= i; j++) {
      if (i % j == 0 && j < i) break;
      if (i == j && i % j == 0) {
        if (num % i == 0) {
          sum = sum * i;
        }
        if (sum == num) {
          lpf = i;
          return {
            sum: lpf,
            name: "Largest prime factor",
            comments: lpfComments
          };
        }
      }
    }
  }
}
const palindromeComments =
  "A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99. Find the largest palindrome made from the product of two 3-digit numbers.";

function isPalindrome(str) {
  var last = str.length - 1;
  if (str.length % 2 == 0) {
    for (let first = 0; first < last; first++) {
      if (str[first] !== str[last]) {
        return false;
      }
      last--;
    }
  } else {
    var middle = (str.length - 1) / 2;
    for (let first = 0; first < middle; first++) {
      if (str[first] !== str[last]) {
        return false;
      }
      last--;
    }
  }
  return true;
}

function palindrome() {
  var biggestPalindrome = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = i; j < 1000; j++) {
      let sum = i * j;
      let sumStr = sum.toString();
      if (isPalindrome(sumStr) && sum > biggestPalindrome) {
        biggestPalindrome = sum;
      }
    }
  }
  return {
    sum: biggestPalindrome,
    name: "Largest palindrome product",
    comments: palindromeComments,
    helperFunc: isPalindrome
  };
}

const smallestMultipleComments =
  "2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder. What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?";

function divideEvenly(num) {
  for (let i = 19; i > 10; i--) {
    if (num % i !== 0) {
      return false;
    }
  }
  return true;
}

function smallestMultiple(num = 20) {
  while (!divideEvenly(num)) {
    num += 20;
  }
  return {
    sum: num,
    name: "Smallest multiple",
    comments: smallestMultipleComments,
    helperFunc: divideEvenly
  };
}

function timeToCall(func) {
  var t0 = performance.now();
  func();
  var t1 = performance.now();
  return `Call to ${func().name} took ${(t1 - t0).toFixed(4)} milliseconds.`;
}

function createProblem(functionName) {
  let problemCode = functionName,
    problemTime = timeToCall(functionName),
    {
      sum: problemAnswer,
      name: problemName,
      comments: problemComments,
      helperFunc
    } = functionName();

  return `
  <div class="problem">
        <div class="problemName">
          <h2>${problemName}</h2>
        </div>
        <div class="problemBody">
          <div class="problemCode"><pre>${problemCode}</pre><pre>${
    helperFunc ? helperFunc : ""
  }</pre></div>
          <div class="problemText">
            <div class="problemComments">${problemComments}</div>
            <div class="problemAnswer" > The answer is:  ${problemAnswer}</div>
            <div class="problemTime" > ${problemTime}</div>
          </div>
        </div>
      </div>
  `;
}

var funcs = [multiples, fibonacci, lpf, palindrome, smallestMultiple];
window.addEventListener("DOMContentLoaded", function() {
  let problemContainer = document.querySelector(".problemContainer");
  funcs.forEach(function(func) {
    problemContainer.insertAdjacentHTML("beforeend", createProblem(func));
  });
});
