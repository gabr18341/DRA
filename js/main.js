const currentPage = window.location.pathname
let currentLanguage = localStorage.getItem('lang') || 'en';



document.querySelector('header').innerHTML = `
<div class="container p-2">
<div class="d-flex justify-content-center justify-content-md-between align-items-center">
    <div class="header-logo p-1">
        <a href="index.html">
            <img src="assets/Dra-header-LOGO.svg" alt="">
        </a>
    </div>
    <div class="contact-header-box d-none d-md-flex p-1">
        <div class="contact-box d-flex align-items-center ">
            <span>
                <i class='bx bxs-phone'></i>
            </span>
            
            <div>
                <h6>Call Us</h6>
                <p>920012778</p>
            </div>
        </div>
        <div class="contact-box d-flex align-items-center ">
            <span>
                <i class='bx bx-current-location'></i>
            </span>
            <div>
                <h6>Our Location</h6>
                <p>Alkawther, Riyadh SA</p>
            </div>
        </div>
    </div>
</div>
</div>
<div class="nav-header">
<div class="container">
    <nav>
        <a class="${currentPage === '/' || currentPage.includes('index') ? 'active' : ''}" href="index.html">home</a>
        <a href="#vision-section">Our Vision</a>
        <a href="#why-dra-section">Why Choose DRA?</a>
        <a href="#our-packs">Our Packs</a>
        <a class="${currentPage.includes('/shop.html') ? 'active' : ''}" href="shop.html">Our Shop</a>
        <a class="${currentPage.includes('contact.html') ? 'active' : ''}" href="contact.html">Contact-us</a>
        <div id="close-menu" class="mobile-icons">
            <i class='bx bx-x' ></i>
        </div>
    </nav>
    <div class="d-flex gap-2">
        <div id="mobile-menu" class="mobile-nav">
            <i class='bx bx-menu'></i>
        </div>
        <button class="main-btn btn-sm fs-6 " type="button" >
            <div class="gtranslate_wrapper"></div>
        </button>
        <a href="tel:+966920012778" class="main-btn">
            <span>Call Now</span>
        </a>
        
    </div>
</div>

</div>
`;
document.querySelector('footer').innerHTML = `
<div class="container py-5">
            <div class="d-flex flex-wrap">
                <div class="col-12 px-2 col-md-6 col-lg-3">
                    <div class="logo-footer"><img src="assets/Dra-header-LOGO.svg" alt=""></div>
                    <p>Together, we reach the summit.</p>
                    <div class="social-container d-flex gap-1 mt-2">
                        <a href="https://www.facebook.com/digits.reality/" class="icon-box"><i class='bx bxl-facebook'></i></a>
                        <a href="https://www.twitter.com/digitsreality/" class="icon-box"><i class='bx bxl-twitter' ></i></a>
                        <a href="https://www.youtube.com/@digits.reality" class="icon-box"><i class='bx bxl-youtube' ></i></a>
                        <a href="https://www.instagram.com/digits.reality/" class="icon-box"><i class='bx bxl-instagram' ></i></a>
                        <a href="https://snapchat.com/t/ltnxIbE7" class="icon-box"><i class='bx bxl-snapchat' ></i></a>
                        <a href="https://www.tiktok.com/@digits.reality?_t=8nvZt1WOwa7&_r=1" class="icon-box"><i class='bx bxl-tiktok' ></i></a>
                    </div>
                </div>
                <div class="col-6 px-4 col-lg-3 mt-4 mt-md-0">
                    <h6>DRA Company</h6>
                    <ul>
                        <li><a href="shop.html">Our Shop</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-6 px-4 col-lg-3 mt-4 mt-lg-0">
                    <h6>Help</h6>
                    <ul>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="refund.html"> Refunds and Returns</a></li>
                    </ul>
                </div>
                <div class="col-12 px-2 col-md-6 col-lg-3 mt-4 mt-lg-0">
                    <h6>Newsletter</h6>
                    <p>Sign up for our newsletter to receive our promotions</p>
                    <form>
                        <input type="text" placeholder="sampel@gmail.com">
                        <div class="main-btn">subscribe</div>
                    </form>
                </div>
            </div>
        </div>
        <div class="bottom-footer">
            <div class="container d-flex align-items-center py-2">
                <div class="img-bottom-footer"><img src="assets/vision_2030.png" alt=""></div>
                <p class="flex-grow-1 text-white d-flex justify-content-center align-items-center gap-1"><i class='bx bx-copyright' ></i>2024 DRA . All rights reserved.</p>
                <div class=""></div>
            </div>
        </div>
`

