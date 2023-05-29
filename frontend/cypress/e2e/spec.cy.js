describe('User can login and create entries E2E', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('username')
    cy.get('#password').type('password')
    cy.get('#login-button').click()
  })
  
  it('correctly logs in user', function() {
    cy.contains('Cooldown')
    cy.contains('Login')
  })
  
  it('creates, edits, and deletes a journal', function() {
    cy.get('#menu-button').click()
    cy.get('[data-cy="input-journal-name"]').type('New Test Journal')
    cy.get('[data-cy="add-journal-button"]').click()
    cy.contains('Your journal is empty')

    cy.get('[data-cy="journals-div"]').within(function() {
      // click back and forth to make sure page doesn't change between loads
      cy.get('div:first').click()
      cy.get('div:last').within(function() {
        cy.get('button').click()
      })
    })

    cy.contains('Edit').click()
    cy.focused().clear().type('New Test Journal v2')
  

    cy.get('[data-cy="journals-div"]').within(function() {
      cy.get('div:first').click()
      cy.get('div:last').within(function() {
        cy.get('button').click()
      })
    })
    cy.contains('Delete').click()
    
  })

  it('creates, edits, and deletes an entry', function() {
    cy.get('#create-entry-button').click()
    cy.get('[data-cy="input-entry-title"]').type('New Test Entry')
    cy.get('[data-cy="input-entry-date"]').type('2023-05-22T09:20')
    
    cy.get('[data-cy="input-entry-media"]').type('mario')
    cy.get('[data-cy="media-dropdown"]').within(function() {
      cy.get('div:first').click()
    })
    
    cy.get('[data-cy="input-entry-text"]').type('I played mario this morning and it was very enjoyable.')
    
    cy.get('[data-cy="input-entry-tag"]').type('mario')
    cy.get('[data-cy="add-tag-button"]').click()
    cy.get('[data-cy="tags-div"]').contains('mario')
    
    cy.get('[data-cy="input-entry-tag"]').type('nintendo')
    cy.get('[data-cy="add-tag-button"]').click()
    cy.get('[data-cy="tags-div"]').contains('nintendo')
    
    cy.get('[data-cy="save-entry-button"]').click()

    // correctly renders entry
    cy.contains('New Test Entry')
    cy.contains('nintendo')
    cy.contains('mario')




    // edit entry
    cy.get('[data-cy="entries-div"]').within(function() {
      cy.get('div:first').within(function() {
        cy.get('button:first').click()

      })
    })

    cy.contains('Edit').click()
    cy.get('[data-cy="input-entry-title"]').clear().type('New Test Entry v2')
    cy.get('[data-cy="input-entry-date"]').type('2023-05-22T10:20')
    cy.get('[data-cy="input-entry-media"]').clear().type('zelda')
    cy.get('[data-cy="media-dropdown"]').within(function() {
      cy.get('div:first').click()
    })
    cy.get('[data-cy="input-entry-text"]').type(' I swapped to Zelda and had more fun though.')
    cy.get('[data-cy="tags-div"]').within(function() {
      cy.get('button:last').click()
      
    })
    
    cy.get('[data-cy="input-entry-tag"]').type('zelda')
    cy.get('[data-cy="add-tag-button"]').click()
    cy.get('[data-cy="tags-div"]').contains('zelda')
    cy.get('[data-cy="save-entry-button"]').click()


    // delete entry
    cy.get('[data-cy="entries-div"]').within(function() {
      cy.get('div:first').within(function() {
        cy.get('button:first').click()

      })
    })
    cy.contains('Delete').click()
  })

  it('correctly logs out user', function() {
    cy.get('#menu-button').click()
    cy.get('#user-settings-button').click()
    cy.get('#logout-button').click()
    cy.contains('Login')
  })

})
