module.exports.routes = {

    'post /contact/createContact': {
      controller: 'ContactController',
      action: 'createContact'
    },
    'get /contact/getAllContacts': {
      controller: 'ContactController',
      action: 'getAllContacts'
    },
    'get /contact/:contactId/showContactDetails': {
      controller: 'ContactController',
      action: 'showContactDetails'
    },
    'post /contact/:contactId/deleteContact': {
      controller: 'ContactController',
      action: 'deleteContact'
    },
};
