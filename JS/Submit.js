var vlookup;
var dataArrSubmit = [];
var cDispName = _spPageContextInfo.userDisplayName;
var _curListname;


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

var arrID = ["idSlctCriticality","idSlctArea", "idChangeCat", "idChangeType", "idPlatform", "idPlatformArea", "idCustomer"];
$(document).ready(function(){
    // $('#idSlctCriticality').change(function (){
    //     $(this).removeClass('clsRequired');
    // });
    // $('#idSlctArea').change(function (){
    //     $(this).removeClass('clsRequired');
    // });

    $("#idSlctCriticality,#idSlctArea,#idChangeCat,#idChangeType,#idPlatform,#idPlatformArea,#idCustomer,#idTitle,#idNMCComment,#idImplementer, #idHardware, #idPurpose, #idPersonnelName1, #idPerDepartment1, #idPerContact1").each(function(){
        $(this).change(function(){
            $(this).removeClass('clsRequired');
        });
    });

    //this function trigger when confirm button was clicked
    $("#idConfirmSubmit").on('click',function(){
        $(this).text('Please wait ...');
        SaveConfirm('1');//(1) is for submit status
    });

    
});

function Confirm(){
    if($("#idSlctCriticality").val() == "none"){
        $("#idSlctCriticality").addClass('clsRequired');
        alert('Please select criticality column');
        return false;
    }

    if($("#idSlctArea").val() == "none"){
        $("#idSlctArea").addClass('clsRequired');
        alert('Please select Area column');
        return false;
    }

    if($("#idChangeCat").val() == "none"){
        $("#idChangeCat").addClass('clsRequired');
        alert('Please select Change Category column');
        return false;
    }

    if($("#idChangeType").val() == "none"){
        $("#idChangeType").addClass('clsRequired');
        alert('Please select Change Type column');
        return false;
    }

    if($("#idPlatform").val() == "none"){
        $("#idPlatform").addClass('clsRequired');
        alert('Please select Platform column');
        return false;
    }

    if($("#idPlatformArea").val() == "none"){
        $("#idPlatformArea").addClass('clsRequired');
        alert('Please select Platform area column');
        return false;
    }

    if($("#idCustomer").val() == ""){
        $("#idCustomer").addClass('clsRequired');
        alert('Please fill up the customer column');
        return false;
    }

    if($("#idTitle").val() == ""){
        $("#idTitle").addClass('clsRequired');
        alert('Please fill up the Title column');
        return false;
    }

    // if($("#idECN").val() == ""){
    //     $("#idECN").addClass('clsRequired');
    //     alert('Please fill up the customer column');
    //     return false;
    // }

    var ecn = $("#idECN").is(':checked');
    if(ecn == true){
        if(CKEDITOR.instances['idEmailContent'].getData() == ""){
            alert('Please fill up the Email Content column');
            return false;
        }
    }

    var NMC = $("#idNMC").is(':checked');
    if(NMC == true){
        if($("#idNMCComment").val() == "none"){
            $("#idNMCComment").addClass('clsRequired');
            alert('Please fill up the NMC comment column');
            return false;
        }
    }
    
    var aimp = $("#idAssignToOtherImp").is(':checked'); 
    if(aimp == true){
        if($("#idImplementer").val() == "none"){
            $("#idImplementer").addClass('clsRequired');
            alert('Please fill up the Implementer column');
            return false;
        }
    }

    if(CKEDITOR.instances['idJustiChange'].getData() == ""){
        alert('Please fill up the Justification of Change column');
        return false;
    }

    if($("#idHardware").val() == ""){
        $("#idHardware").addClass('clsRequired');
        alert('Please fill up the Hardware column');
        return false;
    }

    if($("#idPurpose").val() == ""){
        $("#idPurpose").addClass('clsRequired');
        alert('Please fill up the Purpose column');
        return false;
    }

    // 
    if($("#idSlctAction").val() == "none"){
        $("#idSlctAction").addClass('clsRequired');
        alert('Please select Action column');
        return false;
    }

    if(CKEDITOR.instances['idChangeSummary'].getData() == ""){
        alert('Please fill up the Change Summary column');
        return false;
    }

    if($("#idPersonnelName1").val() == ""){
        $("#idPersonnelName1").addClass('clsRequired');
        alert('Please fill up atleast 1 Personnel column');
        return false;
    }

    if($("#idPerDepartment1").val() == ""){
        $("#idPerDepartment1").addClass('clsRequired');
        alert('Please fill up atleast 1 Personnel Department column');
        return false;
    }

    if($("#idPerContact1").val() == ""){
        $("#idPerContact1").addClass('clsRequired');
        alert('Please fill up atleast 1 Personnel Contact 1 column');
        return false;
    }

    $("#clsModalContentSubmit").html("");
    openModalSubmit('#idModalDiscard', 'Are you sure to submit this item?');
}



