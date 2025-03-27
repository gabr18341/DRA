const user_Auth = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const userToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;
const proCartElement = document.getElementById("cart-products");
const subtotalCart = document.getElementById("subtotal");
const totalCart = document.getElementById("total");
const vatElement = document.getElementById("vat");
const errElement = document.getElementById("err");
const urlParams = new URLSearchParams(window.location.search);
const packId = localStorage.getItem('packId')
const pack_period = localStorage.getItem('pack_period')
const pack_price = localStorage.getItem('pack_price')

if (!packId || !pack_period) {
    window.location.href = "index.html#our-packs";
}

function checkout() {
    const full_name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const agree = document.getElementById("agree");
    let emailValid = validateEmail(email);

    if (userToken && full_name.length > 2 && emailValid && phone.length > 9 && city.length > 2 && agree.checked === true) {
        document.querySelector('.modal-body').innerHTML = `<div style="width: 100% !important;padding: 20px 0;" class="mysr-form"></div>`
        
        Moyasar.init({
            element: '.mysr-form',
            // Amount in the smallest currency unit.
            // For example:
            // 10 SAR = 10 * 100 Halalas
            // 10 KWD = 10 * 1000 Fils
            // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
            amount: Number(pack_price) * 100,
            currency: 'SAR',
            description: `pack #${pack_period}`,
            publishable_api_key: 'pk_live_YEE2KvDZC16CkhdzwjBSp1RSUGePKo32fQ1wkkFF',
            callback_url: 'http://192.168.100.40:8000/api/payment/moyasar/callback/', // prossesing url
            methods: ['creditcard', "applepay "],
            metadata: {
                'package_id': `{${packId}}`,// array of ids
                'package_period': `${pack_period}`,
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
