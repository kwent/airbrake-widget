// This file was generated by Dashcode from Apple Inc.
// DO NOT EDIT - This file is maintained automatically by Dashcode.
function setupParts() {
    if (setupParts.called) return;
    setupParts.called = true;
    CreateInfoButton('info', { foregroundStyle: 'black', frontID: 'front', onclick: 'showBack', backgroundStyle: 'black' });
    CreateGlassButton('done', { onclick: 'saveProject', text: 'Done' });
    CreateText('hoptoad-back', { text: 'hoptoadapp.com' });
    CreateText('text2', { text: 'API Key:' });
    CreateText('text1', { text: 'Subdomain:' });
    CreateText('inform', { text: 'Inform your account info' });
    CreateText('author', { text: 'Created by Nando Vieira' });
    CreateText('unable', { text: 'Unable to retrieve exceptions' });
}
window.addEventListener('load', setupParts, false);
