(() => {
    "use strict";


    const body =
        document.body;

    const root =
        document.documentElement;

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const touchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches ||
        "ontouchstart" in window;


    /* LOADER */

    const loader =
        document.getElementById(
            "loader"
        );

    const loaderBar =
        document.getElementById(
            "loaderBar"
        );

    const loaderNumber =
        document.getElementById(
            "loaderNumber"
        );


    function runLoader() {
        if (
            !loader ||
            reduceMotion
        ) {
            loader?.classList.add(
                "is-hidden"
            );

            return;
        }


        let progress = 0;


        const timer =
            setInterval(() => {

                progress +=
                    Math.floor(
                        Math.random() * 13
                    ) + 6;


                if (progress >= 100) {
                    progress = 100;
                }


                if (loaderBar) {
                    loaderBar.style.width =
                        `${progress}%`;
                }


                if (loaderNumber) {
                    loaderNumber.textContent =
                        String(progress)
                            .padStart(
                                2,
                                "0"
                            );
                }


                if (progress >= 100) {

                    clearInterval(timer);


                    setTimeout(() => {
                        loader.classList.add(
                            "is-hidden"
                        );
                    }, 220);

                }

            }, 70);
    }


    if (
        document.readyState ===
        "complete"
    ) {
        runLoader();
    } else {
        window.addEventListener(
            "load",
            runLoader,
            {
                once: true
            }
        );
    }


    /* CURSOR */

    const cursor =
        document.getElementById(
            "cursor"
        );

    const cursorLabel =
        document.getElementById(
            "cursorLabel"
        );

    const pointerLight =
        document.getElementById(
            "pointerLight"
        );


    let mouseX = -100;
    let mouseY = -100;

    let cursorX = -100;
    let cursorY = -100;


    if (
        !touchDevice &&
        cursor
    ) {

        window.addEventListener(
            "pointermove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                root.style.setProperty(
                    "--pointer-x",
                    `${mouseX}px`
                );

                root.style.setProperty(
                    "--pointer-y",
                    `${mouseY}px`
                );

            },
            {
                passive: true
            }
        );


        function animateCursor() {

            cursorX +=
                (mouseX - cursorX) *
                0.22;

            cursorY +=
                (mouseY - cursorY) *
                0.22;


            root.style.setProperty(
                "--cursor-x",
                `${cursorX}px`
            );

            root.style.setProperty(
                "--cursor-y",
                `${cursorY}px`
            );


            requestAnimationFrame(
                animateCursor
            );
        }


        animateCursor();


        document
            .querySelectorAll(
                "[data-cursor]"
            )
            .forEach(element => {

                element.addEventListener(
                    "pointerenter",
                    () => {

                        const label =
                            element.dataset.cursor;


                        cursor.classList.add(
                            "is-active"
                        );


                        if (
                            label &&
                            cursorLabel
                        ) {

                            cursorLabel.textContent =
                                label.toUpperCase();

                            cursor.classList.add(
                                "has-label"
                            );

                        }

                    }
                );


                element.addEventListener(
                    "pointerleave",
                    () => {

                        cursor.classList.remove(
                            "is-active",
                            "has-label"
                        );


                        if (cursorLabel) {
                            cursorLabel.textContent =
                                "";
                        }

                    }
                );

            });

    } else {

        cursor?.remove();
        pointerLight?.remove();

    }


    /* REVEALS */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window &&
        !reduceMotion
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.13
                }
            );


        revealElements.forEach(
            element => {
                revealObserver.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            element => {
                element.classList.add(
                    "is-visible"
                );
            }
        );

    }


    /* HEADING SCRAMBLE */

    const scrambleChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    function scramble(element) {

        if (
            reduceMotion ||
            element.dataset.scrambled ===
            "true"
        ) {
            return;
        }


        element.dataset.scrambled =
            "true";


        const original =
            element.textContent;


        let frame = 0;
        const total = 17;


        const interval =
            setInterval(() => {

                const ratio =
                    frame / total;


                element.textContent =
                    original
                        .split("")
                        .map(
                            (
                                character,
                                index
                            ) => {

                                if (
                                    character === " " ||
                                    character === "\n"
                                ) {
                                    return character;
                                }


                                if (
                                    index /
                                    original.length <
                                    ratio
                                ) {
                                    return character;
                                }


                                return scrambleChars[
                                    Math.floor(
                                        Math.random() *
                                        scrambleChars.length
                                    )
                                ];

                            }
                        )
                        .join("");


                frame += 1;


                if (frame > total) {

                    clearInterval(
                        interval
                    );

                    element.textContent =
                        original;

                }

            }, 32);

    }


    const scrambleElements =
        document.querySelectorAll(
            "[data-scramble]"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const scrambleObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            scramble(
                                entry.target
                            );


                            scrambleObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.5
                }
            );


        scrambleElements.forEach(
            element => {
                scrambleObserver.observe(
                    element
                );
            }
        );

    }


    /* PROFILE TILT */

    const profileStage =
        document.getElementById(
            "profileStage"
        );


    if (
        profileStage &&
        !touchDevice &&
        !reduceMotion
    ) {

        profileStage.addEventListener(
            "pointermove",
            event => {

                const rect =
                    profileStage
                        .getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                profileStage.style.setProperty(
                    "--profile-ry",
                    `${(x - 0.5) * 6}deg`
                );


                profileStage.style.setProperty(
                    "--profile-rx",
                    `${(0.5 - y) * 6}deg`
                );

            }
        );


        profileStage.addEventListener(
            "pointerleave",
            () => {

                profileStage.style.setProperty(
                    "--profile-rx",
                    "0deg"
                );


                profileStage.style.setProperty(
                    "--profile-ry",
                    "0deg"
                );

            }
        );

    }


    /* TILT CARDS */

    document
        .querySelectorAll(
            "[data-tilt-card]"
        )
        .forEach(card => {

            if (
                touchDevice ||
                reduceMotion
            ) {
                return;
            }


            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height;


                    card.style.setProperty(
                        "--ry",
                        `${(x - 0.5) * 7}deg`
                    );


                    card.style.setProperty(
                        "--rx",
                        `${(0.5 - y) * 7}deg`
                    );

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.setProperty(
                        "--rx",
                        "0deg"
                    );


                    card.style.setProperty(
                        "--ry",
                        "0deg"
                    );

                }
            );

        });


    /* PROJECT TILT */

    const projectCard =
        document.getElementById(
            "projectCard"
        );


    if (
        projectCard &&
        !touchDevice &&
        !reduceMotion
    ) {

        projectCard.addEventListener(
            "pointermove",
            event => {

                const rect =
                    projectCard
                        .getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                projectCard.style.setProperty(
                    "--ry",
                    `${(x - 0.5) * 4.5}deg`
                );


                projectCard.style.setProperty(
                    "--rx",
                    `${(0.5 - y) * 4.5}deg`
                );

            }
        );


        projectCard.addEventListener(
            "pointerleave",
            () => {

                projectCard.style.setProperty(
                    "--rx",
                    "0deg"
                );


                projectCard.style.setProperty(
                    "--ry",
                    "0deg"
                );

            }
        );

    }


    /* SOCIAL MAGNETISM */

    if (
        !touchDevice &&
        !reduceMotion
    ) {

        document
            .querySelectorAll(
                "[data-social-card]"
            )
            .forEach(card => {

                card.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const centerX =
                            rect.left +
                            rect.width / 2;


                        const centerY =
                            rect.top +
                            rect.height / 2;


                        const x =
                            (
                                event.clientX -
                                centerX
                            ) *
                            0.018;


                        const y =
                            (
                                event.clientY -
                                centerY
                            ) *
                            0.018;


                        card.style.setProperty(
                            "--x",
                            `${x}px`
                        );


                        card.style.setProperty(
                            "--y",
                            `${y}px`
                        );

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {

                        card.style.setProperty(
                            "--x",
                            "0px"
                        );


                        card.style.setProperty(
                            "--y",
                            "0px"
                        );

                    }
                );

            });

    }


    /* SCROLL PROGRESS */

    const scrollThread =
        document.getElementById(
            "scrollThread"
        );


    function updateScroll() {

        const total =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            total > 0
                ? window.scrollY / total
                : 0;


        if (scrollThread) {

            scrollThread.style.transform =
                `scaleY(${Math.min(
                    Math.max(
                        progress,
                        0
                    ),
                    1
                )})`;

        }

    }


    window.addEventListener(
        "scroll",
        updateScroll,
        {
            passive: true
        }
    );


    updateScroll();


    /* SECTION INDEX */

    const currentSection =
        document.getElementById(
            "sectionCurrent"
        );


    const sections =
        document.querySelectorAll(
            "[data-section]"
        );


    if (
        currentSection &&
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            currentSection.textContent =
                                entry.target
                                    .dataset
                                    .section;

                        }
                    );

                },
                {
                    threshold: 0.45
                }
            );


        sections.forEach(
            section => {
                sectionObserver.observe(
                    section
                );
            }
        );

    }


    /* EXTERNAL LINK TRANSITION */

    const externalTransition =
        document.getElementById(
            "externalTransition"
        );


    const externalTransitionText =
        document.getElementById(
            "externalTransitionText"
        );


    document
        .querySelectorAll(
            ".external-link"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    if (
                        event.ctrlKey ||
                        event.metaKey ||
                        event.shiftKey ||
                        event.altKey
                    ) {
                        return;
                    }


                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (!href) {
                        return;
                    }


                    event.preventDefault();


                    if (
                        externalTransitionText
                    ) {

                        externalTransitionText
                            .textContent =
                            link.dataset
                                .externalName ||
                            "opening";

                    }


                    externalTransition
                        ?.classList
                        .add(
                            "is-active"
                        );


                    const delay =
                        reduceMotion
                            ? 20
                            : 410;


                    setTimeout(
                        () => {

                            window.location.href =
                                href;

                        },
                        delay
                    );

                }
            );

        });


    window.addEventListener(
        "pageshow",
        () => {

            externalTransition
                ?.classList
                .remove(
                    "is-active"
                );

        }
    );


    /* EMAIL COPY */

    const toast =
        document.getElementById(
            "toast"
        );


    let toastTimer;


    function showToast(
        message
    ) {

        if (!toast) {
            return;
        }


        clearTimeout(
            toastTimer
        );


        toast.textContent =
            message;


        toast.classList.add(
            "is-visible"
        );


        toastTimer =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "is-visible"
                    );

                },
                1800
            );

    }


    async function copyEmail() {

        const email =
            "devvaibhav37@gmail.com";


        try {

            await navigator
                .clipboard
                .writeText(
                    email
                );


            showToast(
                "copied. don't make it boring."
            );


            const emailCardText =
                document.getElementById(
                    "emailCardText"
                );


            const mainEmailText =
                document.getElementById(
                    "mainEmailText"
                );


            if (emailCardText) {

                const original =
                    emailCardText
                        .textContent;


                emailCardText.textContent =
                    "copied";


                setTimeout(
                    () => {

                        emailCardText.textContent =
                            original;

                    },
                    1400
                );

            }


            if (mainEmailText) {

                const original =
                    mainEmailText
                        .textContent;


                mainEmailText.textContent =
                    "copied to clipboard";


                setTimeout(
                    () => {

                        mainEmailText.textContent =
                            original;

                    },
                    1400
                );

            }

        } catch {

            window.location.href =
                `mailto:${email}`;

        }

    }


    document
        .querySelectorAll(
            "[data-email-copy]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                copyEmail
            );

        });


    /* MOTION TOGGLE */

    const motionToggle =
        document.getElementById(
            "motionToggle"
        );


    motionToggle?.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "motion-off"
            );


            const disabled =
                body.classList.contains(
                    "motion-off"
                );


            showToast(
                disabled
                    ? "motion off"
                    : "motion on"
            );

        }
    );


    /* SECRET */

    const secretTrigger =
        document.getElementById(
            "secretTrigger"
        );


    const secretScreen =
        document.getElementById(
            "secretScreen"
        );


    const secretMessages = [
        "why",
        "bro",
        "still clicking",
        "okay",
        "fine"
    ];


    let secretCount = 0;


    secretTrigger?.addEventListener(
        "click",
        event => {

            event.preventDefault();


            secretCount += 1;


            showToast(
                secretMessages[
                    Math.min(
                        secretCount - 1,
                        secretMessages.length - 1
                    )
                ]
            );


            if (
                secretCount <
                secretMessages.length
            ) {
                return;
            }


            secretCount = 0;


            secretScreen
                ?.classList
                .add(
                    "is-active"
                );


            setTimeout(
                () => {

                    secretScreen
                        ?.classList
                        .remove(
                            "is-active"
                        );

                },
                1600
            );

        }
    );


    /* SMOOTH INTERNAL LINKS */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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


                    target.scrollIntoView({
                        behavior:
                            body.classList.contains(
                                "motion-off"
                            ) ||
                            reduceMotion
                                ? "auto"
                                : "smooth",
                        block:
                            "start"
                    });

                }
            );

        });


})();