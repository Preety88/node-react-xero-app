let mongoose = require('mongoose');
let ShowPiece = require('./models/ShowPiece.js');
let Contact = require('./models/Contact.js');
let Invoice = require('./models/Invoice.js');
var User = require('./models/User.js');

mongoose.connection.db.dropDatabase();

var initial = [{
  url: 'http://www.insurancetrak.com/sites/default/files/sites/default/files/images/ArtDealer2.jpg',
  title: 'Rain',
  artist: 'jill111',
  likes: 20,
  pending: false,
  contributor: 'Ari',
  medium: 'Oil on Canvas',

}, {
  url: 'http://feminspire.com/wp-content/uploads/2013/05/modern-art.jpg',
  title: 'RainAutumn',
  artist: 'pashminu',
  likes: 40,
  pending: false,
  contributor: 'eric',
  medium: 'Acrylic',
}, {
  url: 'http://s9.favim.com/orig/130906/art-artistic-baw-black-and-white-Favim.com-901159.jpg',
  title: 'Reflection',
  artist: 'fancycrave1',
  likes: 900,
  pending: false,
  contributor: 'trek',
}, {
  url: 'http://www.commercialfineart.com/images/i.jpg',
  title: 'Fall',
  artist: 'Hans',
  likes: 89,
  pending: false,
  contributor: 'doctor',
}, {
  url: 'http://funguerilla.com/wp-content/uploads/2010/06/leonid-afremov202.jpg',
  title: 'Lina',
  artist: 'fancycravel',
  likes: 3,
  pending: false,
  contributor: 'Cookie',
}, {
  url: 'http://public.media.smithsonianmag.com/legacy_blog/lascaux-cave-painting.jpg',
  title: 'Primal',
  artist: 'BkrmadtyaKarki',
  pending: false,
  contributor: "Ann",
}, ];

initial.forEach(function(piece) {
  new ShowPiece(piece).save();
});

var user = {
  email: 'roman.mandryk@gmail.com',
  password: '123456',
  provider: 'local'
};
new User(user).save((error) => {error && console.log(error)});

var initialContacts = [{
  name: 'John',
  companyName: '',
  email: 'john@test.com',
  surname: 'Snow',
  phone: '02456789',
  address: '13 The Wall'
}, {
  name: 'Arya',
  companyName: '',
  email: 'arya@test.com',
  surname: 'Stark',
  phone: '02456789',
  address: '21 Stairs street, Braavos'
}, {
  name: 'Walker',
  companyName: 'White Walkers',
  email: 'walker@test.com',
  surname: 'White',
  phone: '02456789',
  address: '55 Beyond the Wall'
}, {
  name: 'Daenerys',
  companyName: '',
  email: 'daenerys@test.com',
  surname: 'Targaryen',
  phone: '02456789',
  address: '78 Dragon Ave, Meereen'
}
];

var contactsResult = Promise.all(initialContacts.map(function(value) {
  return new Promise((resolve) => {
    new Contact(value).save((error, data) => {
      resolve(data);
    });
  });
}));

var initialInvoices = [{
  name: 'Invoice 101',
  dueDate: Date(),
  paidDate: Date(),
  items: [{
    name: 'Nuts and bolts',
    price: 55,
    quantity: 1,
    unitPrice: 55,
    tax: 5.5
  }, {
    name: 'Labour',
    price: 200,
    quantity: 2,
    unitPrice: 100,
    tax: 20
  }]
}, {
  name: 'Invoice 102',
  dueDate: Date(),
  paidDate: Date(),
  items: [{
    name: 'Paint',
    price: 500,
    quantity: 5,
    unitPrice: 100,
    tax: 50
  }, {
    name: 'Labour',
    price: 700,
    quantity: 7,
    unitPrice: 100,
    tax: 770
  }]
}
];

contactsResult.then((contacts) => {
  initialInvoices.forEach(function(value, index) {
    var invoice = new Invoice(value);
    invoice.contact = contacts[index]._id;
    invoice.save();
  });
});
