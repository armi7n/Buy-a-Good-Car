
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();


    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();


    if (!name || !email || !phone || !message) {
        Swal.fire({
            icon: 'error',
            title: 'خطا',
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
