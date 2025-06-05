import { Given } from "@wdio/cucumber-framework";
import reporter from "../../helper/reporter.ts";
import sauceHomePage from "../../pageObjects/sauce.home.page.ts";
import constants from "../../../data/constants.json";
import apiHelper from "../../helper/apiHelper.ts";
import fs from "fs";

Given(/^As (a|an) (.*) user I login to inventory web app$/, async function(prefixTxt,userType,dataTable){
  try{
    reporter.addStep(this.testid,'info','Started to login to inventory web app');
    let dt =dataTable.hashes();
    //@ts-ignore
    await sauceHomePage.navigateTo(browser.options.sauceDemoURL);
    await sauceHomePage.loginToSauceApp(
      this.testid,
      process.env.TEST_USERNAME,
      process.env.TEST_PASSWORD
    );
  }catch(err){
    err.message = `${this.testid}: Failed at login step, ${err.message}`;
    throw err;
  };
});

// Get list of user from reqres api
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  if (!endpointRef) throw Error(`Endpoint is not valid: ${endpointRef}`);
  console.log('ENDPOINTREF >>>', endpointRef);
  try {
    reporter.addStep(
      this.testid,
      'info',
      `Getting the payload data for endpoint: ${endpointRef}`
    );

    let endpoint = '';
    if (endpointRef.trim().toUpperCase() === 'USERS') {
      endpoint = constants.REQRES.GET_USERS;
      console.log('Endpoint is: ', endpoint);
    }
    if (!endpoint)
      throw Error(`Error getting endpoint from constants.json: ${endpoint}`);

    let res;
    await browser.call(async ()=>{
      // @ts-ignore
      res = await apiHelper.GET(
        this.testid,
        browser.options.reqresBaseURL,
        endpoint,
        '',
        constants.REQRES.QUERY_PARAM
      );
    });
    if (res.status !== 200) {
      console.log(
        // @ts-ignore
        `Failed to receive users from ${browser.options.reqresBaseURL} and ${endpoint}`
      );
      reporter.addStep(
        this.testid,
        'debug',
        `API response received, data: ${JSON.stringify(res.body)}  `
      );
    }

    let data = JSON.stringify(res.body);
    let filename = `${process.cwd()}/data/resApiUsers.json`;
    fs.writeFileSync(filename, data);
    reporter.addStep(
      this.testid,
      'info',
      `API response from ${endpoint} saved in json`
    );
  } catch (err) {
    err.message = `${this.testid} : Failed getting api users from reqres ${err.message}`;
    throw err;
  }
});