let ExpenseArray = [];
let selectedType = "Not selected";

document.addEventListener("DOMContentLoaded", function (event) {
    //pre- populate the array
    ExpenseArray.push ( new ExpenseObject("Laptop", 1100, "2004-22-12", "Mall", "School")  );
    ExpenseArray.push ( new ExpenseObject("Strawberries", 5, "2006-12-10", "Mall", "Food")  );
    ExpenseArray.push ( new ExpenseObject("Blanket", 30, "2005-25-11", "Mall", "Home")  );

    for (let i = 0; i < ExpenseArray.length; i++) {
        console.log(ExpenseArray[i].show());
    }

    createList();

    document.getElementById("addExpense").addEventListener("click", function () {

        ExpenseArray.push(newExpense());

        console.log(ExpenseArray[ExpenseArray.length - 1].show());
        
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("date").value = "";
        document.getElementById("locationName").value = "";

        createList();
    });

    document.addEventListener("change", function(event) {
        if (event.target.id === "select-type") {
            selectedType = event.target.value;
        }
    });

    document.getElementById("listButton").addEventListener("click", function () {
        document.location.href = "home.html#list";
    });
    
    $(document).on("pagebeforeshow", "#details", function (event) {   
    let localID = localStorage.getItem('parm'); 
    
    
    ExpenseArray = JSON.parse(localStorage.getItem('ExpenseArray'));  
    
    console.log(ExpenseArray[localID - 1]);
    
    document.getElementById("Name").innerHTML = "Name: " + ExpenseArray[localID - 1].name;
    document.getElementById("Price").innerHTML = "Price: $" + ExpenseArray[localID - 1].price;
    document.getElementById("Date").innerHTML = "Date: " + ExpenseArray[localID - 1].date;
    document.getElementById("LocationName").innerHTML = "Location: " + ExpenseArray[localID - 1].locationName;
    document.getElementById("Category").innerHTML = "Category: " + ExpenseArray[localID - 1].category;
    });
    
});

let ExpenseObject = function (pName, pPrice, pDate, pLocationName, pCategory, pId) {
    this.name = pName;
    this.price = pPrice;
    this.date = pDate;
    this.locationName = pLocationName;
    this.category = pCategory;
    this.id = pId;
    this.id = ExpenseArray.length + 1;
    this.show = function(){
        return this.description + ", " + this.price + ", " + 
        this.date + ", " + this.locationName + ", " + this.category;
    };
};

let newExpense = function () {
    selectedType = document.getElementById("select-type").value;
    return new ExpenseObject(
        document.getElementById("name").value,
        document.getElementById("price").value,
        document.getElementById("date").value,
        document.getElementById("locationName").value,
        selectedType
    );
};


function createList() {
    let expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    ExpenseArray.forEach(function (oneExpense) {   
        let li = document.createElement('li');
        li.classList.add('oneExpense');
        li.setAttribute("data-parm", oneExpense.id);
        //edit the listed item into a click able links
        li.innerHTML = "<a href='#details'>Name: " + oneExpense.name + ",   Price: $" + oneExpense.price + "</a>"; 
        expenseList.appendChild(li);
    });

    $("#expenseList").listview().listview("refresh");

    let liList = document.getElementsByClassName("oneExpense");
    let newExpenseArray = Array.from(liList);
    newExpenseArray.forEach(function (element) {
        element.addEventListener('click', function () {
        let parm = this.getAttribute("data-parm"); 
        localStorage.setItem('parm', parm);
       
        let stringExpenseArray = JSON.stringify(ExpenseArray);
        localStorage.setItem('ExpenseArray', stringExpenseArray);
        
        document.location.href = "home.html#details";
        });
    });
}

