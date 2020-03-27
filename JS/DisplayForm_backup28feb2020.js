var siteURL = _spPageContextInfo.webAbsoluteUrl;
var tenantURL = "https://measatsatellite.sharepoint.com";
var cu = _spPageContextInfo.userId; //912
var cemail = _spPageContextInfo.userEmail; //jomar@srkk.com
var uname = _spPageContextInfo.userDisplayName;

var itemID;

var siteURL = _spPageContextInfo.webAbsoluteUrl;
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
$(document).ready(function () {
    //Get values from ID
    var url = window.location.href;
    //decodeURIComponent($.urlParam('?ID='))
    var id = url.split('?ID=')[1];
    itemID = id;
    //get value eCM using current id from URL
    $.ajax({
        //url: siteURL + "/_api/web/lists/getbytitle('e-CM')/items?$filter=ID eq '"+id+"'&$select=*,Person_x0020_to_x0020_Inform_x00/Title&$expand=Person_x0020_to_x0020_Inform_x00&$select=*,Requester_x0020_Name/Title&$expand=Requester_x0020_Name&$select=*,Implementer/Title&$expand=Implementer&$select=*,HOD/Title&$expand=HOD&$select=*,Requester_x0020_Manager/Title&$expand=Requester_x0020_Manager",        
        url: siteURL + "/_api/web/lists/getbytitle('e-CM')/items?$filter=ID eq '"+id+"'&$select=Implementer_x0020_Manager/Title&$expand=Implementer_x0020_Manager/Id&$select=*,Facility/Title&$expand=Facility&$select=*,GSA/Title&$expand=GSA&$select=*,SEO/Title&$expand=SEO&$select=*,Person_x0020_to_x0020_Inform_x00/Title&$expand=Person_x0020_to_x0020_Inform_x00&$select=*,Requester_x0020_Name/Title&$expand=Requester_x0020_Name&$select=*,Implementer/Title&$expand=Implementer&$select=*,HOD/Title&$expand=HOD&$select=*,Requester_x0020_Manager/Title&$expand=Requester_x0020_Manager",        
        
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // Returning the results
            console.log(data);
            var item = data.d.results;
            if (data.d.results.length != 0) {
                var vLookupID = item[0].OData__vLookupID;

                var formStat = item[0].Form_x0020_Status;
                var formStat2 = item[0].Workflow_x0020_Status;
                if(formStat != "Submit"){
                    $("#divEditBtn").append('<a class="btn btn-outline-primary btn-rounded waves-effect clsbtnEdit" onclick="gotoEdit()">Edit</a>');
                }else{
                    $("#divEditBtn").append('<a class="btn btn-outline-primary btn-rounded waves-effect" id="idDisabledbtn">EDIT</a>');
                }

                if(formStat2 == 'FULLY APPROVED'){
                    $("#divEditBtn").append('<a class="btn btn-outline-primary btn-rounded waves-effect" onclick="showCloseCM()" id="idCloseCM">Close CM</a>');
                }

                //alert for editing if Form status is "Submit"
                $("#idDisabledbtn").on("click", function(){
                    alert("Item is submitted. Editting is unavailable.");
                });

                var Status = item[0].Workflow_x0020_Status;
                var CMNumber = item[0].REF;
                var Criticality = item[0].Criticality;
                var Area = item[0].Area;
                var ChangeCategory = item[0].Change_x0020_Category;
                var ChangeType = item[0].Type_x0020_of_x0020_Change;
                var Platform = item[0].Type2;
                var PlatFormArea = item[0].Area2;
                var Customer = item[0].Customer;

                var tblChangeInfo = "<tr><td>Status</td><td>: " +Status+"</td></tr>"+
									"<tr><td>CM Number</td><td>: " +CMNumber+"</td></tr>"+
									"<tr><td>Criticality</td><td>: " +Criticality+"</td></tr>"+
                                    "<tr><td>Area</td><td>: " +Area+"</td></tr>"+
                                    "<tr><td>Change Category</td><td>: " +ChangeCategory+"</td></tr>"+
                                    "<tr><td>Change Type</td><td>: " +ChangeType+"</td></tr>"+
                                    "<tr><td>Platform</td><td>: " +Platform+"</td></tr>"+
                                    "<tr><td>Platform Area</td><td>: " +PlatFormArea+"</td></tr>"+
                                    "<tr><td>Customer</td><td>: " +Customer+"</td></tr>";
                
                $("#tblChangeInfo tbody").append(tblChangeInfo);

                //change information
                $("#idstatus").append(item[0].Workflow_x0020_Status);
                $("#idcmnumber").append(item[0].REF);

                $("#idSlctCriticality").append(item[0].Criticality);
                
                $("#idSlctArea").append(item[0].Area);
                //debugger;

                var areaOthers = item[0].Area;
                if (areaOthers == "Other") {
                    $(".clsDivAreaOthers").fadeIn('slow')
                } else {
                    $(".clsDivAreaOthers").fadeOut('slow')
                }
                $("#idAreaOthers").append(item[0].Other_x0020_Area);
                $("#idChangeCat").append(item[0].Change_x0020_Category);
                $("#idChangeType").append(item[0].Type_x0020_of_x0020_Change);
                $("#idPlatform").append(item[0].Type2);
                $("#idPlatformArea").append(item[0].Area2);

                var PlatformAreaOthers = item[0].Area2;
                if (PlatformAreaOthers == "Other") {
                    $(".clsDivPlatFormOthers").fadeIn('slow')
                } else {
                    $(".clsDivPlatFormOthers").fadeOut('slow')
                }

                $("#idPlatFormAreaOthers").html(item[0].Other2);
                $("#idCustomer").append(item[0].Customer);

                //General Information
                $("#idTitle").append(item[0].Title);
                $("#idRequesterName").append(item[0].Requester_x0020_Name.Title);
                $("#idDepartment").append(item[0].Department);
                $("#idContact").append(item[0].Contact_x0020_No);

                if(item[0].Start_x0020_Date == null){
                    $("#idDateReq").append("");
                }else{
                    $("#idDateReq").append((item[0].Start_x0020_Date).split("T")[0]);
                    $("#idTimeReq").append(((item[0].Start_x0020_Date).split("T")[1]).substring(0, 8));
                }
                
                if(item[0].End_x0020_Date == null){
                    $("#idEndDate").append();
                }else{
                    $("#idEndDate").append((item[0].End_x0020_Date).split("T")[0]);
                    $("#idEndTime").append(((item[0].End_x0020_Date).split("T")[1]).substring(0, 8));
                }
                

                $("#idDuration").append(item[0].Duration);
                

                var idECNValue = item[0].Customer_x0020_Notification;
                if (idECNValue == false) {
                    $("#idECN").append("<input type='checkbox' disabled>");
                } else {
                    $("#idECN").append("<input type='checkbox' checked disabled>");
                    $("#idEmailContent").append(item[0].Email_x0020_Content);
                }
                
                var idNMCValue = item[0].NMC_x0020_Participation;
                if (idNMCValue == false) {
                    $("#idNMC").append("<input type='checkbox' disabled>");
                } else {
                    $("#idNMC").append("<input type='checkbox' checked disabled>");
                    $("#idNMCComment").append(item[0].Comment);
                } 

                var idPTWValue = item[0].PTW;
                if (idPTWValue == false) {
                    $("#idPTW").append("<input type='checkbox' disabled>");
                } else {
                    $("#idPTW").append("<input type='checkbox' checked disabled>");
                } 

                //Email Content
                var EmailContent = item[0].Customer_x0020_Notification;
                if (EmailContent) {
                    $(".clsDivExtCustomer").fadeIn('slow');
                } else {
                    $(".clsDivExtCustomer").fadeOut('slow');
                }

                //NMC Comment
                var CommentNMC = item[0].NMC_x0020_Participation;
                if (CommentNMC) {
                    $(".clsDivNMCComment").fadeIn('slow');
                } else {
                    $(".clsDivNMCComment").fadeOut('slow');
                }

                //Reviewer
                // $("#idAssignToOtherImp").val(item[0].Assign_x0020_to_x0020_another_x0);
                console.log("ID Implementer: ", item[0].ImplementerId);
                console.log("Name Implementer: ", item[0].Implementer.Title);

                
                //Change Type
                if(ChangeType == "Power CM"){
                    powerCM2();
                }else if(ChangeType == "TT&C & Standard CM"){
                    TTCStandardCM2();
                }else if(ChangeType == "TT&C & Power CM"){
                    TTCPowerCM2();
                    debugger;
                }
                $("#idSEOManager").append(item[0].SEO.Title);
                $("#idGSAManager").append(item[0].GSA.Title);
                $("#idFacilityManager").append(item[0].Facility.Title);

                // $("#idPersontoInform").append(item[0].Person_x0020_to_x0020_Inform_x00.Title);
                // $("#idImplementer").append(item[0].Implementer.Title);
                // console.log(item[0].ImplementerId.Title);

                var idAssignToOtherImpValue = item[0].Assign_x0020_to_x0020_another_x0;
                var implementer = item[0].Implementer.Title;
                var implementerMgr = item[0].Implementer_x0020_Manager.Title;
                if (idAssignToOtherImpValue == false) {
                    var idAssignToOtherImpValue = "False";
                    $(".clsDivImplementer").fadeOut('slow');
                    $("#idAssignToOtherImp").append("<input type='checkbox' disabled>");
                } else {
                    var idAssignToOtherImpValue = "True";
                    $(".clsDivImplementer").fadeIn('slow');
                    $("#idImplementer").append(implementer);
                    $("#idImplementerMgr").append(implementerMgr);
                    $("#idAssignToOtherImp").append("<input type='checkbox' checked disabled>");
                }
                $("#idRequesterManager").append(item[0].Requester_x0020_Manager.Title);
                $("#idHOD").append(item[0].HOD.Title);
                var persontoInform = item[0].Person_x0020_to_x0020_Inform_x00Id;
                if(persontoInform == null){
                    $("#idPersontoInform").append("N/A");
                }else{
                    $("#idPersontoInform").append(item[0].Person_x0020_to_x0020_Inform_x00.Title);
                }

                //Change Details
                $("#idJustiChange").append(item[0].Justification_x0020_of_x0020_Cha);
                $("#idHardware").append(item[0].Hardware_x0028_D_x0029_);
                $("#idPurpose").append(item[0].Purpose);
                $("#idSlctAction").append(item[0].Action);
                $("#idChangeSummary").append(item[0].Change_x0020_Summary);

                //Change Procedures
                //$("#idPreVlookUp").append(item[0].OData__vLookupID)
                // $("#idStartDatePreImp").append(item[0].Start_x0020_Date)
                // $("#idEndDatePreImp").append(item[0].End_x0020_Date)

                $("#idPersonnelName1").append(item[0].Personnel_x0020_Name1);
                $("#idPersonnelName2").append(item[0].Personnel_x0020_Name2);
                $("#idPersonnelName3").append(item[0].Personnel_x0020_Name3);
                $("#idPersonnelName4").append(item[0].Personnel_x0020_Name4);
                $("#idPersonnelName5").append(item[0].Personnel_x0020_Name5);

                $("#idPerDepartment1").append(item[0].Department_x002f_Company1);
                $("#idPerDepartment2").append(item[0].Department_x002f_Company2);
                $("#idPerDepartment3").append(item[0].Department_x002f_Company3);
                $("#idPerDepartment4").append(item[0].Department_x002f_Company4);
                $("#idPerDepartment5").append(item[0].Department_x002f_Company5);

                $("#idPerContact1").append(item[0].Personnel_x0020_Contact1);
                $("#idPerContact2").append(item[0].Personnel_x0020_Contact2);
                $("#idPerContact3").append(item[0].Personnel_x0020_Contact3);
                $("#idPerContact4").append(item[0].Personnel_x0020_Contact4);
                $("#idPerContact5").append(item[0].Personnel_x0020_Contact5);


                String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
                var status = item[0].Workflow_x0020_Status;
                var closeStatus = item[0].Close_x0020_CM_x0020_Status;
                console.log(closeStatus);
                if(closeStatus == 'Closed Successful' || status =='CLOSED-SUCCESSFUL'){
                    $("#idbtnDuplicate").removeClass('hidden');
                    $("#idCloseCM").addClass('hidden');
                    
                }else{
                    $("#idbtnDuplicate").prop("onclick", null);
                }
                //<a class="btn btn-outline-primary btn-rounded waves-effect" onclick='openConfirm()'>Duplicate</a>

                //Change Procedures
                // Pre Implementation
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Pre Implementation')/items?$filter=OData__vLookupParentID eq '" + vLookupID + "'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        var cTbody = $("#tbodyPreImp");
                        var item = data.d.results;
                        var cListname = 'Pre Implementation';
                        if (item.length != 0) {
                            $.each(item, function (i, item) {
                                trID = cListname.split(" ")[0] + item.Id;
                                var startDate = item.Start_x0020_Date_x0020_and_x0020;
                                if(startDate == null){
                                    startDate = "";
                                }else{
                                    startDate = (item.Start_x0020_Date_x0020_and_x0020).split("T")[0];
                                    var startTime = ((item.Start_x0020_Date_x0020_and_x0020).split("T")[1]).substring(0, 5);
                                } 
                                
                                var endDate = item.End_x0020_Date_x0020_and_x0020_T;
                                if(endDate == null){
                                    endDate = "";
                                }else{
                                    endDate = (item.End_x0020_Date_x0020_and_x0020_T).split("T")[0];
                                    var endTime = ((item.End_x0020_Date_x0020_and_x0020_T).split("T")[1]).substring(0, 5); 
                                }
                                
                                var tr = ("<tr id='{7}'>" +
                                    "<td width='12%'>{0}<br>{1}</td>" +
                                    "<td width='12%'>{2}<br>{3}</td>" +
                                    "<td width='50%'>{4}</td>" +
                                    "<td>{5}</td>" +

                                    "</tr>");
                                tr = tr.format([startDate,
                                    startTime,
                                    endDate,
                                    endTime,
                                    item.Title,
                                    item.Implementer,
                                    item.Id,
                                    trID,
                                    cListname]);
                                $(cTbody).append(tr);
                            });
                        } else {
                            console.log("no data");
                        }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Pre Implementation");
                    }
                });

                // Implementation
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Implementation')/items?$filter=OData__vLookupParentID eq '" + vLookupID + "'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        // console.log("odaa thing", data)
                        var cTbody = $("#tbodyImp");
                        var item = data.d.results;
                        var cListname = 'Implementation';
                        if (item.length != 0) {
                            $.each(item, function (i, item) {
                                // debugger;
                                trID = cListname.split(" ")[0] + item.Id;
                                // debugger;
                                var startDate = (item.Start_x0020_Date_x0020_and_x0020).split("T")[0];
                                var startTime = ((item.Start_x0020_Date_x0020_and_x0020).split("T")[1]).substring(0, 5);
                                var endDate = (item.End_x0020_Date_x0020_and_x0020_T).split("T")[0];
                                var endTime = ((item.End_x0020_Date_x0020_and_x0020_T).split("T")[1]).substring(0, 5);
                                var tr = ("<tr id='{7}'>" +
                                    "<td width='12%'>{0}<br>{1}</td>" +
                                    "<td width='12%'>{2}<br>{3}</td>" +
                                    "<td width='50%'>{4}</td>" +
                                    "<td>{5}</td>" +

                                    "</tr>");
                                tr = tr.format([startDate,
                                    startTime,
                                    endDate,
                                    endTime,
                                    item.Title,
                                    item.Implementer,
                                    item.Id,
                                    trID,
                                    cListname]);
                                $(cTbody).append(tr);
                            });
                        } else {
                            console.log("no data");
                        }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Implementation");
                    }
                });

                // Post Implementation
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Post Implementation')/items?$filter=OData__vLookupParentID eq '" + vLookupID + "'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        var cTbody = $("#tbodyPostImp");
                        var item = data.d.results;
                        var cListname = 'Post Implementation';
                        if (item.length != 0) {
                            $.each(item, function (i, item) {
                                // console.log("hello?")
                                trID = cListname.split(" ")[0] + item.Id;
                                var startDate = (item.Start_x0020_Date_x0020_and_x0020).split("T")[0];
                                var startTime = ((item.Start_x0020_Date_x0020_and_x0020).split("T")[1]).substring(0, 5);
                                var endDate = (item.End_x0020_Date_x0020_and_x0020_T).split("T")[0];
                                var endTime = ((item.End_x0020_Date_x0020_and_x0020_T).split("T")[1]).substring(0, 5);
                                var tr = ("<tr id='{7}'>" +
                                    "<td width='12%'>{0}<br>{1}</td>" +
                                    "<td width='12%'>{2}<br>{3}</td>" +
                                    "<td width='50%'>{4}</td>" +
                                    "<td>{5}</td>" +

                                    "</tr>");
                                tr = tr.format([startDate,
                                    startTime,
                                    endDate,
                                    endTime,
                                    item.Title,
                                    item.Implementer,
                                    item.Id,
                                    trID,
                                    cListname]);
                                $(cTbody).append(tr);
                            });
                        } else {
                            console.log("no data");
                        }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Post Implementation");
                    }
                });

                // Impact Assessment
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Impact Assessment')/items?$filter=OData__vLookupParentID eq '" + vLookupID + "'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        console.log(data);
                        var cTbody = $("#tbodyImpact");
                        var item = data.d.results;
                        var cListname = 'Impact Assessment';
                        if (item.length != 0) {
                            $("#idImpactDesc").append(item[0].Title);
                            $("#idImpactScale").append(item[0].Scale);
                            $("#idImpactMitigationAction").append(item[0].Mitigation_x0020_Actions);
                            $.each(item, function (i, item) {
                                trID = cListname.split(" ")[0] + item.Id;
                                var tr = ("<tr id='{5}'>" +
                                    "<td>{0}</td>" +
                                    "<td>{1}</td>" +
                                    "<td>{2}</td>" +
                                    "</tr>");
                                tr = tr.format([item.Title,
                                item.Scale,
                                item.Mitigation_x0020_Actions,
                                item.Id,
                                    trID]);
                                $(cTbody).append(tr);
                            });
                        } else {
                            console.log("no data");
                        }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Impact Assessment");
                    }
                });

                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('e-CM')/items?$filter=ID eq '" + id + "'&$select=Title,ID,Attachments,AttachmentFiles&$expand=AttachmentFiles",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        console.log("@ New Data: ", data);
                        var item = data.d.results;

                        $.each(item, function (i, item) {
                            var attItems = item.AttachmentFiles.results;

                            if (attItems.length != 0){
                                $(item.AttachmentFiles.results).each(function (i, v) {
                                    $("#attItems").append('<a href="' + tenantURL + attItems[i].ServerRelativeUrl + '"><span style="">' + attItems[i].FileName + '</span></a>');
                                    // $(".tblAttachment tr:last-child").append(inpFile);
                                });
                            }else{
                                console.log("No items aavailable");
                                $("#attItems").append('<span>No Attachments Available</span></a>');
                            }
                            
                        })
                    }
                });

                //Fallback
                $("#idFallBack").append(item[0].Fallback_x0020_Procedures);


            } else {
                //alert('Value cannot be found')
                noData();
            }
        },
        error: function (data) {

        }
    });

    $('input[name=radioCrit]:radio').click(function () {   //Hook the click event for selected elements
        //alert($('input[name=radioCrit]:radio:checked').val());
    });

    //show all the collapse div
    $("#showAll").on("click", function(){
        $(".collapse").addClass('show');
    });

    
    $("#idCloseCMbtn").on("click", function(){
        $("#idModalCloseCM").modal('show');
    });
});

