const user_Auth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const userToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const baseURL = 'http://192.168.8.102:8000/api';
const proCartElement = document.getElementById("cart-products");
const proInSideCartElement = document.getElementById("pro-in-cart");
const subtotalCart = document.getElementById("subtotal");
const totalCart = document.getElementById("total");
const subtotalBtnInCart = document.getElementById("subtotal-in-cart");
const checkoutBtnInCart = document.getElementById("checkout-total");
const vatElement = document.getElementById("vat");

function getProInCart() {
    if (userToken) {
    proCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    proInSideCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
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
            proInSideCartElement.innerHTML = "";
            if (products.items.length === 0) {
                return(
                    proCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h5>No product available</h5></div>",
                    proInSideCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h5>No product available</h5></div>"
                );
            }
            let subtotal = Number(products.total_price);
            let vat = subtotal * 0.15;
            let total = subtotal + vat;
            subtotalCart.innerHTML = `${subtotal.toFixed(2)}﷼`;
            subtotalBtnInCart.innerHTML = `${subtotal.toFixed(2)}﷼`;
            vatElement.innerHTML = `${vat.toFixed(2)}﷼`;
            totalCart.innerHTML = `${total.toFixed(2)}﷼`;
            checkoutBtnInCart.innerHTML = `${total.toFixed(2)}`;
            products.items.forEach((item) => {
                proCartElement.innerHTML += `
                    <tr>
                        <th scope="row"><span data-proID="${item.product.id}" onClick="deleteFromCart(this)"><i  class='bx bx-trash' ></i></span></th>
                        <td><img width="40" height="40" src="${item.product.image ? item.product.image : "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?resize=300%2C300&ssl=1"}" alt=""></td>
                        <td>${item.product.name}</td>
                        <td>${item.product.final_price} ﷼</td>
                        <td>
                            <div class="d-flex gap-2 control-btns">
                                <span onclick="handelCountInCart(this)" data-calc="dec" class="dec-btn">-</span>
                                <span class="count">${item.quantity}</span>
                                <span onclick="handelCountInCart(this)" data-calc="inc" class="inc-btn">+</span>
                            </div>
                        </td>
                        <td>
                           <p> ${item.total_price} ﷼ (incl. VAT)</p>
                        </td>
                      </tr>
                `;
                proInSideCartElement.innerHTML += `
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
   } else {
    alert("You must login first");
    window.location.href = "login.html";
   }
}
getProInCart();

function deleteFromCart(btn) {
    let productId = btn.getAttribute('data-proID');
    if (userToken ) {
        btn.disabled = true;
        try {
            fetch(`${baseURL}/store/carts/remove_item/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
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
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.disabled = false;
            
        }
    } else {
        alert("Please login first");
    }

}