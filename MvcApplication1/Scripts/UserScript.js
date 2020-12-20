$(document).ready(function () {
    
    $("#btnLogOut").click(function () {       
        $.ajax({
            url: '/Users/logout',           
            type: 'POST',
            contentType: 'application/json;',
            dataType: 'json',
            success: function (result) {
                console.log('result', result);
                if (result == "1") {
                    window.location.href = "/Login/Index";

                } else if (result == "0") {
                    alert("Not Logout you are still Login...");
                }
            },
            error: function (err) {
                console.log(Object.values(err));
                alert("Some Thing os Wrong Please Call Administrator!!!...");
                setTimeout(function () { window.location.href = "/Login/Index"; }, 5000);
            },
        });
    });

    $("#btnlogin").click(function () {

        var item = { "Username": "", "Password": "" };
        item.Username = $("#txtusername").val();
        item.Password = $("#txtpasswrod").val();
        console.log(item);

        $.ajax({
            url: '/Users/Check',
            data: JSON.stringify(item),
            type: 'POST',
            contentType: 'application/json;',
            dataType: 'json',
            success: function (result) {
                console.log('result', result);
                if (result == "1") {
                    window.location.href = "/Home/Contact";

                } else if (result == "0") {
                    alert("Invalid User..");
                }
            },
            error: function (err) {
                console.log(Object.values(err));
                alert("Some Thing os Wrong Please Call Administrator!!!...");
                setTimeout(function () { window.location.href = "/Login/Index"; }, 5000);
            },
        });
        //$.ajax({
        //    type: "GET",
        //    contentType: "application/json; charset=utf-8",
        //    url: "/Users/Check",
        //    data: { "Username": "", "Password": "", "Email": "", "Level": "" },
        //    //data: "{ CustomerID: '" + $('#Customers').val() + "'}",
        //    dataType: "json",
        //    success: function (data) {
        //        alert(result.ex);
        //        window.location.href = "/Home/Contact";
        //        //  $("#CustomerDetails").html(data.d); https://www.facebook.com/fahim.siddiqui.771/media_set?set=a.232967276868418.1073741826.100004654417663&type=3
        //    }
        //});
    });
});


