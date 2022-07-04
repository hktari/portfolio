'use strict'

function onSidebarNavClick(sidebarItem) {
    const elemToggleVal = sidebarItem.dataset.toggle;
    const toggleId = sidebarItem.dataset.toggleId;

    const bookmarkItems = document.querySelectorAll(`[class*="toggle-${toggleId}"]`);

    for (const item of bookmarkItems) {
        item.classList.add('w3-hide');
    }


    const toggleActiveElem = document.querySelectorAll(`[class*="${elemToggleVal}-toggle-${toggleId}"]`);
    for (const elem of toggleActiveElem) {
        elem.classList.toggle('w3-hide')
    }
}