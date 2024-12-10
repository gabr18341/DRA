document.querySelector('.product-container .product-img .search-icon').addEventListener('click', function () {
    document.querySelector('.popup-img').classList.add('show');
})
document.querySelector('.popup-img .close').addEventListener('click', function () {
    document.querySelector('.popup-img').classList.remove('show');
})

// handel zoom in img on hover

const container = document.querySelector(".product-container .product-img");
const image = document.querySelector(".zoom-image");
const lens = document.querySelector(".zoom-lens");

container.addEventListener("mousemove", (e) => {
    const bounds = container.getBoundingClientRect();
    const lensSize = lens.offsetWidth / 2;

    // حساب موضع العدسة
    let x = e.clientX - bounds.left - lensSize;
    let y = e.clientY - bounds.top - lensSize;

    // الحد من حركة العدسة داخل الصورة
    x = Math.max(0, Math.min(x, bounds.width - lens.offsetWidth));
    y = Math.max(0, Math.min(y, bounds.height - lens.offsetHeight));

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;
    lens.style.display = "block";

    // تطبيق تأثير التكبير
    image.style.transformOrigin = `${(x / bounds.width) * 100}% ${(y / bounds.height) * 100}%`;
    image.style.transform = "scale(2)"; // تكبير الصورة
});

container.addEventListener("mouseleave", () => {
    lens.style.display = "none";
    image.style.transform = "scale(1)"; // إعادة الصورة إلى الحجم الطبيعي
});
