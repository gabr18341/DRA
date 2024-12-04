const currentPage = window.location.pathname
console.log(currentPage);

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
    <div>
        <div id="mobile-menu" class="mobile-nav">
            <i class='bx bx-menu'></i>
        </div>

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
                        <a href="#" class="icon-box"><i class='bx bxl-facebook'></i></a>
                        <a href="#" class="icon-box"><i class='bx bxl-twitter' ></i></a>
                        <a href="#" class="icon-box"><i class='bx bxl-youtube' ></i></a>
                        <a href="#" class="icon-box"><i class='bx bxl-instagram' ></i></a>
                        <a href="#" class="icon-box"><i class='bx bxl-snapchat' ></i></a>
                        <a href="#" class="icon-box"><i class='bx bxl-tiktok' ></i></a>
                        <a href="#" class="icon-box"><i class='bx bx-strikethrough' ></i></a>
                    </div>
                </div>
                <div class="col-6 px-4 col-lg-3 mt-4 mt-md-0">
                    <h6>DRA Company</h6>
                    <ul>
                        <li><a href="#">Our Shop</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-6 px-4 col-lg-3 mt-4 mt-lg-0">
                    <h6>Help</h6>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#"> Refunds and Returns</a></li>
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
                <p class="flex-grow-1 fw-bold text-white d-flex justify-content-center align-items-center gap-1"><i class='bx bx-copyright' ></i>2024 DRA Company. All rights reserved.</p>
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