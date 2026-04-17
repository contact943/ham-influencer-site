/* ========================================
   BACKGROUND STARS / PARTICLES (full page)
   ======================================== */
(function() {
  var canvas = document.getElementById('bgStars');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var stars = [];
  var STAR_COUNT = 120;
  var w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    stars = [];
    for (var i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.003
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];

      // Move
      s.x += s.dx;
      s.y += s.dy;
      s.pulse += s.pulseSpeed;

      // Wrap around
      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      // Pulse opacity
      var alpha = s.opacity + Math.sin(s.pulse) * 0.15;
      if (alpha < 0.05) alpha = 0.05;

      // Draw star with cyan tint
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(62, 212, 207, ' + alpha + ')';
      ctx.fill();

      // Glow for larger stars
      if (s.r > 1) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(62, 212, 207, ' + (alpha * 0.15) + ')';
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', resize);
})();

/* ========================================
   PERF GUARD
   ======================================== */
(function() {
  var html = document.documentElement;
  var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var gl = null;
  try {
    var c = document.createElement('canvas');
    gl = c.getContext('webgl') || c.getContext('experimental-webgl');
  } catch(e) {}

  window.HAM_PERF = {
    hasWebGL: !!gl,
    isMobile: isMobile,
    reduceMotion: reduceMotion,
    highDPR: window.devicePixelRatio > 2
  };

  if (isMobile) html.classList.add('is-mobile');
  if (reduceMotion) html.classList.add('reduce-motion');
})();

/* ========================================
   NAV
   ======================================== */
(function() {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var scrollThreshold = 80;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('nav__toggle--active');
    links.classList.toggle('nav__links--open');
  });

  // Close mobile menu on link click
  var navLinks = links.querySelectorAll('.nav__link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('nav__toggle--active');
      links.classList.remove('nav__links--open');
    });
  });
})();

/* ========================================
   GSAP SCROLL ANIMATIONS
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var reduceMotion = window.HAM_PERF && window.HAM_PERF.reduceMotion;
  var defaultDuration = reduceMotion ? 0.01 : 0.8;
  var defaultEase = 'power2.out';

  // Fade-up animations
  document.querySelectorAll('[data-animate="fade-up"]').forEach(function(el) {
    var delay = parseFloat(el.dataset.animateDelay) || 0;

    gsap.set(el, { opacity: 0, y: 40 });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: defaultDuration,
      delay: delay,
      ease: defaultEase,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Counter animations
  document.querySelectorAll('.proof__number').forEach(function(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';

    el.textContent = '0' + suffix;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: function() {
        gsap.to({ val: 0 }, {
          val: target,
          duration: reduceMotion ? 0.01 : 2,
          ease: 'power1.out',
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          }
        });
      }
    });
  });

  // Timeline line draw
  var timelineLine = document.getElementById('timelineLine');
  if (timelineLine) {
    var lineLength = 840;

    gsap.set(timelineLine, {
      strokeDasharray: lineLength,
      strokeDashoffset: lineLength
    });

    gsap.to(timelineLine, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#timeline',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1
      }
    });
  }

  // Hero parallax on cutouts
  if (!window.HAM_PERF.isMobile && !reduceMotion) {
    var cutouts = document.querySelectorAll('.hero__cutout');
    cutouts.forEach(function(cutout, i) {
      var speed = 50 + (i % 4) * 30;
      gsap.to(cutout, {
        y: -speed,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  // Hero content fade in on load
  gsap.from('.hero__content', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  });

  gsap.from('.hero__cutout', {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    stagger: 0.08,
    delay: 0.1,
    ease: 'power2.out'
  });
});

/* ========================================
   THREE.JS HERO PARTICLES
   ======================================== */
(function() {
  if (!window.HAM_PERF || !window.HAM_PERF.hasWebGL || window.HAM_PERF.isMobile || window.HAM_PERF.reduceMotion) {
    return;
  }

  function initParticles() {
    if (typeof THREE === 'undefined') return;

    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 30;

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power'
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var PARTICLE_COUNT = 300;
    var FIELD_SIZE = 50;
    var DRIFT_SPEED = 0.0003;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(PARTICLE_COUNT * 3);
    var opacities = new Float32Array(PARTICLE_COUNT);
    var velocities = new Float32Array(PARTICLE_COUNT * 3);

    var halfField = FIELD_SIZE / 2;

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      var i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * FIELD_SIZE;
      positions[i3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      opacities[i] = Math.random() * 0.5 + 0.1;
      velocities[i3 + 1] = Math.random() * 0.5 + 0.3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(opacities, 1));

    var material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color(0x3ED4CF) },
        uSize: { value: 2.5 * renderer.getPixelRatio() }
      },
      vertexShader: [
        'attribute float alpha;',
        'varying float vAlpha;',
        'uniform float uSize;',
        'void main() {',
        '  vAlpha = alpha;',
        '  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
        '  gl_PointSize = uSize * (20.0 / -mvPosition.z);',
        '  gl_Position = projectionMatrix * mvPosition;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform vec3 uColor;',
        'varying float vAlpha;',
        'void main() {',
        '  float dist = length(gl_PointCoord - vec2(0.5));',
        '  if (dist > 0.5) discard;',
        '  float fade = 1.0 - smoothstep(0.2, 0.5, dist);',
        '  gl_FragColor = vec4(uColor, vAlpha * fade * 0.6);',
        '}'
      ].join('\n')
    });

    var points = new THREE.Points(geometry, material);
    scene.add(points);

    var animationId = null;

    function animate() {
      animationId = requestAnimationFrame(animate);

      var posArray = geometry.attributes.position.array;

      for (var i = 0; i < PARTICLE_COUNT; i++) {
        var i3 = i * 3;
        posArray[i3 + 1] += velocities[i3 + 1] * DRIFT_SPEED * 60;
        if (posArray[i3 + 1] > halfField) posArray[i3 + 1] = -halfField;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y += 0.0002;
      points.rotation.x += 0.0001;

      renderer.render(scene, camera);
    }

    // Intersection Observer - pause when off-screen
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          if (!animationId) animate();
        } else {
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
          }
        }
      });
    }, { threshold: 0.1 });

    observer.observe(document.querySelector('.hero'));

    // Resize handler
    window.addEventListener('resize', function() {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
  }

  // Wait for Three.js to load
  if (typeof THREE !== 'undefined') {
    initParticles();
  } else {
    window.addEventListener('load', initParticles);
  }
})();
