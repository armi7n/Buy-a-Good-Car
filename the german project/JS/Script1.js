const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

const searchInput = document.getElementById('siteSearch');
const searchBtn = document.getElementById('searchBtn');


function performSearch(q) {

    const query = q ? q.trim() : '';

    if (!query) {
        Swal.fire({
            icon: 'info',
            text: 'لطفاً عبارت مورد نظر را وارد کنید.'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'نتایج جستجو',
            text: `در حال جستجو برای: "${query}"`

        });
    }
}


searchBtn.addEventListener('click', () => {

    const isInputVisible = window.getComputedStyle(searchInput).display !== 'none';

    if (isInputVisible) {

        const q = searchInput.value;
        performSearch(q);
    } else {

        Swal.fire({
            title: 'جستجو در محصولات',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                placeholder: 'عبارت مورد نظر...'
            },
            showCancelButton: true,
            confirmButtonText: 'بگرد',
            cancelButtonText: 'انصراف',
            confirmButtonColor: '#007bff',
            showLoaderOnConfirm: true,
            preConfirm: (query) => {

                if (!query || query.trim().length === 0) {
                    Swal.showValidationMessage('لطفاً عبارتی را وارد کنید');
                    return false;
                }
                return query.trim();
            },
            allowOutsideClick: true
        }).then((result) => {

            if (result.isConfirmed && result.value) {
                performSearch(result.value);
            }
        });
    }
});


document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
        Swal.fire({
            icon: 'error',
            text: 'لطفاً تمام فیلدها را تکمیل کنید.'
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'پیام ارسال شد',
        text: 'با تشکر! ما در اسرع وقت با شما تماس خواهیم گرفت.'
    });

    this.reset();
});

document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const productName = btn.parentElement.querySelector('h3').innerText;

        Swal.fire({
            icon: 'success',
            title: '✅ محصول اضافه شد!',
            text: `${productName} به سبد خرید شما اضافه شد.`,
            confirmButtonText: 'باشه',
            confirmButtonColor: '#007bff',
            backdrop: true,
            timer: 2500,
            timerProgressBar: true
        });
    });
});

const JSON_FILE_PATH = './products.json';
const productContainer = document.getElementById('product-list-container');

// AXIOS
async function loadAndDisplayProducts() {
    try {
        const response = await axios.get(JSON_FILE_PATH);
        const products = response.data;
        renderProducts(products);

    } catch (error) {

        let errorMessage = 'خطای نامشخص در بارگذاری اطلاعات';


        if (error.response) {

            errorMessage = `خطا در بارگذاری (HTTP Status: ${error.response.status}) - فایل یافت نشد یا سرور خطا داد.`;
        } else if (error.request) {

            errorMessage = `خطا در اتصال: پاسخی از سرور دریافت نشد.`;
        } else {

            errorMessage = `خطا در اجرای درخواست: ${error.message}`;
        }

        productContainer.innerHTML = `<p style="color: red; padding: 10px; border: 1px dashed red; text-align: center;">${errorMessage}</p>`;
        console.error("Axios Error:", error);
    }
}

/**
 * این تابع آرایه محصولات (خودروها) را گرفته و آن‌ها را به HTML تبدیل می‌کند.
 * @param {Array} products - آرایه‌ای از آبجکت‌های خودرو
 */
function renderProducts(products) {

    productContainer.innerHTML = '';
    products.forEach((product, index) => {

        const productCard = document.createElement('div');
        productCard.className = 'product-card'; // برای استایل‌دهی در CSS

        // اون کارت هایی که ساختم بعد از اگرفتن داده ها اینجوری ذخیره میشه
        productCard.innerHTML = `
            <img src="${product.image_url}" alt="${product.model}" class="product-image">
            <h3 class="product-model">${product.model}</h3>
            
            <p class="product-price">${product.price}</p>
            <p class="product-detail">**جزئیات:** ${product.detail}</p>
            
            <button class="buy-btn" data-product-id="${index + 1}">خرید</button>
        `;

        // اضافه کردن 
        productContainer.appendChild(productCard);
    });

    // چون محصولات پس از بارگذاری داینامیک اضافه شدند، باید event listener را دوباره برای دکمه‌های "خرید" اضافه کنیم.
    document.querySelectorAll('#product-list-container .buy-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const productName = btn.parentElement.querySelector('h3').innerText;

            Swal.fire({
                icon: 'success',
                title: '✅ محصول اضافه شد!',
                text: `${productName} به سبد خرید شما اضافه شد.`,
                confirmButtonText: 'باشه',
                confirmButtonColor: '#007bff',
                backdrop: true,
                timer: 2500,
                timerProgressBar: true
            });
        });
    });
}


loadAndDisplayProducts();