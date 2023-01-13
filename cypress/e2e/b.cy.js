describe('support for overriding the "retries" config option', () => {
    
    /**
     * This spec should be called with cy.run({
     *  ...
     *  config : {
     *      retries: 1   
     *  }
     * })
     * This is testing that "retries" config can be overriden by individual tests. 
     * The plugin should only write to file if the last attempt fails.
     * This can prevent misleading logs when retries fail for different reasons.
     */

    let attempt = 0
    it('overrides the "retries" setting', { retries: 2 }, () => {
        attempt++
        const values = {
            1: 'foo',
            2: 'foo',
            3: 'FOO'
        }
        cy.wrap(values[attempt]).should('be.equal', 'bar')
    })
})
  