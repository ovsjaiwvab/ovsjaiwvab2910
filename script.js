const fruits = [
  { name: "Rocket", rarity: "Common", rate: 13, image: "assets/fruits/rocket.png" },
  { name: "Spin", rarity: "Common", rate: 13, image: "assets/fruits/spin.png" },
  { name: "Chop", rarity: "Common", rate: 15, image: "assets/fruits/chop.png" },
  { name: "Spring", rarity: "Common", rate: 15, image: "assets/fruits/spring.png" },
  { name: "Bomb", rarity: "Common", rate: 14, image: "assets/fruits/bomb.png" },
  { name: "Smoke", rarity: "Common", rate: 13, image: "assets/fruits/smoke.png" },
  { name: "Spike", rarity: "Common", rate: 15, image: "assets/fruits/spike.png" },
  { name: "Flame", rarity: "Uncommon", rate: 12, image: "assets/fruits/flame.png" },
  { name: "Falcon", rarity: "Uncommon", rate: 15, image: "assets/fruits/falcon.png" },
  { name: "Ice", rarity: "Uncommon", rate: 14, image: "assets/fruits/ice.png" },
  { name: "Sand", rarity: "Uncommon", rate: 7, image: "assets/fruits/sand.png" },
  { name: "Dark", rarity: "Uncommon", rate: 8.5, image: "assets/fruits/dark.png" },
  { name: "Diamond", rarity: "Uncommon", rate: 8, image: "assets/fruits/diamond.png" },
  { name: "Light", rarity: "Rare", rate: 11, image: "assets/fruits/light.png" },
  { name: "Rubber", rarity: "Rare", rate: 7.1, image: "assets/fruits/rubber.png" },
  { name: "Barrier", rarity: "Rare", rate: 7.8, image: "assets/fruits/barrier.png" },
  { name: "Ghost", rarity: "Rare", rate: 7.9, image: "assets/fruits/ghost.png" },
  { name: "Magma", rarity: "Rare", rate: 7.3, image: "assets/fruits/magma.png" },
  { name: "Quake", rarity: "Legendary", rate: 6.4, image: "assets/fruits/quake.png" },
  { name: "Buddha", rarity: "Legendary", rate: 6.6, image: "assets/fruits/buddha.png" },
  { name: "Love", rarity: "Legendary", rate: 7.7, image: "assets/fruits/love.png" },
  { name: "Spider", rarity: "Legendary", rate: 5.7, image: "assets/fruits/spider.png" },
  { name: "Sound", rarity: "Legendary", rate: 5.1, image: "assets/fruits/sound.png" },
  { name: "Phoenix", rarity: "Legendary", rate: 3.5, image: "assets/fruits/phoenix.png" },
  { name: "Portal", rarity: "Legendary", rate: 6.8, image: "assets/fruits/portal.png" },
  { name: "Rumble", rarity: "Legendary", rate: 2.3, image: "assets/fruits/rumble.png" },
  { name: "Pani", rarity: "Legendary", rate: 2.8, image: "assets/fruits/pani.png" },
  { name: "Blizzard", rarity: "Legendary", rate: 1.3, image: "assets/fruits/blizzard.png" },
  { name: "Gravity", rarity: "Mythical", rate: 1.5, image: "assets/fruits/gravity.png" },
  { name: "Mammoth", rarity: "Mythical", rate: 1.2, image: "assets/fruits/mammoth.png" },
  { name: "T-rex", rarity: "Mythical", rate: 1.4, image: "assets/fruits/t-rex.png" },
  { name: "Dough", rarity: "Mythical", rate: 1.3, image: "assets/fruits/dough.png" },
  { name: "Shadow", rarity: "Mythical", rate: 1.1, image: "assets/fruits/shadow.png" },
  { name: "Venom", rarity: "Mythical", rate: 1, image: "assets/fruits/venom.png" },
  { name: "Content", rarity: "Mythical", rate: 1.8, image: "assets/fruits/content.png" },
  { name: "Gas", rarity: "Mythical", rate: 0.9, image: "assets/fruits/gas.png" },
  { name: "Spirit", rarity: "Mythical", rate: 0.8, image: "assets/fruits/spirit.png" },
  { name: "Dragon", rarity: "Mythical", rate: 0.7, image: "assets/fruits/dragon.png" },
  { name: "Leopard", rarity: "Mythical", rate: 0.3, image: "assets/fruits/leopard.png" },
  { name: "Yeti", rarity: "Mythical", rate: 0.3, image: "assets/fruits/yeti.png" },
  { name: "Kitsune", rarity: "Mythical", rate: 0.1, image: "assets/fruits/kitsune.png" },
  { name: "Dragon T", rarity: "Mythical", rate: 0.05, image: "assets/fruits/dragon-t.png" },
  { name: "Dragon D", rarity: "Mythical", rate: 0.05, image: "assets/fruits/dragon-d.png" },
];

