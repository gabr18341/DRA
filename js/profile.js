const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const baseUrl = 'http://192.168.100.40:8000/api';

if (!token) {
    window.location.href = "login.html";
}

function getMyAccount() {
    try {
         fetch(`${baseUrl}/accounts/profile/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("user-name").innerHTML = `${data.user.first_name} ${data.user.last_name}`
            document.getElementById("avatar-name").innerHTML = `${data.user.first_name} ${data.user.last_name}`
            document.getElementById("EditUserLastName").value = `${data.user.last_name}`
            document.getElementById("EditUserFirstName").value = `${data.user.first_name}`
            document.getElementById("user-email").innerHTML = `${data.user.email}`
            document.getElementById("EditUserEmail").value = `${data.user.email}`
            document.getElementById("user-address").innerHTML = `${data.address}`
            document.getElementById("EditUserAddress").value = `${data.address}`
            document.getElementById("company-name").innerHTML = `${data.company_name}`
            document.getElementById("EditCompanyName").value = `${data.company_name}`
            document.getElementById("user-phone").innerHTML = `${data.phone_number}`
            document.getElementById("EditUserPhone").value = `${data.phone_number}`
            document.getElementById("avatar-img").src = `${data.profile_picture ? data.profile_picture : "https://ionicframework.com/docs/img/demos/avatar.svg"}`
            document.getElementById("avatar-img2").src = `${data.profile_picture ? data.profile_picture : "https://ionicframework.com/docs/img/demos/avatar.svg"}`
            document.getElementById("user-img").src = `${data.profile_picture ? data.profile_picture : "https://ionicframework.com/docs/img/demos/avatar.svg"}`
                        
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getMyAccount()
function getPackages( ) {
    try {
        fetch(`${baseUrl}/packages/subscriptions/active/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            log(data);
            if (data.length > 0) {
                const package = data;
            document.getElementById("package_name").innerHTML = package[0].package_name;
            document.getElementById("planDuration").innerHTML = package[0].period_display;
            document.getElementById("planPrice").innerHTML = package[0].price_paid;
            // تحديد التاريخ الحالي وتاريخ الانتهاء
            const today = new Date();
            const endDate = new Date(package[0].end_date);
            const startDate = new Date(package[0].start_date);
            // حساب الفرق بالميلي ثانية
            const differenceInTime = endDate - today;
            const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
            const daysLeft = (today - startDate) / (1000 * 60 * 60 * 24);

            // تحويل الفرق إلى أيام
            const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
            
            document.getElementById("daysLeft").innerHTML = Math.floor(daysLeft);
            document.getElementById("totalDays").innerHTML = totalDays;
            document.getElementById("daysRemaining").innerHTML = Math.floor(differenceInDays);
            document.getElementById("progressBar").style.width = `${daysLeft / totalDays * 100}%`;
            document.getElementById("package_features").innerHTML = ""
            package[package.length - 1].package_features.map((feature, index) => {
                return(
                    document.getElementById("package_features").innerHTML += `
                        <li class="mb-2 d-flex align-items-center">
                          <i class="ti ti-circle-filled ti-10px text-secondary me-2"></i><span>${feature.description}</span>
                        </li>
                    `
                )
            })
            }
            // document.getElementById("progressBar").getAttribute("aria-valuenow") = `${daysLeft / totalDays * 100}`;
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getPackages( )

const ordersElement = document.getElementById("orders-list");
function getOrders() {
    try {
        fetch(`${baseUrl}/store/orders/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            
            const orders = data;
            ordersElement.innerHTML = "";
            if (orders.length === 0) {
                ordersElement.innerHTML = `
                    <tr>
                        <td colspan="6" style="text-align: center;">No orders found</td>
                    </tr>`
            }
            orders.map((order , index) => (
                ordersElement.innerHTML+= `
                    <tr>
                        <td>${index + 1}</td>
                        <td><span class="badge bg-label-primary">${order.status}</span></td>
                        <td>${order.order_total}</td>
                        <td>${order.items.length} items</td>
                        <td>${order.created_at.slice(0,10)}</td>
                        <td style="text-align: center;"><span class="badge ${order.working_status == 'COMPLETED' ? 'bg-label-primary' : order.working_status == 'PENDING' ? 'bg-label-warning' : order.working_status == 'IN_PROGRESS' ? 'bg-label-info' : 'bg-label-danger'} bg-label-warning">${order.working_status}</span></td>
                    </tr>
                `
            ))
            

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.log(error);
        
    }
}
getOrders( )

function handelEditUser(btn) {
    btn.innerHTML = "Loading...";
    const data = {
        "user": {
            "email": document.getElementById("EditUserEmail").value,
            "first_name": document.getElementById("EditUserLastName").value,
            "last_name": document.getElementById("EditUserFirstName").value,
        },
        "profile_picture": null,
        "phone_number": document.getElementById("EditUserPhone").value,
        "address": document.getElementById("EditUserAddress").value,
        "company_name": document.getElementById("EditCompanyName").value,
        "website": "",
        "linkedin": "",
        "twitter": "",
        "instagram": "",
        "facebook": "",
    };
    
    console.log(data);
    
    fetch(`${baseUrl}/accounts/profile/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.user.id) {
            btn.innerHTML = "Save Changes";
            getMyAccount();
            alert("Profile Updated Successfully");
            setTimeout(() => {
                btn.innerHTML = "Update Profile";
            }, 5000);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        btn.innerHTML = "Update Profile";
    });
}
const mainContent = document.getElementById("main-content");
const UserPills = document.querySelectorAll(".nav-align-top .nav-pills .nav-link");
function showSecurity(btn) {
    UserPills.forEach((pill) => {
        pill.classList.remove("active");
    });
    
    document.getElementById("main-content-orders").style.display = "none";
    document.getElementById("main-content-password").style.display = "block";
    btn.classList.add("active");
}
function showAccount(btn) {
    UserPills.forEach((pill) => {
        pill.classList.remove("active");
    });
    
    document.getElementById("main-content-password").style.display = "none";
    document.getElementById("main-content-orders").style.display = "block";
    btn.classList.add("active");
    getOrders()
}

function changePassword(btn) {
    let newPassword = document.getElementById("newPassword");
    let confirmPassword = document.getElementById("confirmPassword");
    let oldPassword = document.getElementById("oldPassword");
    
    if (newPassword.value === confirmPassword.value && newPassword.value.length > 6) {
        btn.innerHTML = "Loading...";
        btn.disabled = true;
        // Reset border colors
        newPassword.style.border = "1px solid #666";
        newPassword.style.border = "1px solid #666";
        oldPassword.style.border = "1px solid #666";

        try {
            fetch(`${baseUrl}/accounts/change-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    ,Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    old_password: oldPassword.value,
                    new_password: newPassword.value,
                    confirm_password: confirmPassword.value,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.detail === "Password updated successfully") {
                    Swal.fire({
                        icon: "success",
                        title: "Password updated successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    btn.innerHTML = "changed";
                    newPassword.value = "";
                    confirmPassword.value = "";
                    oldPassword.value = "";
                    setTimeout(() => {
                        btn.innerHTML = "Change Password";
                        btn.disabled = false;
                    }, 5000);
                }else if (data.old_password) {
                    Swal.fire({
                        icon: "error",
                        title: data.old_password,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    btn.innerHTML = "Change Password";
                    newPassword.value = "";
                    confirmPassword.value = "";
                    oldPassword.value = "";
                    btn.disabled = false;
                    oldPassword.style.border = "1px solid red";
                } else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    btn.innerHTML = "Change Password";
                    newPassword.value = "";
                    confirmPassword.value = "";
                    oldPassword.value = "";
                    btn.disabled = false;
                }
                
                
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerHTML = "Change Password";
                btn.disabled = false;
            });
        } catch (error) {
            console.log(error);
            btn.innerHTML = "Change Password";
            btn.disabled = false;
            
        }
    } else {
        // Set border colors to red for invalid inputs
        if (newPassword.value.length < 6) {
            newPassword.style.border = "1px solid red";
        }
        if (newPassword.value !== confirmPassword.value) {
            newPassword.style.border = "1px solid red";
            confirmPassword.style.border = "1px solid red";
        }
    }
}