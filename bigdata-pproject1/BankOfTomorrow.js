use BankOfTomorrow

//generate departments and positions
var Departments = [
	{
		name: 'Risk Analysts',
		positions: [
			{
				id: 0,
				name: 'Premier Banker'
			},
			{
				id: 1,
				name: 'Junior Analyst - Asset Management'
			},
			{
				id: 2,
				name: 'Technology Risk Manager'
			}
		]
	},
	{
		name: 'Communication with Customers',
		positions: [
			{
				id: 0,
				name: 'Personal Financial Advisers'
			},
			{
				id: 1,
				name: 'Bank Tellers'
			},
			{
				id: 2,
				name: 'Phone Banker'
			}
		]
	}
];

db.departments.insert(Departments[0]);
db.departments.insert(Departments[1]);




//generate employees names
var generateFirstName = function(){
  var collection = ['ATANAS','APOSTOL','DIANA','EVGENI','HRISTOFOR','IVAILO','KALIN','LILYANA','MOMCHIL'];
  
  var index = Math.floor(Math.random() * 9);
  return collection[index];
}

var generateMiddleName = function(){
  var collection = ['PETROV','RUMENOV','EVGENIEV','ATANASOV','DIKOFF','SPARTAKOV'];
  
  var index = Math.floor(Math.random() * 6);
  return collection[index];
}

var generateLastName = function(){
  var collection = ['GEORGIEV','STOYANOV','TODOROV','TRIFONOV','YANKOOV','ZDRAVKOV'];
  
  var index = Math.floor(Math.random() * 6);
  return collection[index];
}






//generate employees addresses
var generateAddress = function(){
        var streets = ['Stefan Stambolov', 'Gogol', 'Petko Karavelov', 'Stoyan Papazov', 'Ablanovo', 'Karandila'];
  
        var streetNumbers = ['8','55','19','13','42'];

        var streetIndex = Math.floor(Math.random() * 6);
  
        var streetNumbersIndex = Math.floor(Math.random() * 5);
  
  return streets[streetIndex] + ' ' + streetNumbers[streetNumbersIndex];
}






//generate employees phones
var generatePhone = function(){
  var phones = ['+1111111111','+2222222222','+3333333333', '+4444444444','+5555555555','+6666666666', '+7777777777', '+8888888888', '+9999999999'];
  var index = Math.floor(Math.random() * 9);
  return phones[index];
}







//generate employees emails
var generateEmail = function(name){
  var abv = '@abv.bg';
  return name.toLowerCase() + abv;
}









//fill employees
var fillEmployees = function(){
    var employee = {};
    var departmentInd;
    var positionInd;
	for (i = 0; i < 20; i++) {
        departmentInd = Math.floor(Math.random() * 2);
        positionInd = Math.floor(Math.random() * 3);
		employee.FName = generateFirstName();
        employee.MidName = generateMiddleName();
		employee.LName = generateLastName();
        employee.Address = generateAddress();
        employee.Phone = generatePhone();
        employee.Email = generateEmail(employee.FName+employee.LName);
        employee.Department = Departments[departmentInd].name;
        employee.Position = Departments[departmentInd].positions[positionInd].name;
		db.employees.insert(employee);
	}
}
fillEmployees();





//fill clients
var fillClients = function(){
    var client = {};
	for (i = 0; i < 20; i++) {
		client.FName = generateFirstName();
        client.MidName = generateMiddleName();
		client.LName = generateLastName();
        client.Address = generateAddress();
        client.Phone = generatePhone();
        client.Email = generateEmail(client.FName+client.LName);
		db.clients.insert(client);
	}
}
fillClients();






