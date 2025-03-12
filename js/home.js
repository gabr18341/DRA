const userAuth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const base_URL = 'http://192.168.8.102:8000/api';
const errElement = document.getElementById("err");
const categoriesElement = document.getElementById("categories");
const productsElement = document.getElementById("products");
const packagesElement = document.getElementById("packages");
const partnersElement = document.getElementById("partners");
const proInCartElement = document.getElementById("pro-in-cart");
const statisticsElement = document.getElementById("statistics");
const subtotalBtn = document.getElementById("subtotal");
const checkoutBtn = document.getElementById("checkout-total");

// handel signup ****************************************
function getCategory() {
    try {
        fetch(`${base_URL}/store/categories/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            
            const categories = data;
            categoriesElement.innerHTML = `<li><button onclick="getProducts('all')" data-filter='all'>All</button></li>`;
            categories.forEach(category => {
                categoriesElement.innerHTML += `
                    <li><button onclick="getProducts('${category.slug}')" data-filter="${category.slug}">${category.name}</button></li>
                `;
            });

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getCategory();
function getProducts(cat) {
    productsElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    let api = cat === "all" ? `${base_URL}/store/products/` : `${base_URL}/store/categories/${cat}/products/`;
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
                    <div class="product-item p-2 d-flex align-items-center gap-2" >
                        <div class="img-container">
                            <img src="https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Package-1.png?fit=1080%2C1080&ssl=1"
                                alt="">
                            <div class="add-cart"><span data-proID="${product.id}" onclick="addToCart(this)">+</span></div>
                        </div>
                        <div class="product-content p-1">
                            <a href="product.html?id=${random}${product.id}"><h6>${product.name}</h6></a>
                            <div class="stars-box d-flex align-items-center g-1 mb-2">
                                <i class='bx bx-star'></i>
                                <i class='bx bx-star'></i>
                                <i class='bx bx-star'></i>
                                <i class='bx bx-star'></i>
                                <i class='bx bx-star'></i>
                            </div>
                            <span class="price">${product.price}﷼</span>
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
getProducts("all");

function getPackages() {
    packagesElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    try {
        fetch(`${base_URL}/packages/packages/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            
            const packages = data;
            
            packagesElement.innerHTML = "";
            if (packages.length === 0) {
                return packagesElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h4>No packages available</h4></div>";
            }
            packages.forEach((package, index) => {
                const featuresList = package.features.map(feature => `<li class="card__list__item">${feature.description}</li>`).join('');
                packagesElement.innerHTML += `
                    <div data-aos-duration="10${index}0" data-aos="zoom-in" class="card ${index === 3 ? 'main-pack' : ''}">
                        <h6 class="card__title">${package.name}</h6>
                        <div class="card__body">
                            <p class="price"><span class="price__symbol">SAR</span>${package.monthly_price}</p>
                            <p class="price__tag">/Month</p>
                        </div>
                        <ol class="card__list">
                            ${featuresList}
                        </ol>
                        <button class="card__button" type="button">Buy Now</button>
                    </div>
                `;
            });

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getPackages();

function getPartners() {
    partnersElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    try {
        fetch(`${base_URL}/info/partners/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            
            const partners = data;
            
            partnersElement.innerHTML = "";
            if (partners.length === 0) {
                return partnersElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h4>No partners available</h4></div>";
            }
            partners.forEach((partner) => {
                partnersElement.innerHTML += `
                    <div class="item">
                        <img loading="lazy" src="${partner.url}" alt="">
                    </div>
                `;
            });

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getPartners();
function getStatistics() {
    statisticsElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    try {
        fetch(`${base_URL}/info/statistics/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            
            const statistics = data;            
            
            statisticsElement.innerHTML = "";
            if (statistics.length === 0) {
                return statisticsElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h4>No statistics available</h4></div>";
            }
            statistics.forEach((statistic) => {
                statisticsElement.innerHTML += `
                <div class="num-box">
                    <div class="box-img"><img src="assets/like.gif" alt=""></div>
                    <div class="box-content">
                        <h6>${statistic.value}+</h6>
                        <p>${statistic.title}</p>
                    </div>
                </div>
                `;
            });
            

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getStatistics();

function getProInCart() {
    proInCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    try {
        fetch(`${base_URL}/store/carts/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const products = data;
            
            proInCartElement.innerHTML = "";
            if (products?.items?.length === 0) {
                return proInCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h4>No product available</h4></div>";
            }
            let subtotal = Number(products.total_price);
            let vat = subtotal * 0.15;
            let total = subtotal + vat;
            subtotalBtn.innerHTML = `${subtotal.toFixed(2)}﷼`;
            checkoutBtn.innerHTML = `${total.toFixed(2)}`;
            products?.items?.forEach((item) => {
                proInCartElement.innerHTML += `
                    <div class="product-card d-flex gap-2">
                        <div class="img"><img src="${item.product.image ? item.product.image : "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?resize=300%2C300&ssl=1"}" alt=""></div>
                        <div class="content d-flex align-items-center justify-content-between flex-grow-1">
                            <div>
                                <h6>${item.product.name}</h6>
                                <p class="d-flex align-items-center gap-2"> <span class="qu">X${item.quantity}</span>: <span class="price">${item.product.final_price}﷼ .</span> </p>
                                <p class="total-price">${item.total_price}﷼.</p>
                            </div>
                            <div data-proID="${item.product.id}" onClick="deleteFromCart(this)" class="delate"><i class='bx bx-trash' ></i></div>
                        </div>
                    </div>
                `;
            });

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
function addToCart(btn) {
    let productId = btn.getAttribute('data-proID');
    let quantity = 1;
    
    
    if (userAuth ) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        try {
            fetch(`${base_URL}/store/carts/add_item/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
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
function deleteFromCart(btn) {
    let productId = btn.getAttribute('data-proID');
    
    
    if (userAuth ) {
        btn.innerHTML = "...";
        btn.disabled = true;
        try {
            fetch(`${base_URL}/store/carts/remove_item/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
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