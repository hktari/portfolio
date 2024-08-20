'use strict';
document.getScroll = function () {
  if (window.pageYOffset != undefined) {
    return [pageXOffset, pageYOffset];
  } else {
    var sx,
      sy,
      d = document,
      r = d.documentElement,
      b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0;
    sy = r.scrollTop || b.scrollTop || 0;
    return [sx, sy];
  }
};

/* -------------------------------- scrolling ------------------------------- */

$(document).ready(function () {
  for (const linkElem of document.querySelectorAll('#sidebar-mobile a')) {
    linkElem.onclick = navItemClickedMobile;
  }

  // HIDE HEADER ON SCROLL
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('#mobile-nav').outerHeight();

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    let [, st] = document.getScroll();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

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

  /* ------------------------------- navigation effects ------------------------------- */

  const navigationBg = document.querySelector('.nav-bg-img-wrapper img');

  document.querySelectorAll('.nav-item').forEach((navItem) => {
    debugger;
    navItem.addEventListener('mouseenter', () =>
      navigationBg.classList.add('bg-focused')
    );
    navItem.addEventListener('mouseleave', () =>
      navigationBg.classList.remove('bg-focused')
    );
  });
});

/* -------------------------------- side bar -------------------------------- */

function onSidebarNavClick(sidebarItem) {
  const elemToggleVal = sidebarItem.dataset.toggle;
  const toggleId = sidebarItem.dataset.toggleId;

  const bookmarkItems = document.querySelectorAll(
    `[class*="toggle-${toggleId}"]`
  );

  for (const item of bookmarkItems) {
    item.classList.add('w3-hide');
  }

  const toggleActiveElem = document.querySelectorAll(
    `[class*="${elemToggleVal}-toggle-${toggleId}"]`
  );
  for (const elem of toggleActiveElem) {
    elem.classList.toggle('w3-hide');
  }
}

/* ---------------------------- mobile navigation --------------------------- */
function toggleSidebarNav() {
  document.getElementById('sidebar-mobile').classList.toggle('w3-hide');
  document.body.classList.toggle('no-scroll');
  for (const icon of document.querySelectorAll('#toggle-nav-mobile-btn i')) {
    console.log(icon);
    icon.classList.toggle('w3-hide');
  }
}

// Close navigation when navigating inside the same url (e.g. using #contact)
function navItemClickedMobile(ev) {
  console.log(ev);
  toggleSidebarNav();
}
