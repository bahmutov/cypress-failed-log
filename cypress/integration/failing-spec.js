describe('cypress failed log', () => {
  const url = 'https://glebbahmutov.com'

  beforeEach(() => {
    cy.visit(url)
  })

  afterEach(() => {
    // more dummy commands on purpose. Can we get
    // the right screenshot when the test actuall failed?
    cy.visit(url)
      .wait(100)
      .wait(100)
      .wait(100)
      .wait(100)
      .wait(100)
      .wait(100)
      .wait(100)
      .wait(100)
  })

  // this test fails on purpose
  it('finds aliens', () => {
    cy.contains('a', 'videos')
      .click()
      .wait(100)

    cy.url()
      .should('contain', 'videos')

    cy.contains('Aliens')
      .should('be.visible')
  })
})
