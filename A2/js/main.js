let saleData = [];
let page = 500;
let perPage = 10;
let lastPage = false;

const saleTableTemplate = _.template(`
    <% _.forEach(data, function(current){%>
        <tr data-id="<%- current._id %>">
         <td><%- current.customer.email %></td>
         <td><%- current.storeLocation %></td>
         <td><%- current.items.length %></td>
         <td><%- moment(current.saleDate).format('LLLL') %></td>
        </tr>
    <% }) %>
`);

const saleModelBodyTemplate = _.template(`
        <h4>Customer</h4>
        <strong>email: </strong><%- data.customer.email %><br>
        <strong>age: </strong><%- data.customer.age %><br>
        <strong>satisfaction: </strong> <%- data.customer.satisfaction %> / 5 <br>
        <br>
        <h4>Items: $<%- data.totalPrice.toFixed(2) %></h4>
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Product name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
            </tr>
        </thead>
        <tbody>
            <% _.forEach(data.items,function(current){%>
                <tr>
                    <td> <%- current.name%> </td>
                    <td> <%- current.quantity%> </td>
                    <td> $<%- current.price%> </td>
                </tr>
            <% }) %>
        </tbody>
        </table>

`);

const loadSaleData = () => {
    fetch(`http://tai-web422-a1.herokuapp.com/api/sales/?page=${page}&perPage=${perPage}`)
        .then(response => response.json())
        .then(json => {
            saleData = json;
            if (saleData.length < perPage) {
                lastPage = true;
            } else {
                lastPage = false;
            }
            $(".current-page").attr("value", page);
            $(".current-page").html(page);
            $(".sale-table tbody").html(saleTableTemplate({ 'data': saleData }));
        })
}

$(function () {
    //populate sale table
    loadSaleData();
    //set event listener on sale-table body
    $(".sale-table tbody").on("click", "tr", function (e) {
        let selectedSaleID = $(this).attr("data-id");
        let saleDetailData = _.find(saleData, function (thisSale) {
            return thisSale._id == selectedSaleID;
        });
        let totalPrice = 0;
        for (let i = 0; i < saleDetailData.items.length; i++) {
            totalPrice += saleDetailData.items[i].price * saleDetailData.items[i].quantity;
        }
        saleDetailData.totalPrice = totalPrice;
        $(".modal-body").html(saleModelBodyTemplate({ 'data': saleDetailData }))
        $(".modal-title").html("Sales: " + saleDetailData._id);
        $("#sale-modal").modal({
            keyboard: false,
            backdrop: "static"
        })
    });
    $(".previous-page").on("click", function (e) {
        page = $(".current-page").attr("value");
        if (page > 1) {
            page--;
            loadSaleData()
            $(".current-page").attr("value", page);
            $(".current-page").html(page);

        } else {
            alert("action not allowed");
        }
    });
    $(".next-page").on("click", function (e) {
        if (lastPage == false) {
            page = $(".current-page").attr("value");
            page++;
            loadSaleData();
            $(".current-page").attr("value", page);
            $(".current-page").html(page);
        }else{
            alert("Last page");
        }
    })
});