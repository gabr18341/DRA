const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id').slice(4);
const base_Url = 'http://192.168.8.102:8000/api';
const Token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
let targetProduct ;
if (!productId) {
    window.location.href = "shop.html";
}
function getProducts() {
    try {
        fetch(`${base_Url}/store/products/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const products = data;
            targetProduct = products.filter((product) => product.id == productId)[0];
            getCategories(targetProduct.category);
            document.querySelector('.product-container .product-details .product-title').textContent = targetProduct.name;
            document.querySelector('.product-container .product-details .product-price span.price').textContent = targetProduct.price;
            document.querySelector('.product-container .product-details h6').textContent = targetProduct.description;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getProducts();
function getCategories(slug) {
    try {
        fetch(`${base_Url}/store/categories/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const categories = data;
            let categorySlug = categories.filter((category) => category.id == slug)[0].slug;
            getRelatedProducts(categorySlug);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
const productsElement = document.getElementById("related-products");
function getRelatedProducts(cat) {
    productsElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    let api = `${base_Url}/store/categories/${cat}/products/`;
    try {
        fetch(`${api}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            productsElement.innerHTML = "";
            const products = data;
            products.forEach(product => {
                let random = Math.floor(1000 + Math.random() * 9000);
                
                productsElement.innerHTML += `
                    <div class="product-card flex-grow-1 flex-md-grow-0">
                        <div class="product-img">
                            
                            <img src="https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?fit=1080%2C1080&ssl=1" alt="">
                        </div>
                        <div class="product-content">
                            <a href="product.html?id=${random}${product.id}"><h6 class="text-black-50">${product.name}</h6></a>
                            <div class="product-price d-flex gap-1 align-items-center">
                                <span>﷼</span>
                                <span class="price">${product.price}﷼</span>
                            </div>   
                            <button class="main-btn mt-2"  data-proID="${product.id}" onclick="addToCartR(this)">Add To Cart</button>
                        </div>
                    </div>
                `;
            })

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}

function addToCartR(btn) {
    let productId = btn.getAttribute('data-proID');
    
    
    if (Token ) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        try {
            fetch(`${base_Url}/store/carts/add_item/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Token}`
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: '1',
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    btn.innerHTML = "Added";
                    // btn.disabled = true;
                    getProInCart();
                    showCart();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "+";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.innerHTML = "+";
            btn.disabled = false;
            
        }
    } else {
        alert("Please login first");
    }

}
function addToCart(btn) {
    let quantity = document.querySelector('.product-container .product-details .action-container .d-flex .count').textContent;
    if (Token ) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        try {
            fetch(`${base_Url}/store/carts/add_item/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Token}`
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: quantity,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    btn.innerHTML = "Added";
                    getProInCart();
                    showCart();
                    btn.disabled = false;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "+";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.innerHTML = "+";
            btn.disabled = false;
            
        }
    } else {
        alert("Please login first");
    }

}

function deleteFromCart(btn) {
    let productId = btn.getAttribute('data-proID');
    
    
    if (Token ) {
        btn.innerHTML = "...";
        btn.disabled = true;
        try {
            fetch(`${base_Url}/store/carts/remove_item/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Token}`
                },
                body: JSON.stringify({
                    product_id: productId,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    getProInCart();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "<i class='bx bx-trash' ></i>";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.innerHTML = "<i class='bx bx-trash' ></i>";
            btn.disabled = false;
            
        }
    } else {
        alert("Please login first");
    }

}


document.querySelector('.product-container .product-img .search-icon').addEventListener('click', function () {
    document.querySelector('.popup-img').classList.add('show');
})
document.querySelector('.popup-img .close').addEventListener('click', function () {
    document.querySelector('.popup-img').classList.remove('show');
})



// handel zoom in img on hover

// const container = document.querySelector(".product-container .product-img");
// const image = document.querySelector(".zoom-image");
// const lens = document.querySelector(".zoom-lens");

// container.addEventListener("mousemove", (e) => {
//     const bounds = container.getBoundingClientRect();
//     const lensSize = lens.offsetWidth / 2;

//     // حساب موضع العدسة
//     let x = e.clientX - bounds.left - lensSize;
//     let y = e.clientY - bounds.top - lensSize;

//     // الحد من حركة العدسة داخل الصورة
//     x = Math.max(0, Math.min(x, bounds.width - lens.offsetWidth));
//     y = Math.max(0, Math.min(y, bounds.height - lens.offsetHeight));

//     lens.style.left = `${x}px`;
//     lens.style.top = `${y}px`;
//     lens.style.display = "block";

//     // تطبيق تأثير التكبير
//     image.style.transformOrigin = `${(x / bounds.width) * 100}% ${(y / bounds.height) * 100}%`;
//     image.style.transform = "scale(2.5)"; // تكبير الصورة
// });

// container.addEventListener("mouseleave", () => {
//     lens.style.display = "none";
//     image.style.transform = "scale(1)"; // إعادة الصورة إلى الحجم الطبيعي
// });
