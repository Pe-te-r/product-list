import { itemArray, type item, type arrayType, cart } from "./items";

const showItem = (how: boolean) => {
    const items = document.querySelector('.items') as HTMLElement
    const listCart = document.querySelector('.list-cart') as HTMLElement
    const emptyDiv = document.querySelector('.empty-aside') as HTMLElement
    
    if (how && (cart.getItems.length > 0)) {
        
            emptyDiv.style.display = 'none'
            console.log(items)
            listCart.style.display='flex'
        
    } else {
        emptyDiv.style.display = 'block'
        listCart.style.display='none'
    }
}

const handle_cart = () => {
    showItem(true)
    let htmlString = ''
    const itemsDivSide = document.querySelector('.items') as HTMLElement
    const totalShow = document.querySelector('#total') as HTMLElement
    const itemCount = document.querySelector('#item-count') as HTMLElement
    let countItem = 0;
    let totalMoney=0
    cart.getItems.forEach((item:arrayType,index) => {
        const itemCart: item = itemArray[item.index]
        
        htmlString += `
      <div>
        <h6>${itemCart.h4}</h6>
        <p class="parent-close"><span id="quantity">${item.quantity} X</span> <span id="cost-1">@ $${itemCart.h5}</span> = <span id="cost-total">$ ${Number(item.quantity * Number(itemCart.h5)).toFixed(2)}</span><span class="close ${index}"><img src='./src/assets/images/icon-remove-item.svg'/></span> </p>
        
      </div>
           `
        countItem += item.quantity
        totalMoney += item.quantity * Number(itemCart.h5)
        
    })                                                                      
    totalShow.innerText = `$${totalMoney.toFixed(2)}`
    itemsDivSide.innerHTML = htmlString
    itemCount.innerText = `${countItem}`
    const allClose = document.querySelectorAll('.close')
    allClose.forEach(element => {
        element.addEventListener('click', () => {
            console.log('here')
            const index = element.classList[1]
            if (index) {
                cart.removeCartItem(Number(index))
                handle_cart()
            }
        })
    });
}

const show_empty_cart = () => {
    showItem(false)
    console.log('three')

    
}

// const displayItemHtml = () => {
//     const itemArea = document.getElementById('item-area') as HTMLElement;
//     let htmlString = '';

//     const cartItems = cart.getItems; 
//     itemArray.forEach((item: item, index) => {
//         // Check if this item is already in the cart
//         const isInCart = cartItems.some((cartItem:arrayType) => cartItem.index === index);
//         console.log(isInCart)

//         const buttonHtml = isInCart
//             ? `<button class="btn in-cart" disabled>
//                  Added to Cart
//                </button>`
//             : `<button class="btn add-to-cart" >
//                  <span><img src='./src/assets/images/icon-add-to-cart.svg'/><span/>
//                  Add to Cart
//                </button>`;

//         htmlString += `<div class="meal ${index}">
//           <div class="img">
//             <img src=${item.img} alt="${item.h4}">
//           </div>
//           <div class="bottom">
//             ${buttonHtml}
//             <div class="bottom-description">
//               <p>${item.p}</p>
//               <h4>${item.h4}</h4>
//               <h5 class="price">$ ${item.h5}</h5>
//             </div>
//           </div>
//         </div>`;
//     });

//     itemArea.innerHTML = htmlString;
// }

const displayItemHtml = () => {
    const itemArea = document.getElementById('item-area') as HTMLElement;
    let htmlString = '';

    const cartItems = cart.getItems;
    itemArray.forEach((item: item, index) => {
        const cartItem = cartItems.find(cartItem => cartItem.index === index);
        const isInCart = cartItem !== undefined;
        const quantityInCart = cartItem ? cartItem.quantity : 0;

        // Determine which button HTML to show
        const buttonHtml = isInCart
            ? `<div class="quantity-controls">
                  <button class="decrease-item" data-index="${index}">-</button>
                  <span class="quantity">${quantityInCart}</span>
                  <button class="increase-item" data-index="${index}">+</button>
               </div>`
            : `<button class="btn add-to-cart">
                 <span><img src='./src/assets/images/icon-add-to-cart.svg'/></span>
                 Add to Cart
               </button>`;

        htmlString += `<div class="meal ${index}">
          <div class="img">
            <img src=${item.img} alt="${item.h4}">
          </div>
          <div class="bottom">
            ${buttonHtml}
            <div class="bottom-description">
              <p>${item.p}</p>
              <h4>${item.h4}</h4>
              <h5 class="price">$ ${item.h5}</h5>
            </div>
          </div>
        </div>`;
    });

    itemArea.innerHTML = htmlString;

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt((e.currentTarget as HTMLElement).closest('.meal')?.classList[1] || '0');
            cart.addItem(Number(index));
            displayItemHtml();
            handle_cart();
        });
    });

    // Add event listeners for quantity controls
    document.querySelectorAll('.increase-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
            cart.addItem(index);
            displayItemHtml();
            handle_cart();
        });
    });

    document.querySelectorAll('.decrease-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
            const cartIndex = cart.getItems.findIndex(item => item.index === index);
            if (cartIndex !== -1) {
                cart.decreaseQuantity(cartIndex);
                displayItemHtml();
                handle_cart();
            }
        });
    });
};

const itemDisplay = () => {
    displayItemHtml()

    const addButtons = document.querySelectorAll('.btn')

    console.log(cart.getItems)
    addButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const mealDiv = (e.currentTarget as HTMLElement).closest('.meal');
            
            if (mealDiv) {
                let indexClass=mealDiv.classList[1]
                
                if (indexClass) {
                    const index = parseInt(indexClass);
                    cart.addItem(index)
                    if (cart.getItems.length >= 1) {
                        handle_cart()
                    } else {
                        show_empty_cart()
                    }
                }
            }
        })
        
    })
}

itemDisplay()

