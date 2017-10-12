/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		createContact: createContactAction,
		getAllContacts: getAllContactsAction,
		showContactDetails: showContactDetailsAction,
		deleteContact: deleteContactAction
};

function createContactAction(req, res) {
		var contactDetails = req.params.all();
		console.log("contactDetails:: " + JSON.stringify(contactDetails));
		Contact
				.createContact(contactDetails)
				.then(function (response) {
						console.log("Contact::createContactAction " + response.name);
						return res.json(response);
				})
				.catch(function (err) {
						console.log("Contact::createContactAction::Error " + err.message);
						return res.json(err);
				});
}

function getAllContactsAction(req, res) {
	Contact
		.getAllContacts()
		.then(function (contacts) {
			console.log("All Contacts:: " + contacts);
				return res.json(contacts);
		})
		.catch(function (err) {
			console.log("getAllContacts::errors " + err);
			return res.json(err);
		});
}

function showContactDetailsAction(req, res) {
	var contactId = req.param("contactId");
	Contact
		.showContactDetails(contactId)
		.then(function (contact) {
			console.log("Contact:: " + JSON.stringify(contact));
				return res.json(contact);
		})
		.catch(function (err) {
			console.log("Contact::errors " + err);
			return res.json(err);
		});
}

function deleteContactAction(req, res) {
	var contactId = req.param("contactId");
	Contact
		.deleteContact(contactId)
		.then(function () {
				var response = {
					message: "Contact deleted successfully"
				};
				return res.json(response);
		})
		.catch(function (err) {
			console.log("Contact::errors " + err);
			return res.json(err);
		});
}
