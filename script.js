    const tapLayer = document.getElementById('tapLayer');
    const giftWrap = document.getElementById('giftWrap');
    const gift = document.getElementById('gift');
    const petals = document.getElementById('petals');
    const ticker = document.getElementById('ticker');
    const names = document.getElementById('names');
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    

    
    const tDays = document.getElementById('t-days');
    const tHours = document.getElementById('t-hours');
    const tMinutes = document.getElementById('t-minutes');
    const tSeconds = document.getElementById('t-seconds');

    const startDate = new Date('2025-12-16T03:45:00');
    
    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;
        
        if (diff < 0) return; 
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        tDays.textContent = String(days).padStart(2, '0');
        tHours.textContent = String(hours).padStart(2, '0');
        tMinutes.textContent = String(minutes).padStart(2, '0');
        tSeconds.textContent = String(seconds).padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);

    let started = false;
    let opened = false;

    function spawnFloaters() {
        const count = 45;
        const container = document.getElementById('floaters');
        const hearts = ['❤', '💗', '💖', '💕'];
        
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const floater = document.createElement('div');
            floater.className = 'floater';
            floater.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            floater.style.left = `${Math.random() * 100}%`;
            floater.style.top = `${Math.random() * 100}%`;
            
            const size = 15 + Math.random() * 18;
            floater.style.fontSize = `${size}px`;
            
            floater.style.animationDuration = `${3 + Math.random() * 4}s`;
            floater.style.animationDelay = `${-Math.random() * 5}s`;
            
            container.appendChild(floater);
        }
    }
    
    spawnFloaters();

    function start() {
        if (started) return;
        started = true;
        
        tapLayer.classList.add('hidden');
        setTimeout(() => {
            giftWrap.classList.add('show');
        }, 100);
    }

    function spawnRoses() {
        const count = 25; 
        const rect = gift.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < count; i++) {
            const rose = document.createElement('div');
            rose.className = 'rose-particle';
            rose.textContent = Math.random() > 0.5 ? '🌹' : '🥀'; 
            rose.style.left = `${centerX}px`;
            rose.style.top = `${centerY}px`;
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 200; 
            
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            rose.style.transform = `translate(0, 0)`;
            document.body.appendChild(rose);
            
            rose.animate([
                { transform: `translate(0, 0) scale(0.5) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(1.5) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 1500 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                fill: 'forwards'
            }).onfinish = () => rose.remove();
        }
    }

    function openGift() {
        if (opened) return;
        opened = true;
        
        spawnRoses(); 
        playMusic(); 

        const giftLabel = document.getElementById('giftLabel');
        if (giftLabel) {
            giftLabel.classList.add('hidden');
            giftLabel.style.display = 'none';
        }

        gift.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        gift.style.opacity = '0';
        gift.style.transform = 'scale(0.8)';
        gift.style.pointerEvents = 'none';

        setTimeout(() => {
            names.classList.add('show');
            
            musicPlayer.classList.add('playing');
            playPauseBtn.textContent = '❘❘';

             setTimeout(() => {
                names.classList.remove('show');
                
                const giftWrap = document.getElementById('giftWrap');
                if (giftWrap) giftWrap.style.display = 'none';
                
                const lovePhoto = document.getElementById('lovePhotoContainer');
                if (lovePhoto) lovePhoto.classList.add('show');
                
                ticker.classList.add('show');
                musicPlayer.classList.add('show');
                const lr = document.getElementById('loveReasons');
                if(lr) lr.classList.add('show');
            }, 2000);
        }, 500);
    }



    function playMusic() {
        const audio = document.getElementById('bg-music');
        const player = document.getElementById('musicPlayer');
        if(audio) {
            audio.volume = 0.5; 
            audio.play().catch(e => console.log("Audio play failed:", e));
            if(player) player.classList.add('playing');
        }
    }
    
    const reasons = [
        "Gülüşünü seviyorum 💖",
        "Bakışını seviyorum ✨",
        "Kalbinin temizliğini seviyorum 🌸",
        "Seni her halinle seviyorum 💑",
        "Benim olmanı seviyorum 💍",
        "Kokunu seviyorum 🌹",
        "Sesini duymayı seviyorum 🎶",
        "Seninle geçirdiğim her anı seviyorum ⏳",
        "Gözlerinin içine bakmayı seviyorum 👀",
        "Sadece SEN olduğun için seviyorum 💜"
    ];
    
    const reasonBtn = document.getElementById('reasonBtn');
    const reasonDisplay = document.getElementById('reasonDisplay');

    
    let lastReason = null;
    let availableReasons = [];

    function getRandomReason() {
        if (availableReasons.length === 0) {
            availableReasons = [...reasons];
            for (let i = availableReasons.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableReasons[i], availableReasons[j]] = [availableReasons[j], availableReasons[i]];
            }
            if (availableReasons[availableReasons.length - 1] === lastReason && availableReasons.length > 1) {
                const temp = availableReasons.pop();
                availableReasons.unshift(temp);
            }
        }
        const selected = availableReasons.pop();
        lastReason = selected;
        return selected;
    }

    if(reasonBtn) {
        reasonBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            const randomReason = getRandomReason();
            reasonDisplay.classList.remove('visible');
            setTimeout(() => {
                reasonDisplay.textContent = randomReason;
                reasonDisplay.classList.add('visible');
            }, 300);
        });
    }

    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isPlaying = musicPlayer.classList.contains('playing');
        
        if (isPlaying) {
            musicPlayer.classList.remove('playing');
            playPauseBtn.textContent = '▶';
        } else {
            musicPlayer.classList.add('playing');
            playPauseBtn.textContent = '❘❘';
        }
    });

    document.getElementById('stage').addEventListener('click', (e) => {
        if (!started) {
            start();
        }
    });


    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitPasswordBtn = document.getElementById('submitPasswordBtn');
    const passwordError = document.getElementById('passwordError');

    gift.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!opened) {
            passwordModal.classList.add('show');
            setTimeout(() => passwordInput.focus(), 100); 
        }
    });

    function verifyPassword() {
        const password = passwordInput.value;
        if (password === '16122025') {
            passwordModal.classList.remove('show');
            openGift(); 
        } else {
            passwordInput.value = '';
            passwordError.classList.add('show');
            passwordModal.querySelector('.modal-content').classList.add('shake');
            
            setTimeout(() => {
                passwordModal.querySelector('.modal-content').classList.remove('shake');
            }, 500);
        }
    }

    submitPasswordBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        verifyPassword();
    });

    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            verifyPassword();
        }
        passwordError.classList.remove('show');
    });

    passwordModal.addEventListener('click', (e) => {
        if (e.target === passwordModal) {
            passwordModal.classList.remove('show');
        }
    });

    tapLayer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            start();
        }
    });

    gift.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            openGift();
        }
    });



    function initFireflies() {
        const container = document.getElementById('background-effects');
        if (!container) return;
        const count = 30;
        
        for (let i = 0; i < count; i++) {
            const fly = document.createElement('div');
            fly.className = 'firefly';
            
            const left = Math.random() * 100;
            const duration = 15 + Math.random() * 20; 
            const delay = Math.random() * -20;
            const size = 2 + Math.random() * 4;
            
            fly.style.left = `${left}%`;
            fly.style.width = `${size}px`;
            fly.style.height = `${size}px`;
            fly.style.animationDuration = `${duration}s`;
            fly.style.animationDelay = `${delay}s`;
            
            container.appendChild(fly);
        }
    }
    initFireflies();
    
    let lastCursorTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastCursorTime < 20) return; 
        lastCursorTime = now;
        
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.textContent = '❤'; 
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }); 

    function playIntro() {
        const overlay = document.getElementById('intro-overlay');
        const text = document.getElementById('intro-text');
        
        if (!overlay || !text) return;

        setTimeout(() => {
            text.textContent = "Her hikaye güzeldir...";
            text.classList.add('visible');

            setTimeout(() => {
                text.classList.remove('visible');

                setTimeout(() => {
                    text.textContent = "...ama bizimki favorim. 💜";
                    text.classList.add('visible');
                    
                    setTimeout(() => {
                        text.classList.remove('visible');
                        text.classList.add('explode'); 
                        
                        setTimeout(() => {
                            overlay.classList.add('fade-out');
                            setTimeout(() => {
                                overlay.remove();
                            }, 2000); 
                        }, 600); 
                        
                    }, 2500); 
                    
                }, 1500); 
                
            }, 3000); 
            
        }, 800); 
    }

    window.addEventListener('load', playIntro);


