$(function() {
   
    $.mobile.pushStateEnabled = true;
    var template = Handlebars.compile($('#contact-template').html());
   
    $.get('https://solstice.applauncher.com/external/contacts.json', function (response) {
        var contactList = $('#contactList');
        _.each(response, function(contact) {
            var contactElement =  $(template({
                name: contact.name
                , phone: contact.phone.home
                , imagePath:  contact.smallImageURL
                , detailsURL: contact.detailsURL
            }));
            contactList.append(contactElement);
   
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
        contactList.listview("refresh");
    });
});