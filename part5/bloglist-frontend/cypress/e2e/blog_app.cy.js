describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',
      { username: 'mluukkai', password:'salainen'
      })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukkai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'mluukkai logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Cypress Blog')
      cy.get('#author-input').type('Cypress Author')
      cy.get('#url-input').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('Cypress Blog Cypress Author').parent().find('button')
        .should('contain', 'view')
    })

    describe('and a blog exists', function(){
      beforeEach(function() {
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title:'Cypress Blog',
            author: 'Cypress Author',
            url:'www.cypress.com'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        })
        cy.visit('http://localhost:3000')
      })
      it('A like can be added to a blog', function() {
        cy.contains('Cypress Blog Cypress Author').find('button').as('viewCypressButton')
        cy.get('@viewCypressButton').click()

        cy.get('#like-button').click()

        cy.contains('1')
      })
    })


  })
})