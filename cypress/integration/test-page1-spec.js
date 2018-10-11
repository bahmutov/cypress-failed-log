describe('cypress failed log', () => {
  beforeEach(function openUrl () {
    cy.visit('test-page1.html')
  })

  afterEach(function makeDummyCommands () {
    // more dummy commands on purpose. Can we get
    // the right screenshot when the test actual failed?
    cy
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
    cy.log('fail on purpose, no such text')
    cy
      .wrap({ foo: 'bar' })
      .then(o => {
        console.log('there is an object')
      })
      .should('deep.equal', { foo: 'bar' })
    cy.contains('this text does not exist').should('be.visible')
  })
})
