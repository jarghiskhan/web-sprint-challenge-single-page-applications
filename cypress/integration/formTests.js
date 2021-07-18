describe('Start localhost for testing and runs tests', function(){
    beforeEach(function (){
        cy.visit("http://localhost:3000/");
    });
    it("checks box for toppings", function(){
        cy.get('#cheese_chkbox').click().should("have.value","cheese")
        cy.get('#olives_chkbox').click().should("have.value","olives")
    });
    
    it("fills in text", function(){
        cy.get('[data-cy=name-input]').type("Nuggs Tumbler").should("have.value","Nuggs Tumbler")
        cy.get('#size').select('Medium (3-4 people)').should("have.value", "medium")
        cy.get('#bbq').click().should("have.value","bbq")
        cy.get('#cheese_chkbox').click().should("have.value","cheese")
        cy.get('#olives_chkbox').click().should("have.value","olives")
        cy.get('#special-text').type("Gimme dat ALLDENTE YEEHAW").should("have.value", "Gimme dat ALLDENTE YEEHAW")
        cy.get('#order-button').click()
    });
    
 
})