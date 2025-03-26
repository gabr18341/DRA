
let servicesInterested = []; // Array to store services interested
const interestsElement = document.getElementById("interests");

function getInterests() {
    interestsElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><div class='loader'></div></div>";
    try {
        fetch(`${baseUrl}/tickets/interests/`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            
            const interests = data;  
            
            interestsElement.innerHTML = "";
            if (interests.length === 0) {
                return interestsElement.innerHTML = "<div class='d-flex justify-content-center align-items-center py-2 w-100'><h4>No services available</h4></div>";
            }
            interests.forEach((statistic) => {
                interestsElement.innerHTML += `
                <li  class="form-check form-switch">
                    <input data-interest="${statistic.id}" oninput="handelChangeService(this)" class="form-check-input" type="checkbox" role="switch" required="" id="${statistic.code}">
                    <label for="${statistic.code}">${statistic.name}</label>
                </li>
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
getInterests();
function contactUs(btn) {
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let name = document.getElementById("name");
    let message = document.getElementById("message");

    let emailValid = validateEmail(email.value);
    
    if (name.value.length >= 3 && emailValid && phone.value.length > 8 && message.value.length > 6) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        // Reset border colors
        email.style.border = "1px solid #666";
        name.style.border = "1px solid #666";
        phone.style.border = "1px solid #666";
        message.style.border = "1px solid #666";

        try {
            fetch(`${baseUrl}/tickets/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    message: message.value,
                    email: email.value,
                    phone: phone.value,
                    interests: servicesInterested,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.email) {
                    Swal.fire({
                        icon: "success",
                        title: "Send your message successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    btn.innerHTML = "Sended";
                    name.value = "";
                    email.value = "";
                    phone.value = "";
                    message.value = "";
                    btn.disabled = false;
                    document.querySelectorAll('interests li input').forEach((input) => {
                        input.checked = false;
                    })
                }
                else {
                    btn.innerHTML = "Send Message";
                    btn.disabled = false;
                    console.log(data);
                    
                }
                
                
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "Send Message";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.innerHTML = "Send Message";
            btn.disabled = false;
            
        }
    } else {
        // Set border colors to red for invalid inputs
        if (!emailValid) {
            email.style.border = "1px solid red";
        }
        if (!name.value.length >= 3) {
            name.style.border = "1px solid red";
        }
        if (!phone.value.length > 8) {
            phone.style.border = "1px solid red";
        }
        if (!message.value.length > 8) {
            message.style.border = "1px solid red";
        }
    }
}
function handelChangeService(input) {
    let id = input.getAttribute("data-interest");
    let checkIncludes = servicesInterested.includes(id) 
    if (checkIncludes === false && input.checked === true) {
        servicesInterested.push(id);
    } else if (checkIncludes === true && input.checked === false) {
        let index = servicesInterested.indexOf(id);
        servicesInterested.splice(index, 1);
    }
}
