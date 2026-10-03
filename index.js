/* ========================================
   PORTFOLIO INTERACTION SYSTEM
   Nihal Singh Rai
======================================== */


/* ========================================
   1. BASIC SETUP
======================================== */

const body = document.body;
const header = document.querySelector("header");
const nav = document.querySelector("nav");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);


/* ========================================
   2. THEME SYSTEM
======================================== */

/*
   Available modes:

   system
   light
   dark

   System = device/browser preference
*/

const THEME_KEY = "portfolio-theme";

const savedTheme =
  localStorage.getItem(THEME_KEY) || "system";


/* Detect system theme */

function getSystemTheme() {

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";

}


/* Apply actual visual theme */

function applyTheme(theme) {

  const actualTheme =
    theme === "system"
      ? getSystemTheme()
      : theme;


  document.documentElement.dataset.theme =
    actualTheme;


  document.documentElement.dataset.themePreference =
    theme;


  /*
     CSS variables are changed here so the
     entire design can react to the theme.
  */

  if (actualTheme === "dark") {

    document.documentElement.style.setProperty(
      "--bg",
      "#111111"
    );

    document.documentElement.style.setProperty(
      "--text",
      "#FAF9F6"
    );

    document.documentElement.style.setProperty(
      "--muted",
      "#A3A3A3"
    );

    document.documentElement.style.setProperty(
      "--accent",
      "#9BE15D"
    );

    document.documentElement.style.setProperty(
      "--border",
      "#2A2A2A"
    );

  } else {

    document.documentElement.style.setProperty(
      "--bg",
      "#FAF9F6"
    );

    document.documentElement.style.setProperty(
      "--text",
      "#111111"
    );

    document.documentElement.style.setProperty(
      "--muted",
      "#686868"
    );

    document.documentElement.style.setProperty(
      "--accent",
      "#9BE15D"
    );

    document.documentElement.style.setProperty(
      "--border",
      "#E5E5E5"
    );

  }


  updateThemeButton(theme);

}


/* Save selected preference */

function setTheme(theme) {

  localStorage.setItem(
    THEME_KEY,
    theme
  );

  applyTheme(theme);

}


/* ========================================
   3. THEME SELECTOR UI
======================================== */

const themeControl = document.createElement("div");

themeControl.className = "theme-control";

themeControl.innerHTML = `
  <button
    class="theme-button"
    type="button"
    aria-expanded="false"
    aria-label="Change color theme"
  >
    <span class="theme-icon">◐</span>
    <span class="theme-label">System</span>
  </button>

  <div class="theme-menu" hidden>

    <button
      type="button"
      data-theme-choice="system"
    >
      <span>◐</span>
      System
    </button>

    <button
      type="button"
      data-theme-choice="light"
    >
      <span>☼</span>
      Light
    </button>

    <button
      type="button"
      data-theme-choice="dark"
    >
      <span>☾</span>
      Dark
    </button>

  </div>
`;


/*
   Put theme selector into navigation.

   It is appended to the right side of nav.
*/

nav.appendChild(themeControl);


const themeButton =
  themeControl.querySelector(".theme-button");

const themeMenu =
  themeControl.querySelector(".theme-menu");

const themeLabel =
  themeControl.querySelector(".theme-label");

const themeIcon =
  themeControl.querySelector(".theme-icon");


/* Theme labels */

const themeData = {

  system: {
    label: "System",
    icon: "◐"
  },

  light: {
    label: "Light",
    icon: "☼"
  },

  dark: {
    label: "Dark",
    icon: "☾"
  }

};


/* Update button */

function updateThemeButton(theme) {

  const data =
    themeData[theme] || themeData.system;

  themeLabel.textContent =
    data.label;

  themeIcon.textContent =
    data.icon;

}


/* Open / close theme menu */

themeButton.addEventListener(
  "click",
  function (event) {

    event.stopPropagation();

    const isOpen =
      themeButton.getAttribute(
        "aria-expanded"
      ) === "true";

    themeButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    themeMenu.hidden = isOpen;

  }
);


/* Theme selection */

themeMenu
  .querySelectorAll("[data-theme-choice]")
  .forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const selectedTheme =
          button.dataset.themeChoice;

        setTheme(selectedTheme);

        themeMenu.hidden = true;

        themeButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });


/* Close theme menu outside click */