function SaveConfirm(id){
    var today = new Date().toISOString().split('T')[0];
    $("#idReqDate").val(today);
    vlookup = $("#idPreVlookUp").val();
    //Change Information
    var Criticality = $("#idSlctCriticality option:selected").val();//===>>>>
    var Area = $("#idSlctArea option:selected").val();//===>>>>
    var ChangeCategory = $("#idChangeCat option:selected").val();//===>>>>
    var ChangeType = $("#idChangeType option:selected").val();//===>>>>
    var Area = $("#idSlctArea option:selected").val();
    var AreaOthers = $("#idAreaOthers").val();
    var Platform = $("#idPlatform").val();//===>>>>
    var PlatformArea = $("#idPlatformArea option:selected").val();//===>>>>
    var PlatformAreaOthers = $("#idPlatFormAreaOthers").val();
    var Customer = $("#idCustomer").val();//===>>>>
    if(id == 1){
        dataArrSubmit["Form_x0020_Status"] = "Submit";//this will trigger the wf to run
    }else{
        dataArrSubmit["Form_x0020_Status"] = "Save as Draft";//this will trigger the wf to run
    }

    dataArrSubmit["_vLookupID"] = vlookup;
    dataArrSubmit["Criticality"] = Criticality;
    dataArrSubmit["Area"] = Area;
    dataArrSubmit["Other_x0020_Area"] =  AreaOthers;
    dataArrSubmit["Change_x0020_Category"] = ChangeCategory;
    dataArrSubmit["Type_x0020_of_x0020_Change"] = ChangeType;
    dataArrSubmit["Type2"] = Platform;
    dataArrSubmit["Area2"] = PlatformArea;
    dataArrSubmit["Other2"] = PlatformAreaOthers;
    dataArrSubmit["Customer"] = Customer;
    //=========================================================================

    //General Information
    var Title = $("#idTitle").val(); //===>>>>
    var RequesterName = $("#idRequesterID").val();//===>>>>
    var Department = $("#idDepartment").val();
    var ContactNo = $("#idContact").val();
    var DateRequested = $("#idReqDate").val();
    var DateStart = $("#idSDateTimeGI").val();
    var DateEnd = $("#idEDateTimeGI").val();

    var DateDuration = $("#idDuration").val();

    var cbECN = $("#idECN").is(':checked');//checkbox
    var EmailContent = CKEDITOR.instances['idEmailContent'].getData();
    var cbNMC = $("#idNMC").is(':checked');//checkbox
    var Comment = $("#idNMCComment").val();
    var cbPTW = $("#idPTW").is(':checked');//checkbox

    dataArrSubmit["Title"] = Title;
    dataArrSubmit["Requester_x0020_Name"] = $("#idRequesterID").val();;
    // dataArrSubmit["Requester_x0020_NameId"] = RequesterName;
    debugger;
    dataArrSubmit["Department"] =  Department;
    dataArrSubmit["Contact_x0020_No"] = ContactNo;
    dataArrSubmit["Date_x0020_Requested"] = DateRequested;//date when user submit the form
    dataArrSubmit["Start_x0020_Date"] = DateStart;//===>>>>
    dataArrSubmit["End_x0020_Date"] = DateEnd;
    dataArrSubmit["Duration"] = DateDuration;
    dataArrSubmit["Customer_x0020_Notification"] = cbECN;
    dataArrSubmit["Email_x0020_Content"] = EmailContent;
    dataArrSubmit["NMC_x0020_Participation"] = cbNMC;
    dataArrSubmit["Comment"] = Comment;
    dataArrSubmit["PTW"] = cbPTW;

    //=========================================================================
    //Reviewer
    var cbAAI = $("#idAssignToOtherImp").is(':checked');//checkbox
    var Implementer = $("#Implementerid").text();
    var ImplementerMgr = $("#ImplementerMgrid").text();
    var RequesterManagerID = $("#idRequesterManagerID").val();
    var HOD = $("#idRequesterHODID").val();//===>>>>
    var PersontoInform = $("#PersontoInformid").text();
    var gsaId = $("#idGSAManagerID").val();
    var facId = $("#idFacilityManagerID").val();
    var seoId =  $("#idSEOManagerID").val();
    debugger;
    
    if(ChangeType == "Power CM"){
        dataArrSubmit["GSA"] = gsaId;
        dataArrSubmit["Facility"] = facId;
    }
    if(ChangeType == "TT&C & Standard CM"){
        dataArrSubmit["SEO"] = seoId;
    }
    if(ChangeType == "TT&C & Power CM"){
        dataArrSubmit["SEO"] = seoId;
        dataArrSubmit["GSA"] = gsaId;
        dataArrSubmit["Facility"] = facId;
    }
    debugger;
    dataArrSubmit["Assign_x0020_to_x0020_another_x0"] = cbAAI;
    dataArrSubmit["Implementer"] = Implementer;//ask which group to get on this column
    dataArrSubmit["Implementer_x0020_Manager"] = ImplementerMgr;
    dataArrSubmit["Requester_x0020_Manager"] =  RequesterManagerID;
    dataArrSubmit["HOD"] = HOD;
    dataArrSubmit["Person_x0020_to_x0020_Inform_x00"] = PersontoInform;
    //=========================================================================

   //Change Details
    var Justification = CKEDITOR.instances['idJustiChange'].getData();
    var Hardware = $("#idHardware").val();
    var Purpose = $("#idPurpose").val();
    var Action = $("#idSlctAction option:selected").val();
    var ChangeSummary = CKEDITOR.instances['idChangeSummary'].getData();

    dataArrSubmit["Justification_x0020_of_x0020_Cha"] = Justification;
    dataArrSubmit["Hardware_x0028_D_x0029_"] = Hardware;
    dataArrSubmit["Purpose"] =  Purpose;
    dataArrSubmit["Action"] = Action;
    dataArrSubmit["Change_x0020_Summary"] = ChangeSummary;

   //  //Table here.
    //=========================================================================
    var PersonnelName1 = $("#idPersonnelName1").val();
    var PersonnelDept1 = $("#idPerDepartment1").val();
    var PersonnelContact1 = $("#idPerContact1").val();

    var PersonnelName2 = $("#idPersonnelName2").val();
    var PersonnelDept2 = $("#idPerDepartment2").val();
    var PersonnelContact2 = $("#idPerContact2").val();

    var PersonnelName3 = $("#idPersonnelName3").val();
    var PersonnelDept3 = $("#idPerDepartment3").val();
    var PersonnelContact3 = $("#idPerContact3").val();

    var PersonnelName4 = $("#idPersonnelName4").val();
    var PersonnelDept4 = $("#idPerDepartment4").val();
    var PersonnelContact4 = $("#idPerContact4").val();

    var PersonnelName5 = $("#idPersonnelName5").val();
    var PersonnelDept5 = $("#idPerDepartment5").val();
    var PersonnelContact5 = $("#idPerContact5").val();

    dataArrSubmit["Personnel_x0020_Name1"] = PersonnelName1;
    dataArrSubmit["Department_x002f_Company1"] = PersonnelDept1;
    dataArrSubmit["Personnel_x0020_Contact1"] = PersonnelContact1;

    dataArrSubmit["Personnel_x0020_Name2"] = PersonnelName2;
    dataArrSubmit["Department_x002f_Company2"] = PersonnelDept2;
    dataArrSubmit["Personnel_x0020_Contact2"] = PersonnelContact2;

    dataArrSubmit["Personnel_x0020_Name3"] = PersonnelName3;
    dataArrSubmit["Department_x002f_Company3"] = PersonnelDept3;
    dataArrSubmit["Personnel_x0020_Contact3"] = PersonnelContact3;

    dataArrSubmit["Personnel_x0020_Name4"] = PersonnelName4;
    dataArrSubmit["Department_x002f_Company4"] = PersonnelDept4;
    dataArrSubmit["Personnel_x0020_Contact4"] = PersonnelContact4;

    dataArrSubmit["Personnel_x0020_Name5"] = PersonnelName5;
    dataArrSubmit["Department_x002f_Company5"] = PersonnelDept5;
    dataArrSubmit["Personnel_x0020_Contact5"] = PersonnelContact5;

    //=========================================================================
    var Fallback = CKEDITOR.instances['idFallBack'].getData();
    dataArrSubmit["Fallback_x0020_Procedures"] = Fallback;
    // console.log(dataArrSubmit);
    checkID('e-CM', dataArrSubmit, vlookup);
}

