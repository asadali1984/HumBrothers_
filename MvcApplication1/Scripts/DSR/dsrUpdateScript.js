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
        getDsrListforUpdate(data[0].dsrid);
        
        setTimeout(function () { sumAll(); }, 3000);
    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}

// Check Products
function checkProduct(id) {
    //var uri = '/api/employee/getSalesMan/';
    var uri = '/home/checkProduct/' + id;

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        //console.log('product check', data);

        if (data == "1")
        {
            getProductSalrat(id);

        } else if (data == "0")
        {
            alert("Product is Less in Stock!!..");

            $("#Qty").val("0.00");
            $("#salrat").val("0.00");
            $("#salrturn").val("0.00");
            $("#Amt").val("0.00");
            $("#ProductID").val("");
            return false;
        }
        //if (data) {
        //    $.each(data, function (k, v) {
        //        console.log(v);                
        //    });
        //}

    }

    function errorFunc() {
        alert('error');
    }
}


// GET Customer OutStanding
function getCustomerOutstan(id) {
    //var uri = '/api/employee/getSalesMan/';
    var uri = '/home/getCustomerOutstan/' + id;

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        console.log(data);
        if (data) {
            $.each(data, function (k, v) {
                console.log(v);
                $("#prevbal").val(v.CredAmt);
            });
        }

    }

    function errorFunc() {
        alert('error');
    }
}

// GET Sales Percent
function getCustomerSalper(id) {
    //var uri = '/api/employee/getSalesMan/';
    var uri = '/home/getCustomerSalper/' + id;

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        console.log(data);
        if (data) {
            console.log(data[0].saleper);
            //document.getElementById("saleper").values = data[0].saleper;
            $("#saleper").val(data[0].saleper);
            //$.each(data, function (k, v) {
            //    console.log(v);
            //    //$("#dis").val("3");//v.saleper;
            //    document.getElementById("saleper").innerHTML = v.saleper;
            //});
        }

    }

    function errorFunc() {
        alert('error');
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

// GET dsrid
function getMdsrId() {
    //var uri = '/api/employee/getSalesMan/';
    var uri = '/home/getMdsrid';

    $.ajax({
        type: "GET",
        url: uri, ///Item/GetItemType',
        contentType: 'application/json;',
        dataType: "json",
        success: successFunc,
        error: errorFunc
    });
    function successFunc(data, status) {
        console.log('data', data);
        if (data) {
            dsrid = data;
            console.log(dsrid);           
        }

    }

    function errorFunc() {
        alert('error');
    }
}

//Send List of Movies to controller  
function PostMovies() {

   
    //Build List object that has to be sent to controller  
    var MoviesList = []; // list object  


    $('#table-body  > tr').each(function () { //loop in table list  

        var Movie = {}; // create new Movie object and set its properties  
        Movie.dsrid = dsrid;
        Movie.ddsr = this.cells[0].innerHTML;
        Movie.ProductTypeID = '0';
        Movie.ProductID = this.cells[6].innerHTML;
        Movie.untid = '2';
        Movie.Qty = this.cells[2].innerHTML;
        Movie.salrat = this.cells[3].innerHTML;
        Movie.salrturn = this.cells[4].innerHTML;
        Movie.recvry = "0";
        Movie.outstan = $("#prevbal").val();
        Movie.Amt = this.cells[5].innerHTML;
        Movie.dsrrmk = "";
        Movie.CompanyId = "COM_001";
        Movie.BranchId = "001";
        Movie.CreateAt = d;
        Movie.CreateBy = 'admin';
        Movie.CreateBy = 'admin';
        Movie.ttlamt = $("#ttlamt").val();
        Movie.finlqry = this.cells[2].innerHTML;
        //Movie.TitleTxt = this.cells[5].innerHTML;
        //Movie.SummaryTxt = this.cells[6].innerHTML;
        //Movie.YearTxt = this.cells[7].innerHTML;

        MoviesList.push(Movie); // add Movie object to list object  
    });
    console.log('list', MoviesList);
    //Send list of movies to controller via ajax  
    $.ajax({
        url: '/home/updateDdsr',
        type: "POST",
        data: JSON.stringify(MoviesList),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            // Process response from controller  
            if (response === true) {
                //ShowMsn("Movies have been saved successfully."); // show success notification  
                alert('DSR is Saved!!...');
                ClearForm(); //clear form fields  
                $('#table-body').empty(); // clear table items  
                CheckSubmitBtn(); // disable submit button  

                $("#dsrdat").val("");
                $("#prevbal").val("0.00");
                $("#saleper").val("0.00");
                $("#SalesMan").val("");
                $("#areaid").val("");
                $("#CustomerID").val("");
                $("#ttlamt").val("0.00");

                $("#ProductID").val = "";
                $("#products").val("");
                $("#Qty").val("0.00");
                $("#salrat").val("0.00");
                $("#salrturn").val("0.00");
                $("#Amt").val("0.00");
                //location.reload();

                

            } else {
                ShowMsn("Ooops, an error has ocurrer while processing the transaction.");
            }
        }
    });

}

