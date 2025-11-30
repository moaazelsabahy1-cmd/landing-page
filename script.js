'use strict'
const menu = document.getElementsByClassName('fa-bars')[0]

menu.addEventListener('click', () => {
    document.querySelector('#list').classList.remove('control__menu');
    if(document.querySelector('#list').classList.contains('show')) {
        document.querySelector('#list').classList.add('hide');
        document.querySelector('#list').classList.remove('show');
        return;
    }
    document.querySelector('#list').classList.toggle('show');
    document.querySelector('#list').classList.remove('hide');
})

window.addEventListener("resize", () => {
    if(window.innerWidth > 838) {
        document.querySelector('#list').classList.add('control__menu');
        document.querySelector('#list').classList.remove('hide');
        document.querySelector('#list').classList.remove('show');
    }
});

const hearts = document.getElementsByClassName('fa-heart');

for(let i=0; i<hearts.length; i++) {
    console.log(hearts[i]);
    hearts[i].addEventListener('click', () => {
        hearts[i].classList.toggle("red");
    })
}




// script.js — Vanilla JS enhancements

document.addEventListener('DOMContentLoaded', () => {
  // ---- 1) navbar mobile toggle ----
  const bars = document.querySelector('.fa-bars');
  const list = document.getElementById('list');
  bars && bars.addEventListener('click', () => {
    if (!list) return;
    list.style.display = (getComputedStyle(list).display === 'none') ? 'flex' : 'none';
  });

  // ---- 2) typewriter for hero <h2><span>perfect</span></h2> ----
  (function typewriter() {
    const heroSpan = document.querySelector('.hero__banner h2 span');
    if (!heroSpan) return;
    // text to animate (read from html content to respect your markup)
    const fullText = heroSpan.textContent.trim() || 'perfect';
    heroSpan.textContent = '';
    let i = 0;
    const speed = 70;
    function step() {
      if (i <= fullText.length) {
        heroSpan.textContent = fullText.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else {
        // after finish remove caret after a moment
        setTimeout(()=> heroSpan.style.borderRight='0', 600);
      }
    }
    step();
  })();

  // ---- 3) counters animation for numbers in .catchy .color ----
  (function counters(){
    const nodes = document.querySelectorAll('.catchy .color');
    if (!nodes.length) return;
    nodes.forEach(node => {
      const text = node.textContent.trim();
      // try to parse numbers like "19k +" or "$20,5M"
      const numeric = (text.match(/[\d.,]+/) || [0])[0].replace(',', '.');
      let end = parseFloat(numeric) || 0;
      // scale for suffixes
      if (/k/i.test(text)) end = end * 1000;
      if (/m/i.test(text)) end = end * 1000000;
      // small animation
      let start = 0;
      const duration = 1100;
      const startTime = performance.now();
      function tick(now){
        const elapsed = Math.min(1, (now - startTime) / duration);
        const value = Math.floor(elapsed * (end - start) + start);
        // format: show suffix if original had k/M, else plain
        let out = value.toLocaleString();
        if (/k/i.test(text) && value >= 1000) out = Math.round(value/1000) + 'k';
        if (/m/i.test(text) && value >= 1000000) out = Math.round(value/1000000) + 'M';
        node.textContent = out;
        if (elapsed < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  })();

  // ---- 4) tabs behavior (Rent / Buy / Co-Living) ----
  (function tabs(){
    const panel = document.querySelector('.tabs__panel');
    if (!panel) return;
    const buttons = panel.querySelectorAll('button');
    const details = document.querySelector('.details');
    // content examples per tab (you can change text)
    const content = {
      'Rent': {
        Location: 'Athens, Greece',
        'Property Type': 'Apartment',
        'Property Size': '60m² - 90m²',
        'Property Price Range': '$600 - $1200'
      },
      'Buy': {
        Location: 'Santorini, Greece',
        'Property Type': 'Private House',
        'Property Size': '120m² - 150m²',
        'Property Price Range': '$85,000 - $95,000'
      },
      'Co-Living': {
        Location: 'Thessaloniki, Greece',
        'Property Type': 'Shared Space',
        'Property Size': '20m² - 40m²',
        'Property Price Range': '$300 - $700'
      }
    };
    function setActive(btn){
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      // fill details
      const keyVals = content[btn.textContent.trim()];
      if (!keyVals || !details) return;
      const children = details.querySelectorAll('div');
      const keys = Object.keys(keyVals);
      children.forEach((c,i) => {
        const h4 = c.querySelector('h4');
        const h2 = c.querySelector('h2');
        if (keys[i]) {
          h4.textContent = keys[i];
          h2.textContent = keyVals[keys[i]];
        }
      });
    }
    // initial: activate first
    if (buttons.length) setActive(buttons[0]);
    buttons.forEach(btn => {
      btn.addEventListener('click', ()=> setActive(btn));
    });
  })();

  // ---- 5) card heart toggle ----
  (function hearts(){
    document.querySelectorAll('.price i.fas.fa-heart').forEach(icon => {
      icon.addEventListener('click', () => {
        icon.classList.toggle('liked');
        // small pulse
        icon.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.18)' },
          { transform: 'scale(1)' }
        ], { duration: 260, easing: 'ease-out' });
      });
    });
  })();

  // ---- 6) simple on-scroll reveal for sections ----
  (function reveal(){
    const revealEls = document.querySelectorAll('section, .card');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'none';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(10px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      obs.observe(el);
    });
  })();

});


const whatImage = document.querySelector('.what-we-do .image');

function showWhatImage() {
  const trigger = window.innerHeight * 0.85;
  const imageTop = whatImage.getBoundingClientRect().top;
  
  if (imageTop < trigger) {
    whatImage.classList.add('show');
  }
}  


reviews.forEach(card => {
  card.style.opacity = 1;
  card.style.transform = "translateY(30px)";
  card.style.transition = ".6s ease";
  revObserver.observe(card);
});
document.querySelectorAll(".social").forEach(icon => {
  icon.style.opacity = 0;
  icon.style.transform = "translateY(20px)";
  icon.style.transition = ".6s ease";
});

const socialObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });


