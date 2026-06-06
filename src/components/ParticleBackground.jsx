import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    // Number of stars scaled by resolution and screen type
    const isMobile = width < 768;
    const particleCount = Math.min(isMobile ? 40 : 120, Math.floor((width * height) / (isMobile ? 25000 : 14000)));

    class Star {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -10;
        this.depth = Math.random(); // 0 (far, small) to 1 (near, large)
        this.size = this.depth * 1.5 + 0.3;
        this.baseSpeedY = this.depth * 0.08 + 0.02; // move down slowly
        this.speedX = Math.random() * 0.04 - 0.02;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
        this.grow = Math.random() > 0.5;

        // Interactive displacement offsets
        this.dx = 0;
        this.dy = 0;
      }

      update() {
        // Star movement
        this.y += this.baseSpeedY + this.dy;
        this.x += this.speedX + this.dx;

        // Decay the interactive displacement offsets slowly (friction)
        this.dx *= 0.95;
        this.dy *= 0.95;

        // Repel from mouse
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const radius = mouseRef.current.radius;
        if (mx > 0 && my > 0) {
          const distX = this.x - mx;
          const distY = this.y - my;
          const distance = Math.hypot(distX, distY);
          
          if (distance < radius) {
            // Stronger push for closer stars, scaled by depth (closer stars push more)
            const force = (radius - distance) / radius;
            const push = force * 1.5 * (this.depth * 0.6 + 0.4);
            this.dx += (distX / distance) * push;
            this.dy += (distY / distance) * push;
          }
        }

        // Wrap bottom & sides boundaries
        if (this.y > height + 10) {
          this.reset(false);
        }
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;

        // Pulse stars
        if (this.grow) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= 0.7) this.grow = false;
        } else {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0.1) this.grow = true;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Deep purple hue glow for near stars (disable shadow calculations on mobile to optimize performance)
        const isMobileScreen = width < 768;
        if (this.depth > 0.8 && !isMobileScreen) {
          ctx.fillStyle = `rgba(192, 132, 252, ${this.alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#7C3AED';
        } else if (this.depth > 0.8) {
          ctx.fillStyle = `rgba(192, 132, 252, ${this.alpha})`;
          ctx.shadowBlur = 0;
        } else if (this.depth > 0.5) {
          ctx.fillStyle = `rgba(254, 240, 138, ${this.alpha})`;
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(229, 231, 235, ${this.alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
    }

    // Initialize stars
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Star());
    }

    // Draw ambient background lighting/nebula once in canvas background
    const drawNebulae = (time) => {
      // Color wave 1
      const cx1 = width * 0.2 + Math.sin(time * 0.0003) * 100;
      const cy1 = height * 0.3 + Math.cos(time * 0.0002) * 100;
      const g1 = ctx.createRadialGradient(cx1, cy1, 10, cx1, cy1, width * 0.45);
      g1.addColorStop(0, 'rgba(124, 58, 237, 0.045)');
      g1.addColorStop(1, 'rgba(5, 8, 22, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Color wave 2
      const cx2 = width * 0.8 + Math.cos(time * 0.0004) * 150;
      const cy2 = height * 0.7 + Math.sin(time * 0.0001) * 150;
      const g2 = ctx.createRadialGradient(cx2, cy2, 10, cx2, cy2, width * 0.4);
      g2.addColorStop(0, 'rgba(250, 204, 21, 0.015)');
      g2.addColorStop(1, 'rgba(5, 8, 22, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
    };

    let startTime = Date.now();
    let isTabActive = true;

    const animate = () => {
      if (!isTabActive) return;
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, width, height);

      // Draw ambient galactic lighting
      const elapsed = Date.now() - startTime;
      drawNebulae(elapsed);

      // Update and draw stars
      particles.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isTabActive = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isTabActive = true;
        animate();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
