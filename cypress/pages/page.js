class Page {

    /**
     * Checks URL includes specified string
     * @param {string} path
     */
    checkURL (path) {
        cy.url().should('include', path)
    }

    /** waits for Iframe to register a click */
    waitIframe () {
        cy.wait(800)
    }

}

export default Page
