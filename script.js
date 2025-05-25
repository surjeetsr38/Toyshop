let searchForm = document.querySelector('.search-form')
document.querySelector('#search-btn').onclick = () =>
{
    searchForm.classList.toggle('active');

    
    shoppingCart.classList.remove('active');
      loginForm.classList.remove('active');
    navbar.classList.remove('active');

}


let shoppingCart = document.querySelector('.shopping-cart')
document.querySelector('#cart-btn').onclick = () =>
{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    
}

let loginForm = document.querySelector('.login-form')
document.querySelector('#login-btn').onclick = () =>
{
    loginForm.classList.toggle('active');

    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');

}

let navbar = document.querySelector('.navbar')
document.querySelector('#menu-btn').onclick = () =>
{
    navbar.classList.toggle('active');

    loginForm.classList.remove('active');

    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
}


window.onscroll = () =>
{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
      loginForm.classList.remove('active');
    navbar.classList.remove('active');


}

   var swiper = new Swiper(".product-slider",{
      loop:true,
      spaceBetween: 20,

      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
    
      breakpoints: {
        0: {
          slidesPerView: 1,
       
        },
        768: {
          slidesPerView: 2,
         
        },
        1020: {
          slidesPerView: 3,
        },
      },
    });

      var swiper = new Swiper(".review-slider",{
      loop:true,
      spaceBetween: 20,

      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
    
      breakpoints: {
        0: {
          slidesPerView: 1,
       
        },
        768: {
          slidesPerView: 2,
         
        },
        1020: {
          slidesPerView: 3,
        },
      },
    });


    // Js for cart start

  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  const cart = document.querySelector('.shopping-cart');
  const totalEl = cart.querySelector('.total');
  cart.innerHTML = ''; // Clear previous items
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const box = document.createElement('div');
    box.classList.add('box');
    box.innerHTML = `
      <i class="fa fa-trash" data-index="${index}"></i>
      <img src="${item.img}" alt="${item.name}">
      <div class="content">
        <h3>${item.name}</h3>
        <span class="Price"> ₹ ${item.price} </span>
        <span class="quantity">
          Qty: 
          <button class="qty-btn" data-action="dec" data-index="${index}">-</button>
          ${item.quantity}
          <button class="qty-btn" data-action="inc" data-index="${index}">+</button>
        </span>
      </div>
    `;
    cart.appendChild(box);
  });

  const totalDiv = document.createElement('div');
  totalDiv.className = 'total';
  totalDiv.textContent = `Total : ₹${total.toFixed(2)}`;
  cart.appendChild(totalDiv);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const name = this.dataset.name;
    const price = parseFloat(this.dataset.price);
    const img = this.dataset.img;

    const existing = cartItems.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({ name, price, img, quantity: 1 });
    }

    saveCart();
    showMessage(`${name} added to cart!`);
  });
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-trash')) {
    const index = e.target.dataset.index;
    cartItems.splice(index, 1);
    saveCart();
  }

  if (e.target.classList.contains('qty-btn')) {
    const index = e.target.dataset.index;
    const action = e.target.dataset.action;
    if (action === 'inc') {
      cartItems[index].quantity += 1;
    } else if (action === 'dec' && cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
    }
    saveCart();
  }
});

function showMessage(msg) {
  let msgBox = document.createElement('div');
  msgBox.textContent = msg;
  msgBox.style.position = 'fixed';
  msgBox.style.top = '20px';
  msgBox.style.right = '20px';
  msgBox.style.padding = '10px 20px';
  msgBox.style.background = 'green';
  msgBox.style.color = 'white';
  msgBox.style.borderRadius = '5px';
  msgBox.style.zIndex = 9999;
  document.body.appendChild(msgBox);

  setTimeout(() => {
    msgBox.remove();
  }, 2000);
}

// Render cart on page load
renderCart();

//js for cart end

