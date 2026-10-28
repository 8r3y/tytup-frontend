describe('Main layout', function () {
  before((browser) => {
    browser.init()
  })

  it('renders navigation on the root url', function () {
    browser
      .waitForElementVisible('.top-nav-bar__wrapper')
      .assert.textContains('.navbar-navigator', 'inwave')
      .assert.elementPresent('.left-nav-bar__wrapper a[href="/recomendations"]')
  })

  it('shows not found page for unknown url', function () {
    browser
      .navigateTo('/no-such-page')
      .assert.textContains('h1', 'Ничего тут нет')
  })

  after((browser) => browser.end())
})
