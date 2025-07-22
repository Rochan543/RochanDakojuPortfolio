new Typed("#typed", {
  strings: ["Rochan Dakoju"],
  typeSpeed: 100,
  backSpeed: 50,
  showCursor: false,
  loop: false,
});

particlesJS("particles-js", {
  particles: {
    number: { value: 70 },
    size: { value: 3 },
    move: { speed: 2 },
    line_linked: { enable: true },
    color: { value: "#00ffc3" },
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "grab" },
    },
  },
});

const revealElements = document.querySelectorAll(".project-card, .skill-category");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealElements.forEach((el) => observer.observe(el));

const navbar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

window.onload = () => {
  const isLight = localStorage.getItem("theme") === "light";
  document.body.classList.toggle("light", isLight);
  document.getElementById("themeSwitchSlider").checked = isLight;
};

function toggleThemeSwitch() {
  const isLight = document.getElementById("themeSwitchSlider").checked;
  document.body.classList.toggle("light", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Custom Loader Script
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("customLoader").style.opacity = "0";
    document.getElementById("customLoader").style.pointerEvents = "none";
    setTimeout(() => {
      document.getElementById("customLoader").style.display = "none";
      document.getElementById("loader").style.display = "none";
    }, 600);
  }, 2000);
});



const scriptURL = "https://sheetdb.io/api/v1/1vq6fzfqg4ar6";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = {
    data: {
      "Name": form.Name.value,
      "Email": form.Email.value,
      "Your Message": form["Your Message"].value
    }
  };

  const status = document.getElementById("form-status");
  status.textContent = "Submitting...";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      status.textContent = "✅ Message submitted!";
      form.reset();
    } else {
      status.textContent = "❌ Submission failed!";
    }
  } catch (error) {
    status.textContent = "❌ Error submitting form.";
    console.error("Form submit error:", error);
  }
});


const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active from all buttons
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      if (category === "all" || category === cardCategory) {
        card.classList.add("show");
      } else {
        card.classList.remove("show");
      }
    });
  });
});

// Trigger default view
document.querySelector(".filter-btn[data-category='all']").click();