function powerCM2(){
    $(".clsGSA").fadeIn('slow');
    $(".clsFacility").fadeIn('slow');

    $(".clsSEO").fadeOut('slow');
}

function TTCStandardCM2(){
    $(".clsSEO").fadeIn('slow')

    $(".clsGSA").fadeOut('slow');
    $(".clsFacility").fadeOut('slow');
}

function TTCPowerCM2(){
    $(".clsGSA").fadeIn('slow');
    $(".clsSEO").fadeIn('slow');
    $(".clsFacility").fadeIn('slow');
}

function StandardCM(){
    $(".clsGSA").fadeOut('slow');
    $(".clsSEO").fadeOut('slow');
    $(".clsFacility").fadeOut('slow');
}

function saveAsDraft() {
    $.getScript("https://measatsatellite.sharepoint.com/sites/ECM/SiteAssets/eCM/JS/SaveasDraft.js");
}

function Submit() {
    $.getScript("https://measatsatellite.sharepoint.com/sites/ECM/SiteAssets/eCM/JS/Submit.js");
}

// function discard(){
//     // alert('discard');
//     // debugger;
//     // $.getScript("https://measatsatellite.sharepoint.com/sites/ECM/SiteAssets/eCM/JS/Discard.js");
//     _modalTxt = "<h5>Are you sure to discard this item?</h5>";
// 	openModalDiscard("#idModalDiscard",_modalTxt, false);
// }

