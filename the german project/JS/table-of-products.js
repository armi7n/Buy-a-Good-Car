document.addEventListener('DOMContentLoaded', () => {


const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const searchInput = document.getElementById('siteSearch');
const searchBtn = document.getElementById('searchBtn');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

// Function to handle search
function performSearch(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        Swal.fire({
            icon: 'info',
            text: 'لطفاً عبارت مورد نظر را وارد کنید.'
        });
        return;
    }
    Swal.fire({
        icon: 'success',
        title: 'نتایج جستجو',
        text: `در حال جستجو برای: "${trimmedQuery}"`
    });
}

// Function to trigger search
function triggerSearch() {
    const isInputVisible = searchInput.offsetParent !== null; // visible check

    if (isInputVisible) {
        performSearch(searchInput.value);
    } else {
        Swal.fire({
            title: 'جستجو در محصولات',
            input: 'text',
            inputAttributes: { autocapitalize: 'off', placeholder: 'عبارت مورد نظر...' },
            showCancelButton: true,
            confirmButtonText: 'بگرد',
            cancelButtonText: 'انصراف',
            confirmButtonColor: '#007bff',
            preConfirm: (query) => {
                if (!query || query.trim().length === 0) {
                    Swal.showValidationMessage('لطفاً عبارتی را وارد کنید');
                    return false;
                }
                return query.trim();
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                performSearch(result.value);
            }
        });
    }
}

// Click on search button
searchBtn.addEventListener('click', triggerSearch);

// Press Enter in search input
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearch();
    }
});

// Buy button functionality
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productNameElement = btn.closest('tr')?.querySelector('td');
        const productName = productNameElement ? productNameElement.innerText : 'محصول';
        Swal.fire({
            icon: 'success',
            title: '✅ محصول اضافه شد!',
            text: `${productName} به سبد خرید شما اضافه شد.`,
            confirmButtonText: 'باشه',
            confirmButtonColor: '#007bff',
            timer: 2500,
            timerProgressBar: true
        });
    });
});


});
