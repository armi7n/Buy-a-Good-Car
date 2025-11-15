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