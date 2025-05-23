export interface item{
    img: string
    p: string
    h4: string
    h5: string
}

export const itemArray: item[] = [
    {
        img: "/assets/images/image-waffle-desktop.jpg",
        h4: 'Waffle with Berries',
        h5: '6.50',
        p: 'Waffle'
    },
    {
        h4: 'Vanilla Bean Crème Brûlée',
        h5: '7.00',
        img: '/assets/images/image-creme-brulee-desktop.jpg',
        p: 'Crème Brûlée'
    },
    {
        h4: 'Macaron Mix of Five',
        h5: '8.00',
        img: '/assets/images/image-macaron-desktop.jpg',
        p: 'Macaron'
    },
    {
        h4: 'Classic Tiramisu',
        h5: '5.50',
        img: '/assets/images/image-tiramisu-desktop.jpg',
        p: 'Tiramisu'
    },
    {
        h4: 'Pistachio Baklava',
        h5: '4.00',
        img: '/assets/images/image-baklava-desktop.jpg',
        p: 'Baklava'
    },
    {
        h4: 'Lemon Meringue Pie',
        h5: '5.00',
        img: '/assets/images/image-meringue-desktop.jpg',
        p: 'Pie'
    },
    {
        h4: 'Red Velvet Cake',
        h5: '4.50',
        img: '/assets/images/image-cake-desktop.jpg',
        p: 'Cake'
    },
    {
        h4: 'Salted Caramel Brownie',
        h5: '4.50',
        img: '/assets/images/image-brownie-desktop.jpg',
        p: 'Brownie'
    },
    {
        h4: 'Vanilla Panna Cotta',
        h5: '6.50',
        img: '/assets/images/image-panna-cotta-desktop.jpg',
        p: 'Panna Cotta'
    }
]

export interface arrayType {
    index: number
    quantity: number
}class CartItem {
    private items: arrayType[] = [];

    addItem(index: number) {
        const existing = this.items.find(item => item.index === index);
        existing ? existing.quantity++ : this.items.push({ index, quantity: 1 });
    }

    increaseQuantity(cartIndex: number) {
        if (this.items[cartIndex]) {
            this.items[cartIndex].quantity++;
        }
    }

    decreaseQuantity(cartIndex: number) {
        if (this.items[cartIndex]) {
            if (this.items[cartIndex].quantity > 1) {
                this.items[cartIndex].quantity--;
            } else {
                this.removeCartItem(cartIndex);
            }
        }
    }

    get getItems() {
        return this.items;
    }

    removeCartItem(cartIndex: number) {
        if (cartIndex >= 0 && cartIndex < this.items.length) {
            this.items.splice(cartIndex, 1);
        }
    }
}

export const cart = new CartItem()


// const buttonHtml = isInCart
//     ? `<button class="btn in-cart" disabled>
//                  Added to Cart
//                </button>`
//     : `<button class="btn add-to-cart" >
//                  <span><img src='./src/assets/images/icon-add-to-cart.svg'/><span/>
//                  Add to Cart
//                </button>`