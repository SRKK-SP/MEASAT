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
    console.log('URL:'+website.get_url());
}
function onFailed(sender, args){
    alert("Error");
}
var userId="";
var manageremail;
var hodemail;
var mgrID;
var HODID;
var GSAId;

var UserArr = [];
var UserML = [];
$(document).ready(function () {

    CKEDITOR.replace('idEmailContent');
    CKEDITOR.replace('idJustiChange');
    CKEDITOR.replace('idChangeSummary');
    CKEDITOR.replace('idFallBack');

    getAllUsers();
    getUserMasterlist();
    $("#idImplementer").autocomplete({
        minLength: 0,
        source: UserML,
        focus: function( event, ui ) {
           $("#idImplementer").val( ui.item.label );
              return false;
        },
        select: function( event, ui ) {
           $("#idImplementer").val( ui.item.label);
           $("#Implementerid").html( ui.item.id );

           $("#idImplementerMgr").val(ui.item.mgr);
           $("#ImplementerMgrid").html(ui.item.idmgr);
           return false;
        }
    });

    // $("#idImplementer").autocomplete({
    //     minLength: 0,
    //     source: UserArr,
    //     focus: function( event, ui ) {
    //        $("#idImplementer").val( ui.item.label );
    //           return false;
    //     },
    //     select: function( event, ui ) {
    //        $("#idImplementer").val( ui.item.label);
    //        $("#Implementerid").html( ui.item.id );
    //        return false;
    //     }
    // });

    //add the ID item after select user form people picker
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

    //GSA
    // $("#idGSAManager").autocomplete({
    //     minLength: 0,
    //     source: UserArr,
    //     focus: function( event, ui ) {
    //        $("#idGSAManager").val( ui.item.label );
    //           return false;
    //     },
    //     select: function( event, ui ) {
    //        $("#idGSAManager").val( ui.item.label);
    //        $("#GSAid").html( ui.item.id );
    //        return false;
    //     }
    // });

    //show all the collapse div
    $("#showAll").on("click", function(){
        $(".collapse").addClass('show');
    });

    var now = new Date();
    var today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    $('#idReqDate').val(today);
    $(".ui-autocomplete-input").change(function(){
        // alert($(this).val());
    });

    //create vLookup ID - only work in NEW item
    let r = Math.random().toString(36).substring(2);
    console.log("random:", r);
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

    //change type condition
    //change type condition
    $('#idChangeType').change(function (){
        var val = $(this).val();
        switch (val) {
            case 'Power CM':
                showPowerCM();
              break;
            case 'TT&C & Standard CM':
                showTTCStandardCM();
              break;
            case 'TT&C & Power CM':
                showTTCPowerCM();
              break;
            case 'Standard CM':
                showStandardCM();
            break;
            default:
          }
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
                // console.log(userId);
                getID(userId, "idRequesterID");
            }
        },
        error: function () {
            //alert("Failed to get details");
        }
    });

    //check alternate approver

    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('User Master List')/items?$select=*&$select=SEO/Title,SEO/EMail&$expand=SEO/Id&$select=Facility/Title,Facility/EMail&$expand=Facility/Id&$select=GSA/Title,GSA/EMail&$expand=GSA/Id&$select=HOD/Title,HOD/EMail&$expand=HOD/Id&$select=Manager/Title,Manager/EMail,Manager/Id&$expand=Manager/Id&$select=Requester_x002f_Implementer_x002/Title,Requester_x002f_Implementer_x002/EMail&$expand=Requester_x002f_Implementer_x002/Id&$filter=Email eq '"+cemail+"'",
        // url: siteURL + "/_api/web/lists/getbytitle('User Master List')/items?$select=Title,Contact_x0020_No&$select=HOD/Title,HOD/EMail&$expand=HOD/Id&$select=Manager/Title,Manager/EMail&$expand=Manager/Id&$filter=Email eq '"+cemail+"'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // Returning the results
            console.log(data);
            if(data.d.results.length != 0){
                GSAId = data.d.results[0].GSAId;
                var GSA = data.d.results[0].GSA.Title;
                var GSAEmail = data.d.results[0].GSA.EMail;
                checkAltApprover(GSAId, GSAEmail, 'idGSAManagerID', 'idGSAManager');

                var FaciId = data.d.results[0].FacilityId;
                var Faci = data.d.results[0].Facility.Title;
                var FaciEmail = data.d.results[0].Facility.Email;

                var SEOId = data.d.results[0].SEOId;
                var SEO = data.d.results[0].SEO.Title;

                console.log(GSAId);
                var hod = data.d.results[0].HOD.Title;
                hodemail = data.d.results[0].HOD.EMail;
                getID(hodemail, 'idRequesterHODID');
                var manager = data.d.results[0].Manager.Title;
                manageremail = data.d.results[0].Manager.EMail;
                var mgrId = data.d.results[0].Manager.Id;
                checkAltApprover(mgrId, manageremail, 'idRequesterManagerID', 'idRequesterManager');
                debugger;
                var dept = data.d.results[0].Title;
                var contact = data.d.results[0].Contact_x0020_No;
                // console.log(manageremail + "MANAGER");
                // console.log(hodemail + "hodemail");

                //setting value for the ff columms.
                $("#idRequesterName").val(uname);
                $("#idRequesterID").val(userId);
                //only for power CM
                $("#idGSAManagerID").val(GSAId);
                $("#idGSAManager").val(GSA);
                $("#idFacilityManagerID").val(FaciId);
                $("#idFacilityManager").val(Faci);

                //for TT&C & Standard CM
                $("#idSEOManagerID").val(SEOId);
                $("#idSEOManager").val(SEO);

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

    $('input[name=radioCrit]:radio').click(function () {   //Hook the click event for selected elements
        console.log($('input[name=radioCrit]:radio:checked').val());
    });

    // Upload button
    $("#uploadDocumentButton").click(function(){
        var inputFile = $(this).closest('div').find('input');
        var att = inputFile.val();
        var attsplit = att.split("\\")[2];
        var inpFile = inputFile.clone();
        if(att.length == 0 ){
            alert('Please select file to upload.');
            return false;
        }else{
            var attTr = "<tr><td class='tdFiles'><span>"+attsplit+"</span></td><td><span><a class='waves-effect waves-light' onclick='clsAttRow(this);'>&nbsp;&nbsp;&nbsp;<i class='far fa-trash-alt'></i></a></span></td></tr>";
            inputFile.val(null);
            console.log(att);
            inpFile.attr("style","display:none");
            $('.tblAttachment').append(attTr);
            console.log(attTr);
        }
        // debugger;
        $(".tblAttachment tr:last-child").append(inpFile);
    });

    $(".clsAttRow").click(function(){
        // debugger;
        $(this).closest('tr').remove().slow();
    });

    //timepicker
    $('.clsTime').mdtimepicker(); //Initializes the time picker

});

