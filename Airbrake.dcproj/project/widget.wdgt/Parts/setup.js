// This file was generated by Dashcode from Apple Inc.
// DO NOT EDIT - This file is maintained automatically by Dashcode.
function setupParts() {
    if (setupParts.called) return;
    setupParts.called = true;
    CreateInfoButton('info', { foregroundStyle: 'black', frontID: 'front', onclick: 'showBack', backgroundStyle: 'black' });
    CreateGlassButton('done', { onclick: 'saveProject', text: 'Done' });
    CreateText('airbrake-front', { text: 'airbrake.io' });
    CreateText('airbrake-back', { text: 'airbrake.io' });
    CreateText('text2', { text: 'API Key' });
    CreateText('text1', { text: 'Subdomain' });
    CreateText('inform', { text: 'Inform your account info' });
    CreateText('author', { text: 'Modified by Quentin Rousseau' });
    CreateText('author1', { text: 'Created by Nando Vieira' });
    CreateText('unable', { text: 'Unable to retrieve exceptions' });
    CreateText('no-exceptions', { text: 'Congrats!\nNo exceptions found!' });
    CreateText('reload', { text: 'reload' });
}