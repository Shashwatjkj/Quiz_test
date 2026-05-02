function homeController(req, res) {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>I Love You Akriti ❤️</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      body {
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #ff758c, #ff7eb3);
        font-family: 'Segoe UI', sans-serif;
        overflow: hidden;
      }

      .container {
        text-align: center;
        color: white;
        animation: fadeIn 2s ease-in-out;
      }

      h1 {
        font-size: 60px;
        margin: 0;
        letter-spacing: 2px;
        text-shadow: 0 0 20px rgba(255,255,255,0.8);
        animation: glow 2s infinite alternate;
      }

      p {
        font-size: 22px;
        margin-top: 15px;
        opacity: 0.9;
      }

      @keyframes glow {
        from {
          text-shadow: 0 0 10px #fff, 0 0 20px #ff4da6;
        }
        to {
          text-shadow: 0 0 20px #fff, 0 0 40px #ff1a75;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .heart {
        position: absolute;
        color: white;
        font-size: 20px;
        animation: floatUp 5s linear infinite;
      }

      @keyframes floatUp {
        from {
          transform: translateY(100vh);
          opacity: 1;
        }
        to {
          transform: translateY(-10vh);
          opacity: 0;
        }
      }
    </style>
  </head>

  <body>

    <div class="container">
      <h1>I Love You Akriti ❤️</h1>
      <p>You make my world brighter ✨</p>
    </div>

    <script>
      function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 10 + "px";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 5000);
      }

      setInterval(createHeart, 300);
    </script>

  </body>
  </html>
  `);
}

export {
  homeController
};