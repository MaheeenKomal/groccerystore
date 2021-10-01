$(document).ready(function() {
    // for displaying data
    function displaydata() {
        output = "";
        $.ajax({
            url: "retreive.php",
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                // console.log(data);
                if (data) {
                    x = data;
                } else {
                    x = "";
                }
                for (i = 0; i < x.length; i++) {
                    output += "<tr><td>" + x[i].id + "</td><td>" +
                        x[i].fruit + "</td><td>" +
                        x[i].vegies + "</td><td>" +
                        x[i].dairy +
                        "</td><td> <a href='#webform'> <button type='button' class='btn btn-warning button-update' data-sid=" + x[i].id + ">update</button></a> <button type='button' class='btn btn-danger button-del' data-sid=" + x[i].id + ">delete</button> </td></tr>";

                }
                $('#tbl-body').html(output);
            }
        });
    }
    displaydata();



    $("#btn-add").click(function(e) {
        e.preventDefault();
        console.log('Data is entered');
        let unq = $('#uid').val();
        let nme = $('#Fruit').val();
        let veg = $('#Vegies').val();
        let d = $('#Dairy').val();

        mydata = { id: unq, fruit: nme, vegies: veg, dairy: d };
        // console.log(mydata);
        $.ajax({
            url: "enter.php",
            method: 'POST',
            data: JSON.stringify(mydata),
            success: function(data) {
                // console.log(data);
                msg = ""
                $('#webform')[0].reset();
                displaydata();
            },
        });
    });

    // deleting data
    $("tbody").on("click", ".button-del", function() {

        console.log("clicked del");
        let id = $(this).attr('data-sid');
        mydata = { sid: id };
        temp = this;
        $.ajax({
            url: "delete.php",
            method: 'POST',
            data: JSON.stringify(mydata),
            success: function(data) {
                console.log(data);
                if (data == 1) {
                    msg = "<div class='alert alert-dark mt-3'>Delete Succesful</div>";
                    $(temp).closest('tr').fadeOut();
                } else if (data == 0) {
                    msg = "<div class='alert alert-dark mt-3'>Error </div>";
                }
                // $('#webform')[0].reset();
                // displaydata();
                $('#info').html(msg);

            },
        });

    });

    // Updating data
    $("tbody").on("click", ".button-update", function() {
        console.log("clicked Update");
        let id = $(this).attr('data-sid');
        mydata = { sid: id };
        $.ajax({
            url: "update.php",
            method: 'POST',
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function(data) {
                $('#uid').val(data.id);
                $('#Fruit').val(data.fruit);
                $('#Vegies').val(data.vegies);
                $('#Dairy').val(data.dairy);

            },
        });

    });
});