describe('Start localhost for testing and runs tests', function(){
    beforeEach(function (){
        cy.visit("http://localhost:3000/pizza");
    });
    it("checks box for toppings", function(){
        cy.get('#cheese_chkbox').click().should("have.value","on")
        cy.get('#olives_chkbox').click().should("have.value","on")
    });
    
    it("fills in text", function(){
        cy.get('[data-cy=name-input]').type("Nuggs Tumbler").should("have.value","Nuggs Tumbler")
        cy.get('[data-cy=size').select('Medium (3-4 people)').should("have.value", "medium")
        cy.get('#cheese_chkbox').click().should("have.value","on")
        cy.get('#olives_chkbox').click().should("have.value","on")
        cy.get('#special-text').type("Gimme dat ALLDENTE YEEHAW").should("have.value", "Gimme dat ALLDENTE YEEHAW")
        cy.get('#order-button').click()
    });
    
 
})