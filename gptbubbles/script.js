const container = document.getElementById("container");
const bubbles = [];
const numBubbles = 1;
const bubbleSize = 200;

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.width = `${bubbleSize}px`;
  bubble.style.height = `${bubbleSize}px`;
  bubble.style.backgroundColor = getRandomColor();
  bubble.style.position = "absolute";
  bubble.style.left = Math.random() * (window.innerWidth - bubbleSize) + "px";
  bubble.style.top = Math.random() * (window.innerHeight - bubbleSize) + "px";
  bubble.dx = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1); // random x speed
  bubble.dy = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1); // random y speed

  container.appendChild(bubble);
  bubbles.push(bubble);
}
let i = 0;
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(++i);

  return color;
}

function animate() {
  bubbles.forEach((bubble) => {
    const rect = bubble.getBoundingClientRect();
    // Move bubble
    bubble.style.left = rect.left + bubble.dx + "px";
    bubble.style.top = rect.top + bubble.dy + "px";

    //Check for wall collisions
    if (rect.right >= window.innerWidth) {
      bubble.dx = -Math.abs(bubble.dx); // Reflect x direction
      bubble.style.backgroundColor = getRandomColor(); // Change color
    } else if (rect.left <= 0) {
      bubble.dx = Math.abs(bubble.dx); // Reflect x direction
      bubble.style.backgroundColor = getRandomColor(); // Change color
    }

    if (rect.bottom >= window.innerHeight) {
      bubble.dy = -Math.abs(bubble.dy); // Reflect y direction
      bubble.style.backgroundColor = getRandomColor(); // Change color
    } else if (rect.top <= 0) {
      bubble.dy = Math.abs(bubble.dy); // Reflect y direction
      bubble.style.backgroundColor = getRandomColor(); // Change color
    }
  });
  requestAnimationFrame(animate);
}

// Create bubbles
for (let i = 0; i < numBubbles; i++) {
  createBubble();
}

// Start animation
animate();
