const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray = [];
const colors = ["rgba(255,182,193,0.4)", "rgba(173,216,230,0.4)", "rgba(221,160,221,0.4)"];
const colorsSummerSet = ["rgba(124, 252, 203, 0.4)", "rgba(80, 247, 239, 0.4)", "rgba(197, 255, 173, 0.40)", "rgba(255, 255, 190, 0.4)"];

let mouse = {
    x: null,
    y: null,
    radius: 80
};

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 6 + 2;
        const currentPage = window.location.pathname.split('/').pop().toLowerCase();
        if(currentPage == "goswim.html"){
            this.color = colorsSummerSet[Math.floor(Math.random() * colorsSummerSet.length)];
        }else{
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius + this.radius) {
                const angle = Math.atan2(dy, dx);
                const pushBack = 2;
                this.x -= Math.cos(angle) * pushBack;
                this.y -= Math.sin(angle) * pushBack;
            }
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        this.draw();
    }
}

function initParticles(count) {
    particlesArray = [];
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    requestAnimationFrame(animate);
}

initParticles(80);
animate();
