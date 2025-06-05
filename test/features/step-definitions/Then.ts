import { Then } from '@wdio/cucumber-framework';
import logger from '../../helper/logger.ts';
import reporter from '../../helper/reporter.ts';
import fs from'fs'
import nopcommerceCustlistPage from '../../pageObjects/nopcommerce.custlist.page.ts';
import { applyStealth } from '../../helper/stealth.ts';

Then(
  /^Inventory page should list (\d+) products$/,
  async function (noOfProducts: string) {
    try {
      logger.info(`Logger has started, test id: ${this.appid}`);

      const expectedCount = parseInt(noOfProducts);
      if (isNaN(expectedCount)) {
        throw new Error(`Invalid product count: "${noOfProducts}"`);
      }

      const productElements = await $$('[data-test="inventory-item-name"]');
      const actualCount = productElements.length;

      try {
        expect(actualCount).toEqual(expectedCount); // both are numbers now
      } catch (err) {
        reporter.addStep(this.testid, 'error', 'Product count mismatch');
        logger.error(
          `Known bug: product count mismatch. Expected: ${expectedCount}, Actual: ${actualCount}`
        );
        throw err; // ensure test fails if mismatch happens
      }
    } catch (err: any) {
      logger.error(`Unexpected error in product count check: ${err.message}`);
      throw err; // properly throw for test framework
    }
  }
);

Then(/^Validate all products have valid price:price>0$/, async function () {
  logger.info(`Logger is counting price, test id:${this.appid}`);
  let arrEl = await $$('[data-test="inventory-item-price"]');
  let priceStrArr = [];
  for (let product of arrEl) {
    priceStrArr.push(await product.getText());
  }
  let priceNumArr = priceStrArr.map((el) => parseInt(el.replace('$', '')));
  console.log('>>> PRICE >>>', priceNumArr);
  let invalidPrice = priceNumArr.filter((el) => el <= 0);
  await expect(invalidPrice.length).toEqual(0);
});

Then(/^Verify if all users exist in customers list$/, async function () {
  try{
    await browser.url(
      `${browser.options.nopeCommerceBaseURL}/Admin/Customer/List`
    );
    await applyStealth();
    
    reporter.addStep(this.testid, 'info', 'Navigated to customers list...');
    let filename = `${process.cwd()}/data/resApiUsers.json`;
    let data = fs.readFileSync(filename, 'utf8');
    let dataObj = JSON.parse(data);
    let arr =[];

    for(let i = 0; i< dataObj.data.length;i++){
      let obj ={}
      let firstname = dataObj.data[i].first_name;
      let lastname = dataObj.data[i].last_name;
      let customerNotfound = await nopcommerceCustlistPage.searchNameAndConfirm(this.testid,firstname,lastname);
      if(customerNotfound){
        obj["firstname"]=firstname;
        obj["lastname"]=lastname;
        arr.push(obj);
      };

      if(arr.length > 0){
        let data = JSON.stringify(arr,undefined,4);
        let filepath = `${process.cwd()}/results/customerNotFound.json`;
        fs.writeFileSync(filepath,data);
      }
    }
  }catch(err){
    err.message = `${this.testid}: Failed at finding users. ${err.message}`;
    throw err; 
  }
});