      const hamburger = document.getElementById('hamburger');
        const mainNav = document.getElementById('mainNav');

        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });

        
        document.getElementById('searchBtn').addEventListener('click', () => {
            const q = document.getElementById('siteSearch').value.trim();

            if (!q) {
                Swal.fire({
                    icon: 'info',
                    text: 'لطفاً عبارت مورد نظر را وارد کنید.'
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'نتایج جستجو',
                    text: `در حال جستجو برای: "${q}"`
                });
            }
        });

        // // === افکت سایه برای هدر هنگام اسکرول ===
        // const header = document.getElementById('siteHeader');
        // window.addEventListener('scroll', () => {
        //     if (window.scrollY > 10)
        //         header.classList.add('sticky-shadow');
        //     else
        //         header.classList.remove('sticky-shadow');
        // });

        // // === تابع انیمیشن اسکرول نرم (با کنترل دقیق سرعت) ===
        // function smoothScrollTo(targetY, duration = 800) {
        //     const startY = window.pageYOffset;
        //     const distanceY = targetY - startY;
        //     let startTime = null;

        //     function animation(currentTime) {
        //         if (!startTime) startTime = currentTime;
        //         const elapsed = currentTime - startTime;
        //         const progress = Math.min(elapsed / duration, 1);

        //         const ease = progress < 0.5
        //             ? 4 * progress * progress * progress
        //             : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        //         window.scrollTo(0, startY + distanceY * ease);

        //         if (elapsed < duration) requestAnimationFrame(animation);
        //     }

        //     requestAnimationFrame(animation);
        // }

        // // === اسکرول نرم برای لینک‌های داخلی صفحه ===
        // document.querySelectorAll('header a[href^="#"]').forEach(link => {
        //     link.addEventListener('click', e => {
        //         const targetId = link.getAttribute('href');
        //         const targetEl = document.querySelector(targetId);
        //         if (targetEl) {
        //             e.preventDefault();
        //             mainNav.classList.remove('open');
        //             const headerHeight = header.offsetHeight;
        //             const targetY = targetEl.offsetTop - headerHeight - 10;
        //             smoothScrollTo(targetY, 900);
        //         }
        //     });
        // });

        // === اعتبارسنجی فرم تماس ===
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

        // === Modal اضافه شدن محصول به سبد خرید ===
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