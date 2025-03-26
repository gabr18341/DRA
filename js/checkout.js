const user_Auth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const userToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const proCartElement = document.getElementById("cart-products");
const subtotalCart = document.getElementById("subtotal");
const totalCart = document.getElementById("total");
const vatElement = document.getElementById("vat");
const errElement = document.getElementById("err");

let cart_det = [];
let cart_ids = [];
let cart_quantity = [];
let total_price = 0 ;
function getProInCart() {
    if (userToken) {
        proCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
        try {
            fetch(`${baseUrl}/store/carts/my_cart/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const products = data;
                    proCartElement.innerHTML = "";
                    if (products.items.length === 0) {
                        return (
                            proCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h5>No product available</h5></div>"
                        );
                    }
                    
                    
                    total_price = products.total_price;
                    products.items.forEach((item) => {
                        cart_ids.push(item.product.id);
                        cart_quantity.push(item.quantity);
                        cart_det.push(item.product.name);
                        proCartElement.innerHTML += `
                    <div class="product">
                        <div class="img-product"><img src="${item.product.image ? item.product.image : "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?resize=300%2C300&ssl=1"}" alt=""></div>
                        <div class="d-flex justify-content-between flex-grow-1 align-items-center">
                            <div class="product-det">
                                <p>${item.product.name}</p>
                            </div>
                            <div class="total-price d-flex gap-1">
                            <p>${item.total_price}</p>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: #ccc;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg></span>
                            </div>
                        </div>
                    </div>
                `;
                    });
                    let subtotal = Number(total_price.toFixed(2));
                    let vat = subtotal * 0.15;
                    let total = subtotal;
                    subtotalCart.innerHTML = `${subtotal.toFixed(2)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: #ccc;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg>`;
                    vatElement.innerHTML = `${vat.toFixed(2)} `;
                    totalCart.innerHTML = `${total.toFixed(2)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: #ccc;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg>`;

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            console.log(error);

        }
    } else {
        alert("You must login first");
        window.location.href = "login.html";
    }
}
getProInCart();
function checkout() {
    const full_name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const agree = document.getElementById("agree");
    let emailValid = validateEmail(email);

    if (userToken && full_name.length > 2 && emailValid && phone.length > 9 && city.length > 2 && agree.checked === true) {
        console.log({
            'cart_ids': cart_ids,// array of ids
            'cart_orders': cart_det,// array of ids
            'user_id': `${user_Auth?.email}`,
            'full_name': document.getElementById("username").value,
            'email': document.getElementById("email").value,
            'phone': document.getElementById("phone").value,
            'company_name': document.getElementById("Company-name").value,
            'city': document.getElementById("city").value,
        });
        document.querySelector('.modal-body').innerHTML = `<div style="width: 100% !important;padding: 20px 0;" class="mysr-form"></div>`
        
        Moyasar.init({
            element: '.mysr-form',
            // Amount in the smallest currency unit.
            // For example:
            // 10 SAR = 10 * 100 Halalas
            // 10 KWD = 10 * 1000 Fils
            // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
            amount: total_price * 100,
            currency: 'SAR',
            description: `Order # ${cart_det}`,
            publishable_api_key: 'pk_test_UnMo2i4ni8F6mYx1wJgTe1SwMpLhnYJCCxshhbHw',
            callback_url: 'http://192.168.100.40:8000/api/payment/moyasar/callback/', // prossesing url
            methods: ['creditcard', "applepay "],
            metadata: {
                'products_id': `{${cart_ids}}`,// array of ids
                'quantities': `{${cart_quantity}}`,// array of quantities
                'user_id': `${user_Auth?.email}`,
                'full_name': document.getElementById("username").value,
                'email': document.getElementById("email").value,
                'phone': document.getElementById("phone").value,
                'company_name': document.getElementById("Company-name").value,
                'city': document.getElementById("city").value,
            },
            apple_pay: {
                country: 'SA',
                label: 'Your Store Label',
                validate_merchant_url: 'https://api.moyasar.com/v1/applepay/initiate',
            }
        })
    } else {
        document.querySelector('.modal-body').innerHTML = `<div class='d-flex justify-content-center align-items-center py-2 w-100'><h5> Complete your information </h5></div>`

    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

