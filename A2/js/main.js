const saleData = [{"_id":{"$oid":"5bd761dcae323e45a93ccfe9"},"saleDate":{"$date":{"$numberLong":"1440496862918"}},"items":[{"name":"envelopes","tags":["stationary","office","general"],"price":{"$numberDecimal":"8.05"},"quantity":{"$numberInt":"10"}},{"name":"binder","tags":["school","general","organization"],"price":{"$numberDecimal":"28.31"},"quantity":{"$numberInt":"9"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"20.95"},"quantity":{"$numberInt":"3"}},{"name":"laptop","tags":["electronics","school","office"],"price":{"$numberDecimal":"866.5"},"quantity":{"$numberInt":"4"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"33.09"},"quantity":{"$numberInt":"4"}},{"name":"printer paper","tags":["office","stationary"],"price":{"$numberDecimal":"37.55"},"quantity":{"$numberInt":"1"}},{"name":"backpack","tags":["school","travel","kids"],"price":{"$numberDecimal":"83.28"},"quantity":{"$numberInt":"2"}},{"name":"pens","tags":["writing","office","school","stationary"],"price":{"$numberDecimal":"42.9"},"quantity":{"$numberInt":"4"}},{"name":"envelopes","tags":["stationary","office","general"],"price":{"$numberDecimal":"16.68"},"quantity":{"$numberInt":"2"}}],"storeLocation":"Seattle","customer":{"gender":"M","age":{"$numberInt":"50"},"email":"keecade@hem.uy","satisfaction":{"$numberInt":"5"}},"couponUsed":false,"purchaseMethod":"Phone"},
{"_id":{"$oid":"5bd761dcae323e45a93ccff3"},"saleDate":{"$date":{"$numberLong":"1437533120727"}},"items":[{"name":"envelopes","tags":["stationary","office","general"],"price":{"$numberDecimal":"21.46"},"quantity":{"$numberInt":"5"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"21.82"},"quantity":{"$numberInt":"1"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"34.43"},"quantity":{"$numberInt":"3"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"24.11"},"quantity":{"$numberInt":"1"}}],"storeLocation":"London","customer":{"gender":"F","age":{"$numberInt":"49"},"email":"merto@betosiv.pm","satisfaction":{"$numberInt":"3"}},"couponUsed":false,"purchaseMethod":"In store"},
{"_id":{"$oid":"5bd761dcae323e45a93ccfee"},"saleDate":{"$date":{"$numberLong":"1415672031893"}},"items":[{"name":"laptop","tags":["electronics","school","office"],"price":{"$numberDecimal":"604.12"},"quantity":{"$numberInt":"4"}},{"name":"binder","tags":["school","general","organization"],"price":{"$numberDecimal":"11.05"},"quantity":{"$numberInt":"7"}},{"name":"binder","tags":["school","general","organization"],"price":{"$numberDecimal":"20.94"},"quantity":{"$numberInt":"5"}},{"name":"backpack","tags":["school","travel","kids"],"price":{"$numberDecimal":"61.16"},"quantity":{"$numberInt":"5"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"29.81"},"quantity":{"$numberInt":"3"}},{"name":"printer paper","tags":["office","stationary"],"price":{"$numberDecimal":"31.19"},"quantity":{"$numberInt":"5"}},{"name":"pens","tags":["writing","office","school","stationary"],"price":{"$numberDecimal":"47.12"},"quantity":{"$numberInt":"1"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"36.71"},"quantity":{"$numberInt":"2"}},{"name":"pens","tags":["writing","office","school","stationary"],"price":{"$numberDecimal":"69.28"},"quantity":{"$numberInt":"3"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"14.05"},"quantity":{"$numberInt":"1"}}],"storeLocation":"London","customer":{"gender":"F","age":{"$numberInt":"40"},"email":"pan@cak.zm","satisfaction":{"$numberInt":"5"}},"couponUsed":false,"purchaseMethod":"In store"}]
const page = 1;
const perPage = 10;

const saleDetailData = {"_id":{"$oid":"5bd761dcae323e45a93ccfe9"},"saleDate":{"$date":{"$numberLong":"1440496862918"}},"items":[{"name":"envelopes","tags":["stationary","office","general"],"price":{"$numberDecimal":"8.05"},"quantity":{"$numberInt":"10"}},{"name":"binder","tags":["school","general","organization"],"price":{"$numberDecimal":"28.31"},"quantity":{"$numberInt":"9"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"20.95"},"quantity":{"$numberInt":"3"}},{"name":"laptop","tags":["electronics","school","office"],"price":{"$numberDecimal":"866.5"},"quantity":{"$numberInt":"4"}},{"name":"notepad","tags":["office","writing","school"],"price":{"$numberDecimal":"33.09"},"quantity":{"$numberInt":"4"}},{"name":"printer paper","tags":["office","stationary"],"price":{"$numberDecimal":"37.55"},"quantity":{"$numberInt":"1"}},{"name":"backpack","tags":["school","travel","kids"],"price":{"$numberDecimal":"83.28"},"quantity":{"$numberInt":"2"}},{"name":"pens","tags":["writing","office","school","stationary"],"price":{"$numberDecimal":"42.9"},"quantity":{"$numberInt":"4"}},{"name":"envelopes","tags":["stationary","office","general"],"price":{"$numberDecimal":"16.68"},"quantity":{"$numberInt":"2"}}],"storeLocation":"Seattle","customer":{"gender":"M","age":{"$numberInt":"50"},"email":"keecade@hem.uy","satisfaction":{"$numberInt":"5"}},"couponUsed":false,"purchaseMethod":"Phone"};
const saleTableTemplate = _.template(`
    <% _.forEach(data, function(current){
        let saleDate = moment(current.saleDate) 
        console.log(current._id)
    %>
        <tr data-id="<%- current._id.$oid %>">
         <td><%- current.customer.email %></td>
         <td><%- current.storeLocation %></td>
         <td><%- current.items.length %></td>
         <td><%- saleDate.format('LLLL') %></td>
        </tr>
    <% }) %>
`);

const saleModelBodyTemplate = _.template(`
        <h4>Customer</h4>
        <strong>email: </strong><%- data.customer.email %><br>
        <strong>age: </strong><%- data.customer.age.$numberInt %><br>
        <strong>satisfaction: </strong> <%- data.customer.satisfaction.$numberInt %> / 5 <br>
        <br>
        <h4>Items: Do this later</h4>
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
                    <td> <%- current.quantity.$numberInt%> </td>
                    <td> <%- current.price.$numberDecimal%> </td>
                </tr>
            <% }) %>
        </tbody>
        </table>

`);

$(function () {
    $(".sale-table tbody").html(saleTableTemplate({'data' : saleData}));
    $(".sale-table tbody").on("click","tr", function(e){
        $(".modal-body").html(saleModelBodyTemplate({'data' : saleDetailData}))
        $("#sale-modal").modal({
            keyboard: false,
            backdrop: "static"
        })
    });
});