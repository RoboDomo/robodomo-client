import { Given } from 'cucumber'
import  Page  from '../page-objects/page'

Given(/^User loads the RoboDomo web app$/, { wrapperOptions: { retry: 2 } }, () => {
    new Page('','/').open();
});
