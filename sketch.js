let input;
let slider;
let button;
let dropdown;
let iframe;
let yOffsets = [];

function setup() {
  // 這是一個設定函數，只會執行一次
  createCanvas(windowWidth, windowHeight);  // 設定畫布為視窗大小
  background('#ffe1a8');  // 設定背景顏色

  // 創建一個輸入文字框，並設置其位置和大小
  input = createInput('教育科技學系');
  input.position(10, 10);
  input.size(300, 80);

  // 創建一個滑桿，並設置其位置和大小
  slider = createSlider(12, 40, 24);  // 最小值12，最大值40，初始值24
  slider.position(460, 25);
  slider.size(200);

  // 創建一個按鈕，並設置其位置和文字
  button = createButton('跳動');
  button.position(680, 10);
  button.size(100, 50);
  button.style('font-size', '24px');
  button.style('background-color', '#274c77');
  button.mousePressed(toggleJump);

  // 創建一個下拉式選單，並設置其位置和選項
  dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(100);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(updateIframe);

  // 創建一個 iframe，並設置其位置和大小
  iframe = createElement('iframe');
  iframe.position(10, 100);
  iframe.size(windowWidth - 20, windowHeight - 120);
  iframe.attribute('src', 'https://www.tku.edu.tw/');

  // 初始化 yOffsets 陣列
  for (let i = 0; i < height / 20; i++) {
    yOffsets.push(random(-5, 5));
  }
}

function updateIframe() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  }
}

let jumping = false;

function toggleJump() {
  jumping = !jumping;
}

function draw() {
  // 這是一個繪圖函數，會一直執行
  background('#ffe1a8');  // 每次都重設背景，避免畫面堆疊

  fill(0);  // 設定文字顏色為黑色
  let textSizeValue = slider.value();  // 根據滑桿位置設置字體大小
  textSize(textSizeValue);

  let textContent = input.value();  // 獲取輸入框中的文字內容
  let x = 0;
  let y = 100;
  let lineIndex = 0;
  
  while (y < height) {  // 在不同位置繪製相同的文字
    x = 0;
    while (x < width) {
      let yOffset = jumping ? yOffsets[lineIndex] : 0;
      text(textContent, x, y + yOffset);
      x += textWidth(textContent) + 10;  // 根據文字的寬度來設置間隔
    }
    y += textSizeValue + 20;  // 根據文字的高度來設置間隔
    lineIndex++;
  }

  // 更新 yOffsets 陣列
  if (jumping) {
    for (let i = 0; i < yOffsets.length; i++) {
      yOffsets[i] = random(-5, 5);
    }
  }

  // 繪製矩形（這部分被註解掉了）
  fill('#ff8c00');
  // rect(50, 100, 300, 50);
}

function windowResized() {
  // 當視窗大小改變時，調用此函數
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 120);
}