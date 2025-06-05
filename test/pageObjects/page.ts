export default class Page{
    constructor(){

    };
    //Reusable functions
    async navigateTo(path:string){
        await browser.url(path);
    };

    async click(el:WebdriverIO.Element){
        await el.waitForClickable({timeout:5000});
        if (!el.elementId){
            throw Error(el.error.message);
        };
        await el.click();
    };

    async typeInto(el:WebdriverIO.Element, text:string){
        await el.waitForEnabled({timeout:5});
        if(!el.elementId){
            throw Error(el.error.message);
        };
        await el.setValue(text);
    }
};