document.addEventListener(
  "click",
  function (event) {

    if (
      !themeControl.contains(event.target)
    ) {

      themeMenu.hidden = true;

      themeButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);


/* ========================================
   4. SYSTEM THEME DETECTION
======================================== */

const systemTheme =
  window.matchMedia(
    "(prefers-color-scheme: dark)"
  );


systemTheme.addEventListener(
  "change",
  function () {

    const currentPreference =
      localStorage.getItem(
        THEME_KEY
      ) || "system";


    /*
       Only react automatically when
       user selected System.
    */

    if (
      currentPreference === "system"
    ) {

      applyTheme("system");

    }

  }
);


/* Apply theme on initial load */

applyTheme(savedTheme);


/* ========================================
   5. MOBILE NAVIGATION
======================================== */

const navGroups =
  nav.querySelectorAll(":scope > div");

const mainNav =
  navGroups[0];

const externalNav =
  navGroups[1];


/*
   Create mobile menu button.
*/

const menuButton =
  document.createElement("button");

menuButton.className =
  "mobile-menu-button";

menuButton.type =
  "button";

menuButton.setAttribute(
  "aria-label",
  "Open navigation menu"
);

menuButton.setAttribute(
  "aria-expanded",
  "false"
);

menuButton.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
`;


nav.insertBefore(
  menuButton,
  themeControl
);


/* Mobile menu state */

let mobileMenuOpen = false;


/* Toggle mobile navigation */

function toggleMobileMenu() {

  mobileMenuOpen =
    !mobileMenuOpen;


  body.classList.toggle(
    "mobile-menu-open",
    mobileMenuOpen
  );


  menuButton.setAttribute(
    "aria-expanded",
    String(mobileMenuOpen)
  );


  menuButton.setAttribute(
    "aria-label",
    mobileMenuOpen
      ? "Close navigation menu"
      : "Open navigation menu"
  );

}


/* Button click */

menuButton.addEventListener(
  "click",
  toggleMobileMenu
);


/* Close mobile menu */

function closeMobileMenu() {

  mobileMenuOpen = false;

  body.classList.remove(
    "mobile-menu-open"
  );

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

}


/* Close when navigation link is clicked */

mainNav
  .querySelectorAll("a")
  .forEach(function (link) {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


/* ========================================
   6. ESCAPE KEY
======================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key !== "Escape") {
      return;
    }


    closeMobileMenu();


    themeMenu.hidden = true;

    themeButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }
);


/* ========================================
   7. HEADER SCROLL STATE
======================================== */

let lastScrollY = window.scrollY;


function updateHeader() {

  const currentScroll =
    window.scrollY;


  if (currentScroll > 30) {

    header.classList.add(
      "header-scrolled"
    );

  } else {

    header.classList.remove(
      "header-scrolled"
    );

  }


  lastScrollY =
    currentScroll;

}


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


/* ========================================
   8. ACTIVE NAVIGATION
======================================== */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    'nav a[href^="#"]'
  );


const sectionObserver =
  new IntersectionObserver(
    function (entries) {

      entries.forEach(
        function (entry) {

          if (!entry.isIntersecting) {
            return;
          }


          const sectionId =
            entry.target.id;


          navLinks.forEach(
            function (link) {

              link.classList.remove(
                "nav-active"
              );


              if (
                link.getAttribute(
                  "href"
                ) === `#${sectionId}`
              ) {

                link.classList.add(
                  "nav-active"
                );

              }

            }
          );

        }
      );

    },
    {
      rootMargin:
        "-35% 0px -55% 0px"
    }
  );


sections.forEach(
  function (section) {

    sectionObserver.observe(
      section
    );

  }
);


/* ========================================
   9. SCROLL REVEAL
======================================== */

const revealElements =
  document.querySelectorAll(
    "section > div, article, #contact"
  );


/*
   Don't animate if user has
   requested reduced motion.
*/

if (
  !prefersReducedMotion.matches
) {

  revealElements.forEach(
    function (element) {

      element.classList.add(
        "reveal"
      );

    }
  );


  const revealObserver =
    new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target.classList.add(
              "reveal-visible"
            );


            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    function (element) {

      revealObserver.observe(
        element
      );

    }
  );

}


/* ========================================
   10. CURRENT YEAR
======================================== */

const footerYear =
  document.querySelector(
    "footer p"
  );


if (footerYear) {

  footerYear.textContent =
    `© ${new Date().getFullYear()} Nihal Singh Rai`;

}


/* ========================================
   11. THEME-AWARE TECH BACKGROUND
======================================== */

function updateTechnicalBackground() {

  const styleId =
    "dynamic-theme-background";

  let style =
    document.getElementById(
      styleId
    );


  if (!style) {

    style =
      document.createElement(
        "style"
      );

    style.id =
      styleId;

    document.head.appendChild(
      style
    );

  }


  const isDark =
    document.documentElement.dataset.theme ===
    "dark";


  if (isDark) {

    style.textContent = `

      .tech-bg {
        background: #111111;
      }

      .tech-grid {
        background-image:
          linear-gradient(
            rgba(250, 249, 246, 0.035) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(250, 249, 246, 0.035) 1px,
            transparent 1px
          );
      }

      .tech-orbit {
        border-color:
          rgba(250, 249, 246, 0.055);
      }

    `;

  } else {

    style.textContent = `

      .tech-bg {
        background: #FAF9F6;
      }

      .tech-grid {
        background-image:
          linear-gradient(
            rgba(17, 17, 17, 0.035) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(17, 17, 17, 0.035) 1px,
            transparent 1px
          );
      }

      .tech-orbit {
        border-color:
          rgba(17, 17, 17, 0.045);
      }

    `;

  }

}


/*
   Re-run whenever theme changes.
*/

const originalApplyTheme =
  applyTheme;

applyTheme = function (theme) {

  originalApplyTheme(theme);

  updateTechnicalBackground();

};


/* Apply once */

updateTechnicalBackground();


/* ========================================
   12. REDUCED MOTION CHANGE
======================================== */

prefersReducedMotion.addEventListener(
  "change",
  function (event) {

    if (event.matches) {

      document
        .querySelectorAll(".reveal")
        .forEach(function (element) {

          element.classList.add(
            "reveal-visible"
          );

        });

    }

  }
);


/* ========================================
   13. INITIALIZE
======================================== */

updateHeader();
