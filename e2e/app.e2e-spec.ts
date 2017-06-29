import { FaceBlogPage } from './app.po';

describe('face-blog App', function() {
  let page: FaceBlogPage;

  beforeEach(() => {
    page = new FaceBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