//Update DSR Data
function updateItemData() {


    //Validate required fields  
    var Errors = ""; // Main Error Messages Variable 

    var dsrDat = document.getElementById("dsrdat").value;
    if (dsrDat == "") {
        Errors += "Date is Required.<br>";
        $('#dsrdat').addClass("border-danger");
    } else {
        $('#dsrdat').removeClass("border-danger");
    }

    var salesMan = document.getElementById("SalesMan").value;
    if (salesMan == "") {
        Errors += "Select Sales Man.<br>";
        $('#SalesMan').addClass("border-danger");
    } else {
        $('#SalesMan').removeClass("border-danger");
    }

    var areaId = document.getElementById("areaid").value;
    if (areaId == "") {
        Errors += "Select Area.<br>";
        $('#areaid').addClass("border-danger");
    } else {
        $('#areaid').removeClass("border-danger");
    }
    var customerID = document.getElementById("CustomerID").value;
    if (customerID == "") {
        Errors += "Select Customer.<br>";
        $('#CustomerID').addClass("border-danger");
    } else {
        $('#CustomerID').removeClass("border-danger");
    }
    
    if (Errors.length > 0) {//if errors detected then notify user and cancel transaction  
        ShowMsn(Errors);
        return false; //exit function  
    }

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
            //getMdsrId();
            setTimeout(function () { PostMovies(); alert('DSR has been updated!!'); }, 1000);
            
            setTimeout(function () { window.location.href = "/home/About"; }, 5000);
           
             //
        },
        error: function (err) {
            //console.log(err)
            setTimeout(function () { PostMovies(); alert('DSR has been updated!!'); }, 1000);
            
            setTimeout(function () { window.location.href = "/home/About"; }, 5000);
            //window.location.href = "/home/Contact";
        },
    });
}



function getDsrListforUpdate(id) {
    var uri = '/home/getDsrListforUpdate/' + id;
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
        console.log('dsr-data', data);

        $.each(data, function (k, value) {
            var chtml = "";
            chtml += "'<tr>";
            chtml += "    <td style='display:none;'>" + value.ddsr + "</td>";
            chtml += "    <td>" + value.ProductName + "</td>";            
            chtml += "    <td>" + value.Qty + "</td>";
            chtml += "    <td>" + value.salrat + "</td>";
            chtml += "    <td>" + value.salrturn + "</td>";
            chtml += "    <td>" + value.Amt + "</td>";
            chtml += "    <td style='display:none;'>" + value.ProductID + "</td>";
            chtml += "    <td><div class='text-center'><a href='#' class='btn btn-danger' onclick='Delete($(this))'>Delete</a></div></td>";
            chtml += " </tr>'";

            $('#table-information > tbody').append(chtml);

        });

       
    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}


//Add item to temp table   
function AddTempMoview() {

    //Create Movie Object  
    var Movie = {};

    Movie.Product = $("#products option:selected").html();
    Movie.ProductID = $("#products").val();
    Movie.Qty = $('#Qty').val();
    Movie.salrat = $('#salrat').val();
    Movie.salrturn = $('#salrturn').val();
    Movie.Amt = $('#Amt').val();
    Movie.Title = $('#TitleTxt').val();
    Movie.Summary = $('#SummaryTxt').val();
    Movie.Year = $('#YearTxt').val();


    //Validate required fields  
    var Errors = ""; // Main Error Messages Variable  

    //validate Items  

    select = document.getElementById('products'); // or in jQuery use: select = this;
    if (select.value) {
        // value is set to a valid option, so submit form
        $('#products').removeClass("border-danger");
    } else {
        Errors += "Product is required.<br>";
        $('#products').addClass("border-danger");
    }

    //validate Qty  
    if (Movie.Qty == 0.00) {
        Errors += "Qty is required.<br>";
        $('#Qty').addClass("border-danger");
    } else {
        $('#Qty').removeClass("border-danger");
    }

    //validate Sale Rate  
    if (Movie.salrat == 0.00) {
        Errors += "Sale Rate is Required.<br>";
        $('#salrat').addClass("border-danger");
    } else {
        $('#salrat').removeClass("border-danger");
    }


    //validate Amount  
    if (Movie.Amt == 0.00) {
        Errors += "Amount is Required.<br>";
        $('#Amt').addClass("border-danger");
    } else {
        $('#Amt').removeClass("border-danger");
    }

    //validate Year  
    //if (Movie.Year.trim().length < 4) {
    //    Errors += "A valid Year is required.<br>";
    //    $('#Amt').addClass("border-danger");
    //} else {
    //    $('#Amt').removeClass("border-danger");
    //}

    if (Errors.length > 0) {//if errors detected then notify user and cancel transaction  
        ShowMsn(Errors);
        return false; //exit function  
    }
    //end validation required  

    //Validate no duplicated Titles  
    var ExistTitle = false; // < -- Main indicator  
    $('#table-information > tbody  > tr').each(function () {
        var Title = $(this).find('.TitleCol').text(); // get text of current row by class selector  
        if (Movie.ProductID.toLowerCase() == Title.toLowerCase()) { //Compare provided and existing title  
            ExistTitle = true;
            return false;
        }
    });

    //Add movie if title is not duplicated otherwise show error  
    if (ExistTitle === false) {
        ClearMsn();
        //Create Row element with provided data  
        var Row = $('<tr>');
        $('<td style="display:none;">').html(Movie.ddsr).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.Product).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.Qty).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.salrat).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.salrturn).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.Amt).addClass("TitleCol").appendTo(Row);
        $('<td style="display:none;">').html(Movie.ProductID).addClass("TitleCol").appendTo(Row);

        //$('<td>').html(Movie.Title).addClass("TitleCol").appendTo(Row);
        //$('<td>').html(Movie.Summary).appendTo(Row);
        //$('<td>').html(Movie.Year).appendTo(Row);
        $('<td>').html("<div class='text-center'><button class='btn btn-danger' onclick='Delete($(this))'>Delete</button></div>").appendTo(Row);

        //Append row to table's body  
        $('#table-body').append(Row);
        CheckSubmitBtn(); // Enable submit button  

        $("#ProductID").val = "";
        $("#products").val("");
        $("#Qty").val("0.00");
        $("#salrat").val("0.00");
        $("#salrturn").val("0.00");
        $("#Amt").val("0.00");
        // Test('products');// here, call the Test function
        sumAll();
        
        //setTimeout(function () { sumAll(); }, 1000);
    }
    else {
        ShowMsn("Products can not be duplicated.");
    }
}

