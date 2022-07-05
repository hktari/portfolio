'use strict'
document.getScroll = function() {
    if (window.pageYOffset != undefined) {
        return [pageXOffset, pageYOffset];
    } else {
        var sx, sy, d = document,
            r = d.documentElement,
            b = d.body;
        sx = r.scrollLeft || b.scrollLeft || 0;
        sy = r.scrollTop || b.scrollTop || 0;
        return [sx, sy];
    }
}

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


function toggleSidebarNav() {
    document.getElementById("navSidebar").classList.toggle('w3-hide');
    document.getElementById("mobile-nav").classList.toggle('w3-top');
}

/* -------------------------------- scrolling ------------------------------- */

$(document).ready(function() {
    // HIDE HEADER ON SCROLL
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#mobile-nav').outerHeight();

    $(window).scroll(function(event) {
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        console.log('ping')
        
        let [, st] = document.getScroll()

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        
        console.log('pong')
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('#mobile-nav').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('#mobile-nav').removeClass('nav-up').addClass('nav-down');
            }
        }

        lastScrollTop = st;
    }
})