describe('cypress failed log', () => {
  beforeEach(() => {
    cy.visit('https://glebbahmutov.com')
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
