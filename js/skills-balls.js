(function () {
  var SKILLS = [
    "Java",
    "JavaScript",
    "Python",
    "HTML/CSS",
    "Next.js",
    "Node.js",
    "Spring Boot",
    "Spring",
    "React.js",
    "Git",
    "MongoDB",
    "PostgreSQL"
  ];

  function initBallpit() {
    var canvas = document.getElementById("skills-ballpit");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = 0;
    var height = 0;
    var pointer = { x: -9999, y: -9999, active: false };

    var balls = SKILLS.map(function (skill, idx) {
      var radius = 34 + (skill.length > 8 ? 8 : 0);
      return {
        label: skill,
        r: radius,
        x: 60 + (idx % 4) * 180,
        y: 70 + Math.floor(idx / 4) * 115,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        color: idx % 2 === 0 ? "rgba(214,52,71,0.22)" : "rgba(255,255,255,0.12)",
        stroke: idx % 2 === 0 ? "rgba(214,52,71,0.9)" : "rgba(255,255,255,0.35)"
      };
    });

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawBackground() {
      var grd = ctx.createLinearGradient(0, 0, width, height);
      grd.addColorStop(0, "rgba(255,255,255,0.02)");
      grd.addColorStop(1, "rgba(255,255,255,0.00)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    }

    function collide(b1, b2) {
      var dx = b2.x - b1.x;
      var dy = b2.y - b1.y;
      var dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
      var minDist = b1.r + b2.r + 6;
      if (dist >= minDist) return;

      var overlap = (minDist - dist) * 0.5;
      var nx = dx / dist;
      var ny = dy / dist;

      b1.x -= nx * overlap;
      b1.y -= ny * overlap;
      b2.x += nx * overlap;
      b2.y += ny * overlap;

      var kx = b1.vx - b2.vx;
      var ky = b1.vy - b2.vy;
      var p = 2 * (nx * kx + ny * ky) / 2;

      b1.vx -= p * nx;
      b1.vy -= p * ny;
      b2.vx += p * nx;
      b2.vy += p * ny;
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawBackground();

      for (var i = 0; i < balls.length; i++) {
        var b = balls[i];

        if (pointer.active) {
          var pdx = b.x - pointer.x;
          var pdy = b.y - pointer.y;
          var pd = Math.sqrt(pdx * pdx + pdy * pdy) || 0.0001;
          if (pd < 120) {
            var push = (120 - pd) / 120;
            b.vx += (pdx / pd) * push * 0.22;
            b.vy += (pdy / pd) * push * 0.22;
          }
        }

        b.vx *= 0.992;
        b.vy *= 0.992;

        b.x += b.vx;
        b.y += b.vy;

        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx *= -0.9;
        } else if (b.x + b.r > width) {
          b.x = width - b.r;
          b.vx *= -0.9;
        }

        if (b.y - b.r < 0) {
          b.y = b.r;
          b.vy *= -0.9;
        } else if (b.y + b.r > height) {
          b.y = height - b.r;
          b.vy *= -0.9;
        }
      }

      for (var i2 = 0; i2 < balls.length; i2++) {
        for (var j = i2 + 1; j < balls.length; j++) {
          collide(balls[i2], balls[j]);
        }
      }

      for (var i3 = 0; i3 < balls.length; i3++) {
        var s = balls[i3];

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = s.stroke;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "600 12px Arimo, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, s.x, s.y);
      }

      requestAnimationFrame(animate);
    }

    function pointerMove(ev) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = ev.clientX - rect.left;
      pointer.y = ev.clientY - rect.top;
      pointer.active = true;
    }

    function pointerLeave() {
      pointer.active = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", pointerMove);
    canvas.addEventListener("mouseleave", pointerLeave);
    canvas.addEventListener("touchmove", function (ev) {
      if (!ev.touches || !ev.touches[0]) return;
      var rect = canvas.getBoundingClientRect();
      pointer.x = ev.touches[0].clientX - rect.left;
      pointer.y = ev.touches[0].clientY - rect.top;
      pointer.active = true;
      ev.preventDefault();
    }, { passive: false });
    canvas.addEventListener("touchend", pointerLeave);

    animate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBallpit);
  } else {
    initBallpit();
  }
})();
