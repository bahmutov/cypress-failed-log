describe('root suite', () => {
  context('first context', () => {
    it('has first test (passing)', () => {
      cy.wrap('foo').should('be.equal', 'foo')
      cy.wait(700)
    })

    it('retries (passing)', { defaultCommandTimeout: 3000 }, () => {
      const person = {}
      cy.wrap(person).its('name').should('equal', 'Mo')
      setTimeout(() => {
        person.name = 'Mo'
      }, 2000)
    })

    it('has second test (failing)', () => {
      cy.wrap({ foo: 42 }).its('foo').should('be.equal', 2)
    })

    it('has third test (failing)', () => {
      cy.wrap('foo').should('be.equal', 'bar')
    })
  })
})
