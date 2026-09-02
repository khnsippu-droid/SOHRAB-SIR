/* ==========================================================
   SOHRAB SIR — TEACHER'S DAY TRIBUTE — script.js
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     NAVBAR — scroll state + mobile toggle
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function handleNavScroll(){
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------------------------------------------------------
     CURSOR GLOW (desktop only)
  --------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouch && cursorGlow) {
    let glowX = window.innerWidth / 2, glowY = window.innerHeight / 2;
    let targetX = glowX, targetY = glowY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorGlow.classList.add('active');
    });

    function animateGlow(){
      glowX += (targetX - glowX) * 0.12;
      glowY += (targetY - glowY) * 0.12;
      cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* ---------------------------------------------------------
     HERO PARTICLES
  --------------------------------------------------------- */
  const particlesEl = document.getElementById('particles');
  const PARTICLE_COUNT = window.innerWidth < 700 ? 16 : 32;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 1.5 + Math.random() * 2.5;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (10 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 14) + 's';
    particlesEl.appendChild(p);
  }

  /* ---------------------------------------------------------
     SCROLL REVEAL — IntersectionObserver
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* stagger lesson cards slightly */
  document.querySelectorAll('.lesson-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.08) + 's';
  });

  /* ---------------------------------------------------------
     MUSIC PLAYER
  --------------------------------------------------------- */
  const bgAudio = document.getElementById('bgAudio');
  const musicPlayer = document.getElementById('musicPlayer');
  const playPauseBtn = document.getElementById('playPause');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  const disc = document.getElementById('disc');

  bgAudio.volume = 0.62;

  function playAudio(){
    bgAudio.play().then(() => {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      disc.classList.add('spinning');
    }).catch(() => {
      /* autoplay blocked — user can press play manually */
    });
  }

  function pauseAudio(){
    bgAudio.pause();
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    disc.classList.remove('spinning');
  }

  playPauseBtn.addEventListener('click', () => {
    if (bgAudio.paused) playAudio();
    else pauseAudio();
  });

  /* ---------------------------------------------------------
     ENTER THE EXPERIENCE — scroll + start music + reveal player
  --------------------------------------------------------- */
  const enterBtn = document.getElementById('enterBtn');
  let experienceStarted = false;

  enterBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });

    if (!experienceStarted) {
      experienceStarted = true;
      playAudio();
      setTimeout(() => {
        musicPlayer.classList.add('visible');
      }, 500);
    }
  });

  /* ---------------------------------------------------------
     MESSAGE SECTION — typewriter effect
  --------------------------------------------------------- */
  const editorText = document.getElementById('editorText');
  const lineNumbers = document.getElementById('lineNumbers');
  const editorWindow = document.getElementById('editorWindow');

  const messageLines = [
    'Dear Sohrab Sir,',
    '',
    'You have taught us much more than computers and code.',
    '',
    "You have taught us to think, to solve problems, to stay",
    'curious and to keep trying even when the answer doesn\'t',
    'work on the first attempt.',
    '',
    'Every lesson, every explanation and every little piece of',
    'advice has helped us become better learners.',
    '',
    'Thank you for being the teacher who makes technology',
    'feel exciting.',
    '',
    "We may forget some of the code we write...",
    '',
    "But we won't forget the teacher who taught us how to write it.Sir Ek Aur Baat Iske Baad Mujhe Maarna Mat... ",
    '',
    'Happy Teacher\'s Day, Sohrab Sir! ❤️'
  ];

  const fullMessage = messageLines.join('\n');
  let typewriterStarted = false;

  function buildLineNumbers(count){
    let out = '';
    for (let i = 1; i <= count; i++) out += i + '\n';
    lineNumbers.textContent = out.trim();
  }

  function typeMessage(){
    if (typewriterStarted) return;
    typewriterStarted = true;

    let i = 0;
    let lineCount = 1;
    buildLineNumbers(1);

    editorText.innerHTML = '';
    const caret = document.createElement('span');
    caret.className = 'caret';

    function step(){
      if (i < fullMessage.length){
        const char = fullMessage[i];
        editorText.textContent += char;
        if (char === '\n') {
          lineCount++;
          buildLineNumbers(lineCount);
        }
        editorText.appendChild(caret);
        i++;
        const delay = char === '\n' ? 60 : (12 + Math.random() * 18);
        setTimeout(step, delay);
      } else {
        caret.remove();
      }
    }
    step();
  }

  const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeMessage();
        messageObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  messageObserver.observe(editorWindow);

  /* ---------------------------------------------------------
     EASTER EGG — type "404" or click hidden trigger 5x
  --------------------------------------------------------- */
  const eggOverlay = document.getElementById('eggOverlay');
  const eggResult = document.getElementById('eggResult');
  const eggTrigger = document.getElementById('eggTrigger');

  function showEasterEgg(){
    eggOverlay.classList.add('visible');
    eggResult.classList.remove('show');
    setTimeout(() => eggResult.classList.add('show'), 1200);
  }

  function hideEasterEgg(){
    eggOverlay.classList.remove('visible');
  }

  eggOverlay.addEventListener('click', hideEasterEgg);

  /* typed "404" anywhere on the page */
  let typedBuffer = '';
  window.addEventListener('keydown', (e) => {
    if (e.key.length === 1) {
      typedBuffer = (typedBuffer + e.key).slice(-3);
      if (typedBuffer === '404') {
        showEasterEgg();
        typedBuffer = '';
      }
    }
  });

  /* click hidden trigger element multiple times */
  let eggClickCount = 0;
  eggTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    eggClickCount++;
    if (eggClickCount >= 5) {
      showEasterEgg();
      eggClickCount = 0;
    }
  });

  /* also allow clicking the terminal window in hero as a fun trigger */
  const heroTerminal = document.querySelector('.hero .terminal');
  let terminalClicks = 0;
  if (heroTerminal){
    heroTerminal.addEventListener('click', () => {
      terminalClicks++;
      if (terminalClicks >= 5) {
        showEasterEgg();
        terminalClicks = 0;
      }
    });
  }

  /* ---------------------------------------------------------
     SURPRISE OVERLAY + CONFETTI
  --------------------------------------------------------- */
  const unlockBtn = document.getElementById('unlockBtn');
  const surpriseOverlay = document.getElementById('surpriseOverlay');
  const closeSurprise = document.getElementById('closeSurprise');
  const confettiLayer = document.getElementById('confettiLayer');

  const confettiColors = ['#8b6bf2', '#c9b6ff', '#ffffff', '#6f57c9', '#b393f5'];

  function spawnConfetti(count){
    for (let i = 0; i < count; i++){
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 8;
      const isCircle = Math.random() > 0.5;
      piece.style.width = size + 'px';
      piece.style.height = (isCircle ? size : size * 1.6) + 'px';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.borderRadius = isCircle ? '50%' : '2px';
      piece.style.animationDuration = (2.6 + Math.random() * 2.4) + 's';
      piece.style.animationDelay = (Math.random() * 1.2) + 's';
      piece.style.opacity = String(0.7 + Math.random() * 0.3);
      confettiLayer.appendChild(piece);

      setTimeout(() => piece.remove(), 6000);
    }
  }

  function openSurprise(){
    surpriseOverlay.classList.add('visible');
    confettiLayer.innerHTML = '';
    spawnConfetti(70);
    document.body.style.overflow = 'hidden';
  }

  function closeSurpriseOverlay(){
    surpriseOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  unlockBtn.addEventListener('click', openSurprise);
  closeSurprise.addEventListener('click', closeSurpriseOverlay);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (surpriseOverlay.classList.contains('visible')) closeSurpriseOverlay();
      if (eggOverlay.classList.contains('visible')) hideEasterEgg();
    }
  });

  surpriseOverlay.addEventListener('click', (e) => {
    if (e.target === surpriseOverlay) closeSurpriseOverlay();
  });

  /* ---------------------------------------------------------
     TEACHER PHOTO — graceful fallback if image missing
  --------------------------------------------------------- */
  const teacherPhoto = document.getElementById('teacherPhoto');
  if (teacherPhoto){
    teacherPhoto.addEventListener('error', () => {
      teacherPhoto.style.objectFit = 'contain';
      teacherPhoto.style.background = 'linear-gradient(135deg, rgba(139,107,242,0.25), rgba(139,107,242,0.05))';
      teacherPhoto.alt = 'Sohrab Sir (photo not found — add "sohrab sir.jpg" to the project folder)';
    }, { once: true });
  }

});