function checkID(listName, datas, vLID){
    // alert(datas);
    console.log($("#inputFile").val());
    $('#idConfirmSubmit').attr('disabled','disabled');
    // debugger;
    $.ajax({
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items?OData__vLookupParentID eq'"+vLID+"'",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('e-CM')/items?$filter=(OData__vLookupID eq'"+vLID+"')",
        method: "GET",
        headers: {
          "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
          if (data.d.results.length == 0) {
            console.log("No results");
            console.log(data.d.results);
            saveFormSubmit(listName, datas, 0);//0 means new item to save
          } else {//edit function
            console.log("Item Existing");
            console.log(data.d.results);
            var itemID = data.d.results[0].Id;
            saveFormSubmit(listName, datas, itemID);//0 means new item to save
          }
        },
        error: function (data) {
          console.log(JSON.stringify(data));
        }
    });

}
var listItem;
function saveFormSubmit(listName, data, ID){
    debugger;
    //alert('saving..');
    $("#idModalDiscard").modal('hide');
    // console.log(data);
    _curListname = listName;
    var clientContext = new SP.ClientContext(siteURL);
    var list = clientContext.get_web().get_lists().getByTitle(listName);
    var ListItemInfo = new SP.ListItemCreationInformation();
    console.log("ID:"+ID);
    if(ID==0){
        listItem = list.addItem(ListItemInfo);
    }else{
        listItem = list.getItemById(ID);
    }
    idCheck = ID;
    console.log(listItem);
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
    clientContext.load(listItem);//load all the items
    clientContext.executeQueryAsync(
    Function.createDelegate(this, onQuerySucceededSubmit),
    Function.createDelegate(this, onQueryFailedSubmit))

}
function onQuerySucceededSubmit(){
    var cID = listItem.get_id();
    console.log("input file length: " + $('.inputFile').get(0).files.length);
    var attChecker = $('.tblAttachment tr').find('input').length;
    if(attChecker == 0){
        console.log('No Attachement to add.');
        showSuccessModal();
    }else{
        
        UploadAttachments(_curListname, cID);
        
        $('#divBtnRow div a:last-child()').text('Saving...');
    }
}

