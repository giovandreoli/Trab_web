// Produtos disponíveis
const products = [
    { id: 1, name: 'Baunilha', price: 100.00, image: 'Bacio-di-Latte.webp' },
    { id: 2, name: 'Chocolate', price: 100.00, image: 'Cioccolato-Belga.webp' },
    { id: 3, name: 'Doce de Leite', price: 110.00, image: 'Doce-de-Leite.webp' },
    { id: 4, name: 'Morango', price: 140.00, image: 'Fragola.webp' },
    { id: 5, name: 'Pistache', price: 100.00, image: 'Mousse-di-Pistacchio.webp'},
    { id: 6, name: 'Flocos', price: 100.00, image: 'Nocciolina.webp'},

];

// Variável para armazenar itens do carrinho
let cart = [];

// Função para renderizar produtos na página
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">R$ ${product.price.toFixed(2)}</p>
            <button class="button" onclick="addToCart(${product.id})">Adicionar</button>
        `;
        
        productList.appendChild(productCard);
    });
}

// Função para adicionar item ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    renderCart();  
}


// Função para remover item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Função para renderizar o carrinho
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Função para finalizar compra
document.getElementById('finalize-button').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Compra finalizada com sucesso!');
        cart = [];
        renderCart();
    } else {
        alert('Seu carrinho está vazio!');
    }
});

// Renderizar produtos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Evento de clique para finalizar a compra
document.getElementById('checkout').addEventListener('click', checkout);

//////////////////////////////////////////////////////////
