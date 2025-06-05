import { When } from "@wdio/cucumber-framework";
import nopcommerceHomePage from "../../pageObjects/nopcommerce.home.page.ts";
import reporter from "../../helper/reporter.ts";
import { applyStealth } from "../../helper/stealth.ts";

When(/^An as (.*) user login to nopcommerce site$/, async function(user){
    if(!user) throw Error(`User is not valid: ${user}`)
        try{
        reporter.addStep(this.testid,'info','Logging to nopCommerce')
        await nopcommerceHomePage.loginToNoCommerceWeb(
          this.testid,
          process.env.NOPCOMMERCE_EMAIL,
          process.env.NOPCOMMERCE_PASSWORD,
          browser.options.nopeCommerceBaseURL
        );
        await applyStealth();
    }catch(err){
        err.message = `${this.testid}: failed to login. ${err.message}`;
        throw err;
    }
}); 

