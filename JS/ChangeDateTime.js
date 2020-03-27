//this script will compute the duration between start date and end date
var StartDateTime;
var EndDateTime;
$(document).ready(function () {
    var GIDT1 = $(".clsDateTimeGI");
    var GIDT2 = $(".clsDateTimeGI2");
    var _SDate;
    
    GIDT1.change(function(){
        var StartDate = $("#idDateReq").val();
        var StartTime = $("#idTimeReq").val();

        $("#idSDateTimeGI").val(StartDate + " " + StartTime);
        StartDateTime = $("#idSDateTimeGI").val();
        change();
    }); 

    GIDT2.change(function(){
        var StartDate = $("#idEndDate").val();
        var StartTime = $("#idEndTime").val();

        $("#idEDateTimeGI").val(StartDate + " " + StartTime);
        EndDateTime = $("#idEDateTimeGI").val();
        change();
    });
});

function change(){
    // var start_actual_time  =  StartDateTime;
    // var end_actual_time    =  EndDateTime;

    sDate = new Date(StartDateTime);
    eDate = new Date(EndDateTime);
    //debugger;
    var diff = eDate - sDate;
    // debugger;
    var diffSeconds = diff/1000;
    var HH = Math.floor(diffSeconds/3600);
    var MM = Math.floor(diffSeconds%3600)/60;

    var formatted = ((HH < 10)?("0" + HH):HH) + "hr:" + ((MM < 10)?("0" + MM):MM + "min")
    //alert(formatted);
    console.log(formatted);
    if(formatted == "NaNhr:NaNmin"){
        //alert('got NaN');    
    }else{
        $('#idDuration').val(formatted);
    };
}