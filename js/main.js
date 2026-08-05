(function () {
    "use strict";

    var header = document.getElementById("site-header");
    var navToggle = document.getElementById("nav-toggle");
    var mainNav = document.getElementById("main-nav");
    var navLinks = mainNav.querySelectorAll(".nav-link");

    var onScroll = function () {
        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 10);
        }
    };

    var setNavOpen = function (open) {
        if (!mainNav || !navToggle) return;
        mainNav.classList.toggle("is-open", open);
        navToggle.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("nav-locked", open);
    };

    var closeNav = function () {
        setNavOpen(false);
    };

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            setNavOpen(!mainNav.classList.contains("is-open"));
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", closeNav);
    });

    window.addEventListener("scroll", onScroll, { passive: true });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute("id");
                    navLinks.forEach(function (link) {
                        var href = link.getAttribute("href");
                        link.classList.toggle(
                            "is-active",
                            href === "#" + id
                        );
                    });
                }
            });
        },
        { rootMargin: "-40% 0px -55% 0px" }
    );

    var sections = document.querySelectorAll("main section[id]");
    sections.forEach(function (section) {
        observer.observe(section);
    });

    onScroll();
})();
