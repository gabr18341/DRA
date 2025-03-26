const user_Auth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const userToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
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
            proInSideCartElement.innerHTML = "";
            if (products.items.length === 0) {
                return(
                    proCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h5>No product available</h5></div>",
                    proInSideCartElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h5>No product available</h5></div>"
                );
            }
            let subtotal = Number(products.total_price);
            let vat = subtotal * 0.15;
            let total = subtotal ;
            subtotalCart.innerHTML = `${subtotal.toFixed(2)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: white;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg>`;
            subtotalBtnInCart.innerHTML = `${subtotal.toFixed(2)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: white;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg>`;
            vatElement.innerHTML = `${vat.toFixed(2)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: white;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg>`;
            totalCart.innerHTML = `${total.toFixed(2)} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: white;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg>`;
            checkoutBtnInCart.innerHTML = `${total.toFixed(2)}`;
            products.items.forEach((item) => {
                proCartElement.innerHTML += `
                    <tr>
                        <th scope="row"><span data-proID="${item.product.id}" onClick="deleteFromCart(this)"><i  class='bx bx-trash' ></i></span></th>
                        <td><img width="40" height="40" src="${item.product.image ? item.product.image : "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?resize=300%2C300&ssl=1"}" alt=""></td>
                        <td>${item.product.name}</td>
                        <td>${item.product.final_price}  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: #777;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg></td>
                        <td>
                            <div class="d-flex gap-2 control-btns justify-content-center">
                                <span class="count">${item.quantity}</span>
                            </div>
                        </td>
                        <td>
                           <p> ${item.total_price}  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 19px; fill: #777;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg> (incl. VAT)</p>
                        </td>
                      </tr>
                `;
                proInSideCartElement.innerHTML += `
                <div class="product-card d-flex gap-2">
                    <div class="img"><img src="${item.product.image ? item.product.image : "https://i0.wp.com/dra.sa/wp-content/uploads/2024/07/Growth-Package.png?resize=300%2C300&ssl=1"}" alt=""></div>
                    <div class="content d-flex align-items-center justify-content-between flex-grow-1">
                        <div>
                            <h6>${item.product.name}</h6>
                            <p class="d-flex align-items-center gap-2"> <span class="qu">X${item.quantity}</span>: <span class="price">${item.product.final_price} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 14px; fill: #777;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg> </span> </p>
                            <p class="total-price">${item.total_price} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1124.14 1256.39" style="height: 14px; fill: #777;"><path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"></path><path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"></path></svg></p>
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
    Swal.fire({
        icon: "error",
        title: "You must login first",
        showConfirmButton: false,
        timer: 1500
    });
    setTimeout(() => {
        window.location.href = "login.html?return=cart";
    }, 1700);
   }
}
getProInCart();

function deleteFromCart(btn) {
    let productId = btn.getAttribute('data-proID');
    if (userToken ) {
        btn.disabled = true;
        try {
            fetch(`${baseUrl}/store/carts/remove_item/`, {
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

{/* <span onclick="handelCountInCart(this)" data-calc="dec" class="dec-btn">-</span>
<span class="count">${item.quantity}</span>
<span onclick="handelCountInCart(this)" data-calc="inc" class="inc-btn">+</span> */}