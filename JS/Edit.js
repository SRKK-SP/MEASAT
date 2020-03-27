var siteURL = _spPageContextInfo.webAbsoluteUrl;
var cu = _spPageContextInfo.userId; //912
var cemail = _spPageContextInfo.userEmail; //jomar@srkk.com
var uname = _spPageContextInfo.userDisplayName;
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', sharePointReady);

function sharePointReady(){
    clientContext = new SP.ClientContext.get_current();
    website = clientContext.get_web();
    clientContext.load(website);
    clientContext.executeQueryAsync(onSucceeded,onFailed);
}
function onSucceeded(){
    //console.log('URL:'+website.get_url());
}
function onFailed(sender, args){
    alert("Error");
}
var userId="";
var manageremail;
var hodemail;
var mgrID;
var HODID;

var UserArr = [];
$(document).ready(function () {
    getAllUsers();
    $("#idImplementer").autocomplete({
        minLength: 0,
        source: UserArr,
        focus: function( event, ui ) {
           $("#idImplementer").val( ui.item.label );
              return false;
        },
        select: function( event, ui ) {
           $("#idImplementer").val( ui.item.label);
           $("#Implementerid").html( ui.item.id );
           return false;
        }
    });

    $("#idPersontoInform").autocomplete({
        minLength: 0,
        source: UserArr,
        focus: function( event, ui ) {
           $("#idPersontoInform").val( ui.item.label );
              return false;
        },
        select: function( event, ui ) {
           $("#idPersontoInform").val( ui.item.label);
           $("#PersontoInformid").html( ui.item.id );
           return false;
        }
    });
     
    

    var now = new Date();
    var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    $('#idReqDate').val(today);
    $(".ui-autocomplete-input").change(function(){
        // alert($(this).val());
    });
    let r = Math.random().toString(36).substring(2);
    //console.log("random", r);
    $("#idPreVlookUp").val(r);
    //script for show and hide the  External Customer Notication
    $('#idECN').change(function () {
        if (this.checked)
            $('.clsDivExtCustomer').fadeIn('slow');
        else
            $('.clsDivExtCustomer').fadeOut('slow');
    });
    //script for show and hide the  NMC participation
    $('#idNMC').change(function () {
        if (this.checked)
            $('.clsDivNMCComment').fadeIn('slow');
        else
            $('.clsDivNMCComment').fadeOut('slow');
    });
    //script for show and hide the Implementer
    $('#idAssignToOtherImp').change(function () {
        if (this.checked)
            $('.clsDivImplementer').fadeIn('slow');
        else
            $('.clsDivImplementer').fadeOut('slow');
    });
    //script for show and hide the Others (Change Details)
    $("#idSlctArea").change(function () {
        $(this).find("option:selected").each(function () {
            var optionValue = $(this).attr("value");
            if (optionValue == "Other") {
                $(".clsDivAreaOthers").fadeIn('slow')
            } else {
                $(".clsDivAreaOthers").fadeOut('slow')
            }
        });
    }).change();
    //script for show and hide the Specify (Change Details)
    $("#idSlctAction").change(function () {
        $(this).find("option:selected").each(function () {
            var optionValue = $(this).attr("value");
            if (optionValue == "Other") {
                $(".clsDivSpecify").fadeIn('slow')
            } else {
                $(".clsDivSpecify").fadeOut('slow')
            }
        });
    }).change();
    //script for show and hide the PlatForm Area Others (Change Details)
    $("#idPlatformArea").change(function () {
        $(this).find("option:selected").each(function () {
            var optionValue = $(this).attr("value");
            if (optionValue == "Others") {
                $(".clsDivPlatFormOthers").fadeIn('slow')
            } else {
                $(".clsDivPlatFormOthers").fadeOut('slow')
            }
        });
    }).change();

    var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers?$select=Id&$filter=Email eq '"+cemail+"'";
    //execute AJAX request
    $.ajax({
        url: requestUri,
        type: "GET",
        headers: { "ACCEPT": "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            if(data.d.results.length>0){
                userId=data.d.results[0].Id;
            }
        },
        error: function () {
            //alert("Failed to get details");                
        }
    });
    
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('User Master List')/items?$select=Title,Contact_x0020_No&$select=HOD/Title,HOD/EMail&$expand=HOD/Id&$select=Manager/Title,Manager/EMail&$expand=Manager/Id&$filter=Email eq '"+cemail+"'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // Returning the results
            //console.log(data);
            if(data.d.results.length != 0){
                //alert('got value!'); 
                var hod = data.d.results[0].HOD.Title;
                hodemail = data.d.results[0].HOD.EMail;
                getID(hodemail, 'idRequesterHODID');
                var manager = data.d.results[0].Manager.Title;
                manageremail = data.d.results[0].Manager.EMail;
                getID(manageremail, 'idRequesterManagerID');
                var dept = data.d.results[0].Title;
                var contact = data.d.results[0].Contact_x0020_No;
                //console.log(manageremail + "MANAGER");
                //console.log(hodemail + "hodemail");

                //setting value for the ff columms.
                $("#idRequesterName").val(uname);
                $("#idRequesterID").val(userId);
                $("#idDepartment").val(dept);
                $("#idContact").val(contact);
                $("#idRequesterManager").val(manager);
                // $("#idRequesterManagerID").val(mgrID);
                $("#idHOD").val(hod);
                // $("#idHODID").val(HODID);

            }else{
                //alert('no vlaue')
                noData();
            }
        },
        error: function (data) {

        }
    });


    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        bgiframe: true,
        width: 500,
        height: 200,
        buttons : {
             "Confirm" : function() {
                window.location.href = siteURL;           
             },
             "Cancel" : function() {
               $(this).dialog("close");
             }
           }
         });
   
     $(".confirmLink").on("click", function(e) {
         e.preventDefault();
         $("#dialog").dialog("open");
     });

    $('input[name=radioCrit]:radio').click(function () {   //Hook the click event for selected elements
        alert($('input[name=radioCrit]:radio:checked').val());
    });
});


