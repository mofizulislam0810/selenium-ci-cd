const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function googleSearchTest() {
  // Set up the WebDriver for Chrome
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  //check the browser version
  try {
    // Open Google homepage
    await driver.get("https://www.google.com");

    // Find the search input field using the name attribute and type a query
    let searchBox = await driver.findElement(By.name("q"));
    await searchBox.sendKeys("Selenium WebDriver", Key.RETURN);

    // Wait for the results page to load and the title to contain the query
    await driver.wait(until.titleContains("Selenium WebDriver"), 5000);

    // Get the title of the page and check if the test passed
    let title = await driver.getTitle();
    console.log(`Page title: ${title}`);

    if (title.includes("Selenium WebDriver")) {
      console.log("Test Passed: The page title contains the search query!");
    } else {
      console.log(
        "Test Failed: The page title does not contain the search query."
      );
    }
  } finally {
    // Close the browser
    await driver.quit();
  }
}

// Run the test
googleSearchTest();
