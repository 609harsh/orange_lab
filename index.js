const puppeteer = require("puppeteer");

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

// Function to launch Puppeteer
async function launchPuppeteer() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });
  return { browser, page, navigationPromise };
}

// Function to close Puppeteer
async function closePuppeteer(browser) {
  await browser.close();
}

// Function to go to a specified URL
async function gotoPage(page, url) {
  await page.goto(url);
}

// Function to set the screen size
async function setViewport(page, width, height) {
  await page.setViewport({ width, height });
}

// Function to type text into an input field
async function typeInput(page, selector, text) {
  await page.type(selector, text);
}

// Function to press a key
async function pressKey(page, key) {
  await page.keyboard.press(key);
}

async function pressKeyDown(page, key) {
  await page.keyboard.down(key);
}

async function pressKeyUp(page, key) {
  await page.keyboard.up(key);
}

// Function to click on an element
async function clickElement(page, selector) {
  await page.click(selector);
}

// Function to get a list of elements
async function getElements(page, selector) {
  return await page.$$(selector);
}

// Function to wait for a delay
async function waitForDelay(milliseconds) {
  await delay(milliseconds);
}

// Function to wait for page navigation to complete
async function waitForNavigation(page, navigationPromise) {
  await navigationPromise;
}

// Main function to execute the script
async function executeScript() {
  //Browser Launch
  const { browser, page, navigationPromise } = await launchPuppeteer();

  //Enter url
  await gotoPage(page, "https://swap.defillama.com/");
  await setViewport(page, 1080, 1024);

  //Select Chain
  await typeInput(page, ".css-ern9ru > input", "Arbitrum One");
  await pressKey(page, "Enter");

  //Enter Amount to be Sold
  await clickElement(page, ".css-lv0ed5");
  await pressKeyDown(page, "Control");
  await pressKey(page, "KeyA");
  await pressKeyUp(page, "Control");
  await pressKey(page, "Backspace");
  await typeInput(page, ".css-79elbk > input", "12");

  //Select selling Token
  const val = await getElements(page, ".css-qjhap");
  await clickElement(val[0]);

  await typeInput(page, ".css-s1d1f4", "wbtc");
  await pressKey(page, "Enter");
  await waitForDelay(2000);

  await waitForNavigation();

  //Select Buying Token
  await clickElement(page, ".css-72rvq0");

  await clickElement(val[1]);

  //Enter Token
  await typeInput(page, ".css-s1d1f4", "usdc");
  await pressKey(page, "Enter");
  await waitForDelay(2000);
  await waitForNavigation();

  await clickElement(page, ".css-72rvq0");
  await waitForDelay(5000);

  //Selecct Route to perform swap
  const options = await getElements(page, ".sc-18d0abec-0.knYyMy.RouteWrapper");
  await clickElement(options[1]);
  //To Close browser
  // await closePuppeteer(browser);
}

executeScript();
