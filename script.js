document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".fa-bars");
  const list = document.getElementById("list");

  if (menu && list) {
    menu.addEventListener("click", () => {
      list.classList.toggle("show");
      list.classList.toggle("hide");
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 838) {
        list.classList.add("control__menu");
        list.classList.remove("hide");
        list.classList.remove("show");
      }
    });
  }

  document.querySelectorAll(".fa-heart").forEach((heart) => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("red");
    });
  });

  const heroSpan = document.querySelector(".hero__banner h2 span");
  if (heroSpan) {
    const fullText = heroSpan.textContent.trim() || "perfect";
    heroSpan.textContent = "";
    let i = 0;
    const speed = 70;

    (function typing() {
      if (i < fullText.length) {
        heroSpan.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typing, speed);
      } else {
        setTimeout(() => (heroSpan.style.borderRight = "0"), 600);
      }
    })();
  }

  const counters = document.querySelectorAll(".catchy .color");
  counters.forEach((node) => {
    const text = node.textContent.trim();
    const numeric = (text.match(/[\d.,]+/) || [0])[0].replace(",", ".");
    let end = parseFloat(numeric) || 0;

    if (/k/i.test(text)) end *= 1000;
    if (/m/i.test(text)) end *= 1000000;

    let start = 0;
    const duration = 1100;
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const value = Math.floor(progress * (end - start) + start);

      let out = value.toLocaleString();
      if (/k/i.test(text) && value >= 1000)
        out = Math.round(value / 1000) + "k";
      if (/m/i.test(text) && value >= 1000000)
        out = Math.round(value / 1000000) + "M";

      node.textContent = out;
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });

  const panel = document.querySelector(".tabs__panel");
  const details = document.querySelector(".details");

  if (panel && details) {
    const buttons = panel.querySelectorAll("button");

const content = {
  Rent: {
    Location: "Athens, Greece",
    "Property Type": "Apartment",
    Size: "60m² - 90m²",
    "Price Range": "$600 - $1200",
  },
  Buy: {
    Location: "Santorini, Greece",
    "Property Type": "Private House",
    Size: "120m² - 150m²",
    "Price Range": "$85,000 - $95,000",
  },
  "Co-Living": {
    Location: "Thessaloniki, Greece",
    "Property Type": "Shared Space",
    Size: "20m² - 40m²",
    "Price Range": "$300 - $700",
  },
};


    const setActive = (btn) => {
      buttons.forEach((b) => b.classList.toggle("active", b === btn));
      const dataset = content[btn.textContent.trim()];
      if (!dataset) return;

      const children = details.querySelectorAll("div");
      const keys = Object.keys(dataset);

      children.forEach((c, i) => {
        const h4 = c.querySelector("h4");
        const h2 = c.querySelector("h2");
        if (keys[i]) {
          h4.textContent = keys[i];
          h2.textContent = dataset[keys[i]];
        }
      });
    };

    if (buttons.length) setActive(buttons[0]);
    buttons.forEach((btn) =>
      btn.addEventListener("click", () => setActive(btn))
    );
  }

  document.querySelectorAll(".price i.fas.fa-heart").forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("liked");
      icon.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.18)" },
          { transform: "scale(1)" },
        ],
        { duration: 260, easing: "ease-out" }
      );
    });
  });

  const revealEls = document.querySelectorAll("section, .card");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = "none";
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    obs.observe(el);
  });

  const cards = document.querySelectorAll(".property-card");
  const lightbox = document.getElementById("property-lightbox");
  if (lightbox) {
    const lightboxImg = lightbox.querySelector("img");
    const lightboxTitle = lightbox.querySelector(".lightbox-details h2");
    const lightboxDesc = lightbox.querySelector(".lightbox-details p");
    const closeBtn = lightbox.querySelector(".close-btn");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");

    const properties = [
      {
        images: [
          "https://via.placeholder.com/700x400?text=Property+1-1",
          "https://via.placeholder.com/700x400?text=Property+1-2",
        ],
        title: "Modern Apartment",
        desc: "2 Beds • 2 Baths • 1200 sqft",
      },
      {
        images: [
          "https://via.placeholder.com/700x400?text=Property+2-1",
          "https://via.placeholder.com/700x400?text=Property+2-2",
        ],
        title: "Luxury Villa",
        desc: "4 Beds • 3 Baths • 3000 sqft",
      },
      {
        images: [
          "https://via.placeholder.com/700x400?text=Property+3-1",
          "https://via.placeholder.com/700x400?text=Property+3-2",
        ],
        title: "Cozy House",
        desc: "3 Beds • 2 Baths • 1800 sqft",
      },
      {
        images: [
          "https://via.placeholder.com/700x400?text=Property+4-1",
          "https://via.placeholder.com/700x400?text=Property+4-2",
        ],
        title: "Downtown Loft",
        desc: "1 Bed • 1 Bath • 800 sqft",
      },
    ];

    let currentProperty = 0;
    let currentImage = 0;

    const showLightbox = (propertyIndex, imageIndex = 0) => {
      currentProperty = propertyIndex;
      currentImage = imageIndex;
      lightboxImg.src = properties[propertyIndex].images[imageIndex];
      lightboxTitle.textContent = properties[propertyIndex].title;
      lightboxDesc.textContent = properties[propertyIndex].desc;
      lightbox.classList.add("active");
    };

    const hideLightbox = () => lightbox.classList.remove("active");

    const showNext = () => {
      currentImage =
        (currentImage + 1) % properties[currentProperty].images.length;
      lightboxImg.src = properties[currentProperty].images[currentImage];
    };

        const showPrev = () => {
      currentImage =
        (currentImage - 1 + properties[currentProperty].images.length) %
        properties[currentProperty].images.length;
      lightboxImg.src = properties[currentProperty].images[currentImage];
    };

    cards.forEach((card, index) =>
      card.addEventListener("click", () => showLightbox(index))
    );
    closeBtn && closeBtn.addEventListener("click", hideLightbox);
    nextBtn && nextBtn.addEventListener("click", showNext);
    prevBtn && prevBtn.addEventListener("click", showPrev);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) hideLightbox();
    });
  }
});

