const user_Auth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const userToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const baseURL = 'http://192.168.8.102:8000/api';
const proCartElement = document.getElementById("cart-products");
const subtotalCart = document.getElementById("subtotal");
const totalCart = document.getElementById("total");
const vatElement = document.getElementById("vat");
const errElement = document.getElementById("err");

function getProInCart() {
    if (userToken) {
    proCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    try {
        fetch(`${baseURL}/store/carts/my_cart/`, {
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
                return(
                    proCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h5>No product available</h5></div>"
                );
            }
            let subtotal = Number(products.total_price);
            let vat = subtotal * 0.15;
            let total = subtotal + vat;
            subtotalCart.innerHTML = `${subtotal.toFixed(2)}﷼`;
            vatElement.innerHTML = `${vat.toFixed(2)}﷼`;
            totalCart.innerHTML = `${total.toFixed(2)}﷼`;
            products.items.forEach((item) => {
                proCartElement.innerHTML += `
                    <div class="product">
                        <div class="img-product"><img src="${item.product.image ? item.product.image : "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?resize=300%2C300&ssl=1"}" alt=""></div>
                        <div class="d-flex justify-content-between flex-grow-1 align-items-center">
                            <div class="product-det">
                                <p>${item.product.name}</p>
                                
                            </div>
                            <div class="total-price d-flex gap-1">
                                <span>رس.</span>
                                <p>${item.total_price}</p>
                            </div>
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
   } else {
    alert("You must login first");
    window.location.href = "login.html";
   }
}
getProInCart();
function checkout(btn) {
    const full_name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const agree = document.getElementById("agree");
    const company_name = document.getElementById("Company-name").value;
    let emailValid = validateEmail(email);
    console.log(agree.checked);
    
    if (userToken && full_name.length > 2 && emailValid && phone.length > 9 && city.length > 2 && agree.checked === true) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        try {
            fetch(`${baseURL}/store/checkout/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                } ,
                body : JSON.stringify({
                    full_name: full_name,
                    email: email,
                    phone: phone,
                    address_line_1: company_name,
                    city: city,
                    state: "NY",
                    country: country,
                    postal_code: "10001",
                    payment_method: "STRIPE",
                    coupon_code: ""
                }),
                
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    Swal.fire({
                        icon: "success",
                        title: "Order placed successfully",
                        showConfirmButton: true,
                    });
                    // setTimeout(() => {
                    //     window.location.href = "index.html";
                    // }, 1800);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: `${data.error}`,
                        showConfirmButton: true,
                    });
                }
                btn.innerHTML = "Place Order";
                btn.disabled = false;
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "Place Order";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.innerHTML = "Place Order";
            btn.disabled = false;
            
        }
   } else if (userToken === null ) {
    Swal.fire({
        icon: "error",
        title: "You must login first",
        showConfirmButton: true,
    });
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1800);
   } else if (agree.checked === false) {
    errElement.innerHTML = "You must agree to terms and conditions";
    btn.innerHTML = "Place Order";
    btn.disabled = false;
   } else {
    errElement.innerHTML = "Please fill all fields correctly";
    btn.innerHTML = "Place Order";
    btn.disabled = false;
   }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}