var dsrid;

$(document).ready(function () {
    //set onclick events for buttons  
    $('#AddTempMovieBtn').click(function () { AddTempMoview(); });
    $('#SubmitMoviesBtn').click(function () {
        
        //Validate required fields  
        var Errors = ""; // Main Error Messages Variable  
        //validate Items  

            PostItemData();
        
    });
    $("#saleper").attr("disabled", true);
   
    $("#SubmitCancelBtn").click(function () { location.reload(); });


    $("#areaid").change(function () {
        getCustbyArea($(this).val());
    });

    // Getting Customer OutStanding
    $("#CustomerID").change(function () {

        getCustomerOutstan($(this).val());
        getCustomerSalper($(this).val());

    });

    //Getting Products Data
    $("#products").change(function () {
        var proid = $("#products").val();
        $("#ProductID").val(proid);
        getProductSalrat($(this).val());
        $("#Qty").focus();
    });

    $("#Qty").blur(function () {

        var qty = $("#Qty").val();
        var salrat = $("#salrat").val();

        var amt_ = parseInt(qty) * parseInt(salrat);
        $("#Amt").val(amt_);
        
    });

    getArea();
    getSalesman();
    getProduct();
});

//Getting Date:
var d = new Date();
var datetime = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();


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

function getCustbyArea(id) {
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
            $("#CustomerID").append('<option value="">Select here..</option>');
            $.each(data, function (k, v) {
                console.log(v);
                $("#CustomerID").append('<option value="' + v.cust_acc + '">' + v.CustomerName + '</option>');
            });
            //$('#customer').removeAttr('selected').find('option:first').attr('selected', 'selected');

        }

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


// GET Sales Percent
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
        console.log('data',data);
        if (data) {
            dsrid = data;
            console.log(dsrid);
            //document.getElementById("saleper").values = data[0].saleper;
            //$("#saleper").val(data[0].saleper);
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
function PostItemData() {

    var data = {};


    var item = {
        "dsrdat": "", "CustomerID": "", "CompanyId": "", "BranchId": "", "Isdone": "", "CreateAt": "", "CreateBy": "", "Isdon": "",
        "Username": "", "saleper": "", "saleper": "", "prevbal": "", "Salesman": "", "areaid": "", "furout": "", "updateBy": "",
        //"tbl_ddsr": ["{'dsrid': '', 'ProductTypeID': '','ProductID': '', 'untid': '', 'Qty': '', 'salrat': , 'salrturn: '', 'recvry': '', 'outsta': '', 'Amt': '','dsrrmk': '', 'CompanyId': '',  'BranchId': '', 'CreateAt': '', 'CreateBy': '', 'ttlamt': '', 'finlqry': '' }"]
    };

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
    item.Salesman = $("#SalesMan option:selected").html();
    item.areaid = $("#areaid").val();
    item.furout = "0.00";
    item.updateBy = "";   
    item.finlqry = "0.00";

    $.ajax({
        url: '/home/insertMdsr',
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
//Send List of Movies to controller  
function PostMovies() {
   

    //Build List object that has to be sent to controller  
    var MoviesList = []; // list object  
    
    
    $('#table-body  > tr').each(function () { //loop in table list  

        var Movie = {}; // create new Movie object and set its properties  
        Movie.dsrid = dsrid;
        Movie.ProductTypeID = '0';
        Movie.ProductID = this.cells[0].innerHTML;
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
        Movie.CreateAt = datetime;
        Movie.CreateBy = 'admin';
        Movie.CreateBy = 'admin';
        Movie.ttlamt = this.cells[5].innerHTML;
        Movie.finlqry = this.cells[2].innerHTML;
        //Movie.TitleTxt = this.cells[5].innerHTML;
        //Movie.SummaryTxt = this.cells[6].innerHTML;
        //Movie.YearTxt = this.cells[7].innerHTML;

        MoviesList.push(Movie); // add Movie object to list object  
    });
    console.log('list',MoviesList);
    //Send list of movies to controller via ajax  
    $.ajax({
        url: '/home/SaveDDSR',
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
               
            } else {
                ShowMsn("Ooops, an error has ocurrer while processing the transaction.");
            }
        }
    });

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
        $('<td style="display:none">').html(Movie.ProductID).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.Product).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.Qty).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.salrat).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.salrturn).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.Amt).addClass("TitleCol").appendTo(Row);
        //$('<td>').html(Movie.Title).addClass("TitleCol").appendTo(Row);
        //$('<td>').html(Movie.Summary).appendTo(Row);
        //$('<td>').html(Movie.Year).appendTo(Row);
        $('<td>').html("<div class='text-center'><button class='btn btn-danger btn-sm' onclick='Delete($(this))'>Remove</button></div>").appendTo(Row);

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
    }
    else {
        ShowMsn("Products can not be duplicated.");
    }
}

var tablechange = function () {
    
    var theTotal = 0;
    $("#table-information tr:not(:last-child) td:nth-child(2)").each(function () {
        theTotal += parseFloat($(this).html().replace(/[^0-9.]/g, ''));
    });
    
    $("#ttlamt").text(theTotal);
};


