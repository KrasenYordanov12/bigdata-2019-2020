use stu_1601321006


var generateCarModel = function(){
  var collection = ['Opel','Audi','Volkswagen','Peugeot','BMW','Toyota'];
    
  var index = Math.floor(Math.random() * 6);
  return collection[index];
}

var generateCarNumber = function(){
  var collection = ['15890632','17853492','59871430','98632091','93561478','63208961'];
  
  var index = Math.floor(Math.random() * 6);
  return collection[index];
}




//1
var fillCarModels = function(){
    var car = {};
	for (i = 0; i < 10; i++) {
		  Car.Name = generateCarModel();
      Car.Number = generateCarNumber();
		db.cars.insert(car);
	}
}
fillCarModels();





//2
var SeatsToCar = function(){
  var cars = db.cars.find().toArray();

  for (i = 0; i < cars.length; i++) {
  db.cars.update({_id:cars[i]._id}, {$set: {"seats": Math.floor(2) + 0}});
}
}
SeatsToCar();





//3
var generateStockName = function(){
  var collection = ['Domati','Krastavici','Chushki','Biskviti','Voda'];
  var index = Math.floor(Math.random() * 5);
  return collection[index];
}

var generateStockCategory = function(){
  var collection = ['Zelenchici','Plodove','Napitki'];
  var index = Math.floor(Math.random() * 3);
  return collection[index];
}


var generateStockQuantity = function(){
  var collection = ['200','300','250','350'];
  var index = Math.floor(Math.random() * 4);
  return collection[index];
}


var fillStock = function(){
  var stock = {};
for (i = 0; i < 5; i++) {
    cargo.Name = generateStockName();
    cargo.Category = generateStockCategory();
    cargo.Quantity = generateStockQuantity();
    cargo.CarId = car[CarNumber];
    db.cargo.insert(stock);
}
}




//4
db.cars.find().pretty()






//5
var generateAdditionalCategories = function(){
  var collection = ['fruits','vegetables','meat','milk and dairy'];
  var index = Math.floor(Math.random() * 4);
  return collection[index];
}
