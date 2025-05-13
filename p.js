
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
});

//-----------------------------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('.block');
  const closeButtons = document.querySelectorAll('.modal-close');

  // 開啟對應 modal 並鎖 body 捲動
  blocks.forEach((blk, idx) => {
    blk.addEventListener('click', () => {
      const modal = document.getElementById(`modal${idx + 1}`);
      if (!modal) return;
      document.body.style.overflow = 'hidden';
      modal.classList.add('active');
    });
  });

  // 關閉 modal 並還原 body 捲動
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = ''; 
    });
  });
});


//-----------------------------------------------------------------------------------------------------------//

window.addEventListener('scroll', () => {
  // 1. 旋转 ✴︎
  const icon = document.getElementById('scroll-icon');
  const y = window.scrollY || window.pageYOffset;
  const angle = (y * 0.5) % 360;
  icon.style.transform = `rotate(${angle}deg)`;

  // 2. Contact
  const contact = document.getElementById('contact-label');
  const home = document.getElementById('home');
  
  const homeBottom = home.getBoundingClientRect().bottom;
  if (homeBottom <= 0) {
    contact.style.display = 'block';
  } else {
    contact.style.display = 'none';
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('scroll-wrapper');
  const menu = document.getElementById('contact-menu');

  wrapper.addEventListener('click', () => {

    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});


document.getElementById('contact-close')
  .addEventListener('click', () => {
    document.getElementById('contact-menu').style.display = 'none';
});


//-----------------------------------------------------------------------------------------------------------//

// 回到 modal 頂部
document.querySelectorAll('.back-to-top').forEach(btn => {
  btn.addEventListener('click', () => {
    
    const modal = btn.closest('.modal');
    if (!modal) return;
    
    modal.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

//-----------------------------------------------------------------------------------------------------------//

// 跟隨滑鼠移動
const pic = document.querySelector('.home-center-pic');
const maxOffset = 40;

window.addEventListener('mousemove', e => {
  const { innerWidth: w, innerHeight: h } = window;
  
  const xRel = e.clientX / w - 0.5;
  const yRel = e.clientY / h - 0.5;

  const xOff = xRel * maxOffset;
  const yOff = yRel * maxOffset;

  pic.style.transform = `translate(-50%, -50%) translate(${xOff}px, ${yOff}px)`;
});

window.addEventListener('mouseleave', () => {
  pic.style.transform = 'translate(-50%, -50%)';
});



//-----------------------------------------------------------------------------------------------------------//



document.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('.project-title');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      
      if (entry.intersectionRatio >= 0.5) {
        entry.target.classList.add('visible');
      }
     
      if (!entry.isIntersecting) {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: [0, 0.5]
  });

  titles.forEach(title => io.observe(title));
});




//-----------------------------------------------------------------------------------------------------------//


// 圖庫放大預覽
document.addEventListener('DOMContentLoaded', () => {
  const modal    = document.getElementById('img-modal');
  const imgEl    = document.getElementById('img-modal-content');
  const closeBtn = document.querySelector('.img-modal-close');
  
  document.querySelectorAll('.gallery-item img').forEach(img => {
    
    img.addEventListener('click', () => {
      imgEl.src = img.src;
      modal.style.display = 'flex';
    });
  });
  
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
});



//-----------------------------------------------------------------------------------------------------------//

// 游標
document.addEventListener('mousemove', e => {
  const c = document.querySelector('.img-cursor');
  if (c) {
    c.style.left = `${e.clientX}px`;
    c.style.top  = `${e.clientY}px`;
  }
});


//-----------------------------------------------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', () => {
  const chars = '✴︎ᴗ̈ʚ⋆*✦﹡⊛'.split('');
  const elems = document.querySelectorAll('.scramble-text');

  function scramble(el) {
    const original = el.dataset.text;
    let progress = 0;
    const steps = original.length;
    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((ch, i) => (Math.random() < progress / steps ? ch : chars[Math.floor(Math.random() * chars.length)]))
        .join('');
      if (++progress > steps) {
        clearInterval(interval);
        el.textContent = original;
      }
    }, 120);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
  
      if (entry.isIntersecting) {
        
        scramble(el);
      } else {
      
        el.textContent = '';
      }
    });
  }, { threshold: 0.5 });
  
  elems.forEach(el => observer.observe(el));
  
});


//-----------------------------------------------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home');
  const starsContainer = home.querySelector('.stars');
  const STAR_COUNT = 15;

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('img');
    star.src = 'img/star.png';
    star.className = 'star';
  
    star.style.left = `${Math.random() * 100}%`;
    star.style.top  = `${Math.random() * 100}%`;
  
    star.style.animationDuration = `${1 + Math.random() * 2}s`;
    star.style.animationDelay    = `${Math.random() * 3}s`;
    starsContainer.appendChild(star);
  }
});


//-----------------------------------------------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', () => {
  const symbols = '✴︎ᴗ̈＊ʚ⋆*✦﹡✱⊛'.split('');
  const THROTTLE_DELAY = 70;

  let lastTime = 0;

  function createTrail(x, y) {
    const span = document.createElement('span');
    span.className = 'cursor-trail';
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = `${x}px`;
    span.style.top  = `${y}px`;
    document.body.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  }

  const aboutSection = document.getElementById('about');
  aboutSection.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastTime < THROTTLE_DELAY) return;
    lastTime = now;

    createTrail(e.clientX, e.clientY);
  });
});

//-----------------------------------------------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', () => {
  const home = document.getElementById('home');
  const imgs = [
    'img/dog1.png',
    'img/dog2.png',
    'img/dog3.png',
    'img/dog4.png'
  ];
  let idx = 0;

 
  const SHOW_DURATION = 1500;

  const FADE_DURATION = 500;

  home.addEventListener('click', e => {

    const rect = home.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;


    const imgEl = document.createElement('img');
    imgEl.src = imgs[idx];
    idx = (idx + 1) % imgs.length;
    imgEl.className = 'dog-popup';
    Object.assign(imgEl.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
      display: 'block',
      opacity: '0'
    });

    home.appendChild(imgEl);

 
    requestAnimationFrame(() => {
      imgEl.style.opacity = '1';
    });


    setTimeout(() => {
      imgEl.style.opacity = '0';
      setTimeout(() => {
        if (home.contains(imgEl)) {
          home.removeChild(imgEl);
        }
      }, FADE_DURATION);
    }, SHOW_DURATION);
  });
});

//-----------------------------------------------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const home = document.getElementById('home');

  // 監聽頁面捲動：離開 home 就顯示，回到首屏就隱藏
  window.addEventListener('scroll', () => {
    const homeBottom = home.getBoundingClientRect().bottom;
    scrollTopBtn.style.display = homeBottom <= 0 ? 'block' : 'none';
  });

  // 點擊平滑回到頂端
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});



