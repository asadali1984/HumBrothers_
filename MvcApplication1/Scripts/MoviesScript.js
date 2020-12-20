$(document).ready(function () {
    //set onclick events for buttons  
    $('#AddTempMovieBtn').click(function () { AddTempMoview(); });
    $('#SubmitMoviesBtn').click(function () { PostMovies(); });
});

//Send List of Movies to controller  
function PostMovies() {
    //Build List object that has to be sent to controller  
    var MoviesList = []; // list object  
    $('#table-information > tbody  > tr').each(function () { //loop in table list  

        var Movie = {}; // create new Movie object and set its properties  
        Movie.Title = this.cells[0].innerHTML;
        Movie.Summary = this.cells[1].innerHTML;
        Movie.Year = this.cells[2].innerHTML;

        MoviesList.push(Movie); // add Movie object to list object  
    });

    //Send list of movies to controller via ajax  
    $.ajax({
        url: '/home/SaveMovies',
        type: "POST",
        data: JSON.stringify(MoviesList),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            // Process response from controller  
            if (response === true) {
                ShowMsn("Movies have been saved successfully."); // show success notification  
                ClearForm(); //clear form fields  
                $('#table-body').empty(); // clear table items  
                CheckSubmitBtn(); // disable submit button  
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
    Movie.Title = $('#TitleTxt').val();
    Movie.Summary = $('#SummaryTxt').val();
    Movie.Year = $('#YearTxt').val();


    //Validate required fields  
    var Errors = ""; // Main Error Messages Variable  

    //validate Title  
    if (Movie.Title.trim().length == 0) {
        Errors += "Title is required.<br>";
        $('#TitleTxt').addClass("border-danger");
    } else {
        $('#TitleTxt').removeClass("border-danger");
    }

    //validate Summary  
    if (Movie.Summary.trim().length == 0) {
        Errors += "Please provide a summary.<br>";
        $('#SummaryTxt').addClass("border-danger");
    } else {
        $('#SummaryTxt').removeClass("border-danger");
    }

    //validate Year  
    if (Movie.Year.trim().length < 4) {
        Errors += "A valid Year is required.<br>";
        $('#YearTxt').addClass("border-danger");
    } else {
        $('#YearTxt').removeClass("border-danger");
    }

    if (Errors.length > 0) {//if errors detected then notify user and cancel transaction  
        ShowMsn(Errors);
        return false; //exit function  
    }
    //end validation required  

    //Validate no duplicated Titles  
    var ExistTitle = false; // < -- Main indicator  
    $('#table-information > tbody  > tr').each(function () {
        var Title = $(this).find('.TitleCol').text(); // get text of current row by class selector  
        if (Movie.Title.toLowerCase() == Title.toLowerCase()) { //Compare provided and existing title  
            ExistTitle = true;
            return false;
        }
    });

    //Add movie if title is not duplicated otherwise show error  
    if (ExistTitle === false) {
        ClearMsn();
        //Create Row element with provided data  
        var Row = $('<tr>');
        $('<td>').html(Movie.Title).addClass("TitleCol").appendTo(Row);
        $('<td>').html(Movie.Summary).appendTo(Row);
        $('<td>').html(Movie.Year).appendTo(Row);
        $('<td>').html("<div class='text-center'><button class='btn btn-danger btn-sm' onclick='Delete($(this))'>Remove</button></div>").appendTo(Row);

        //Append row to table's body  
        $('#table-body').append(Row);
        CheckSubmitBtn(); // Enable submit button  
    }
    else {
        ShowMsn("Title can not be duplicated.");
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
    row.closest('tr').remove();
    CheckSubmitBtn();
}

//Enable or disabled submit button  
function CheckSubmitBtn() {
    if ($('#table-information > tbody  > tr').length > 0) { // count items in table if at least 1 item is found then enable button  
        $('#SubmitMoviesBtn').removeAttr("disabled");
    } else {
        $('#SubmitMoviesBtn').attr("disabled", "disabled");
    }
}