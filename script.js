let dishName = [
    "Spagehtti mit Garnelen",
    "Hamburger de Luxe",
    "Winer Schnitzel",
    "Britas Räuberfleishc",
];

let dishDescript = [
    "Nudeln mit Garnelen",
    "Bacon mit saftigem Rinderhackfleisch",
    "Schnitzel mit Bratkartofeln",
    "Schweineschnitzel oder Hähnchenschnitzel",
];

let dishPrice = [9.89, 6.79, 12.59, 15.95];

let basketName = [];
let basketPrice = [];
let basketAmount = [];

function render() {
    let dishes = document.getElementById('dishes');
    dishes.innerHTML = ``;
    for (let i = 0; i < dishName.length; i++) {
        const name = dishName[i];
        const descript = dishDescript[i];
        const price = dishPrice[i];
        dishes.innerHTML += generateMainHTML(name, descript, price, i);
    }
}

function addToBasket(i) {
    if (basketName.includes(dishName[i])) {
        let index = basketName.indexOf(dishName[i]);
        basketAmount[index]++;
    } else{
        basketName.push(dishName[i]);
        basketPrice.push(dishPrice[i]);
        basketAmount.push(1);
    }
    changeColorOnclick(i);
    renderBasket();
}

function calcTotal() {
    let sum = 0;
    subtotal = document.getElementById('subtotal');
    total = document.getElementById('total');
    delivCost = document.getElementById('deliveryCost');
    for (let i = 0; i < basketPrice.length; i++) {
        sum += basketPrice[i] * basketAmount[i];
    }
    subtotal.innerHTML = `${sum.toFixed(2)} €`;
    if (sum < 10) {
        total.innerHTML = `${(sum + 1.5).toFixed(2)}€`;
        delivCost.innerHTML = `1.50€`;
    } else {
        total.innerHTML = `${sum.toFixed(2)}`;
        delivCost.innerHTML = `0.00€`;
    }
}

function addOneToBasket(i) {
    basketAmount[i]++;
    renderBasket();
}

function deleteOneFromBasket(i) {
    if (basketAmount[i] <= 1) {
        basketName.splice(i, 1);
        basketPrice.splice(i, 1);
    } else {
        basketAmount[i]--;
    }
    changeColorOnclick(i);
    renderBasket();
}

function renderBasket() {
    let emptyBasket = document.getElementById('emptyBasket');
    let addedDish = document.getElementById('fullBasket');
    addedDish.innerHTML = ``;
    for (let i = 0; i < basketName.length; i++) {
        addedDish.innerHTML += generateSingleBasketDishHTML(i);
    }
    if (basketName.length < 1) {
        emptyBasket.classList.remove('d-none');
    } else {
        emptyBasket.classList.add('d-none');
        addedDish.innerHTML += generateCheckoutHTML();
        calcTotal();
    }
}

function changeColorOnclick(i) {
    let addButton = document.getElementById(`addButton${i}`);
    addButton.classList.add('change-color');
    setTimeout(changeColorToOrigin(i), 1500);
}


function changeColorToOrigin(i) {
    let addButton = document.getElementById(`addButton${i}`);
    addButton.classList.remove('change-color');
}


/******* generate HTML ******/


function generateMainHTML(name, descript, price, i) {
    return /* html */ `
                        <div class="dish">
                            <div>
                                <h3>${name}</h3>
                                <div class="dish-descript">
                                    <span>${descript}</span>
                                </div>
                                <div class="dish-price">
                                    <span>${price.toFixed(2)}€</span>
                                </div>
                            </div>
                                    <img src="img/plus-3-32.png" class="add-button" id="addButton${i}" onclick="addToBasket(${i})" alt="">
                        </div>
                        `;
}


function generateSingleBasketDishHTML(i) {
    const name = basketName[i];
    const price = basketPrice[i];
    const amount = basketAmount[i];
    return /* html */ `
        <div class="order-container">
            <div class="order">
                <span>${amount}</span>
                <span>${name}</span>
                <span id="orderPeice">${(price * amount).toFixed(2)}€</span>
            </div>
            <div class="plus-minus-button">
                <img src="img/plus.png" class="add-button" onclick="addOneToBasket(${i})" alt="">
                <img src="img/minus.png" class="add-button" onclick="deleteOneFromBasket(${i})" alt="">
            </div>
        </div>
    `;
}


function generateCheckoutHTML() {
    return /* html */ `
                        <div class="checkout" id="checkout">
                            <div class="checkout-left">
                                <span>Zwischensumme</span>
                                <span>Lieferkosten</span>
                                <span>Gesamt</span>
                            </div>
                            <div class="checkout-right">
                                <span id="subtotal"></span>
                                <span id="deliveryCost"></span>
                                <span id="total"></span>
                            </div>
                        </div>
                    `;
}

/******* open Basket ******/

function openBasket(){
    document.getElementById('basket').style.display = 'flex';
    document.getElementById('closeBasket').classList.add('d-flex');
}

function closeBasket(){
    document.getElementById('basket').style.display = '';
    document.getElementById('closeBasket').classList.add('d-none');
    document.getElementById('closeBasket').classList.remove('d-flex');
}