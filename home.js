const cart = document.querySelector("nav .cart")
const cartSideBar = document.querySelector(".cart-sidebar")
const closeCart = document.querySelector(".close-cart")
const burger = document.querySelector(".burger")
const menuSideBar = document.querySelector(".menu-sidebar")
const closeMenu = document.querySelector(".close-menu")
const cartItemsTotal = document.querySelector(".noi")
const cartPriceTotal = document.querySelector(".total-amount")
const cartUi = document.querySelector(".cart-sidebar .cart")
const totalDiv = document.querySelector(".total-sum")
const clearBtn = document.querySelector("clear-cart-btn")
const cartContent = document.querySelector("cart-content")

let Cart = [];
let buttonsDom = [];

cart.addEventListener("click", function(){
    cartSideBar.style.transform = "translate(0%)"
    const bodyOverlay = document.createElement("div")
    bodyOverlay.classList.add("overlay");
    setTimeout(function(){
        document.body.appendChild(bodyOverlay)
    },300)

})

closeCart.addEventListener("click", function(){
    cartSideBar.style.transform = "translate(100%)"
    const bodyOverlay = document.querySelector(".overlay")
    document.querySelector("body").removeChild(bodyOverlay)
})

burger.addEventListener("click",function(){
    menuSideBar.style.transform = "translate(0%)"
})
closeMenu.addEventListener("click",function(){
    menuSideBar.style.transform = "translate(-100%)"
})

class Product{
    async getProduct(){
        const response = await fetch("products.js");
        const data = await response.json();
        let products = data.items;
        products = products.map (items=>{
            const{title,price} = items.field;
            const{id} = items.sys;
            const image = items.fields.image.fields.file.url;
            return {title,price,id,image};
        })
        return products; 
    }
}

class UI{
    displayProducts(products){
        let result = "";
        products.forEach(Product=>{
            const productDiv = document.createElement("div")
            productDiv.innerHTML = `<div class= "product-card">
                                    <img src="${Product.image}" alt="product">
                                    <span class= "add-to-cart" data-id= "${Product.id}">
                                    <i class= "fa fa-cart--plus fa-1x"
            sytle = "margin-right:0.1em; font-size: 1em;"></i>
                                    Add to Cart
                                    </span>
                                    <div class= "product-name">${Product.title}</div>
                                    <div class= "product-pricing">${Product.price}</div>
                                    </div>`
            const p = document.querySelector(".product")
            p.append(productDiv) 
        })
    }
}

getButtons(){
    const btns = document.querySelectorAll(".add-to-cart")
    Array.from(btns)
    buttonsDom = btnS;
    btns.forEach((btn)=>{
        let id = btn.dataset.id
        let inCart = Cart.find((item)=>item.id===id);
        if(inCart)
        {
            btn.innerHTML = "In Cart"
            btn.disabled = true
        }

        btn.addEventListener("click", (e)=>{
            e.currentTarget.innerHTML = "In Cart"
            e.currentTarget.style.color = "white"
            e.currentTarget.style.pointerEvents = "none"
            let cartItem = {...Storage.getStorageProducts(id),'amount':1}
            cart.push(cartItem)
            Storage.saveCart(cart)
            this.setCartValues(cart)
            this.addCartItem(cartItem)
        })
    })
    setCartValues(cart){
        
    }
}