function onQueryFailedSubmit(sender, args){
    console.log('Failed: \n' + args.get_message() + '\n' + args.get_stackTrace());
    _modalTxt = '<h4>Failed: \n' + args.get_message() + '\n' + args.get_stackTrace()+'</h4>';
    openModalSubmit('#idModalDanger', _modalTxt);
    $('.clsModalFailedFooter').html('<a href="https://measatsatellite.sharepoint.com/sites/ECM/" class="btn btn-primary" >Close</a>')
}

function showSuccessModal(){
    $(".loader").hide();
  _modalTxt = '<h4>Request Successfully Save. </h4>';
  openModalSubmit('#idModalSuccess', _modalTxt);
  $('.clsModalSuccessFooter').html('<a href="https://measatsatellite.sharepoint.com/sites/ECM/" class="btn btn-primary" >Close</a>');
  debugger;
}

//show modal
function openModalSubmit(id, t){
    $(id).modal('show');
    $('.clsModalContentSubmit').html(t);
}

//FUNCTION TO PROCESS THE MULTIPLE ATTACHMENT
var arraycount = 0;
var fileUploadeCount = 0; 
function UploadAttachments(listName, id){
    var rowCount = $('.tblAttachment tr').length;
    $(".loader").show();
    // setTimeout(function(){  }, 4000);//show the loading gif
    console.log(rowCount);
    debugger;
    if(rowCount >= 1){
        var fileArray = [];
        $('.tblAttachment tr:first-child()').remove();
        $('.tblAttachment tr').each(function() {
            console.log($(this));
            var inputFile = $(this).find('input');
            if(inputFile.length > 0){
                var file = inputFile.get(0).files[0];
                fileArray.push({ "Attachment": file });
                debugger;
            }else{
                console.log('no input value');
            }
        });
        arraycount = fileArray.length;
        if (fileArray.length != 0) {  
            for (i = 0; i <= fileArray.length - 1; i++) {  

                loopFileUpload(listName, id, fileArray, i).then(  
                    function () {  
                    },  
                    function (sender, args) {  
                        console.log("Error uploading");  
                        dfd.reject(sender, args);  
                    }  
                );  
            }  
        }  
    }else{
        console.log('No Attachment to save.');
        $(".loader").hide();
    }
}

