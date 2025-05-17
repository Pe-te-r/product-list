import { itemArray,cart, type item, type arrayType } from "./items";

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

const displayItemHtml = () => {
    const itemArea = document.getElementById('item-area') as HTMLElement
    let htmlString = '';

    itemArray.forEach((item: item, index) => {
        htmlString += `<div class="meal ${index}">
          <div class="img">
            <img src=${item.img} alt="">
          </div>
          <div class="bottom">
            <button class="btn"><span><img src='./src/assets/images/icon-add-to-cart.svg'/><span/>Add to Cart</button>
            <div class="bottom-description">
              <p>${item.p}</p>
              <h4>${item.h4}</h4>
              <h5 class="price">$ ${item.h5}</h5>
            </div>
          </div>
        </div>`
    })

    itemArea.innerHTML = htmlString
}


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

