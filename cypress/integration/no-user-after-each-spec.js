describe('Without user afterEach', () => {
  beforeEach(function openUrl () {
    cy.visit('test-page1.html')
  })

  // this test fails on purpose
  it('finds aliens 2', () => {
    cy.contains('a', 'videos')
      .wait(100)

    cy.url()
      .should('contain', 'test-page1.html')

    // this assertion fails
    cy.contains('Aliens')
      .should('be.visible')
  })
})
