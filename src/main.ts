import { itemArray, type item } from "./items";

console.log(itemArray)

const itemArea = document.getElementById('item-area') as HTMLElement

let htmlString = '';

itemArray.forEach((item:item) => {
    htmlString +=`<div class="meal">
      <div class="img">
        <img src=${item.img} alt="">
      </div>
      <div class="bottom">
        <button>Add to Cart</button>
        <div class="bottom-description">
          <p>${item.p}</p>
          <h4>${item.h4}</h4>
          <h5 class="price">$ ${item.h5}</h5>
        </div>
      </div>
    </div>`
})
console.log(itemArea)

itemArea.innerHTML=htmlString