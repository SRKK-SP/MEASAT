var siteURL = _spPageContextInfo.webAbsoluteUrl;
var cu = _spPageContextInfo.userId; //912
var cemail = _spPageContextInfo.userEmail; //jomar@srkk.com
var uname = _spPageContextInfo.userDisplayName;
var tenantURL = "https://measatsatellite.sharepoint.com";

var UserArr = [];//jomar added
var UserML = [];
var id;
var userId="";

var userId="";
var manageremail;
var hodemail;
var mgrID;
var HODID;
var GSAId;
$(document).ready(function () {
// alert('test');
    //TExt Editors
    CKEDITOR.replace('idEmailContent');
    CKEDITOR.replace('idJustiChange');
    CKEDITOR.replace('idChangeSummary');
    CKEDITOR.replace('idFallBack');

    // CKEDITOR.instances.editor1.setData( '<p>This is the editor data.</p>' );

    // JOMAR ADDED
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
    //END JOMAR ADDDED

    //alert($("#idPreVlookUp").val());
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
            
        });
    }).change();

    

    //Get values from ID
    var url = window.location.href;
    //decodeURIComponent($.urlParam('?ID='))
    id = url.split('?ID=')[1];
    
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
            if(data.d.results.length != 0){
                var vLookupID = item[0].OData__vLookupID;
                
                //SUBMIT STATUS checking
                console.log();
                var formStat = item[0].Form_x0020_Status;
                if(formStat != "Submit"){
                    $("#divEditBtn").append('<a class="btn btn-outline-primary btn-rounded waves-effect" onclick="SaveConfirm(0);">Save</a>');
                    $("#divEditBtn").append('<a class="btn btn-outline-primary btn-rounded waves-effect" onclick="Confirm()">Submit</a>');
                }else{
                    $("#divEditBtn").append('<a class="btn btn-outline-primary btn-rounded waves-effect" id="idDisabledbtn">Submit</a>');
                }

                $("#idDisabledbtn").click(function() {
                    alert("Item is submitted. Submit is unavailable.");
                });

                $("#idPreVlookUp").val()
                console.log($("#idPreVlookUp").val(vLookupID));
                $("#idSlctCriticality").val(item[0].Criticality);
                $("#idSlctArea").val(item[0].Area);

                var areaOthers = $("#idSlctArea option:selected").attr("value");
                if (areaOthers == "Other") {
                    $(".clsDivAreaOthers").fadeIn('slow')
                } else {
                    $(".clsDivAreaOthers").fadeOut('slow')
                }

                $("#idAreaOthers").val(item[0].Other_x0020_Area);
                $("#idChangeCat").val(item[0].Change_x0020_Category);
                $("#idChangeType").val(item[0].Type_x0020_of_x0020_Change);
                $("#idPlatform").val(item[0].Type2);
                $("#idPlatformArea").val(item[0].Area2);
                //debugger;

                //show changetype hidden columns
                //Change Type
                var type= item[0].Type_x0020_of_x0020_Change;
                if(type == "Power CM"){
                    showPowerCM();
                }else if(type == "TT&C & Standard CM"){
                    showTTCStandardCM();
                }else if(type == "TT&C & Power CM"){
                    showTTCPowerCM();
                    debugger;
                }
     
                var PlatformAreaOthers = $("#idPlatformArea option:selected").attr("value");
                if (PlatformAreaOthers == "Other") {
                    $(".clsDivPlatFormOthers").fadeIn('slow')
                } else {
                    $(".clsDivPlatFormOthers").fadeOut('slow')
                }

                $("#idPlatFormAreaOthers").val(item[0].Other2);
                $("#idCustomer").val(item[0].Customer);

                //General Information
                $("#idTitle").val(item[0].Title);
                $("#idECN").val(item[0].Customer_x0020_Notification);
                $("#idNMC").val(item[0].NMC_x0020_Participation);
                $("#idPTW").val(item[0].PTW);
                $("#idRequesterID").val(item[0].Requester_x0020_NameId);
                $("#idRequesterName").val(item[0].Requester_x0020_Name.Title);
                $("#idDepartment").val(item[0].Department);
                $("#idContact").val(item[0].Contact_x0020_No);

                //JOMAR ADDED FOR HIDDEN COLUMN DATE TIME
                console.log("StartDate: "+item[0].End_x0020_Date);
                console.log("End: "+item[0].End_x0020_Date);
                $("#idReqDate").val((item[0].Date_x0020_Requested).split("T")[0]);//Date Request

                //start date and time
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

                $("#idSDateTimeGI").val(item[0].Start_x0020_Date);
                $("#idEDateTimeGI").val(item[0].End_x0020_Date);

                $("#idDuration").val(item[0].Duration);
                $("#idDuration").val(item[0].Duration);

                $("#idECN").prop("checked", item[0].Customer_x0020_Notification);
                $("#idNMC").prop("checked", item[0].NMC_x0020_Participation);
                $("#idPTW").prop("checked", item[0].PTW);
                
                //Email Content
                CKEDITOR.instances['idEmailContent'].setData(item[0].Email_x0020_Content);
                // $("#idEmailContent").val(item[0].Email_x0020_Content);
                var EmailContent = item[0].Customer_x0020_Notification;
                if (EmailContent) {
                    $(".clsDivExtCustomer").fadeIn('slow');
                } else {
                    $(".clsDivExtCustomer").fadeOut('slow');
                }
                //alert($("#idEmailContent").val());


                //NMC Comment
                $("#idNMCComment").val(item[0].Comment);
                var CommentNMC = item[0].NMC_x0020_Participation;
                if (CommentNMC) {
                    $(".clsDivNMCComment").fadeIn('slow');
                } else {
                    $(".clsDivNMCComment").fadeOut('slow');
                }

                
                //Reviewer
                if(item[0].Assign_x0020_to_x0020_another_x0 == true){
                    $("#idAssignToOtherImp").prop('checked', true);
                    $(".clsDivImplementer").show();
                }else{
                    $("#idAssignToOtherImp").prop('checked', false);
                }
                //$("#idAssignToOtherImp").val(item[0].Assign_x0020_to_x0020_another_x0);
                $("#idRequesterManagerID").val(item[0].Requester_x0020_ManagerId);
                $("#idRequesterManager").val(item[0].Requester_x0020_Manager.Title);
                $("#idRequesterHODID").val(item[0].HODId);
                $("#idHOD").val(item[0].HOD.Title);
                $("#Implementerid").text(item[0].ImplementerId);
                $("#idImplementer").val(item[0].Implementer.Title);
                $("#ImplementerMgrid").html(item[0].Implementer_x0020_ManagerId);

                $("#idImplementerMgr").val(item[0].Implementer_x0020_Manager.Title);
                $("#idPersontoInform").val(item[0].Person_x0020_to_x0020_Inform_x00.Title);
                //Change typ Value
                $("#idSEOManagerID").val(item[0].SEOId);
                $("#idSEOManager").val(item[0].SEO.Title);
                $("#idGSAManagerID").val(item[0].GSAId);
                $("#idGSAManager").val(item[0].GSA.Title);
                $("#idFacilityManagerID").val(item[0].FacilityId);
                $("#idFacilityManager").val(item[0].Facility.Title);
                debugger;
                //Change Details
                //$("#idJustiChange").val(item[0].Justification_x0020_of_x0020_Cha);
               
                CKEDITOR.instances['idJustiChange'].setData(item[0].Justification_x0020_of_x0020_Cha);
                $("#idHardware").val(item[0].Hardware_x0028_D_x0029_);
                $("#idPurpose").val(item[0].Purpose);
                $("#idSlctAction").val(item[0].Action);
                // $("#idChangeSummary").val(item[0].Change_x0020_Summary);
                CKEDITOR.instances['idChangeSummary'].setData(item[0].Change_x0020_Summary);

                $("#idPersonnelName1").val(item[0].Personnel_x0020_Name1);
                $("#idPersonnelName2").val(item[0].Personnel_x0020_Name2);
                $("#idPersonnelName3").val(item[0].Personnel_x0020_Name3);
                $("#idPersonnelName4").val(item[0].Personnel_x0020_Name4);
                $("#idPersonnelName5").val(item[0].Personnel_x0020_Name5);
                
                $("#idPerDepartment1").val(item[0].Department_x002f_Company1);
                $("#idPerDepartment2").val(item[0].Department_x002f_Company2);
                $("#idPerDepartment3").val(item[0].Department_x002f_Company3);
                $("#idPerDepartment4").val(item[0].Department_x002f_Company4);
                $("#idPerDepartment5").val(item[0].Department_x002f_Company5);
                
                $("#idPerContact1").val(item[0].Personnel_x0020_Contact1);
                $("#idPerContact2").val(item[0].Personnel_x0020_Contact2);
                $("#idPerContact3").val(item[0].Personnel_x0020_Contact3);
                $("#idPerContact4").val(item[0].Personnel_x0020_Contact4);
                $("#idPerContact5").val(item[0].Personnel_x0020_Contact5);

                String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

                //Change Procedures
                // Pre Implementation
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Pre Implementation')/items?$filter=OData__vLookupParentID eq '"+vLookupID+"'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        var cTbody = $("#tbodyPreImp");
                        var item = data.d.results;
                        var cListname = 'Pre Implementation';
                        if(item.length != 0){
                            $.each(item, function (i, item){
                                trID = cListname.split(" ")[0] + item.Id;
                                var startDate = (item.Start_x0020_Date_x0020_and_x0020).split("T")[0];
                                var startTime = ((item.Start_x0020_Date_x0020_and_x0020).split("T")[1]).substring(0,5);
                                var endDate = (item.End_x0020_Date_x0020_and_x0020_T).split("T")[0];
                                var endTime = ((item.End_x0020_Date_x0020_and_x0020_T).split("T")[1]).substring(0,5);
                                var tr =("<tr id='{7}'>"+
                                            "<td width='12%'>{0}<br>{1}</td>"+
                                            "<td width='12%'>{2}<br>{3}</td>"+
                                            "<td width='50%'>{4}</td>"+
                                            "<td>{5}</td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"editItem({6}, '{7}', '{8}')\"><i class='far fa-edit'></i></a></td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"deleteCon({6},'{7}')\"><i class='far fa-trash-alt'></i></a></td>"+
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
                        }else{
                            console.log("no data");
                        }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Pre Implementation");
                    }                     
                });

                // Implementation
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Implementation')/items?$filter=OData__vLookupParentID eq '"+vLookupID+"'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        var cTbody = $("#tbodyImp");
                        var item = data.d.results;
                        var cListname = 'Implementation%20Test';
                        if(item.length != 0){
                            $.each(item, function (i, item){
                                trID = cListname.split(" ")[0] + item.Id;
                                var startDate = (item.Start_x0020_Date_x0020_and_x0020).split("T")[0];
                                var startTime = ((item.Start_x0020_Date_x0020_and_x0020).split("T")[1]).substring(0,5);
                                var endDate = (item.End_x0020_Date_x0020_and_x0020_T).split("T")[0];
                                var endTime = ((item.End_x0020_Date_x0020_and_x0020_T).split("T")[1]).substring(0,5);
                                var tr =("<tr id='{7}'>"+
                                            "<td width='12%'>{0}<br>{1}</td>"+
                                            "<td width='12%'>{2}<br>{3}</td>"+
                                            "<td width='50%'>{4}</td>"+
                                            "<td>{5}</td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"editItem({6}, '{7}', '{8}')\"><i class='far fa-edit'></i></a></td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"deleteCon({6},'{7}')\"><i class='far fa-trash-alt'></i></a></td>"+
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
                        }else{
                            console.log("no data");
                        }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Implementation");
                    }                     
                });

                // Post Implementation
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Post Implementation')/items?$filter=OData__vLookupParentID eq '"+vLookupID+"'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        var cTbody = $("#tbodyPostImp");
                        var item = data.d.results;
                        var cListname = 'Post Implementation';
                        if(item.length != 0){
                            $.each(item, function (i, item){
                                trID = cListname.split(" ")[0] + item.Id;
                                var startDate = (item.Start_x0020_Date_x0020_and_x0020).split("T")[0];
                                var startTime = ((item.Start_x0020_Date_x0020_and_x0020).split("T")[1]).substring(0,5);
                                var endDate = (item.End_x0020_Date_x0020_and_x0020_T).split("T")[0];
                                var endTime = ((item.End_x0020_Date_x0020_and_x0020_T).split("T")[1]).substring(0,5);
                                var tr =("<tr id='{7}'>"+
                                            "<td width='12%'>{0}<br>{1}</td>"+
                                            "<td width='12%'>{2}<br>{3}</td>"+
                                            "<td width='50%'>{4}</td>"+
                                            "<td>{5}</td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"editItem({6}, '{7}', '{8}')\"><i class='far fa-edit'></i></a></td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"deleteCon({6},'{7}')\"><i class='far fa-trash-alt'></i></a></td>"+
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
                        }else{
                                    console.log("no data");
                                }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Post Implementation");
                    }                     
                });

                // Impact Assessment
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('Impact Assessment')/items?$filter=OData__vLookupParentID eq '"+vLookupID+"'",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        // console.log(data);
                        var cTbody = $("#tbodyImpact");
                        var item = data.d.results;
                        var cListname = 'Impact Assessment';
                        if(item.length != 0){
                            $("#idImpactDesc").append(item[0].Title);
                            $("#idImpactScale").append(item[0].Scale);
                            $("#idImpactMitigationAction").append(item[0].Mitigation_x0020_Actions);
                            $.each(item, function (i, item){
                                trID = cListname.split(" ")[0] + item.Id;
                                var tr =("<tr id='{5}'>"+
                                            "<td>{0}</td>"+
                                            "<td>{1}</td>"+
                                            "<td>{2}</td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"editItem({3}, '{4}', '{5}')\"><i class='far fa-edit'></i></a></td>"+
                                            "<td><a class='waves-effect waves-light' onclick=\"deleteCon({3},'{4}')\"><i class='far fa-trash-alt'></i></a></td>"+
                                        "</tr>");
                                tr = tr.format([item.Title, 
                                                item.Scale, 
                                                item.Mitigation_x0020_Actions, 
                                                item.Id, 
                                                trID,
                                                cListname]);
                                $(cTbody).append(tr);
                            });
                        }else{
                            console.log("no data");
                        }
                    },
                    error: function () {
                        console.log("Error getting the change procedures data for Impact Assessment");
                    }                     
                });

                String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
                //Attachments
                $.ajax({
                    url: siteURL + "/_api/lists/getbytitle('e-CM')/items?$filter=ID eq '" + id + "'&$select=Title,ID,Attachments,AttachmentFiles&$expand=AttachmentFiles",
                    type: "GET",
                    headers: { "ACCEPT": "application/json;odata=verbose" },
                    success: function (data) {
                        console.log("@ New Data: ", data);
                        var item = data.d.results;

                        $.each(item, function (i, item) {
                            var attItems = item.AttachmentFiles.results;
                            var fname = "";
                            if (attItems.length != 0){
                                $(item.AttachmentFiles.results).each(function (i, v) {
                                    fname = fname.format([attItems[i].FileName, id]);
                                    //$("#attItems").append('<a href="' + tenantURL + attItems[i].ServerRelativeUrl + '"><span style="">' + attItems[i].FileName + '</span></a>');
                                    var attTr = "<tr><td class='tdFiles'><span>"+attItems[i].FileName +"</span></td><td><span><a class='waves-effect waves-light' onclick=\"delRow('"+attItems[i].FileName +"', "+id+",this)\" '>&nbsp;&nbsp;&nbsp;<i class='far fa-trash-alt'></i></a></span></td></tr>";
                                    $('.tblAttachment').append(attTr);
                                });
                            }else{
                                console.log("No items aavailable");
                                $("#attItems").append('<span>No Attachments Available</span></a>');
                            }
                            
                        })
                    }
                });

                              

                //Fallback
                // $("#idFallBack").val(item[0].Fallback_x0020_Procedures);
                CKEDITOR.instances['idFallBack'].setData(item[0].Fallback_x0020_Procedures);
            }else{
                console.log('Value cannot be found')
                //noData();
            }
        },
        error: function (data) {

        }
    });

    //get the user masterlist
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
                //alert('got value!');
                
                GSAId = data.d.results[0].GSAId;
                // alert(GSAId);
                var GSA = data.d.results[0].GSA.Title;
                var GSAEmail = data.d.results[0].GSA.EMail;
                checkAltApprover(GSAId, GSAEmail, 'idGSAManagerID');

                var FaciId = data.d.results[0].FacilityId;
                var Faci = data.d.results[0].Facility.Title;
                var FaciEmail = data.d.results[0].Facility.Email;

                var SEOId = data.d.results[0].SEOId;
                var SEO = data.d.results[0].SEO.Title;
                debugger;
                console.log(GSAId);
                var hod = data.d.results[0].HOD.Title;
                hodemail = data.d.results[0].HOD.EMail;
                getID(hodemail, 'idRequesterHODID');
                var manager = data.d.results[0].Manager.Title;
                manageremail = data.d.results[0].Manager.EMail;
                var mgrId = data.d.results[0].Manager.Id;
                checkAltApprover(mgrId, manageremail, 'idRequesterManagerID');
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

    $("#showAll").on("click", function(){
        $(".collapse").addClass('show');
    });

    
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
});

