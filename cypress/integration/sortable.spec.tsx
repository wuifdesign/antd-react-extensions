describe('Sortable', () => {
  it('should sort elements', () => {
    cy.visit('http://localhost:6006/iframe.html?id=components-sortable--base&args=&viewMode=story')
    cy.get('.sortable-handle').eq(0).trigger('mousedown').trigger('mousemove', { clientY: 50 }).trigger('mouseup')
    cy.get('.sortable-item').eq(1).contains('Name 1')
  })
})

export {}
