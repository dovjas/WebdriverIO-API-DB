import Page from "./page.ts";
import reporter from "../helper/reporter.ts";

class HomePage extends Page {
  constructor() {
    super();
  }

  // Page objects
  get usernameInput() {
    return $('#user-name');
  }
  get passwotdInput() {
    return $('#password');
  }
  get loginBtn() {
    return $('#login-button');
  }

  // Page functions
  async enterUsername(testid: string, username: string) {
    if (!username) throw Error(`Incorrect username: ${username}`);
    try {
      username = username.trim();
      await this.typeInto(this.usernameInput, username);
      reporter.addStep(
        testid,
        'info',
        `Username: ${username} entered successfully'`
      );
    } catch (err) {
      err.message = `Error entering username: ${username}, ${err.message}`;
      throw err;
    }
  }

  async enterPassword(testid: string, password: string) {
    if (!password) throw Error(`Incorrect username: ${password}`);
    try {
        password = password.trim();
      await this.typeInto(await this.passwotdInput, password);
      reporter.addStep(
        testid,
        'info',
        `Password: entered successfully'`
      );
    } catch (err) {
      err.message = `Error entering password: ${password}, ${err.message}`;
      throw err;
    }
  }

  async clickLoginBtn(testid: string){
    try{
        await this.click(await this.loginBtn);
        reporter.addStep(testid,'info','Login button clicked')
    }catch(err){
        err.message = `Error clicking login button: ${err.message}`;
        throw err;
    };
  };

  async loginToSauceApp(testid:string, username:string, password:string){
    try{
        await this.enterUsername(testid, username);
        await this.enterPassword(testid, password);
        await this.clickLoginBtn(testid);
    }catch(err){
        throw err;
    };
  };
}

export default new HomePage();