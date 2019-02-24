/**
 * Look for more infos about puppeteer's apis in here:
 *   https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */
const puppeteer = require("puppeteer");

const placeOrder = async orderInfos => {
  const RUN_FAST_WITH_INVISIBLE_MODE = false;

  // ----- Initialize browser
  const browser = await puppeteer.launch({
    headless: RUN_FAST_WITH_INVISIBLE_MODE
  });

  // ----- Open lazada.vn page in new tab
  const lazadaMainPage = await browser.newPage();
  await lazadaMainPage.goto("https://lazada.vn");

  const loginButtonSelector =
    '#anonLogin a[href="//member.lazada.vn/user/login"]';

  // ----- Demo getting value in an html element
  const textInsideLoginButton = await lazadaMainPage.$eval(
    loginButtonSelector,
    el => {
      console.log("textInsideLoginButton: This will run in chromium, not node");
      console.log("textInsideLoginButton: Log text in chromium:", el.innerHTML);
      return el.innerHTML; // this value will be returned to node code and get assigned to textInsideLoginButton
    }
  );
  console.log("textInsideLoginButton: Log inside Node:", textInsideLoginButton);

  // ----- Process login
  await lazadaMainPage.click(loginButtonSelector); // this one doesn't work
  console.log("Performed click");

  // TODO: Check out the solution below later:
  //   https://github.com/GoogleChrome/puppeteer/issues/3670
  // >>>>>>>>>>>>>
  // Alright another update. After changing navigation lines to:

  // ```
  //  async function nativeClick(page, button) {
  //    await page.evaluate((button) => {
  //      document.querySelector(button).click();
  //    }, button);
  //  }
  // ```
  // and using it instead of built-in click method surprisingly the code works 100% and never stops at navigation. Otherwise when there's a conflict between click redirect & navigation there are ALWAYS problems.
  // >>>>>>>>>>>>>

  // ----- Close page
  await lazadaMainPage.close();

  // ----- Close browser
  await browser.close();
};

module.exports = placeOrder;
