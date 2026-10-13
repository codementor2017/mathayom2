/* ============================================================
   GRADE 8 TECHNOLOGY & COMPUTING SCIENCE
   Shared JavaScript for index + all lesson pages
   Cartoon / Lion King inspired interactions 🦁
   ============================================================ */

/* ------------------------------------------------------------
   Wait for the page to fully load before running anything
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
  console.log('🦁 Grade 8 Tech & CS — ready to roar!');

  initPillarReminder();      // Lesson 1.5 activity button
  initSmoothScroll();        // Smooth scrolling for anchor links
  initLessonProgress();      // Tiny progress indicator (optional)
  initExternalLinks();       // Safety for external links
  initKeyboardShortcuts();   // Quick nav: ← and → for prev/next lesson
  initFriendlyGreeting();    // Cartoon-style greeting in console
});

/* ------------------------------------------------------------
   1. PILLAR REMINDER (used on unit1-ch1.html and other lessons)
   When the user clicks the "Show me the four pillars again!"
   button, we display a friendly reminder box with the four pillars.
   ------------------------------------------------------------ */
function initPillarReminder() {
  const button = document.getElementById('pillarReminder');
  const output = document.getElementById('pillarOutput');

  // Only run if both elements exist on this page
  if (!button || !output) return;

  // Data: the four pillars with emojis and short descriptions
  const pillars = [
    { emoji: '🧩', name: 'Decomposition',   desc: 'Break the problem into smaller parts.' },
    { emoji: '🔍', name: 'Pattern Recognition', desc: 'Look for patterns or similarities.' },
    { emoji: '🎯', name: 'Abstraction',     desc: 'Focus on important details; ignore the rest.' },
    { emoji: '📋', name: 'Algorithm Design', desc: 'Write step-by-step instructions.' }
  ];

  // Click handler: toggle the output box
  button.addEventListener('click', function () {
    // If already visible, hide it (toggle behavior)
    if (output.classList.contains('visible')) {
      output.classList.remove('visible');
      output.innerHTML = '';
      button.textContent = '🦁 Show me the four pillars again!';
      return;
    }

    // Build the reminder HTML
    let html = '<strong>🦁 Remember the four pillars:</strong><br><br>';
    pillars.forEach(function (p, index) {
      html += `<span style="font-size:1.3rem;">${p.emoji}</span> 
               <strong>${index + 1}. ${p.name}:</strong> ${p.desc}<br>`;
    });
    html += '<br><em>“It is time!” — Rafiki</em>';

    // Inject and show
    output.innerHTML = html;
    output.classList.add('visible');
    button.textContent = '🙈 Hide the pillars';
  });
}

/* ------------------------------------------------------------
   2. SMOOTH SCROLL
   Any link that points to an anchor (#something) on the same
   page will scroll smoothly instead of jumping.
   ------------------------------------------------------------ */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ------------------------------------------------------------
   3. LESSON PROGRESS (tiny visual touch)
   Adds a small "reading progress" paw print at the top of the
   page that fills as the student scrolls through the lesson.
   ------------------------------------------------------------ */