function PostAjax(siteurl, listItem) {  
    return $.ajax({  
        url: siteurl,  
        type: "POST",  
        contentType: "application/json;odata=verbose",  
        data: JSON.stringify(listItem),  
        headers: {  
            "Accept": "application/json;odata=verbose",  
            "X-RequestDigest": $("#__REQUESTDIGEST").val()  
        }  
    });  
}  
function loopFileUpload(listName, id, filearray, fileCount) {  
    var dfd = $.Deferred();  
    uploadFile(listName, id, filearray[fileCount].Attachment); return dfd.promise();  
}  
function uploadFile(listname, ID, file) {  
    var getFileBuffer = function (file) {  

        var deferred = $.Deferred();  
        var reader = new FileReader();  

        reader.onload = function (e) {  
            deferred.resolve(e.target.result);  
        }  
        reader.onerror = function (e) {  
            deferred.reject(e.target.error);  
        }  
        reader.readAsArrayBuffer(file);  
        return deferred.promise();  
    };  

    getFileBuffer(file).then(function (buffer) {  
        $.ajax({  
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listname + "')/items(" + ID + ")/AttachmentFiles/add(FileName='" + file.name + "')",  
            method: 'POST',  
            async: false,  
            data: buffer,  
            processData: false,  
            headers: {  
                "Accept": "application/json; odata=verbose",  
                "content-type": "application/json; odata=verbose",  
                "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value  

            }, success: onAttachmentSucess  
        });  
    });  
    function onAttachmentSucess() {  
        fileUploadeCount++;  
        if (arraycount == fileUploadeCount) {  
            console.log('uploaded successfully'); 
            $(".loader").hide();
            showSuccessModal();
        }  
    }  
}  

function AddAllAttachments(id){
    var data = [];
    var fileArray = [];
    $("#txtAttachements input:file").each(function () {
      if ($(this)[0].files[0]) {
        fileArray.push({ "Attachment": $(this)[0].files[0] });
      }
    });
    data.push({"Files": fileArray});
    createItemWithAttachments("Change Orders", data, id).then(
      function(){
        console.log('Item created with Multiple attachments');
      },
      function(sender, args){
        console.log('Error occured' + args.get_message());
      }
    );
}





