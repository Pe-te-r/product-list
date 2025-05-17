import { itemArray,cart, type item, type arrayType } from "./items";

const showItem = (how: boolean) => {
    const items = document.querySelector('.items') as HTMLElement
    // const total = document.querySelector('.total') as HTMLElement
    // const carbon = document.querySelector('.carbon') as HTMLElement
    // const btnDiv = document.querySelector('.btn-div') as HTMLElement
    const listCart = document.querySelector('.list-cart') as HTMLElement
    const emptyDiv = document.querySelector('.empty-aside') as HTMLElement
    
    if (how) {
        emptyDiv.style.display = 'none'
        console.log(items)
        listCart.style.display='flex'
    } else {
        items.style.display = 'none'
        // total.style.display = 'none'
        // carbon.style.display = 'none'
        // btnDiv.style.display = 'none'
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
    cart.getItems.forEach((item:arrayType) => {
        const itemCart: item = itemArray[item.index]
        
        htmlString += `
      <div>
        <h6>Classic Tiramisu</h6>
        <p><span id="quantity">${item.quantity}X</span> <span id="cost-1">@ $${itemCart.h5}</span> = <span id="cost-total">$${String(item.quantity * Number(itemCart.h5))}</span><span class="close">X</span> </p>
        
      </div>
           `
        countItem += item.quantity
        console.log(item.quantity)
        totalMoney += item.quantity * Number(itemCart.h5)
        
    })
    totalShow.innerText = `$${totalMoney.toFixed(2)}`
    itemsDivSide.innerHTML = htmlString
    itemCount.innerText=`${countItem}`
}

const show_empty_cart = () => {
    showItem(false)
    const emptyDiv = document.querySelector('.empty') as HTMLElement
    emptyDiv.style.display = 'block'

    
}


const itemDisplay = () => {
    const itemArea = document.getElementById('item-area') as HTMLElement
    let htmlString = '';
    
    itemArray.forEach((item:item,index) => {
        htmlString +=`<div class="meal ${index}">
          <div class="img">
            <img src=${item.img} alt="">
          </div>
          <div class="bottom">
            <button class="btn">Add to Cart</button>
            <div class="bottom-description">
              <p>${item.p}</p>
              <h4>${item.h4}</h4>
              <h5 class="price">$ ${item.h5}</h5>
            </div>
          </div>
        </div>`
    })
    
    itemArea.innerHTML = htmlString

    const addButtons = document.querySelectorAll('.btn')

    addButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const mealDiv = (e.currentTarget as HTMLElement).closest('.meal');

            if (mealDiv) {
                let indexClass=mealDiv.classList[1]

                if (indexClass) {
                    const index = parseInt(indexClass);
                    cart.addItem(index)
                    if (cart.getItems.length >= 1) {
                        console.log('above')
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

