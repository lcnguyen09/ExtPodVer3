const MAIN_KEY = `pod_item_tool`
const TOKEN_KEY = `${MAIN_KEY}_token`
const HUB_DEFAULT = `${MAIN_KEY}_hub`
const HUB_KEY = `${MAIN_KEY}_hubs`
const TEMPLATE_ITEM = `${MAIN_KEY}_template_item`
const extensionInit = async () => {
    console.log("Extension loaded");
    jQuery.expr[':'].regex = function (elem, index, match) {
        var matchParams = match[3].split(','),
            validLabels = /^(data|css):/,
            attr = {
                method: matchParams[0].match(validLabels) ?
                    matchParams[0].split(':')[0] : 'attr',
                property: matchParams.shift().replace(validLabels, '')
            },
            regexFlags = 'ig',
            regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g, ''), regexFlags);
        return regex.test(jQuery(elem)[attr.method](attr.property));
    }
    // init here
    extTool.injectScript().getToken().then(ext => {
        if (!ext.token) {
            return ext.renderLogin();
        }
        return ext.getRule().then(ext => ext.getHubs()).then(ext => ext.render())
    })
    // logic here
}
$(document).ready(function () {
    extensionInit();
});