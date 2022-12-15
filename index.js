document.addEventListener('DOMContentLoaded', () => {
  fetchGolfItems()
  newEmails()
  
  
  const clearButton = document.getElementById("clearCart")
  clearButton.addEventListener('click', (e) => {
    e.preventDefault()
    totalPrice.textContent = 0
  })
});

const cardContainer = document.createElement('div')
cardContainer.id = 'cardContainer'

function fetchGolfItems() {
  fetch('https://test-backend-production-30ff.up.railway.app/golf-items') //returns promise
    .then(resp => resp.json())//resp.json returns a promise, handles fetch's promise and converts resp into json
    .then(data => { //second .then to handle the promise that the first .then returns
      console.log('data:', data) //array of objects
      let itemCard = document.getElementById('cardContainer')
      data.forEach((golfItem) => (itemCard += loadGolfCards(golfItem)));
      
    });
}

const totalPrice = document.createElement('div')
totalPrice.id = 'countId'
totalPrice.textContent = 0
const totalContainer = document.getElementById('totalContainer')
totalContainer.append(totalPrice)


function loadGolfCards(golfItem) {
  const individualCard = document.createElement('div')
  individualCard.id = 'individualCard'
  const allCards = document.getElementById('itemArea')

  const itemName = document.createElement('h2')
  itemName.id = 'nameId'
  itemName.textContent = golfItem.name

  const itemImg = document.createElement('img')
  itemImg.id = 'cardImage'
  itemImg.src = golfItem.image

  const itemPrice = document.createElement('p')
  itemPrice.id = 'itemPrice'
  itemPrice.textContent = '$' + golfItem.price + ".00"

  const addToCartButton = document.createElement('button')
  addToCartButton.id = golfItem.id
  addToCartButton.className = 'addToCartButtonId'
  addToCartButton.textContent = 'ADD TO CART'
  
  addToCartButton.addEventListener('click', () => {
    alert(`${golfItem.name} were added to cart`)
    totalPrice.textContent = parseFloat(totalPrice.textContent) + parseFloat(golfItem.price)

   /*
    new Intl.NumberFormat("us-EN", {
      style: "currency",
      currency: "USD"
    }).format(totalPrice.textContent + golfItem.price)*/
  })
  
  allCards.append(individualCard)
  individualCard.append(itemName, itemImg, itemPrice, addToCartButton)
}
const subsBtn = document.querySelector("#subs")
const emailConts = document.querySelector("#email-container")
subsBtn.addEventListener("click",() =>{emailConts.style.display='block'})

const submitButton = document.querySelector('.submitButton')
const formName = document.querySelector('#inputName')
const formEmail = document.querySelector('#inputEmail')

const emailContainer = document.querySelector('#email-container')

function newEmails(){
  emailContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    let object = {
      name: e.target.inputName.value,
      email: e.target.inputEmail.value
    }
    postEmail(object)
  })
}

function postEmail(object) {
  fetch('https://test-backend-production-30ff.up.railway.app/emails', {
    method: 'POST',
    headers: 
    {
    Accept: "application/json",
    "Content-Type": "application/json"
    },
    body:JSON.stringify(object)
  })
  formName.value = ""
  formEmail.value = ""
}
