const loginURLLocal = 'http://localhost:3000/'
const loginURLWeb = 'https://chronology-tech.herokuapp.com/'


describe('Test Login links', () => {
    it('Using UI', () => {
        
        cy.visit(loginURLLocal)
        cy.location('pathname').should('equal', '/')

        cy.contains('Create Account').click()
        cy.url().should('include', '/signup')
        cy.go('back')

        cy.contains('Forgot Password?').click()
        cy.url().should('include', '/auth/password/forgot')
        cy.go('back')

    })
})

describe('Login to Chronology', () => {
    it('Using UI', () => {
        
        cy.visit(loginURLLocal)
        cy.location('pathname').should('equal', '/')

        cy.get('.form-control')
            .eq(0)
            .type('888888')
            .should('have.value', '888888')

        cy.get('.form-control')
            .eq(1)
            .type('123456')
            .should('have.value', '123456')

        cy.get('.btn-round').eq(0)
            .click()

      // confirm logged in successfully
      cy.location('pathname').should('equal', '/profile')
      cy.contains('j w')
      .should('be.visible')
      .then(() => {

      /* global window */
        const userString = window.localStorage.getItem('user')
  
        expect(userString).to.be.a('string')
        const user = JSON.parse(userString)
  
        expect(user).to.be.an('object')
        
        console.log(user)
        
        
        expect(user).to.have.keys([
            "_id",
            "role",
            "employeeId",
            "workEmail",
            "firstName",
            "lastName",
            "workPhone",
            "workAddress",
            "personalEmail",
            "personalPhone",
            "personalAddress",
            "company",
            "section",
            "jobTitle",
            "authLevel",
            "superiorEmployeeId",
            "dob"
        ])
  
        expect(user._id).to.be.a('string')
        expect(user.role).to.be.a('string')
        expect(user.employeeId).to.be.a('string')
        expect(user.workEmail).to.be.a('string')
        expect(user.firstName).to.be.a('string')
        expect(user.workPhone).to.be.a('number')
        expect(user.workAddress).to.be.a('string')
        expect(user.personalEmail).to.be.a('string')
        expect(user.personalPhone).to.be.a('number')
        expect(user.personalAddress).to.be.a('string')
        expect(user.company).to.be.a('string')
        expect(user.section).to.be.a('string')
        expect(user.jobTitle).to.be.a('string')
        expect(user.authLevel).to.be.a('string')
        expect(user.superiorEmployeeId).to.be.a('string')
        expect(user.dob).to.be.a('string')
      })
    })
  })



describe('Test Menu', () => {
    it('Using UI', () => {

        cy.visit(loginURLLocal)
        cy.location('pathname').should('equal', '/')

        cy.get('.form-control')
            .eq(0)
            .type('888888')
            .should('have.value', '888888')

        cy.get('.form-control')
            .eq(1)
            .type('123456')
            .should('have.value', '123456')

        cy.get('.btn-round').eq(0)
            .click()
        
        cy.contains('TimeSheet').click()
        cy.location('pathname').should('equal', '/user/timesheet')

        cy.contains('CHART').click()
        cy.location('pathname').should('equal', '/user/chart')

        cy.contains('Profile').click()
        cy.location('pathname').should('equal', '/profile')

    })
})


describe('Test Timesheet', () => {
    it('Using UI', () => {

        cy.visit(loginURLLocal)
        
        cy.location('pathname')
            .should('equal', '/')

        cy.get('.form-control')
            .eq(0)
            .type('888888')
            .should('have.value', '888888')

        cy.get('.form-control')
            .eq(1)
            .type('123456')
            .should('have.value', '123456')

        cy.get('.btn-round')
            .eq(0)
            .click()
        
        cy.contains('TimeSheet')
            .click()
        
        cy.location('pathname')
            .should('equal', '/user/timesheet')

        cy.get('.font-weight-bolder')
            .eq(0)
            .select('flexible')
        
        cy.get('.btn-round')
            .eq(1)
            .click()

        cy.get('#inputState')
            .select('02-off')

        cy.get('.close')
            .click()

        cy.get('.font-weight-bolder')
            .eq(1)
            .should('have.value', '02-off')

        cy.get('.btn-round')
            .eq(2)
            .click()

        cy.get('#inputState')
            .select('01-management')

        cy.get('.close')
            .click()

        cy.get('.font-weight-bolder')
            .eq(2)
            .should('have.value', '01-management')

        cy.get('.btn-round')
            .eq(3)
            .click()

        cy.get('#inputState')
            .select('01-general')

        cy.get('.close')
            .click()

        cy.get('.font-weight-bolder')
            .eq(3)
            .should('have.value', '01-general')

        cy.get('.font-weight-bolder')
            .eq(4)
            .should('have.value', '02.01.01')
        
        cy.get('.font-weight-bolder')
            .eq(5)
            .should('have.value', 'off-management-general')

        cy.get('.font-weight-bolder')
            .eq(6)
            .select('8')

        cy.get('.font-weight-bolder')
            .eq(7)
            .select('2.0')

    
        for (let i=0; i<7; i++) {

            cy.get('.now-ui-icons')
                .eq(9)
                .click()

            cy.get('.card')
                .eq(13-i)
                .should('not.exist');

        }


        for (let i=1; i<8; i++) {

            cy.get('.btn-link')
                .eq(i)
                .click()
                
            cy.get('.card')
                .eq(i-1)
                .should('exist');
           

        }

        cy.get('.btn-link')
            .eq(0)
            .contains('56')

        for (let i=0; i<14; i=i+2) {

            cy.get('.pull-right')
                .eq(i)
                .contains('8')

        }

        for (let i=0; i<7; i++) {

            cy.get('.now-ui-icons')
                .eq(9)
                .click()

            cy.get('.card')
                .eq(13-i)
                .should('not.exist');

        }

        for (let i=1; i<8; i++) {

            cy.get('.btn-link')
                .eq(i)
                .click()

            cy.get('.card')
                .eq(i-1)
                .should('exist');

        }

        cy.get('.btn-round')
            .eq(0)
            .click()


        cy.get('.Toastify__toast-body')
            .contains('Timesheet Successful Saved')

    })
})