//SumAll Amount and print at the End..
var sumAll = function () {
   
    var table = document.getElementById("table-information"), sumVal = 0;

    for (var i = 1; i < table.rows.length; i++) {
        sumVal = sumVal + parseInt(table.rows[i].cells[5].innerHTML);
    }

    //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
    console.log('sum all',sumVal);

    var dis = $('#saleper').val();
    var afterDis = sumVal * (dis / 100);
   
    totalAfterDiscount = sumVal - afterDis;
    $('#ttlamt').val(totalAfterDiscount);
}
//SubtractAll Amount and print at the End..
var subAll = function () {

    var table = document.getElementById("table-information"), sumVal = 0;

    for (var i = 1; i < table.rows.length; i++) {
        sumVal = parseInt(table.rows[i].cells[5].innerHTML) - sumVal;
    }

    //document.getElementById("val").innerHTML = "Sum Value = " + sumVal;
    console.log('sum all', sumVal);

    var dis = $('#saleper').val();
    var afterDis = sumVal * (dis / 100);

    totalAfterDiscount = sumVal - afterDis;
    $('#ttlamt').val(totalAfterDiscount);
}

function Test(id) {

    var myselect = document.getElementById(id);
    myselect.addEventListener("change", function () {
        var index = myselect.selectedIndex;
        //alert(myselect.options[index].value);
        //getProductSalrat(index);
    });

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
    row.closest('tr').remove();
    CheckSubmitBtn();
    subAll();
}

//Enable or disabled submit button  
function CheckSubmitBtn() {
    if ($('#table-information > tbody  > tr').length > 0) { // count items in table if at least 1 item is found then enable button  
        $('#SubmitMoviesBtn').removeAttr("disabled");
    } else {
        $('#SubmitMoviesBtn').attr("disabled", "disabled");
    }
}


function deleteDsr(dsrid)
{
    var test;
    test = confirm("Are you Sure you Want to Delete?");

    if (test) {
        var uri = '/home/deleteDsr/' + dsrid;
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
            alert('DSR has been deleted!..');
            //console.log('data',data);
            //console.log('status',status);
            location.reload();
        }
        function errorFunc(data) {

            //console.log('error', data);
            alert('DSR has been deleted!..');
            location.reload();
           
        }

    } else {
        alert('notg Deleting...');
    }
    
}
var redirectForUpdate = function (id) {
    window.location.href = '/home/setPageData/' + id;
}

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
        console.log('dsr-data', data);
        $("#areaid").val(data[0].areaid);
        $("#saleper").val(data[0].saleper);
        $("#prevbal").val(data[0].prevbal);
        $("#ttlamt").val(data[0].ttlamt);
        
        //Getting Details DSR

        getDsrListforUpdate(id);
        //$.each(data, function (k, value) {
        //    console.log('saleper', value.saleper);

        //    $.each(data, function (k, value) {
        //        var chtml = "";
        //        chtml += "'<tr>";
        //        chtml += "    <td>" + value.dsrdat + "</td>";
        //        chtml += "    <td>" + value.CustomerName + "</td>";
        //        chtml += "    <td><a href='#' class='btn btn-danger' onclick='deleteDsr(" + value.dsrid + ")'>Delete</a></td>";
        //        chtml += " </tr>'";
        //        //var tr = $("<tr />")
        //        //$.each(value, function (k, v) {
        //        //    tr.append(
        //        //      $("<td />", {
        //        //          html: v
        //        //      })[0].outerHTML
        //        //    );
        //        //    $("#dsrList tbody").append(tr)
        //        //})


        //        $('#table-information > tbody').append(chtml);

        //    });
        //    //$("#tableContainer").html(html);

        //});
    }
    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
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
                chtml += "    <td>" + value.ProductName + "<input type='hidden' value='" + value.ProductID + "' /></td>";
                chtml += "    <td>" + value.Qty + "</td>";
                chtml += "    <td>" + value.salrat + "</td>";
                chtml += "    <td>" + value.salrturn + "</td>";
                chtml += "    <td>" + value.Amt + "</td>";
                chtml += "    <td><a href='#' class='btn btn-danger' onclick='deleteDsr(" + value.ddsr + ")'>Delete</a></td>";
                chtml += " </tr>'";
            
                $('#table-information > tbody').append(chtml);

            });
       
    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}

function getDsr() {
    var uri = '/home/getDsr';
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

        //$("#products").empty();
        //$("#products").append('<option value="">Select here..</option>');
        $.each(data, function (k, value) {
            var chtml = "";
            chtml += "'<tr>";
            chtml += "    <td>" + value.dsrdat + "</td>";
            chtml += "    <td>" + value.CustomerName + "</td>";
            chtml += "    <td><a href='#' class='btn btn-info' onclick='redirectForUpdate(" + value.dsrid + ")'>Update</a> <a href='#' class='btn btn-danger' onclick='deleteDsr(" + value.dsrid + ")'>Delete</a></td>";
            chtml += " </tr>'";
            //var tr = $("<tr />")
            //$.each(value, function (k, v) {
            //    tr.append(
            //      $("<td />", {
            //          html: v
            //      })[0].outerHTML
            //    );
            //    $("#dsrList tbody").append(tr)
            //})
         
            
            $('#dsrList > tbody').append(chtml);            

        });
        //$("#tableContainer").html(html);

    }

    function errorFunc(data) {
        //alert(Object.values(err));
        console.log(data);

    }
}