// handel show mobile menu
document.getElementById('mobile-menu').onclick = () => {
    document.querySelector('.nav-header').classList.add('show-mobile-menu');
}
document.getElementById('close-menu').onclick = () => {
    document.querySelector('.nav-header').classList.remove('show-mobile-menu');
}

// handel show cart ;
function showCart() {
    document.querySelector('.cart-section').classList.toggle('show-cart');
}


// handel count in cart 
function handelCountInCart(btn) {
    let count = btn.parentNode.querySelector('.count').textContent;
    let calc = btn.getAttribute('data-calc')
    if (calc === 'dec') {
        if (+count > 1) {
            count--;
        }
    } else {
        +count++;
    }
    btn.parentNode.querySelector('.count').textContent = count;
}


// handel filter section

const shopData = [
    {
        id: 1,
        name: 'Product 1',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'development',
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'development',
    },
    {
        id: 3,
        name: 'Product 3',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'development',
    },
    {
        id: 4,
        name: 'Product 4',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'development',
    },
    {
        id: 5,
        name: 'Product 5',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'advertising',
    },
    {
        id: 6,
        name: 'Product 6',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'advertising',
    },
    {
        id: 7,
        name: 'Product 7',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'services',
    },
    {
        id: 8,
        name: 'Product 8',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'services',
    },
    {
        id: 9,
        name: 'Product 9',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'services',
    },
    {
        id: 10,
        name: 'Product 10',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'services',
    },
    {
        id: 11,
        name: 'Product 11',
        price: 200,
        img: "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1",
        category: 'services',
    },
]

const filterBtns = document.querySelectorAll('.shop-section ul button');

function filterData(data) {
    const shopContainer = document.querySelector('.shop-section .shop-container')
    shopContainer.innerHTML = '';
    if (!data.length) {
        shopContainer.innerHTML = '<h3 class="text-center">No products found</h3>'
        return;

    }
    data.map(item => {
        return(
            shopContainer.innerHTML += `
                <div class="product-item p-2 d-flex align-items-center gap-2">
                    <div class="img-container">
                        <img src="https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1"
                            alt="">
                        <div class="add-cart"><span onclick="showCart()">+</span></div>
                    </div>
                    <div class="product-content p-1">
                        <a href="product.html"><h6>Growth Package</h6></a>
                        <div class="stars-box d-flex align-items-center g-1 mb-2">
                            <i class='bx bx-star'></i>
                            <i class='bx bx-star'></i>
                            <i class='bx bx-star'></i>
                            <i class='bx bx-star'></i>
                            <i class='bx bx-star'></i>
                        </div>
                        <span class="price">575.00 رس</span>
                    </div>
                </div>
            `
        )
    })
}

filterBtns?.forEach((btn) => {
    btn.addEventListener('click' , (btn) => {
        const targetCategory = btn.target.getAttribute('data-filter');
        const dataFiltered = shopData.filter(item => {
            if (item.category === targetCategory) {
                return item;
            } else if ('all' === targetCategory) {
                return shopData;
            }
        });
        filterData(dataFiltered)
    })
})


// استهداف عنصر <html>
const htmlElement = document.documentElement;

// تنفيذ المهمة عند تغيير اللغة
const handleLanguageChange = (lang) => {

  // ✅ يمكنك تنفيذ أي مهمة هنا
  if (lang === "ar") {
    document.body.style.direction = "rtl";
    document.body.classList.add('rtl')
  } else {
    document.body.style.direction = "ltr"; 
    document.body.classList.remove('rtl')
  }
};
    
// مراقبة تغيّر خاصية lang
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "lang") {
      handleLanguageChange(htmlElement.lang);
    }
  });
});

// بدء مراقبة تغيّر lang في <html>
observer.observe(htmlElement, { attributes: true });
