alert("JavaScript is working");
/* ========================================
   NIHAl SINGH RAI — PORTFOLIO JS
======================================== */


/* ========================================
   01. THEME SYSTEM
======================================== */

const themeButton = document.getElementById("themeButton");
const themeMenu = document.getElementById("themeMenu");
const themeChoices = document.querySelectorAll("[data-theme-choice]");

const systemTheme = window.matchMedia(
  "(prefers-color-scheme: dark)"
);


/* Apply actual visual theme */

function applyTheme(theme) {

  let actualTheme = theme;

  /*
    If user selected System,
    detect the device theme.
  */

  if (theme === "system") {

    actualTheme = systemTheme.matches
      ? "dark"
      : "light";

  }


  /*
    Tell CSS which theme is active.
  */

  document.documentElement.setAttribute(
    "data-theme",
    actualTheme
  );


  document.documentElement.setAttribute(
    "data-theme-preference",
    theme
  );


  /*
    Update CSS variables.
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


  /*
    Update button text.
  */

  if (themeButton) {

    const icon =
      themeButton.querySelector(".theme-icon");

    const label =
      themeButton.querySelector(".theme-label");


    if (theme === "system") {

      if (icon) {
        icon.textContent = "◐";
      }

      if (label) {
        label.textContent = "System";
      }

    }


    if (theme === "light") {

      if (icon) {
        icon.textContent = "☼";
      }

      if (label) {
        label.textContent = "Light";
      }

    }


    if (theme === "dark") {

      if (icon) {
        icon.textContent = "☾";
      }

      if (label) {
        label.textContent = "Dark";
      }

    }

  }

}


/* Get saved theme */

const savedTheme =
  localStorage.getItem("portfolio-theme") || "system";


/* Apply theme when page loads */

applyTheme(savedTheme);


/* ========================================
   02. THEME BUTTON
======================================== */

if (themeButton && themeMenu) {

  themeButton.addEventListener(
    "click",
    function () {

      const isOpen =
        !themeMenu.hasAttribute("hidden");


      if (isOpen) {

        themeMenu.setAttribute(
          "hidden",
          ""
        );

      } else {

        themeMenu.removeAttribute(
          "hidden"
        );

      }

    }
  );

}


/* ========================================
   03. THEME CHOICES
======================================== */

themeChoices.forEach(function (button) {

  button.addEventListener(
    "click",
    function () {

      const selectedTheme =
        button.getAttribute(
          "data-theme-choice"
        );


      /*
        Save user's choice.
      */

      localStorage.setItem(
        "portfolio-theme",
        selectedTheme
      );


      /*
        Apply selected theme.
      */

      applyTheme(
        selectedTheme
      );


      /*
        Close menu.
      */

      if (themeMenu) {

        themeMenu.setAttribute(
          "hidden",
          ""
        );

      }

    }
  );

});


/* ========================================
   04. SYSTEM THEME CHANGES
======================================== */

systemTheme.addEventListener(
  "change",
  function () {

    const currentPreference =
      localStorage.getItem(
        "portfolio-theme"
      ) || "system";


    /*
      Only react automatically
      when user selected System.
    */

    if (currentPreference === "system") {

      applyTheme("system");

    }

  }
);


/* ========================================
   05. CLOSE THEME MENU
======================================== */

document.addEventListener(
  "click",
  function (event) {

    if (
      themeMenu &&
      themeButton &&
      !themeMenu.contains(event.target) &&
      !themeButton.contains(event.target)
    ) {

      themeMenu.setAttribute(
        "hidden",
        ""
      );

    }

  }
);


/* ========================================
   06. MOBILE MENU
======================================== */

const mobileMenuButton =
  document.getElementById(
    "mobileMenuButton"
  );


if (mobileMenuButton) {

  mobileMenuButton.addEventListener(
    "click",
    function () {

      document.body.classList.toggle(
        "mobile-menu-open"
      );

    }
  );

}


/* ========================================
   07. CLOSE MOBILE MENU
   AFTER CLICKING NAV LINK
======================================== */

const navigationLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


navigationLinks.forEach(function (link) {

  link.addEventListener(
    "click",
    function () {

      document.body.classList.remove(
        "mobile-menu-open"
      );

    }
  );

});


/* ========================================
   08. HEADER SCROLL EFFECT
======================================== */

const header =
  document.querySelector("header");


function updateHeader() {

  if (!header) {
    return;
  }


  if (window.scrollY > 20) {

    header.classList.add(
      "header-scrolled"
    );

  } else {

    header.classList.remove(
      "header-scrolled"
    );

  }

}


window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);


updateHeader();


/* ========================================
   09. SCROLL REVEAL
======================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  revealElements.length > 0 &&
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "reveal-visible"
              );


              revealObserver.unobserve(
                entry.target
              );

            }

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

} else {

  /*
    Fallback for older browsers.
  */

  revealElements.forEach(
    function (element) {

      element.classList.add(
        "reveal-visible"
      );

    }
  );

}


/* ========================================
   10. ACTIVE NAVIGATION
======================================== */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


const navLinks =
  document.querySelectorAll(
    ".nav-links a"
  );


if (
  sections.length > 0 &&
  navLinks.length > 0 &&
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              navLinks.forEach(
                function (link) {

                  link.classList.remove(
                    "nav-active"
                  );

                }
              );


              const activeLink =
                document.querySelector(
                  `.nav-links a[href="#${entry.target.id}"]`
                );


              if (activeLink) {

                activeLink.classList.add(
                  "nav-active"
                );

              }

            }

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

}


/* ========================================
   11. CURRENT YEAR
======================================== */

const yearElement =
  document.querySelector(
    "[data-current-year]"
  );


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* ========================================
   12. ESCAPE KEY
======================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {

      if (themeMenu) {

        themeMenu.setAttribute(
          "hidden",
          ""
        );

      }


      document.body.classList.remove(
        "mobile-menu-open"
      );

    }

  }
);
