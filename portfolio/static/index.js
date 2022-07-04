'use strict'

function onSidebarNavClick(sidebarItem) {
    const bookmarkItems = document.querySelectorAll('.item-bookmark');
    for (const item of bookmarkItems) {
        console.log(item);
        item.classList.add('w3-hide');
    }

    const bookmarkId = sidebarItem.dataset.toggle; 
    const bookmarkElem = document.querySelector('#' + bookmarkId);
    bookmarkElem.classList.toggle('w3-hide');
}