var generateAccount = function(client){
	var accounts = [
		'BG76RZBB91665946852491', 'BG33BNPA94404324591555', 'BG86GKMB94009295684699', 'BG48STSA93005446583855',
		'BG14IORT80941989225743', 'BG12UNCR70063816517194', 'BG16RZBB91557878129534','BG44RZBB91523718422664',
	];
	var amounts = [
		100.00, 289.98, 3455.45, 80049.54, 4590.34,
		6709.98, 8715.76, 8000.43, 7893.21, 297.02
	];
	var currencies = ['BGN', 'CLP', 'CZK'];
	var accountInd;
	var amountInd;
	var currencyInd;
	var account = {};
			accountInd = Math.floor(Math.random() * 8);
			amountInd = Math.floor(Math.random() * 10);
			currencyInd = Math.floor(Math.random() * 3);
			
			account = {
				account: accounts[accountInd],
				amount: amounts[amountInd],
				currency: currencies[currencyInd]
			};
		db.clients.update(
			{_id: client._id},
			{$addToSet: {"accounts": account}}
		)
}



var fillAccounts = function(){
	var accountsNumber;
	var clients = db.clients.find().toArray();
	var clientsLength = clients.length;
	var client = [];
	
	for (i = 0; i < clientsLength; i++) {
		generateAccount(clients[i]);
	}
}

fillAccounts();











//Бизнес заявки част 1.1
db.departments.find({},{name: 1})











//Бизнес заявки част 1.2
var SalaryToEmployees = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"salary": Math.floor(Math.random() * 4500) + 1800}});
	}
}
salaryToEmployees();
db.employees.find({},{FName: 1, LName: 1, salary: 1})












//Бизнес заявки част 1.3
var ListEmployeesNewEmail = function(){
    var employees = db.employees.find().toArray();

    for (i = 0; i < employees.length; i++) {
		print(employees[i].FName + ' ' 
        + employees[i].LName
        + ' : ' + employees[i].FName.toLowerCase()
        + '.' + employees[i].LName.toLowerCase()
        + '@bankoftomarow.bg');
	}
} 
ListEmployeesNewEmail();












// Заявки 1.4
var WorkExpirience = function(){
	var employees = db.employees.find().toArray();
	
	for (i = 0; i < employees.length; i++) {
		db.employees.update({_id:employees[i]._id}, {$set: {"workExpirience": Math.floor(Math.random() * 21)+1}});
	}
}
WorkExpirience();

var MoreThanFiveYearEpirience = function(){
    var employees = db.employees.find({workExpirience: {$gt: 5}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].FName + ' ' + employees[i].LName)
        }
    }
    else{
        print('No employees found!')
    }
}

MoreThanFiveYearEpirience();












//Бизнес заявки част 1.5
var EmployeesStartingWithS = function () {
    var employees = db.employees.find({firstName: {$regex: /^S/}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].FName + ' ' + employees[i].LName)
        }
    }
    else{
        print('No employees found!')
    }
};
EmployeesStartingWithS();








//Бизнес заявки част 1.6
var BirthPlace = function(){
	var BirthPlaceCollection = ['Turkey', 'Tonga', 'Spain', 'Bulgaria', 'Finland', 'Brazil'];
	var employees = db.employees.find().toArray();
	var BirthPlaceInd;
	
	for (i = 0; i < employees.length; i++) {
		BirthPlaceInd = Math.floor(Math.random() * 6);
		db.employees.update({_id:employees[i]._id}, {$set: {"BirthPlace": BirthPlaceCollection[BirthPlaceInd]}});
	}
}
BirthPlace();

var showForeigners = function () {
    var employees = db.employees.find({BirthPlace: {$ne: 'Bulgaria'}}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].FName + ' ' + employees[i].LName)
        }
    }
    else{
        print('No employees found!')
    }
}
showForeigners();







//Бизнес заявки част 1.7
db.employees.find({
	$or: [
		{FName: /I/i},
		{LName: /I/i},
		{MidName: /I/i}
	]
})








//Бизнес заявки част 3.4
var SalaryBetween2kAnd3k = function () {
    var employees = db.employees.find({$and: [{"salary": {$gte: 2000}}, {"salary": {$lte: 3000}}]}).toArray();
    if(employees.length > 0){
        for (i = 0; i < employees.length; i++) {
            print(employees[i].FName + ' ' + employees[i].LName)
        }
    }
    else{
        print('No employees found!')
    }
}
SalaryBetween2kAnd3k();















