//Getting Date:
var d = new Date();
var datetime = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();

function getDsrforUpdate(id) {
    var uri = '/home/getDsrforUpdate/' + id;
    //var uri = '/dsr/getArea/';

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        //console.log(data);
        //var data1 = jQuery.parseJSON(data);
        console.log('DSR-data', data);


        $("#dsrid").val(data[0].dsrid);
        $("#prevbal").val(data[0].prevbal);
        $("#saleper").val(data[0].saleper);
        $("#areaid").val(data[0].areaid);
        $("#SalesMan").val(data[0].Salesman);
        //Getting Customer by Area
        getCustbyArea(data[0].areaid, data[0].CustomerID);
        $("#ttlamt").val(data[0].ttlamt);

    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}


//Getting SalesMan

function getSalesman() {
    var uri = '/home/getSalesMan';
    //var uri = '/dsr/getArea/';

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        //console.log(data);
        //var data1 = jQuery.parseJSON(data);
        console.log(data);
        $.each(data, function (k, v) {
            console.log(v);
            $("#SalesMan").append('<option value="' + v.booksalman + '">' + v.salmanid + '</option>');
        });

    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}


function getArea() {
    var uri = '/home/getArea';
    //var uri = '/dsr/getArea/';

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        //console.log(data);
        //var data1 = jQuery.parseJSON(data);
        console.log(data);
        // $("#areaid").append('<option value="">Select here..</option>');
        $.each(data, function (k, v) {
            console.log(v);
            $("#areaid").append('<option value="' + v.areaid + '">' + v.area_ + '</option>');
        });

    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}

function getCustbyArea(id,custid) {
    //var uri = '/api/employee/getSalesMan/';
    var uri = '/home/getCustomerByarea/' + id;

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        //console.log(data);
        //var data1 = jQuery.parseJSON(data);
        console.log(data);
        $("#CustomerID").empty();
        if (data) {
            //$("#CustomerID").append('<option value="">Select here..</option>');
            $.each(data, function (k, v) {
                console.log(v);
                $("#CustomerID").append('<option value="' + v.cust_acc + '">' + v.CustomerName + '</option>');
            });

           //Setting Customer Data
            $("#CustomerID").val(custid);
        }

    }

    function errorFunc() {
        alert('error');
    }
}

//Getting Product Data
function getProduct() {
    var uri = '/home/getProduct';
    //var uri = '/dsr/getArea/';

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        //console.log(data);
        //var data1 = jQuery.parseJSON(data);
        console.log(data);
        $("#products").empty();
        $("#products").append('<option value="">Select here..</option>');
        $.each(data, function (k, v) {
            console.log(v);
            $("#products").append('<option value="' + v.ProductID + '">' + v.ProductName + '</option>');
        });

    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}

// GET Products SaleRate
function getProductSalrat(id) {

    //var uri = '/api/employee/getSalesMan/';
    var uri = '/home/getProductSalrat/' + id;

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        if (data) {
            for (var i = 0; i < data.length; i++) {
                //alert(data[i].SalePrice);//price for the id obtained
                console.log(data[i].SalePrice);
                $("#salrat").val(data[i].SalePrice);
                //document.getElementById("salrat").innerHTML = data[i].SalePrice;

                // document.getElementById("salrat_").value = data[i].SalePrice;

            }
        }
    }

    function errorFunc() {
        alert('error');
    }
}
//Update DSR Data
function updateItemData() {

    var data = {};


    var item = {
        "dsrid": "", "dsrdat": "", "CustomerID": "", "CompanyId": "", "BranchId": "", "Isdone": "", "CreateAt": "", "CreateBy": "", "Isdon": "",
        "Username": "", "saleper": "", "saleper": "", "prevbal": "", "Salesman": "", "areaid": "", "furout": "", "updateBy": "",
        //"tbl_ddsr": ["{'dsrid': '', 'ProductTypeID': '','ProductID': '', 'untid': '', 'Qty': '', 'salrat': , 'salrturn: '', 'recvry': '', 'outsta': '', 'Amt': '','dsrrmk': '', 'CompanyId': '',  'BranchId': '', 'CreateAt': '', 'CreateBy': '', 'ttlamt': '', 'finlqry': '' }"]
    };

    item.dsrid = $("#dsrid").val();
    item.dsrdat = $("#dsrdat").val();
    item.CustomerID = $("#CustomerID").val();
    item.CompanyId = "COM_001";
    item.BranchId = "001";
    item.Isdone = true;
    item.CreateAt = datetime;
    item.CreateBy = "";
    item.Isdon = "0";
    item.Username = "";
    item.saleper = $("#saleper").val();
    item.prevbal = $("#prevbal").val();
    item.Salesman = $("#SalesMan").val();//$("#SalesMan option:selected").html();
    item.areaid = $("#areaid").val();
    item.furout = "0.00";
    item.updateBy = "";
    item.finlqry = "0.00";

    $.ajax({
        url: '/home/updateMdsr',
        data: JSON.stringify(item),
        type: 'POST',
        contentType: 'application/json;',
        dataType: 'json',
        success: function (result) {
            getMdsrId();
            setTimeout(function () { PostMovies(); }, 1000);

            // location.reload();
        },
        error: function (err) {
            alert(err.message)
        },
    });
}