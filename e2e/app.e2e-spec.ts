import { CoffeeTimePage } from './app.po';

describe('coffee-time App', () => {
  let page: CoffeeTimePage;

  beforeEach(() => {
    page = new CoffeeTimePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
