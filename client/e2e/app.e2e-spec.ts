import { NgTimePage } from './app.po';

describe('ng-time App', () => {
  let page: NgTimePage;

  beforeEach(() => {
    page = new NgTimePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
