import { AngulardirectivesPage } from './app.po';

describe('angulardirectives App', function() {
  let page: AngulardirectivesPage;

  beforeEach(() => {
    page = new AngulardirectivesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
