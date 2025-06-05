import reporter from "../helper/reporter.ts";
import Page from "./page.ts";

class CustomersList extends Page{
    constructor(){
        super()
    };

    //Page objects
    get firstNameInput(){return $('#SearchFirstName')};
    get lastNameInput(){ return $('#SearchLastName')};
    get searchBtn(){return $('#search-customers')};
    get noResultsMsg(){return $('.dt-empty');}
    
    //Page actions
    async searchNameAndConfirm(testid:string, firstName:string,lastName:string){
        if(!firstName || !lastName) throw Error(`Firstname: ${firstName} or Lastname: ${lastName} is not valid`)
        let nameNotExist = false;
        reporter.addStep(testid,'info',`Searching user: ${firstName} and ${lastName}`);
        await browser.pause(80000);
        try{
            
            await this.typeInto(await this.firstNameInput, firstName);
            await this.typeInto(await this.lastNameInput, lastName);
            await this.click(await this.searchBtn);
            let isNotDisplayed = await this.noResultsMsg.isDisplayed();
            if(isNotDisplayed) nameNotExist = true;
        }catch(err){
            err.message = `Failed searching: ${firstName} and ${lastName}, ${err.message}`;
            throw err;
        }
        return nameNotExist;
    };
};

export default new CustomersList();