function openModalDiscard(id, t, r) {
    $(id).modal('show');
    $('.clsModalContent').html(t);
    return r;
}

function noData() {
    _modalTxt = "<h5>Sorry ID does not exist.</h5>";
    openModal("#idModalNoData", _modalTxt, false);
}

function openModal(id, t, r) {
    if (id == 'idModalNoData') {
        $(".modal-backdrop.fade").css('opacity', 1);
    }
    $(id).modal('show');

    //$('#idModalRSVP').modal('show',{backdrop: 'static', keyboard: false}) 
    $('.clsModalContent').html(t);
    return r;
}

function closeModal() {
    $("#s4-workspace").html('');
    // $(".modal-backdrop.fade").css('opacity',1);
    self.location = siteURL;
}

function close() {
    $("#s4-workspace").html('');
    $(".modal-backdrop.fade").css('opacity', 1);
    //self.location = siteURL;
}

function noSave() {
    self.location = siteURL;
}

String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function (item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};

//jomar ADDED

function gotoEdit(){
    self.location = siteURL + "/Pages/EditForm.aspx?ID=" + itemID;
}

function openConfirm(){
	$("#idModalDuplicate").modal('show');
}

var formStat = '';
function duplicateItem(){
    var arrDup = [];
    arrDup["Duplicate"] = 'YES';

    console.log(arrDup);
    formStat = 'dup';
    saveFormSubmit('e-CM', arrDup, itemID);
}
var closeCM = [];