// clear all textboxes inside form  
function ClearForm() {
    $('#form-container input[type="text"]').val('');
}

//Msn label for notifications  
function ShowMsn(message) {
    $('#Msn').html(message);
}
//Clear text of Msn label  
function ClearMsn() {
    $('#Msn').html("");
}

//Delete selected row  
function Delete(row) { // remove row from table  

    var ddsrid =row.closest('tr').children('td:eq(0)').text();
    console.log('ddsrid', ddsrid);
    if (ddsrid == "") {
        row.closest('tr').remove();
        CheckSubmitBtn();
        setTimeout(function () { sumAll(); }, 2000);
    } else {
        deleteDDsr(ddsrid);
        location.reload();
    }

    //setTimeout(function () { subAll(); }, 2000);
}

//Enable or disabled submit button  
function CheckSubmitBtn() {
    if ($('#table-information > tbody  > tr').length > 0) { // count items in table if at least 1 item is found then enable button  
        $('#SubmitMoviesBtn').removeAttr("disabled");
    } else {
        $('#SubmitMoviesBtn').attr("disabled", "disabled");
    }
}


//Sum All Amount and print at the End..
var sumAll = function () {

    var table = document.getElementById("table-information"), sumVal = 0;
    //console.log('table.rows.length', table.rows.length - 1);

    //$("#table-information").parent().children().find("tr:eq(1)").find("td:nth-child(5)").text();

    for (var i = 1; i < table.rows.length; i++) {
        sumVal = sumVal + parseInt(table.rows[i].cells[5].innerHTML);
        //console.log('a',table.rows[i].cells[5].innerHTML);
    }

    //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
    console.log('sum all', sumVal);

    var dis = $('#saleper').val();
    var afterDis = sumVal * (dis / 100);

    totalAfterDiscount = sumVal - afterDis;
    $('#ttlamt').val(totalAfterDiscount);
    console.log('totalAfterDiscount', totalAfterDiscount);
}


//SubtractAll Amount and print at the End..
var subAll = function () {

    var table = document.getElementById("table-information"), sumVal = 0;

    for (var i = 1; i < table.rows.length; i++) {
        sumVal = parseInt(table.rows[i].cells[4].innerHTML) - sumVal;
    }

    //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
    console.log('sub all', sumVal);

    var dis = $('#saleper').val();
    var afterDis = sumVal * (dis / 100);

    totalAfterDiscount = sumVal - afterDis;
    $('#ttlamt').val(totalAfterDiscount);

}
var redirectForUpdate = function () {
    window.location.href = '/home/About';
}


function deleteDDsr(dsrid) {
    var test;
    test = confirm("Are you Sure you Want to Delete?");

    if (test) {
        var uri = '/home/deleteDDsr/' + dsrid;
        //var uri = '/dsr/getArea/';

        $.ajax({
            type: "POST",
            url: uri, ///Item/GetItemType',
            contentType: 'application/json;',
            dataType: "json",
            success: successFunc,
            error: errorFunc
        });
        function successFunc(data, status) {
            alert('Product of dsr has been deleted!..');
            //console.log('data',data);
            //console.log('status',status);
            //location.reload();
        }
        function errorFunc(data) {

            //console.log('error', data);
            alert('Product of dsr has been deleted!..');
            //location.reload();

        }

    } else {
        alert('not Deleting...');
    }

}