//for change type
function showPowerCM(){
    $(".clsDivGSA").fadeIn('slow');
    $(".clsDivFacility").fadeIn('slow');

    $(".clsDivSEO").fadeOut('slow');
}

function showTTCStandardCM(){
    $(".clsDivSEO").fadeIn('slow')

    $(".clsDivGSA").fadeOut('slow');
    $(".clsDivFacility").fadeOut('slow');
}

function showTTCPowerCM(){
    $(".clsDivGSA").fadeIn('slow');
    $(".clsDivSEO").fadeIn('slow');
    $(".clsDivFacility").fadeIn('slow');
}
function showStandardCM(){
    $(".clsDivGSA").fadeOut('slow');
    $(".clsDivSEO").fadeOut('slow');
    $(".clsDivFacility").fadeOut('slow');
}
function clsAttRow(e){
    $(e).closest("tr").remove();
}

function checkAltApprover(mId, e, id, mgrName){
    //execute AJAX request
    //console.log(siteURL + "/_api/web/lists/getbytitle('Alternate Approver')/items?$select=Status,Approver/Title,Approver/EMail&$expand=Approver/Id&$filter=ApproverId eq '"+mId+"'");
    debugger;
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('Alternate Approver')/items?$select=*&$select=Alternative_x0020_Approver/Id,Alternative_x0020_Approver/EMail,Alternative_x0020_Approver/Title&$expand=Alternative_x0020_Approver/Id&$select=Approver/Title,Approver/EMail&$expand=Approver/Id&$filter=ApproverId eq '"+mId+"'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // Returning the results
            console.log('Alternate approver val');
            console.log(data);
            var item = data.d.results;
            debugger;
            if(item.length != 0){
                //alert('got value!');
                var approverEmail = item[0].Approver.EMail;
                var approverTitle = item[0].Approver.Title;
                var Status = item[0].Status;
                var alt = item[0].Alternative_x0020_ApproverStringId;
                var altname = item[0].Alternative_x0020_Approver.Title;
                debugger;
                if(Status == 'On Leave'){
                    console.log('alternative approver: ' + alt);
                    $("#" + id).val(alt);
                    $("#" + mgrName).val(altname);
                }else{
                    getID(e, id);
                }
            }else{
                //alert('no vlaue')

                $("#" + id).val(mId);
                console.log('No value');
            }
        },
        error: function (data) {

        }
    });
}

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
            // console.log(data);
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

function getUserMasterlist(){
    debugger;
    console.log("USER MASTERLIST:");
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('User Master List')/items?$select=*,Manager/Title,Manager/EMail&$expand=Manager/Id&$select=*,Requester_x002f_Implementer_x002/Title&$expand=Requester_x002f_Implementer_x002/Id",
        type: "GET",
        headers: { "ACCEPT": "application/json;odata=verbose" },
        async: false,
        success: function (data) {
            // console.log(data);
            var item = data.d.results;
            if(item.length>0){
                console.log(item);
                
                //$("#" + id).val(data.d.results[0].Id);
                $(item).each(function(i,v){
                    UserML.push({value: item[i].Requester_x002f_Implementer_x002.Title, label:item[i].Requester_x002f_Implementer_x002.Title, id:item[i].Requester_x002f_Implementer_x002Id, idmgr:item[i].ManagerId, mgr:item[i].Manager.Title});
                    // console.log(v);
                    // console.log(item[i].Email + " " + item[i].Id + " " + item[i].Title);

                });
            }

        },
        error: function () {
            console.log("Failed to get details of User Master List");
        }
    });
}

function discard(){
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
	openModalNodata("#idModalNoData",_modalTxt, false);
}

function openModalNodata(id, t, r){
	$(id).modal('show');
	//$('#idModalRSVP').modal('show',{backdrop: 'static', keyboard: false})
    $('.clsModalContentNoData').html(t);
    return r;
}

function modalExit(){
    $("#modalExitConfirmation").modal('show');
}

function modalExitConfirmed(){
    window.location = siteURL + "/Pages/Home.aspx";
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