import { useEffect, useRef } from "react";

class Particle {
  constructor(canvas, colors) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedx = (Math.random() - 0.5) * 0.5;
    this.speedy = (Math.random() - 0.5) * 0.5;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.shadowBlur = 11;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    this.x += this.speedx;
    this.y += this.speedy;

    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;

    this.draw(ctx);
  }
}

const ParticalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const colors = ["rgba(255,255,255,0.7)"];
    const particleCount = 100;
    let particles = [];

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, colors));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationID;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update(ctx));
      animationID = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationID);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    ></canvas>
  );
};

export default ParticalBackground;