let inventory = [];
const totalRate = 264.3; // Tổng tỉ lệ
let isDragging = false;
let offsetX, offsetY;
let cooldown = false; // Trạng thái chờ mở box

function openBox() {
  if (cooldown) {
    alert("im");
    return;
  }

  cooldown = true; // Kích hoạt cooldown
  const randomBox = document.getElementById("randomBox");

  // Lắc box trước khi hiển thị Fruit
  randomBox.classList.add("shake");

  setTimeout(() => {
    randomBox.classList.remove("shake");

    const fruit = getRandomFruit();

    // Hiển thị ảnh, tên và cấp độ của Fruit
    document.getElementById("fruitImage").src = fruit.image;
    document.getElementById("fruitName").innerText = `${fruit.name} (${fruit.rarity})`;

    document.getElementById("randomBox").style.display = "none";
    document.getElementById("randomResult").style.display = "block";

    // Lưu thông tin Fruit để lưu trữ hoặc thả
    document.getElementById("randomResult").dataset.fruit = JSON.stringify(fruit);

    // Hiệu ứng phát sáng khi box trong cooldown
    randomBox.classList.add("glow");

    // Hết cooldown sau 5 giây
    setTimeout(() => {
      cooldown = false; // Reset cooldown
      randomBox.classList.remove("glow"); // Tắt phát sáng
      document.getElementById("randomBox").style.display = "flex"; // Hiển thị lại box
    }, 5000); // Thời gian hồi 5 giây
  }, 500); // Thời gian lắc
}

function getRandomFruit() {
  const random = Math.random() * totalRate; // Random từ 0 đến tổng tỉ lệ
  let cumulativeRate = 0;

  for (const fruit of fruits) {
    cumulativeRate += fruit.rate;
    if (random <= cumulativeRate) {
      return fruit;
    }
  }
  return fruits[0]; // Fallback (không nên xảy ra)
}

function storeFruit() {
  const fruit = JSON.parse(document.getElementById("randomResult").dataset.fruit);

  // Kiểm tra xem Fruit đã có trong balo chưa
  const existingFruit = inventory.find((item) => item.name === fruit.name);
  if (existingFruit) {
    existingFruit.quantity++;
  } else {
    inventory.push({ ...fruit, quantity: 1 });
  }

  updateInventory();
  resetUI();
}

function dropFruit() {
  resetUI();
}

function updateInventory() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = "";

  inventory.forEach((fruit) => {
    const item = document.createElement("div");
    item.className = "inventory-item";
    item.innerHTML = `
      <img src="${fruit.image}" alt="${fruit.name}">
      <span>x${fruit.quantity}</span>
    `;
    inventoryDiv.appendChild(item);
  });
}

function resetUI() {
  document.getElementById("randomBox").style.display = "flex";
  document.getElementById("randomResult").style.display = "none";
}

// Drag and drop logic for both PC and Mobile
const balo = document.getElementById("balo");

balo.addEventListener("mousedown", startDrag);
balo.addEventListener("touchstart", startDrag);

function startDrag(event) {
  isDragging = true;

  const clientX = event.type === "mousedown" ? event.clientX : event.touches[0].clientX;
  const clientY = event.type === "mousedown" ? event.clientY : event.touches[0].clientY;

  offsetX = clientX - balo.offsetLeft;
  offsetY = clientY - balo.offsetTop;
}

document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag);

function drag(event) {
  if (!isDragging) return;

  const clientX = event.type === "mousemove" ? event.clientX : event.touches[0].clientX;
  const clientY = event.type === "mousemove" ? event.clientY : event.touches[0].clientY;

  balo.style.left = `${clientX - offsetX}px`;
  balo.style.top = `${clientY - offsetY}px`;
}

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

function stopDrag() {
  isDragging = false;
}