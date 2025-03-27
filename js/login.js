const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const urlParams = new URLSearchParams(window.location.search);
const returnPage = urlParams.get('return');
const productInCart = localStorage.getItem('products')


signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const errElement = document.getElementById("err");
const errElement2 = document.getElementById("err2");
// handel signup ****************************************
function handelSignUp(btn) {
    let email = document.getElementById("email-up").value;
    let password = document.getElementById("password-up").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let name = document.getElementById("user-name-up").value;

    let emailValid = validateEmail(email);
    let passwordValid = password.length > 6;
    let passwordsMatch = password === confirmPassword;
    
    if (name !== "" && name.length > 3 && emailValid && passwordValid && passwordsMatch) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        // Reset border colors
        document.getElementById("email-up").style.border = "";
        document.getElementById("password-up").style.border = "";
        document.getElementById("confirmPassword").style.border = "";
        document.getElementById("user-name-up").style.border = "";

        try {
            fetch(`${baseUrl}/accounts/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    first_name: name,
                    email: email,
                    password: password,
                    password2: confirmPassword,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.email) {
                    window.localStorage.setItem('user', JSON.stringify(data));
                    Swal.fire({
                        icon: "success",
                        title: "Signed up successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    errElement.innerHTML = "Account created successfully";
                    errElement.style.color = "green";
                    
                    signInAfterSignUp(email , password)
                    setTimeout(() => {
                        window.location.href = returnPage ? `${returnPage}.html` : "/profile/user-view-account.html";
                    }, 1700);
                }
                else {
                    errElement.innerHTML = `${data.email ? data.email[0] : ""} ${data.password ? data.password[0] : ""}`;
                    btn.innerHTML = "Sign Up";
                    btn.disabled = false;
                }
                
                
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "Sign Up";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            
        }
    } else {
        // Set border colors to red for invalid inputs
        if (!emailValid) {
            document.getElementById("email-up").style.border = "1px solid red";
        }
        if (!passwordValid) {
            document.getElementById("password-up").style.border = "1px solid red";
        }
        if (!passwordsMatch) {
            document.getElementById("confirmPassword").style.border = "1px solid red";
        }
        if (name === "" || name.length <= 3) {
            document.getElementById("user-name-up").style.border = "1px solid red";
        }
    }
}

function handelSignIn(btn) {
    let email = document.getElementById("email-in").value;
    let password = document.getElementById("password-in").value;

    let emailValid = validateEmail(email);
    let passwordValid = password.length > 6;

    
    if (emailValid && passwordValid ) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        // Reset border colors
        document.getElementById("email-up").style.border = "";
        document.getElementById("password-up").style.border = "";

        try {
            fetch(`${baseUrl}/accounts/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.access) {
                    localStorage.setItem('token', data.access);
                    localStorage.setItem('refresh', data.refresh);
                    window.location.href = "/profile/user-view-account.html";
                } else {
                    errElement2.innerHTML = "Invalid email or password";
                    btn.innerHTML = "Sign In";
                    btn.disabled = false;
                }
                
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "Sign Up";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            
        }
    } else {
        // Set border colors to red for invalid inputs
        if (!emailValid) {
            document.getElementById("email-up").style.border = "1px solid red";
        }
        if (!passwordValid) {
            document.getElementById("password-up").style.border = "1px solid red";
        }
    }
}


async function addProductsToCart() {
    let products = localStorage.getItem('products');
    let dataForm = []
    await JSON.parse(products).map(product => {
        dataForm.push({
            id: product.id,
            quantity: product.quantity,
        })
    })
    
    try {
        await fetch(`${baseUrl}/store/carts/add_items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dataForm),
        })
        .then(response => response.json())
        .then(data => {
            
            localStorage.removeItem('products')
            window.location.href = returnPage ? `${returnPage}.html` : "/profile/user-view-account.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            
        });
    } catch (error) {
        console.log(error);
        
    }

}

function signInAfterSignUp(email , password) {
    try {
         fetch(`${baseUrl}/accounts/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.access) {
                localStorage.setItem('token', data.access);
                localStorage.setItem('refresh', data.refresh);
                addProductsToCart()
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