function showCloseCM(){
    $("#idModalCloseCM").modal('show');
}
function CloseItem(){
    $("#idModalCloseCM").modal('hide');
    $("#idModalCloseForm").modal('show');
    //cmData();
}

function cmData(){
    closeCM["Close_x0020_CM_x0020_Status"] = $("#idSlctCloseStatus").val();
    closeCM["CM_x0020_Closed_x0020_Comment"] = $("#idCloseCMComment").val();
    console.log(closeCM);
    formStat = 'close';
    saveFormSubmit('e-CM', closeCM, itemID);
}

function print(){
    self.location = siteURL + "/Pages/Print.aspx?ID=" + itemID;
}

var listItem;
function saveFormSubmit(listName, data, ID){
    var clientContext = new SP.ClientContext(siteURL);
    var list = clientContext.get_web().get_lists().getByTitle(listName);
    // var ListItemInfo = new SP.ListItemCreationInformation();
    console.log("ID:"+ID);

    listItem = list.getItemById(ID);
    for (var property in data) {
      if (property != "__metadata")
        if (!property.startsWith("$"))
          if (property != "ID")
            if (property != "Id") {
              listItem.set_item(property, data[property]);
              //console.log(property, data[property]);
            }
    }

    listItem.update();
    //clientContext.load(listItem);//load all the items
    clientContext.executeQueryAsync(
    Function.createDelegate(this, onQuerySucceededSubmit),
    Function.createDelegate(this, onQueryFailedSubmit))

}
function onQuerySucceededSubmit(){
    showSuccessModal();
}

