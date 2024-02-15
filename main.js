let ExpenseArray = [];
let selectedType = "";

document.addEventListener("DOMContentLoaded", function (event) {
    //pre- populate the array
    ExpenseArray.push ( new ExpenseObject("ipad", 1100, "School")  );
    ExpenseArray.push ( new ExpenseObject("Strawberries", 5, "Food")  );
    ExpenseArray.push ( new ExpenseObject("Blanket", 30, "Home")  );

    for (let i = 0; i < ExpenseArray.length; i++) {
        console.log(ExpenseArray[i].show());
    }

    createList();

    document.getElementById("addExpense").addEventListener("click", function () {

        ExpenseArray.push(newExpense());

        console.log(ExpenseArray[ExpenseArray.length - 1].show());
        
        document.getElementById("description").value = "";
        document.getElementById("price").value = "";

        createList();
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });
    
});

let ExpenseObject = function (pDescription, pPrice, pCategory) {
    this.description = pDescription;
    this.price = pPrice;
    this.category = pCategory;
    this.show = function(){
        return this.description + ", " + this.price + ", " + this.category;
    };
};

let newExpense = function () {
    return new ExpenseObject(
        document.getElementById("description").value,
        document.getElementById("price").value,
        selectedType
    );
};

function createList() {
    let expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    ExpenseArray.forEach(function (element) {   
        let li = document.createElement('li');
        //edit the listed item into a click able links
        li.innerHTML = "<a href='#details'>Price: $" + element.price + "</a>"; 
        expenseList.appendChild(li);
        $("#expenseList").listview().listview("refresh");
    });
}