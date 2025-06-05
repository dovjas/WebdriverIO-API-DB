import Page from "./page.ts";
import reporter from "../helper/reporter.ts";

class HomePage extends Page{
    constructor(){
        super()
    }

    // Page objects
    get emailInput(){
        return $('#Email'); 
    };
    get passwordInput(){
        return $('#Password');
    };
    get loginBtn(){
        return $('.login-button');
    };
    // Page actions
    async loginToNoCommerceWeb(testid:string,username:string,password:string,url:string){
        if(!url || !username || !password) throw Error(`Given data: ${url} or ${username} or ${password} is not valid`)
        try{
            reporter.addStep(testid,'info', `Logging to: ${url}, using username: ${username}, password:${password}`);
            await this.navigateTo(url);
            await this.typeInto(await this.emailInput,username);
            await this.typeInto(await this.passwordInput,password);
            await this.click(await this.loginBtn);
            reporter.addStep(testid,'info',`Login to ${url} with username: ${username} is successfull`);
        }catch(err){
            err.message = `Failed to login: ${url} using username: ${username}, error: ${err.message}`;
            throw err;
        };
    };
};


export default new HomePage;