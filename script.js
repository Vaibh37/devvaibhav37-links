/* ================================================================
   DEVVAIBHAV37 — SCRIPT.JS
   INTERACTIONS / ANIMATIONS / UX
   ================================================================ */

(() => {
    "use strict";


    /* ============================================================
       01 — DOM
       ============================================================ */

    const body = document.body;
    const nav = document.querySelector(".nav");

    const cursor = document.querySelector(".cursor");
    const cursorDot = document.querySelector(".cursor__dot");
    const cursorRing = document.querySelector(".cursor__ring");

    const heroVisual = document.querySelector(".hero__visual");

    const interactiveElements = document.querySelectorAll(
        "a, button, .social-card, .hero__image-wrap"
    );

    const sections = document.querySelectorAll(
        "section[id]"
    );


    /* ============================================================
       02 — DEVICE / MOTION
       ============================================================ */

    const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const touchQuery = window.matchMedia(
        "(hover: none), (pointer: coarse)"
    );

    const state = {
        reducedMotion: reducedMotionQuery.matches,
        touchDevice: touchQuery.matches
    };


    const updateMotionState = () => {

        state.reducedMotion =
            reducedMotionQuery.matches;

        state.touchDevice =
            touchQuery.matches;

    };


    updateMotionState();


    if (
        typeof reducedMotionQuery.addEventListener ===
        "function"
    ) {

        reducedMotionQuery.addEventListener(
            "change",
            updateMotionState
        );

        touchQuery.addEventListener(
            "change",
            updateMotionState
        );

    } else {

        reducedMotionQuery.addListener(
            updateMotionState
        );

        touchQuery.addListener(
            updateMotionState
        );

    }


    /* ============================================================
       03 — PAGE READY
       ============================================================ */

    const markReady = () => {

        document.documentElement.classList.add(
            "is-ready"
        );

        body.classList.add(
            "is-ready"
        );

    };


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            markReady,
            { once: true }
        );

    } else {

        markReady();

    }


    /* ============================================================
       04 — NAVIGATION
       ============================================================ */

    let lastScrollY = window.scrollY;


    const updateNavigation = () => {

        const currentScroll =
            window.scrollY;


        if (currentScroll > 40) {

            nav?.classList.add(
                "nav--scrolled"
            );

        } else {

            nav?.classList.remove(
                "nav--scrolled"
            );

        }


        lastScrollY =
            currentScroll;

    };


    updateNavigation();


    window.addEventListener(
        "scroll",
        updateNavigation,
        {
            passive: true
        }
    );


    /* ============================================================
       05 — SMOOTH ANCHOR LINKS
       ============================================================ */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navHeight =
                    nav?.offsetHeight || 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    navHeight
                    -
                    15;


                if (state.reducedMotion) {

                    window.scrollTo(
                        0,
                        targetPosition
                    );

                } else {

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    /* ============================================================
       06 — ACTIVE NAV LINK
       ============================================================ */

    const navLinks =
        document.querySelectorAll(
            ".nav__links a"
        );


    const updateActiveSection = () => {

        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop
                -
                window.innerHeight * 0.35;


            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");


            link.classList.toggle(
                "is-active",
                target ===
                `#${currentSection}`
            );

        });

    };


    updateActiveSection();


    window.addEventListener(
        "scroll",
        updateActiveSection,
        {
            passive: true
        }
    );


    /* ============================================================
       07 — SCROLL REVEAL
       ============================================================ */

    if (
        !state.reducedMotion &&
        "IntersectionObserver" in window
    ) {

        const revealElements = document.querySelectorAll(
            ".section-label, .about__content, .social__intro, .social-card, .contact__inner"
        );


        revealElements.forEach((element) => {

            element.classList.add(
                "will-reveal"
            );

        });


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(
                element
            );

        });

    } else {

        document
            .querySelectorAll(
                ".section-label, .about__content, .social__intro, .social-card, .contact__inner"
            )
            .forEach((element) => {

                element.classList.add(
                    "will-reveal",
                    "is-visible"
                );

            });

    }


    /* ============================================================
       08 — CUSTOM CURSOR
       ============================================================ */

    if (
        cursor &&
        cursorDot &&
        cursorRing &&
        !state.touchDevice &&
        !state.reducedMotion
    ) {

        body.classList.add(
            "cursor-active"
        );


        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;


        window.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.transform =
                    `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

            }
        );


        const animateCursor = () => {

            ringX +=
                (mouseX - ringX) * 0.14;

            ringY +=
                (mouseY - ringY) * 0.14;


            cursorRing.style.transform =
                `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;


            requestAnimationFrame(
                animateCursor
            );

        };


        animateCursor();


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );


        window.addEventListener(
            "mouseleave",
            () => {

                body.classList.remove(
                    "cursor-active"
                );

            }
        );


        window.addEventListener(
            "mouseenter",
            () => {

                body.classList.add(
                    "cursor-active"
                );

            }
        );

    }


    /* ============================================================
       09 — HERO PARALLAX
       ============================================================ */

    if (
        heroVisual &&
        !state.touchDevice &&
        !state.reducedMotion
    ) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth
                    )
                    -
                    0.5;


                const y =
                    (event.clientY /
                        window.innerHeight
                    )
                    -
                    0.5;


                targetX =
                    x * 12;

                targetY =
                    y * 10;

            }
        );


        const animateHeroParallax =
            () => {

                currentX +=
                    (targetX - currentX)
                    * 0.06;

                currentY +=
                    (targetY - currentY)
                    * 0.06;


                heroVisual.style.transform =
                    `translate3d(${currentX}px, ${currentY}px, 0)`;


                requestAnimationFrame(
                    animateHeroParallax
                );

            };


        animateHeroParallax();

    }


    /* ============================================================
       10 — IMAGE TILT
       ============================================================ */

    const imageWrap =
        document.querySelector(
            ".hero__image-wrap"
        );


    if (
        imageWrap &&
        !state.touchDevice &&
        !state.reducedMotion
    ) {

        imageWrap.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    imageWrap.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY
                    ) * -4;


                const rotateY =
                    ((x - centerX) /
                        centerX
                    ) * 5;


                const image =
                    imageWrap.querySelector(
                        ".hero__image"
                    );


                if (!image) {
                    return;
                }


                image.style.transform =
                    `perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     rotateZ(2deg)
                     scale(1.02)`;

            }
        );


        imageWrap.addEventListener(
            "mouseleave",
            () => {

                const image =
                    imageWrap.querySelector(
                        ".hero__image"
                    );


                if (!image) {
                    return;
                }


                image.style.transform =
                    "";

            }
        );

    }


    /* ============================================================
       11 — SOCIAL CARD MAGNETIC EFFECT
       ============================================================ */

    if (
        !state.touchDevice &&
        !state.reducedMotion
    ) {

        document
            .querySelectorAll(".social-card")
            .forEach((card) => {

                card.addEventListener(
                    "mousemove",
                    (event) => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const moveX =
                            (x -
                                rect.width / 2
                            ) * 0.025;


                        const moveY =
                            (y -
                                rect.height / 2
                            ) * 0.025;


                        card.style.transform =
                            `translate3d(${moveX}px, ${moveY - 7}px, 0)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            });

    }


    /* ============================================================
       12 — EMAIL FEEDBACK
       ============================================================ */

    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add(
                    "email-clicked"
                );


                window.setTimeout(
                    () => {

                        link.classList.remove(
                            "email-clicked"
                        );

                    },
                    1200
                );

            }
        );

    });


    /* ============================================================
       13 — KEYBOARD ACCESSIBILITY
       ============================================================ */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                body.classList.remove(
                    "cursor-hover"
                );

            }

        }
    );


    /* ============================================================
       14 — PAGE VISIBILITY
       ============================================================ */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                document.documentElement
                    .classList.add(
                        "page-hidden"
                    );

            } else {

                document.documentElement
                    .classList.remove(
                        "page-hidden"
                    );

            }

        }
    );


    /* ============================================================
       15 — CONSOLE EASTER EGG
       ============================================================ */

    console.log(
        "%c devvaibhav37 ",
        "background:#7667f8;color:white;padding:8px 12px;border-radius:8px;font-weight:800;"
    );

    console.log(
        "%c just a guy turning random thoughts into random projects :) ",
        "color:#647087;font-size:12px;"
    );


    /* ============================================================
       16 — GLOBAL DEBUG OBJECT
       ============================================================ */

    window.DevVaibhav37 = {

        state,

        scrollTo: (id) => {

            const element =
                document.querySelector(id);


            if (!element) {
                return;
            }


            element.scrollIntoView({
                behavior:
                    state.reducedMotion
                        ? "auto"
                        : "smooth"
            });

        }

    };


})();