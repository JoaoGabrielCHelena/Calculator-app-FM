// https://bobbyhadz.com/blog/javascript-split-string-substrings-n-characters#:~:text=To%20split%20a%20string%20every,a%20length%20of%20N%20characters.


const digits = document.querySelectorAll('[data-digitKey]')
const operations = document.querySelectorAll('[data-operation]')
const del = document.querySelector('[data-del]')
const resetKey = document.querySelector('[data-reset]')
const equal = document.querySelector('[data-equals]')
const displayBox = document.querySelector('[data-display]')
const hasSecondInput = document.querySelector('[data-hasSecondInput]')
// Constants for keyboard input
// const numbers = ['1','2','3','4','5','6','7','8','9','0']
// const operands = ['/', '*', '-', '+']
// const equalKeyboard = ['=', 'Enter']
// const deleteKeys = ['Backspace', 'Delete']
// const decimalKeys = ['.', ',']
reset()

// Code for keyboard input
// document.querySelector('#input-section').addEventListener('keydown', (event) => {
//   if (numbers.includes(event.key)) {
//     printNumber(event.key)
//     document.querySelector(`[data-digitKey="${event.key}"]`).classList.add('active')
//   }
  
//   if (operands.includes(event.key)) {
//     operationSelected(event.key)
//     document.querySelector(`[data-operation="${event.key}"]`).classList.add('active')
//   }
  
//   if (equalKeyboard.includes(event.key)) {
//     equalise()
//     document.querySelector(`[data-equals`).classList.add('active')
//   }
  
//   if (deleteKeys.includes(event.key)) {
//     deleteDigit()
//     document.querySelector(`[data-del`).classList.add('active')
//   }
//   if (decimalKeys.includes(event.key)) {
//     printNumber('.')
//     document.querySelector(`[data-digitKey='.'`).classList.add('active')
//   }
//   setTimeout(() => {
//     if (document.querySelector('.active') != null) {
//       document.querySelector('.active').classList.remove('active')
//     }
//   }, 40);
// });

// assign event listeners
digits.forEach(element => {
  element.addEventListener('click', function() {
    let value = this.getAttribute('data-digitKey')
    printNumber(value)
  })
});

operations.forEach(element => {
  element.addEventListener('click', function() {
    let value = this.getAttribute('data-operation')
    operationSelected(value);
  })
});

equal.addEventListener('click', function() {equalise()})

resetKey.addEventListener('click', function() {reset()})

del.addEventListener('click', function() {deleteDigit()})


// functions

function printNumber(input) {
  // if doesnt have second input, display is not -, and has an operand, it creates a second input
  if (operand != "" && hasSecondInput.getAttribute('data-hasSecondInput') == 'false') {
    y = input
    // allows for '0.' if dot is typed
    if (y == ".") {
      y = "0."
    }
    // data to be used in equalise()
    hasSecondInput.setAttribute('data-hasSecondInput', 'true')
    return displayBox.textContent = `${y}`
  }
  // doesnt allow more than one dot
  if (displayBox.textContent.includes('.') && input == '.') {
    return
  }
  // allows for '0.' if dot is typed
  if (displayBox.textContent == '0' && input == '.') {
    return displayBox.textContent = `0.`
  }
  
  // if display is 0, it replaces the number
  if (displayBox.textContent == "0") {
    return displayBox.textContent = `${input}`  
  }
  // if none pass, it adds the input to the end of display
  displayBox.textContent = `${displayBox.textContent}${input}` 
}

function operationSelected(input) {
  if (hasSecondInput.getAttribute('data-hasSecondInput') == 'true') {
    equalise()
  } 
  if (displayBox.textContent.slice(displayBox.textContent.length - 1, displayBox.textContent.length) == '.') {
    displayBox.textContent = displayBox.textContent.slice(0, -1)
  }
  operand = input
  hasSecondInput.setAttribute('data-hasSecondInput', 'false')
  x = displayBox.textContent
}

function equalise() {
  switch (hasSecondInput.getAttribute('data-hasSecondInput')) {
    case 'true':
      y = displayBox.textContent
      hasSecondInput.setAttribute('data-hasSecondInput', 'false')
      break
    case 'false':
      // here happens when just one input exists
      y = x
    break
    default:
      // here happens if data-hasSecondInput == 'keep'
      x = displayBox.textContent
    break
  }
  if (operand == "" && hasSecondInput.getAttribute('data-hasSecondInput') == "false") {
    return
  }
  displayBox.textContent = eval(`${x}${operand}${y}`)
  hasSecondInput.setAttribute('data-hasSecondInput', 'keep')
}

function reset() {
  x = 0;
  y = 0;
  operand = '';
  displayBox.textContent = '0'
  hasSecondInput.setAttribute('data-hasSecondInput', 'false')
}

function deleteDigit() {
  displayBox.textContent = displayBox.textContent.slice(0, -1)
  // if the last digit is a dot, delete it
  if (displayBox.textContent.slice(displayBox.textContent.length - 1, displayBox.textContent.length) == '.') {
    displayBox.textContent = displayBox.textContent.slice(0, -1)
  }
  // if empty or just a negative sign
  if (displayBox.textContent == '' || displayBox.textContent == '-') {
    displayBox.textContent = '0'
  }
}
