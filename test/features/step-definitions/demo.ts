import {When, Given, Then} from "@cucumber/cucumber";

Given(/^Google page is opened$/, async function () {
  browser.url('https://duckduckgo.com/');
});

When(/^Search with (.*)$/, async function (SearchItem) {
    const searchInput = await $('input[name="q"]');
    await searchInput.setValue(SearchItem);
    await browser.keys('Enter');
    await browser.pause(9000)
  });

Then(/^Click on the first search result$/, async function(){
  const firstResult =await $('<h3>');
  await firstResult.click();
});

Then(/^URL should match (.*)$/, async function (ExpectedURL) {
  let browserURL = await browser.getUrl();
  await expect(browserURL).toBe(ExpectedURL);
});