function initLessonProgress() {
  // Only add the progress bar on lesson pages (pages with .lesson-content)
  if (!document.querySelector('.lesson-content')) return;

  // Create the progress container
  const progressContainer = document.createElement('div');
  progressContainer.id = 'lessonProgress';
  progressContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: #f3d48b;
    z-index: 9999;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  `;

  const progressFill = document.createElement('div');
  progressFill.id = 'lessonProgressFill';
  progressFill.style.cssText = `
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #f7c95c, #e3b44b, #dba53a);
    border-radius: 0 6px 6px 0;
    transition: width 0.15s ease-out;
  `;

  progressContainer.appendChild(progressFill);
  document.body.appendChild(progressContainer);

  // Update on scroll
  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = percent + '%';
  });
}

/* ------------------------------------------------------------
   4. EXTERNAL LINK SAFETY
   Any link that goes outside the site opens in a new tab and
   gets the correct rel attributes for security.
   ------------------------------------------------------------ */
function initExternalLinks() {
  const allLinks = document.querySelectorAll('a[href]');

  allLinks.forEach(function (link) {
    const href = link.getAttribute('href');

    // Skip anchors, mailto, tel, and relative links
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      !/^https?:\/\//i.test(href)
    ) {
      return;
    }

    // Open external links in a new tab
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/* ------------------------------------------------------------
   5. KEYBOARD SHORTCUTS
   On any lesson page:
     → (right arrow) goes to the next lesson
     ← (left arrow)  goes back to the index
   This is handy for teachers and fast students! 🦁
   ------------------------------------------------------------ */
function initKeyboardShortcuts() {
  // Only on lesson pages
  if (!document.querySelector('.lesson-content')) return;

  document.addEventListener('keydown', function (e) {
    // Ignore if the user is typing in an input or textarea
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

    if (e.key === 'ArrowRight') {
      const next = document.querySelector('.nav-button.next-lesson');
      if (next && next.href) {
        window.location.href = next.href;
      }
    } else if (e.key === 'ArrowLeft') {
      const back = document.querySelector('.nav-button.back-to-index');
      if (back && back.href) {
        window.location.href = back.href;
      }
    }
  });
}

/* ------------------------------------------------------------
   6. FRIENDLY GREETING
   Just a fun cartoon touch in the console for curious students.
   ------------------------------------------------------------ */
function initFriendlyGreeting() {
  const greetings = [
    '🦁 "Hakuna Matata! What a wonderful phrase!"',
    '🦁 "It is time!" — Rafiki',
    '🦁 "Remember who you are... a computational thinker!"',
    '🦁 "Everything the light touches... is your code!"',
    '🦁 "The past can hurt. But you can either run from it, or learn from it."'
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Fancy console message
  console.log(
    '%c' + randomGreeting,
    'font-size: 16px; color: #7b3f00; background: #f7c95c; padding: 6px 12px; border-radius: 8px; font-weight: bold;'
  );

  console.log(
    '%c🦁 Grade 8 Tech & CS · Learn, Code, Roar!',
    'font-size: 14px; color: #2b4d1a; font-weight: bold;'
  );
}

/* ------------------------------------------------------------
   EXTRA: Small helper for any page that wants to show a
   "random fact" about computational thinking.
   Just call showRandomFact() from the console, or add a button
   with id="randomFactButton" and it will work automatically.
   ------------------------------------------------------------ */
const computationalThinkingFacts = [
  'The word "algorithm" comes from the name of the Persian mathematician Al-Khwarizmi (c. 780–850 AD).',
  'Decomposition is used in almost every field — from cooking to rocket science!',
  'Pattern recognition helps us predict the weather, stock markets, and even traffic.',
  'Abstraction is why you can drive a car without knowing how the engine works.',
  'The first computer programmer, Ada Lovelace, wrote algorithms in the 1840s.',
  'Bubble sort is named because larger elements "bubble" to the end of the list.',
  'Merge sort was invented by John von Neumann in 1945.',
  'A "brute force" algorithm tries every possibility — it is simple but slow.',
  'Testing edge cases can catch bugs that normal testing misses.',
  'The four pillars of computational thinking work best when combined!'
];

function showRandomFact() {
  const fact = computationalThinkingFacts[
    Math.floor(Math.random() * computationalThinkingFacts.length)
  ];

  console.log(
    '%c🦁 Random CT Fact: ' + fact,
    'font-size: 14px; color: #4b2e0b; background: #fff3cc; padding: 8px 14px; border-radius: 8px; border-left: 5px solid #e3b44b;'
  );

  return fact;
}

/* Auto-hook a random fact button if it exists on the page */
document.addEventListener('DOMContentLoaded', function () {
  const factButton = document.getElementById('randomFactButton');
  if (factButton) {
    factButton.addEventListener('click', showRandomFact);
  }
});

/* ------------------------------------------------------------
   Make showRandomFact available globally so students can try it
   in the browser console for fun. 🦁
   ------------------------------------------------------------ */
window.showRandomFact = showRandomFact;