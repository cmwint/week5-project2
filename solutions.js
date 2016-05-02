$(document).ready(function() {

  var groceries = [
  {name: "Tomatoes", status: "needed", price: "3.99", quantity: 5},
  {name: "Onions", status: "needed", price: "1.85", quantity: 2},
  {name: "Cilantro", status: "needed", price: ".95", quantity: 1},
  {name: "Limes", status: "complete", price: ".33", quantity: 3},
  {name: "Jalapeno", status: "complete", price: ".15", quantity: 2}
  ];

  for(i=0; i<groceries.length; i++){
    var item = groceries[i]
    if(groceries[i].status == 'needed'){
      $("#list").append($("<li>" + item.name + " (" + item.quantity + ") @ $" + item.price + "</li>"))
    }else{
      $("#purchased").append($("<li>" + item.name + " (" + item.quantity + ") @ $" + item.price + "</li>"))
    }
  }

  function displayTotal(){
    var total = 0;
    for(i=0; i<groceries.length; i++){
      total += (groceries[i].quantity * groceries[i].price)
    }
    $(".totalCost h4 span").text("$" + total.toFixed(2))
  }

  displayTotal();

  $(".btn-success").click(function(){
    var nameInput = $("#addItem").val();
    var priceInput = $("#addPrice").val();
    var quantityInput = $("#addQuantity").val();
    if (nameInput == '' || priceInput == '' || quantityInput == ''){
      alert("Please fill in all fields")
    }
    else {
      addItem(nameInput, priceInput, quantityInput);
    }
  });

  function addItem(name, price, quantity){
    groceries.unshift({name: name, status: "needed", price: price, quantity: quantity});
    updateList();
  };

  function updateList(){
    $('#list').empty();
    $('#purchased').empty();
    for(i=0; i<groceries.length; i++){
      var item = groceries[i]
      if(groceries[i].status == 'needed'){
        $("#list").append($("<li>" + item.name + " (" + item.quantity + ") @ $" + item.price + "</li>"))
      }else{
        $("#purchased").append($("<li>" + item.name + " (" + item.quantity + ") @ $" + item.price + "</li>"))
      }
    }
    displayTotal();
  }

  $('.btn-warning').on('click', function(){
    groceries.shift();
    updateList();
  });

  $('#list').sortable();


  $('#list').on('dblclick','li',function(){
    var x = ($(this).index());
    groceries[x].status = "complete";
    updateList();
  });

});