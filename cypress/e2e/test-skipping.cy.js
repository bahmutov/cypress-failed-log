describe('cypress skipped tests', () => {
  it.skip('Skipping using it.skip', () => {})

  it('Skipping using this.skip()', function() {
    this.skip();
  })

  it('Skipping using this.skip() again', function() {
    this.skip();
  })
})
