// LinuxPedia - Pure Vanilla JavaScript (No libraries, zero setup)

document.addEventListener('DOMContentLoaded', function () {
  // 1. Dark / Light Theme Toggle
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('linuxpedia-theme') || 'dark';
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('linuxpedia-theme', theme);
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  }

  setTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. 1-Click Code Copy Button
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const codeBlock = btn.closest('.terminal').querySelector('code, pre');
      if (codeBlock) {
        navigator.clipboard.writeText(codeBlock.innerText.trim()).then(function () {
          const original = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function () {
            btn.textContent = original;
          }, 1500);
        });
      }
    });
  });

  // 3. Live Search Filter for Posts
  const searchInput = document.getElementById('search-input');
  const postCards = document.querySelectorAll('.post-card');

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      const term = e.target.value.toLowerCase().trim();
      postCards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 4. Category Filter Buttons
  const catButtons = document.querySelectorAll('.cat-btn');
  if (catButtons.length > 0) {
    catButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCat = btn.getAttribute('data-category');
        postCards.forEach(function (card) {
          const cardCat = card.getAttribute('data-category');
          if (selectedCat === 'all' || cardCat === selectedCat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
