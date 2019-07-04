import { Given } from 'cucumber'
import  HomePage  from '../page-objects/home.page'
import expect from 'expect'

Given(/^The user loads the Beep web app homepage$/, { wrapperOptions: { retry: 2 } }, () => {
    HomePage.open()
    expect(HomePage.logo.getAttribute('src')).toStrictEqual('https://beep.modus.app/img/Beep-Logo.e5d20974.svg')
})