//for Change Type change
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

function checkAltApprover(mId, e, id){
    //execute AJAX request
    console.log(siteURL + "/_api/web/lists/getbytitle('Alternate Approver')/items?$select=Status,Approver/Title,Approver/EMail&$expand=Approver/Id&$filter=ApproverId eq '"+mId+"'");
    debugger;
    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('Alternate Approver')/items?$select=*,Approver/Title,Approver/EMail&$expand=Approver/Id&$filter=ApproverId eq '"+mId+"'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // Returning the results
            console.log(data);
            var item = data.d.results;
            // debugger;
            if(item.length != 0){
                //alert('got value!');
                var approverEmail = item[0].Approver.EMail;
                var approverTitle = item[0].Approver.Title;
                var Status = item[0].Status;
                var alt = item[0].Alternative_x0020_ApproverStringId;
                if(Status == 'On Leave'){
                    $("#" + id).val(alt);
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

function clsAttRow(e){
    $(e).closest("tr").remove();
}

function saveAsDraft(){
    $.getScript("https://measatsatellite.sharepoint.com/sites/ECM/SiteAssets/eCM/JS/SaveasDraft.js");
}

function Submit(){
    $.getScript("https://measatsatellite.sharepoint.com/sites/ECM/SiteAssets/eCM/JS/Submit.js");
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

String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function(item) {
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

//Jomar Added

//disregard item function
function modalExit(){
    $("#modalExitConfirmation").modal('show');
}
function modalExitConfirmed(){
    window.location = siteURL + "/Pages/Home.aspx";
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


//tester for tr Attachment
function checkTR(){
    var attChecker = $('.tblAttachment tr').find('input').length;
    console.log(test);
}

//For attachment delete
function delRow(fname,id,e){
    // alert(fname);
    console.log(siteURL + "/_api/lists/getByTitle('e-CM')/getItemById("+id+")/AttachmentFiles/getByFileName('"+fname+"')");
    $.ajax({
        url: siteURL + "/_api/lists/getByTitle('e-CM')/getItemById("+id+")/AttachmentFiles/getByFileName('"+fname+"')",
        method: 'DELETE',
        headers: {
            'X-RequestDigest': $('#__REQUESTDIGEST').val()
            },
            success: function (data) {            
                // alert('deleted');
                $(e).closest("tr").remove();
            },
            error: function (data) {
                console.log(data);      
            }
    });

    // $.ajax({
    //     url: "https://sitecollectionurl/_api/web/getFileByServerRelativeUrl('/sitecollectionurl/Lists/Test/Attachments/1/test.txt')",
    //     method: 'DELETE',
    //     headers: {
    //       'X-RequestDigest': document.getElementById("__REQUESTDIGEST").value
    //       },
    //     success: function (data) {            
    //           AddAttachments();
    //       },
    //       error: function (data) {
    //           console.log(data);      
    //       }
    //   });
}