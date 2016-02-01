app.factory('$categories', function(){
  
  var cats = [
    {
      name: 'Mobile Phones and Tablets',
      subs: [
        'Mobile Phones and Smartphones',
        'Accessories for Mobile Phones and Tablets',
        'Tablets'
      ],
      icon: 'ion-ipad'
    }, {
      name: 'Computers',
      subs: [
        'Accessories and Parts for Notebooks, Laptops and Netbooks',
        'Desktops',
        'Internet Gadgets',
        'Computer Monitors and LCDs',
        'Networking and Servers',
        'Notebooks, Laptops and Netbooks',
        'Peripherals, Components, and Parts',
        'Printers and Scanners',
        'Software',
        'Storage Devices'
      ],
      icon: 'ion-android-desktop'
    }, {
      name: 'Consumer Electronics',
      subs: [
        'Audio and Video Electronics',
        'CDs, DVDs, and Blu-ray Discs',
        'Communication Devices (non-mobile phones)',
        'CCTV and Security Products',
        'Video Games and Consoles',
        'Office and School Equipment'
      ],
      icon: 'ion-outlet'
    }, {
      name: 'Pets and Animals',
      subs: [
        'Birds',
        'Cats',
        'Dogs',
        'Exotic',
        'Fish',
        'Reptiles and Amphibians',
        'Small Mammals',
        'Accessories for Pets'
      ],
      icon: 'ion-ios-paw'
    }, {
      name: 'Home and Furniture',
      subs: [
        'Appliances',
        'Furniture and Fixture',
        'Outdoors and Gardens',
        'Home Tools and Accessories'
      ],
      icon: 'ion-home'
    }, {
      name: 'Health and Beauty',
      subs: [
        'Health and Beauty',
        'Medical and Health Equipment'
      ],
      icon: 'ion-heart'
    }, {
      name: 'Clothing and Accessories',
      subs: [
        'Accessories and Sunglasses',
        'Clothes',
        'Costumes',
        'Jewelry and Watches',
        'Luggages, Bags and Wallets',
        'Shoes and Footwear'
      ],
      icon: 'ion-tshirt'
    }, {
      name: 'Books, Sports and Hobbies',
      subs: [
        'Arts and Crafts',
        'Books and other Publications',
        'Collictibles',
        'Musical Instruments',
        'Sports and Hobbies',
        'Souvenirs and Giveaways'
      ],
      icon: 'ion-ios-book'
    }, {
      name: 'Baby Stuff and Toys',
      subs: [
        'Baby Stuff',
        'Toys and Playthings'
      ],
      icon: 'ion-ios-basketball'
    }, {
      name: 'Real Estate',
      subs: [
        'Real Estate for Sale',
        'Real Estate for Rent'
      ],
      icon: 'ion-ios-home'
    }, {
      name: 'Cars and Automotives',
      subs: [
        'Cars, SUVs, AUVs, and Pick-ups',
        'Motorcycles and Scooters',
        'Trucks and Buses',
        'Boats, Aircrafts and Recreational Vehicles',
        'Automotive Parts and Accessories',
        'Motorcycle Parts and Accessories'
      ],
      icon: 'ion-model-s'
    }
  ]
    
    return {
      GetAll: function() {
        return cats;
      },
      GetSubs: function(main_category){
        for(var i = 0; i < cats.length; i++){
          if(cats[i].name == main_category){
            return cats[i].subs;
          }
        }
        return null;
      }
    }
    
}); 