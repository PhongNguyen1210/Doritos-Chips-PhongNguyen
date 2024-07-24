/*=============== SHOW MENU ===============*/
const   navMenu = document.getElementById('nav-menu'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // when we click on ech nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')
    // Add a class ig the botton offset is greater than 50 of the viewport
    this.scrollY >=50   ? header.classList.add('shadow-header')
                        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== SWIPER FAVORITES ===============*/ 
const swiperFavorite = new Swiper('.favorite__swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',
})

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // when the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350  ? scrollUp.classList.add('show-scroll')
                         : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');

        if (sectionsClass) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}

// Thêm sự kiện cuộn để gọi hàm scrollActive
window.addEventListener('scroll', scrollActive);

window.addEventListener('scroll', scrollActive)
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
    reset: true, //animation repeat
})

sr.reveal(`.home__data, .favorite__container, .footer__container`)
sr.reveal(`.home__circle, .home__img`, {delay: 600, scale: .5})
sr.reveal(`.home__chips-1, .home__chips-2, .home__chips-3`, {delay: 1000, interval: 100})
sr.reveal(`.home__leaf`, {delay: 1200})
sr.reveal(`.home__tomato-1, .home__tomato-2`, {delay: 1400, interval: 100})
sr.reveal(`.care__img, .contact__img`, {origin: 'left'})
sr.reveal(`.care__list, .contact__data`, {origin: 'right'})
sr.reveal(`.banner__item`, {interval: 100})
sr.reveal(`.banner__item, .products__card`, {interval: 100})

//////////////// CART ///////////////////

// Định nghĩa một mảng giỏ hàng rỗng để lưu các sản phẩm
let cart = [];

// Hàm cập nhật hiển thị giỏ hàng
const updateCartDisplay = () => {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    // Xóa danh sách cũ
    cartList.innerHTML = '';

    // Biến lưu tổng giá
    let total = 0;

    // Lặp qua từng sản phẩm trong giỏ hàng và tạo phần tử hiển thị
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart__item';
        const formattedPrice = (item.price * item.quantity).toLocaleString('vi-VN');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart__image">
            <span class="cart__name">${item.name}</span>
            <div class="cart__quantity-control">
                <button class="cart__decrease-button">-</button>
                <span class="cart__quantity">${item.quantity}</span>
                <button class="cart__increase-button">+</button>
            </div>
            <span class="cart__price">${formattedPrice} VNĐ</span>
            <button class="cart__remove-button">
                <i class="ri-delete-bin-6-line"></i>
            </button>
        `;
        cartList.appendChild(cartItem);

        // Thêm sự kiện click cho nút xóa
        cartItem.querySelector('.cart__remove-button').addEventListener('click', () => {
            removeFromCart(item.name);
        });

        // Thêm sự kiện click cho nút tăng
        cartItem.querySelector('.cart__increase-button').addEventListener('click', () => {
            increaseQuantity(item.name);
        });

        // Thêm sự kiện click cho nút giảm
        cartItem.querySelector('.cart__decrease-button').addEventListener('click', () => {
            decreaseQuantity(item.name);
        });

        // Tính tổng giá
        total += item.price * item.quantity;
    });

    const formattedTotal = total.toLocaleString('vi-VN');
    cartTotal.innerText = `${formattedTotal} VNĐ`;

        // Hiển thị hoặc ẩn các nút
    const removeButtons = document.querySelectorAll('.cart__remove-button');
    const increaseButtons = document.querySelectorAll('.cart__increase-button');
    const decreaseButtons = document.querySelectorAll('.cart__decrease-button');

    if (cart.length === 0) {
        removeButtons.forEach(button => button.classList.add('hidden'));
        increaseButtons.forEach(button => button.classList.add('hidden'));
        decreaseButtons.forEach(button => button.classList.add('hidden'));
    } else {
        removeButtons.forEach(button => button.classList.remove('hidden'));
        increaseButtons.forEach(button => button.classList.remove('hidden'));
        decreaseButtons.forEach(button => button.classList.remove('hidden'));
    }
};

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = (product) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        // Nếu sản phẩm đã có, tăng số lượng
        existingProduct.quantity += 1;
    } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
        cart.push({ ...product, quantity: 1 });
    }

    // Cập nhật hiển thị giỏ hàng
    updateCartDisplay();
};

// Hàm xóa sản phẩm từ giỏ hàng
const removeFromCart = (productName) => {
    // Lọc ra sản phẩm cần xóa từ giỏ hàng
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        // Xóa sản phẩm khỏi giỏ hàng
        cart.splice(index, 1);
        // Cập nhật hiển thị giỏ hàng sau khi xóa
        updateCartDisplay();
    }
};

// Hàm tăng số lượng sản phẩm
const increaseQuantity = (productName) => {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
        updateCartDisplay();
    }
};

// Hàm giảm số lượng sản phẩm
const decreaseQuantity = (productName) => {
    const product = cart.find(item => item.name === productName);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCartDisplay();
    }
};
// Lấy tất cả các nút thêm vào giỏ hàng
const addToCartButtons = document.querySelectorAll('.products__button');

// Thêm sự kiện click cho từng nút thêm vào giỏ hàng
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Lấy thông tin sản phẩm từ HTML
        const productCard = button.parentElement;
        const productName = productCard.querySelector('.products__subtitle').innerText;
        const productPrice = parseInt(productCard.querySelector('.products__price').innerText.replace(' VNĐ', '').replace(/\./g, '')); // Loại bỏ dấu chấm và chuyển thành số nguyên
        const productImage = productCard.querySelector('.products__img').src; // Lấy đường dẫn hình ảnh sản phẩm
        const product = { name: productName, price: productPrice, image: productImage };

        // Gọi hàm thêm sản phẩm vào giỏ hàng
        addToCart(product);
    });
});
