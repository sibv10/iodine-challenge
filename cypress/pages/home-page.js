import Page from './page'
import links from '../fixtures/links.json'

class HomePage extends Page {

    /**
     * Clicks sub menu link
     * @param {string} item About | Careers | Support _etc_
     */
    clickSubNavigation(item) {
        // @note forces link to open in same tab
        cy.get(`[href*="${item.toLowerCase()}"]`)
            .invoke('removeAttr', 'target')
        cy.contains(item).click({ force: true })
    }

    navigate () {
        cy.visit(links.home)
    }

}

module.exports = new HomePage()
