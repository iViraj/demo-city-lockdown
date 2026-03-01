    (function() {
      // --- audio setup (storm ambience) ---
      const soundEnabled = localStorage.getItem('soundEnabled') !== 'false'; // default true
      let stormSound;
      const initAudio = () => {
        if (!stormSound) {
          stormSound = new Howl({
            src: ['https://actions.google.com/sounds/v1/weather/rain_thunder.ogg'], // realistic storm
            loop: true,
            volume: 0.4,
            html5: true,
          });
        }
        if (soundEnabled) stormSound.play();
      };

      // toggle button
      const toggleBtn = document.getElementById('sound-toggle');
      const updateIcon = (on) => {
        toggleBtn.innerHTML = on ? '<i class="fas fa-volume-up"></i> <span style="font-size:1rem;">SOUND</span>' : '<i class="fas fa-volume-mute"></i> <span style="font-size:1rem;">MUTED</span>';
      };
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (stormSound && stormSound.playing()) {
          stormSound.stop();
          localStorage.setItem('soundEnabled', 'false');
          updateIcon(false);
        } else {
          if (!stormSound) initAudio();
          else stormSound.play();
          localStorage.setItem('soundEnabled', 'true');
          updateIcon(true);
        }
      });
      
      // first user interaction -> start audio
      const unlockAudio = () => {
        if (!stormSound) initAudio();
        else if (soundEnabled && !stormSound.playing()) stormSound.play();
        updateIcon(soundEnabled);
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('scroll', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
      };
      document.addEventListener('click', unlockAudio, { once: true });
      document.addEventListener('scroll', unlockAudio, { once: true });
      document.addEventListener('touchstart', unlockAudio, { once: true });

      // lightning random flashes
      const lightning = document.getElementById('lightning-flash');
      function flash() {
        gsap.to(lightning, { opacity: 0.7, duration: 0.05, onComplete: () => {
          gsap.to(lightning, { opacity: 0, duration: 0.4 });
        }});
        // optional thunder sound (if storm already playing, we avoid double)
      }
      setInterval(() => {
        if (Math.random() > 0.4) flash(); // random flash every 5-15 sec
      }, 8000);

      // player counter animation
      const counterSpan = document.getElementById('playerCount');
      let count = 1284;
      setInterval(() => {
        let change = Math.floor(Math.random() * 30) - 10; // -10..20
        count = Math.max(900, Math.min(2500, count + change));
        counterSpan.innerText = count;
      }, 4000);

      // fake map building popup (click)
      document.querySelectorAll('.building').forEach(b => {
        b.addEventListener('click', (e) => {
          alert(`🏢 ${b.getAttribute('data-name') || 'building'}\n⚠️ ${b.getAttribute('data-tip') || 'danger level unknown'}`);
        });
      });

      // tilt effect (simple GSAP)
      gsap.utils.toArray('.disaster-card, .feature-card, .how-card, .building').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width/2;
          const centerY = rect.height/2;
          const rotX = (y - centerY) / 15;
          const rotY = (centerX - x) / 15;
          gsap.to(card, { rotationX: rotX, rotationY: rotY, duration: 0.2, ease: 'power1.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.3 });
        });
      });

      // rain with particles (simplified canvas)
      const canvas = document.createElement('canvas');
      canvas.id = 'rain-canvas';
      canvas.style.position = 'fixed'; canvas.style.top='0'; canvas.style.left='0';
      canvas.style.width='100%'; canvas.style.height='100%'; canvas.style.pointerEvents='none'; canvas.style.zIndex='6';
      document.getElementById('rain-container').appendChild(canvas);
      const ctx = canvas.getContext('2d');
      let w = window.innerWidth, h = window.innerHeight;
      canvas.width = w; canvas.height = h;
      window.addEventListener('resize', ()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; w=canvas.width; h=canvas.height; });
      const drops = [];
      for (let i=0; i<150; i++) drops.push({ x: Math.random()*w, y: Math.random()*h, speed: 5+Math.random()*10, len: 10+Math.random()*20 });
      function drawRain() {
        ctx.clearRect(0,0,w,h);
        ctx.strokeStyle = '#aaccff';
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10; ctx.shadowColor = '#00eaff';
        for (let d of drops) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x-4, d.y+d.len);
          ctx.strokeStyle = `rgba(170, 220, 255, ${0.3+Math.random()*0.3})`;
          ctx.stroke();
          d.y += d.speed;
          if (d.y > h) { d.y = 0; d.x = Math.random()*w; }
        }
        requestAnimationFrame(drawRain);
      }
      drawRain();

      // scroll animations
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.section-title, .card-grid, .map-container, .video-wrapper, .cta').forEach(el => {
        gsap.from(el, { opacity: 0, y: 100, duration: 1, scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      // tiny random lightning
      setInterval(() => {
        if (Math.random()>0.7) flash();
      }, 5000);
    })();
