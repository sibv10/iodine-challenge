
import HomePage from '../pages/home-page'
import CareersPage from '../pages/careers-page'
import links from '../fixtures/links.json'

describe('Desktop: Home Page - Apply for a position @E2E', () => {

    it('displays errors when clicking Submit if required fields empty', () => {
        HomePage.navigate()
        HomePage.clickSubNavigation('Careers')
        
        CareersPage.checkURL(links.careers)
        CareersPage.elems.sdetRoleLnk().click()
        CareersPage.waitIframe()

        CareersPage.elems.applyBtn().click()
        CareersPage.waitIframe()

        CareersPage.elems.workAuthYesBtn().click()
        CareersPage.elems.sponsorshipNoBtn().click()
        CareersPage.elems.permissionsContinueBtn().click()
        CareersPage.waitIframe()

        CareersPage.skipOptionalSurvey()

        CareersPage.elems.submitBtn().click()
        CareersPage.displaysInputErrors()
    })
    
})
