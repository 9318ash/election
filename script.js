
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const pledgeSections = document.querySelectorAll(
    ".pledge-section"
);

// 모바일 메뉴 열기 / 닫기
menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "메뉴 닫기" : "메뉴 열기"
    );
});

// 메뉴를 클릭하면 해당 공약으로 이동
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "메뉴 열기");
    });
});

// 현재 화면에 표시되는 공약에 해당하는 메뉴 강조
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const currentId = entry.target.id;

            navLinks.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${currentId}`;

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        });
    },
    {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0
    }
);

// 다섯 공약 감시 시작
pledgeSections.forEach((section) => {
    observer.observe(section);
});
