import { useEffect, useRef } from "react";

class OrbitalNode {
  constructor(canvas) {
    this.canvas = canvas;
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * Math.min(canvas.width, canvas.height) * 0.45;
    this.speed = Math.random() * 0.0006 + 0.0003;
    this.size = Math.random() * 2 + 1;
  }

  update(ctx) {
    const x = this.centerX + Math.cos(this.angle) * this.radius;
    const y = this.centerY + Math.sin(this.angle) * this.radius;

    ctx.beginPath();
    ctx.fillStyle = "rgba(180, 200, 255, 0.7)";
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(120, 160, 255, 0.6)";
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();

    this.angle += this.speed;
  }
}

const ParticalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const PARTICLE_COUNT = 90;

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new OrbitalNode(canvas));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update(ctx));
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticalBackground;