document.getElementById('year').textContent = new Date().getFullYear();




// Motion effect for sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".motion-section");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight - 100) {
        section.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // trigger on page load
});





document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".property-card");
  const lightbox = document.getElementById("property-lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const lightboxTitle = lightbox.querySelector(".lightbox-details h2");
  const lightboxDesc = lightbox.querySelector(".lightbox-details p");
  const closeBtn = lightbox.querySelector(".close-btn");
  const prevBtn = lightbox.querySelector(".prev");
  const nextBtn = lightbox.querySelector(".next");

  const properties = [
    { images: ["https://via.placeholder.com/700x400?text=Property+1-1","https://via.placeholder.com/700x400?text=Property+1-2"], title: "Modern Apartment", desc: "2 Beds • 2 Baths • 1200 sqft" },
    { images: ["https://via.placeholder.com/700x400?text=Property+2-1","https://via.placeholder.com/700x400?text=Property+2-2"], title: "Luxury Villa", desc: "4 Beds • 3 Baths • 3000 sqft" },
    { images: ["https://via.placeholder.com/700x400?text=Property+3-1","https://via.placeholder.com/700x400?text=Property+3-2"], title: "Cozy House", desc: "3 Beds • 2 Baths • 1800 sqft" },
    { images: ["https://via.placeholder.com/700x400?text=Property+4-1","https://via.placeholder.com/700x400?text=Property+4-2"], title: "Downtown Loft", desc: "1 Bed • 1 Bath • 800 sqft" }
  ];

  let currentProperty = 0;
  let currentImage = 0;

  const showLightbox = (propertyIndex, imageIndex=0) => {
    currentProperty = propertyIndex;
    currentImage = imageIndex;
    lightboxImg.src = properties[propertyIndex].images[imageIndex];
    lightboxTitle.textContent = properties[propertyIndex].title;
    lightboxDesc.textContent = properties[propertyIndex].desc;
    lightbox.classList.add("active");
  };

  const hideLightbox = () => lightbox.classList.remove("active");

  const showNext = () => {
    currentImage = (currentImage + 1) % properties[currentProperty].images.length;
    lightboxImg.src = properties[currentProperty].images[currentImage];
  };

  const showPrev = () => {
    currentImage = (currentImage - 1 + properties[currentProperty].images.length) % properties[currentProperty].images.length;
    lightboxImg.src = properties[currentProperty].images[currentImage];
  };

  cards.forEach((card, index) => card.addEventListener("click", () => showLightbox(index)));
  closeBtn.addEventListener("click", hideLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  lightbox.addEventListener("click", e => { if(e.target === lightbox) hideLightbox(); });
});





  