// function saveAsDraft(){
//     $.getScript("https://measatsatellite.sharepoint.com/sites/ECM/SiteAssets/eCM/JS/SaveasDraft.js");
// }

function getID(e, id){
    //execute AJAX request
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/siteusers?$select=Id&$filter=Email eq '"+e+"'",
        type: "GET",
        headers: { "ACCEPT": "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            if(data.d.results.length>0){
                $("#" + id).val(data.d.results[0].Id);
            }

        },
        error: function () {
            //alert("Failed to get details");                
        }
    });
}

function getAllUsers(){
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/SiteUsers",
        type: "GET",
        headers: { "ACCEPT": "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            //console.log(data);
            var item = data.d.results;
            if(item.length>0){
                //$("#" + id).val(data.d.results[0].Id);
                $(item).each(function(i,v){
                    UserArr.push({value: item[i].Title, label:item[i].Title, id:item[i].Id});
                    // console.log(v);
                    // console.log(item[i].Email + " " + item[i].Id + " " + item[i].Title);

                });
            }

        },
        error: function () {
            //alert("Failed to get details");                
        }
    });
}

function discard(){
    // alert('discard');
    // debugger;
    // $.getScript("https://measatsatellite.sharepoint.com/sites/ECM/SiteAssets/eCM/JS/Discard.js");
    _modalTxt = "<h5>Are you sure to discard this item?</h5>";
	openModalDiscard("#idModalDiscard",_modalTxt, false);
}

function openModalDiscard(id, t, r){
    $(id).modal('show');
    $('.clsModalContent').html(t);
    return r;
}

function noData(){
	_modalTxt = "<h5>Sorry you are not allowed to open this page.</h5>";
	openModal("#idModalNoData",_modalTxt, false);
}

function openModal(id, t, r){
	$(id).modal('show');
	//$('#idModalRSVP').modal('show',{backdrop: 'static', keyboard: false}) 
    $('.clsModalContent').html(t);
    return r;
}

function closeModal(){
	$("#s4-workspace").html('');
    $(".modal-backdrop.fade").css('opacity',1);
    self.location = siteURL;
}

function close(){
	$("#s4-workspace").html('');
    $(".modal-backdrop.fade").css('opacity',1);
    //self.location = siteURL;
}

function noSave(){
    self.location = siteURL;
}