describe('root suite', () => {
  context('first context', () => {
    it('has first test (passing)', () => {
      cy.wrap('foo').should('be.equal', 'foo')
    })

    it('has second test (failing)', () => {
      cy.wrap(42).should('be.equal', 2)
    })

    it('has third test (failing)', () => {
      cy.wrap('foo').should('be.equal', 'bar')
    })
  })
})
