
var Contact = Backbone.Model.extend({});

var Contacts = Backbone.Collection.extend({
    url: 'https://solstice.applauncher.com/external/contacts.json',
    model: Contact
});


var contactList = new Contacts();
var response =  contactList.fetch();



$(function() {
    $.mobile.pushStateEnabled = true;
    var template = Handlebars.compile($('#contact-template').html());
    var contactListEl = $('#contactList');

    response.then(function () {
        contactList.each(function(contact) {
            var contactElement =  $(template({
                name: contact.attributes.name
                , phone: contact.attributes.phone.home
                , imagePath:  contact.attributes.smallImageURL
                , detailsURL: contact.attributes.detailsURL
            }));

            contactListEl.append(contactElement);

            contactElement.on('click', function() {
                var element = $(this);
                var url = element.find('input').val();
                $.get(url, function (response) {
                    event.preventDefault();
                    var fullContact = $.extend({},contact,response);
                    var template = Handlebars.compile($('#full-contact-template').html());
                    $('#bar')
                            .html('')
                            .append(template(fullContact));
                    $.mobile.navigate('#bar');
                });
            });
        });
        contactListEl.listview("refresh");
    });
});