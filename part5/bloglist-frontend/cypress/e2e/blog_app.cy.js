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
      it('Blog can be deleted by the user who added it', function() {
        cy.contains('Cypress Blog Cypress Author').find('button').as('viewCypressButton')
        cy.get('@viewCypressButton').click()

        cy.get('#remove-button').click()
        cy.get('html').should('not.contain', 'Cypress Blog Cypress Author')

      })
      it('Only user who added the blog can see remove-button', function() {
        cy.request('POST', 'http://localhost:3003/api/users',
          { username: 'sussu', password:'salainen'
          })
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'sussu', password: 'salainen'
        }).then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
        cy.contains('Cypress Blog Cypress Author').find('button').as('viewCypressButton')
        cy.get('@viewCypressButton').click()

        cy.contains('#remove-button').should('not.exist')
      })
      it('Blogs shown in the order of likes', function() {
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title:'Cypress Blog 2',
            author: 'Cypress Author 2',
            url:'www.cypress2.com'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        })
        cy.visit('http://localhost:3000')
        cy.contains('Cypress Blog 2')

        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title:'Cypress Blog 3',
            author: 'Cypress Author 3',
            url:'www.cypress3.com'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
          }
        })
        cy.visit('http://localhost:3000')
        cy.contains('Cypress Blog 3')

        cy.contains('Cypress Blog 3 Cypress Author 3').find('button').as('viewCypressButton')
        cy.get('@viewCypressButton').click()

        cy.get('#like-button').click()

        cy.contains('1')

        cy.visit('http://localhost:3000')

        cy.contains('Cypress Blog 3 Cypress Author 3').find('button').as('viewCypressButton')
        cy.get('@viewCypressButton').click()

        cy.get('#like-button').click()
        cy.contains('2')

        cy.get('.blog').get('#hideOrView-button').click()

        cy.contains('Cypress Blog 2 Cypress Author 2').find('button').as('viewCypressButton')
        cy.get('@viewCypressButton').click()

        cy.get('#like-button').click()

        cy.contains('1')
        cy.get('.blog').get('#hideOrView-button').click()
        cy.visit('http://localhost:3000')

        cy.get('.blog').eq(0).should('contain', 'Cypress Blog 3 Cypress Author 3')
        cy.get('.blog').eq(1).should('contain', 'Cypress Blog 2 Cypress Author 2')
        cy.get('.blog').eq(2).should('contain', 'Cypress Blog Cypress Author')

        cy.get('.blog').eq(2).should('not.contain', 'Cypress Blog 3 Cypress Author 3')

      })
    })
  })
})