// Create floating particles in background
function createParticles() {
    const container = document.getElementById('particlesContainer');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.setProperty('--x-offset', (Math.random() * 200 - 100) + 'px');
        particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }, 300);
}

// Envelope opening animation
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const cardContainer = document.getElementById('cardContainer');
const tapHint = document.getElementById('tapHint');

envelope.addEventListener('click', openEnvelope);

function openEnvelope() {
    // Add shake animation
    envelope.classList.add('opening');
    
    setTimeout(() => {
        envelope.classList.remove('opening');
        envelope.classList.add('open');
        
        // Hide tap hint
        tapHint.style.opacity = '0';
        
        setTimeout(() => {
            // Fade out envelope
            envelopeWrapper.style.opacity = '0';
            envelopeWrapper.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                envelopeWrapper.classList.add('hidden');
                cardContainer.classList.add('active');
            }, 500);
        }, 800);
    }, 500);
}

// Make the "No" button run away
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const card = document.getElementById('card');
const successScreen = document.getElementById('successScreen');
const buttonsContainer = document.getElementById('buttonsContainer');

let noBtnAttempts = 0;

function moveNoButton() {
    noBtnAttempts++;
    
    // Get button and container dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const containerRect = buttonsContainer.getBoundingClientRect();
    
    // Calculate maximum possible positions within the card
    const maxX = containerRect.width - btnRect.width;
    const maxY = 150; // Allow button to move within reasonable vertical range
    
    // Generate random position
    let newX = Math.random() * maxX;
    let newY = (Math.random() - 0.5) * maxY;
    
    // Make sure it's far enough from current position
    const minDistance = 80;
    const currentX = parseFloat(noBtn.style.left || 0);
    const currentY = parseFloat(noBtn.style.top || 0);
    
    if (Math.abs(newX - currentX) < minDistance) {
        newX = currentX > maxX / 2 ? Math.max(0, currentX - minDistance) : Math.min(maxX, currentX + minDistance);
    }
    
    // Apply new position
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    
    // Change button text after several attempts
    const noBtnText = noBtn.querySelector('.btn-text');
    if (noBtnAttempts === 3) {
        noBtnText.textContent = 'Please? 🥺';
    } else if (noBtnAttempts === 5) {
        noBtnText.textContent = 'Pretty please? 💖';
    } else if (noBtnAttempts === 7) {
        noBtnText.textContent = 'Come on... 😢';
    } else if (noBtnAttempts === 10) {
        noBtnText.textContent = 'Just say yes! 💝';
    } else if (noBtnAttempts === 15) {
        noBtnText.textContent = 'Fine, I give up 😭';
        // Make the button tiny and hide it
        setTimeout(() => {
            noBtn.style.transform = 'scale(0)';
            noBtn.style.opacity = '0';
        }, 2000);
    }
    
    // Make Yes button bigger each time No is approached
    const currentScale = 1 + (noBtnAttempts * 0.08);
    yesBtn.style.transform = `scale(${Math.min(currentScale, 1.6)})`;
    yesBtn.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Also make No button move on click
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    // Add success effect to button
    yesBtn.style.transform = 'scale(1.2)';
    yesBtn.style.boxShadow = '0 20px 50px rgba(255, 77, 141, 0.6)';
    
    // Animate card out
    setTimeout(() => {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0';
        
        // Show success screen
        setTimeout(() => {
            cardContainer.style.opacity = '0';
            
            setTimeout(() => {
                cardContainer.classList.remove('active');
                successScreen.classList.add('active');
                createConfetti();
                createSuccessParticles();
            }, 300);
        }, 400);
    }, 200);
});

// Create confetti effect
function createConfetti() {
    const colors = ['#ff4d8d', '#ff8fb8', '#a855f7', '#fbbf24', '#ec4899'];
    const confettiCount = 80;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = (Math.random() * 8 + 4) + 'px';
            confetti.style.height = (Math.random() * 12 + 6) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.opacity = '1';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.zIndex = '10000';
            confetti.style.pointerEvents = 'none';
            confetti.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const duration = Math.random() * 2 + 2;
            const endX = Math.random() * 300 - 150;
            const rotations = Math.random() * 4 + 2;
            
            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 100}px) translateX(${endX}px) rotate(${rotations * 360}deg)`,
                    opacity: 0.8
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 15);
    }
}

// Create success particles around the celebration card
function createSuccessParticles() {
    const container = document.querySelector('.success-particles');
    if (!container) return;
    
    const colors = ['#ff4d8d', '#ff8fb8', '#a855f7', '#fbbf24'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.pointerEvents = 'none';
            
            container.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 30;
            const distance = Math.random() * 200 + 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
            });
            
            setTimeout(() => {
                particle.remove();
            }, 1500);
        }, i * 50);
    }
}

// Initialize
createParticles();

// Prevent layout shift
document.addEventListener('DOMContentLoaded', () => {
    buttonsContainer.style.position = 'relative';
});
