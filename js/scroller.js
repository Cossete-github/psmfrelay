function scr(elementSelector) {
    const e = document.querySelector(elementSelector);
    const targetDOMRect = e.getBoundingClientRect();
    const targetTop = targetDOMRect.top + window.pageYOffset + 56;
    setTimeout(() => document.querySelector(elementSelector).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    }), 166);
}