const currentPage = window.location.pathname
const userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const baseUrl = 'http://192.168.100.40:8000/api';
const TOKEN = localStorage.getItem('token') ? localStorage.getItem('token') : null;
let Products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

if (document.querySelector('header')) {

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
                    <div class="logo-menu-in-mobile">
                        <img src="assets/Dra-header-LOGO.svg" alt="LOGO">
                    </div>
                    <a class="${currentPage === '/' || currentPage.includes('index') ? 'active' : ''}" href="index.html">home</a>
                    <a href="#vision-section">Our Vision</a>
                    <a href="#why-dra-section">Why Choose DRA?</a>
                    <a href="#our-packs">Our Packs</a>
                    <a class="${currentPage.includes('/shop.html') ? 'active' : ''}" href="shop.html">Our Shop</a>
                    <a class="${currentPage.includes('contact.html') ? 'active' : ''}" href="contact.html">Contact-us</a>
                    <div id="close-menu" class="mobile-icons">
                        <i class='bx bx-x' ></i>
                    </div>
                    <div class="social-icons-menu justify-content-between">
                        <a href="#"><i class='bx bxl-facebook'></i></a>
                        <a href="#"><i class='bx bxl-instagram'></i></a>
                        <a href="#"><i class='bx bxl-linkedin'></i></a>
                        <a href="#"><i class='bx bxl-whatsapp'></i></a>
                    </div>
                </nav>
                <div class="d-flex gap-2">
                    <div id="mobile-menu" class="mobile-nav">
                        <i class='bx bxs-grid'></i>
                    </div>
                    <a href="${userDetails ? '/profile/user-view-account.html' : 'login.html'}" class="main-btn">
                        <span class="d-flex align-items-center gap-1 "><i class='bx bx-user-circle fs-4'></i> <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;max-width: 100px;">${userDetails ? userDetails.first_name : 'Sign in'}</span>  </span>
                    </a>
                    <a href="tel:+966920012778" class="main-btn">
                        <span>Call Now</span>
                    </a>
                    
                </div>
            </div>
            
            </div>
    `;
}
if (document.querySelector('footer')) {

    document.querySelector('footer').innerHTML = `
    <div class="container py-5">
                <div class="d-flex flex-wrap">
                    <div class="col-12 px-2 col-md-6 col-lg-3">
                        <div class="logo-footer"><img src="assets/Dra-header-LOGO.svg" alt=""></div>
                        <p>Together, we reach the summit.</p>
                        <div class="social-container d-flex gap-1 mt-2">
                            <a target="_blank" href="https://www.facebook.com/digits.reality/" class="icon-box"><i class='bx bxl-facebook'></i></a>
                            <a target="_blank" href="https://www.twitter.com/digitsreality/" class="icon-box"><i class='bx bxl-twitter' ></i></a>
                            <a target="_blank" href="https://www.youtube.com/@digits.reality" class="icon-box"><i class='bx bxl-youtube' ></i></a>
                            <a target="_blank" href="https://www.instagram.com/digits.reality/" class="icon-box"><i class='bx bxl-instagram' ></i></a>
                            <a target="_blank" href="https://snapchat.com/t/ltnxIbE7" class="icon-box"><i class='bx bxl-snapchat' ></i></a>
                            <a target="_blank" href="https://www.tiktok.com/@digits.reality?_t=8nvZt1WOwa7&_r=1" class="icon-box"><i class='bx bxl-tiktok' ></i></a>
                        </div>
                    </div>
                    <div class="col-6 px-4 col-lg-3 mt-4 mt-md-0">
                        <h6>Quick Links</h6>
                        <ul>
                            <li><a href="shop.html">Our Shop</a></li>
                            <li><a href="index.html#our-packs">Our Packs</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>
                    <div class="col-6 px-4 col-lg-3 mt-4 mt-lg-0">
                        <h6>Help</h6>
                        <ul>
                            <li><a href="privacy.html">Privacy Policy</a></li>
                            <li><a href="refund.html"> Refunds and Returns</a></li>
                            <li><a href="refund.html"> My Account</a></li>
                        </ul>
                    </div>
                    <div class="col-12 px-2 col-md-6 col-lg-3 mt-4 mt-lg-0">
                        <h6>Newsletter</h6>
                        <p>Sign up for our newsletter to receive our promotions</p>
                        <form>
                            <input type="text" id="email-subscribe" placeholder="sampel@gmail.com">
                            <button onclick="handelNewsletter(this)" class="main-btn w-100">subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="bottom-footer">
                <div class="container d-flex align-items-center py-2">
                    <div class="img-bottom-footer"><img src="assets/vision_2030.png" alt=""></div>
                    <p class="flex-grow-1 text-white d-flex justify-content-center align-items-center gap-1"><i class='bx bx-copyright' ></i>2024 <a href="https://dra.sa/" class=" text-info ">DRA</a> . All rights reserved.</p>
                    <div class=""></div>
                </div>
            </div>
    `
}

// handel show mobile menu
if (document.getElementById('mobile-menu')) {
    document.getElementById('mobile-menu').onclick = () => {
        document.querySelector('.nav-header').classList.add('show-mobile-menu');
    }
}
if (document.getElementById('close-menu')) {
    document.getElementById('close-menu').onclick = () => {
        document.querySelector('.nav-header').classList.remove('show-mobile-menu');
    }
}

// handel show cart ;
const productsInCartElement = document.getElementById("pro-in-cart");
const subtotal_Btn = document.getElementById("subtotal");
const checkout_Btn = document.getElementById("checkout-total");
// function getProInCart() {
//     productsInCartElement.innerHTML = "";
//     if (Products.length === 0) {
//         return productsInCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h4>No product available</h4></div>";
//     }
//     let total_price = 0;
    
//     Products.forEach((product) => {
//         total_price = total_price + (product.final_price * product.quantity)
//         productsInCartElement.innerHTML += `
//             <div class="product-card d-flex gap-2">
//                 <div class="img"><img src="${product.image ? product.image : "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?resize=300%2C300&ssl=1"}" alt=""></div>
//                 <div class="content d-flex align-items-center justify-content-between flex-grow-1">
//                     <div>
//                         <h6>${product.name}</h6>
//                         <p class="d-flex align-items-center gap-2"> <span class="qu">X${product.quantity}</span>: <span class="price">${product.final_price} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 14px; fill: #ccc;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg> </span> </p>
//                         <p class="total-price">${product.final_price * product.quantity} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 14px; fill: #ccc;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg></p>
//                     </div>
//                     <div data-proID="${product.id}" onClick="deleteFromCart(this)" class="delate"><i class='bx bx-trash' ></i></div>
//                 </div>
//             </div>
//         `;
//     });
//     let subtotal = total_price;
//     let vat = subtotal * 0.15;
//     let total = subtotal + vat;
//     subtotalBtn.innerHTML = `${subtotal.toFixed(2)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 14px; fill: white;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg>`;
//     checkoutBtn.innerHTML = `${total.toFixed(2)}`;
// }

function handelNewsletter(btn) {
    let email = document.getElementById('email-subscribe');
    let emailValid = validateEmail(email.value);
    if (emailValid) {
        btn.innerHTML = 'loading...';
        btn.disabled = true;
        try {
            fetch(`${baseUrl}/tickets/newsletter/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                })
            })
            .then(response => response.json())
            .then(data => {
                btn.disabled = false;
                if (data.email) {
                    email.style.border = "0";
                    email.value = ''
                    btn.innerHTML = 'subscribed';
                } else if(data.error) {
                    btn.innerHTML = 'subscribe';
                    alert(`${data.error}`)
                }
                
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "subscribe";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.innerHTML = "subscribe";
            btn.disabled = false; 
        }
    } else {
        email.style.border = "1px solid red";
    }
}
function showCart() {
    if (!document.querySelector('.cart-section').classList.contains('show-cart')) {
        getProInCart();
    }
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
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
// handel language change *******************************************************
// const htmlElement = document.documentElement;

// // تنفيذ المهمة عند تغيير اللغة
// const handleLanguageChange = (lang) => {

//   // ✅ يمكنك تنفيذ أي مهمة هنا
//   if (lang === "ar") {
//     document.body.style.direction = "rtl";
//     document.body.classList.add('rtl')
//   } else {
//     document.body.style.direction = "ltr"; 
//     document.body.classList.remove('rtl')
//   }
// };
    
// // مراقبة تغيّر خاصية lang
// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.attributeName === "lang") {
//       handleLanguageChange(htmlElement.lang);
//     }
//   });
// });

// // بدء مراقبة تغيّر lang في <html>
// observer.observe(htmlElement, { attributes: true });
// handel language change *******************************************************