function onQueryFailedSubmit(sender, args){
    console.log("Fail!" + args + "\n");
    console.log(args);
    console.log('Failed: \n' + args.get_message() + '\n' + args.get_stackTrace());
    _modalTxt = '<h4>Failed: ' + args + '</h4>';
    openModalSubmit('#idModalDanger', _modalTxt);
    $('.clsModalFailedFooter').html('<a href="https://measatsatellite.sharepoint.com/sites/ECM/" class="btn btn-primary" >Close</a>')
}

function showSuccessModal(){
    if(formStat == 'dup'){
        _modalTxt = '<h5>Item successfully duplicated.</h5><p class="text-warning text-left ml-3">Note: The duplicated item will show after few minutes depends on the data.</p>';
        openModalSubmit('#idModalSuccess', _modalTxt);
    }else{
        _modalTxt = '<h5>Item successfully closed.</h5>';
        openModalSubmit('#idModalSuccess', _modalTxt);
    }
    
    $('.clsModalSuccessFooter').html('<a href="https://measatsatellite.sharepoint.com/sites/ECM/" class="btn btn-primary" >Close</a>');
    debugger;
}
  
  
  //show modal
  function openModalSubmit(id, t){
    debugger;
      $(id).modal('show');
      $('.clsModalContentSubmit').html(t);
  }