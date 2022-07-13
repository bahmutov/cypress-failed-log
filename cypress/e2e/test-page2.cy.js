describe('cypress failed log', () => {
  beforeEach(function openUrl () {
    cy.visit('test-page2.html')
  })

  // this test fails on purpose
  it('finds xhr', () => {
    cy.server();
    cy.route('GET', '/test-page3.json', ['mock data'])
    cy.get('#triggerXHR').click()
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
