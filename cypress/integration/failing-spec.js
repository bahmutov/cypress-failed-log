describe('cypress failed log', () => {
  beforeEach(function openUrl () {
    cy.visit('/')
  })

  afterEach(function makeDummyCommands () {
    // more dummy commands on purpose. Can we get
    // the right screenshot when the test actual failed?
    cy.wait(100)
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
    cy.log('fail on purpose, no such text')
    cy.contains('this text does not exist')
      .should('be.visible')
  })
})
