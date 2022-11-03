import Page from './page'
import links from '../fixtures/links.json'
import testUser from '../fixtures/testUser.json'

class CareersPage extends Page {

    elems = {
        sdetRoleLnk : () => this._getIframe().contains('a', 'SDET'),
        
        // SDET Role Subpage
        applyBtn : () => this._getIframe().contains('.gnewtonApplyBtn', 'Apply for this Position'),

        // Authorization Subpage
        workAuthYesBtn : () => this._getIframe()
            .contains('.gnewtonQuestion', 'authorized to work')
            .siblings().contains('Yes'),
        sponsorshipNoBtn : () => this._getIframe()
            .contains('.gnewtonQuestion', 'require sponsorship')
            .siblings().contains('No'),
        permissionsContinueBtn : () => this._getIframe().contains('#saveBtn', 'Continue'),

        // Survey Subpages (Intro, Gender/race, Veteran, Disability)
        continueBtn : () => this._getIframe().contains('#gnewton-submit', 'Continue'),

        // Submit info Subpage
        submitBtn : () => this._getIframe().contains('#submitText', 'Submit'),
        firstNameInput : () => this._getIframe().find('#firstName'),
        preferredNameInput : () => this._getIframe().find('#preferredName'),
        lastNameInput : () => this._getIframe().find('#lastName'),
        invalidInput : () => cy.get('input:invalid')
    }

    _getIframe () {
        return cy.iframe('#gnewtonIframe')
    }

    skipOptionalSurvey () {
        const PAGE_COUNT = 4;

        for (let i = 1; i <= PAGE_COUNT; i++) {
            this.elems.continueBtn().click()
            this.waitIframe()    
        }
    }

    displaysInputErrors () {
        const DEFAULT_ERR_COUNT = 20;

        this._verifyErrCount(DEFAULT_ERR_COUNT)

        this.elems.firstNameInput()
            .should('have.class', 'gnewtonRequired')
            .type(testUser.firstName)
        this.elems.submitBtn().click()
        this._verifyErrCount(DEFAULT_ERR_COUNT - 1)

        this.elems.preferredNameInput()
            .should('not.have.class', 'gnewtonRequired')
            .type(testUser.preferredName)
        this.elems.submitBtn().click()
        this._verifyErrCount(DEFAULT_ERR_COUNT - 1)

        this.elems.lastNameInput()
            .should('have.class', 'gnewtonRequired')
            .type(testUser.lastName)
        this.elems.submitBtn().click()
        this._verifyErrCount(DEFAULT_ERR_COUNT - 2)
    }

    /** Counts number of HTML invalid inputs */
    _verifyErrCount (count) {
        this._getIframe().within(() => {
            this.elems.invalidInput().should('have.length', count)
        })
    }

    navigate () {
        cy.visit(links.careers)
    }

}

module.exports = new CareersPage()
