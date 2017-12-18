describe('suiviCandidature: add form', function () {
    it('should add a todo', function () {
        browser.get('http://localhost/suiviCandidature/#!');

        element(by.css('#addButton')).click();

        element(by.model('sheetCtrl.addApplication.email')).sendKeys('write first protractor test');
        browser.sleep('1000');
        element(by.model('sheetCtrl.addApplication.nom')).click();
        browser.sleep('300');
        element(by.model('sheetCtrl.addApplication.email')).click();
        element(by.model('sheetCtrl.addApplication.email')).clear();

        element(by.model('sheetCtrl.addApplication.email')).sendKeys('1234567890');
        browser.sleep('1000');
        element(by.model('sheetCtrl.addApplication.nom')).click();
        browser.sleep('300');
        element(by.model('sheetCtrl.addApplication.email')).click();
        element(by.model('sheetCtrl.addApplication.email')).clear();

        element(by.model('sheetCtrl.addApplication.email')).sendKeys('aaa@ooo.com');
        browser.sleep('1000');
    });
});