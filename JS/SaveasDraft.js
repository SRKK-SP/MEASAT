var vlookup;
var dataArr = [];
var dataArrPreImp = [];
var dataArrImp = [];
var dataArrPostImp = [];
var dataArrImpactAs = [];
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
$(document).ready(function(){
  $('#idDateReq').change(function (){
      $(this).removeClass('clsRequired');
  });
  $('#idEndDate').change(function (){
      $(this).removeClass('clsRequired');
  });
});
function saveAsDraft(){
  // alert('g');
   //vlookup
   vlookup = $("#idPreVlookUp").val();
   //Change Information
   var Criticality = $("#idSlctCriticality option:selected").val();
   var Area = $("#idSlctArea option:selected").val();
   var ChangeCategory = $("#idChangeCat option:selected").val();
   var ChangeType = $("#idChangeType option:selected").val();
   var Area = $("#idSlctArea option:selected").val();
   var AreaOthers = $("#idAreaOthers").val();
   var Platform = $("#idPlatform").val();
   var PlatformArea = $("#idPlatformArea option:selected").val();
   var PlatformAreaOthers = $("#idPlatFormAreaOthers").val();
   var Customer = $("#idCustomer").val();

   dataArr["Form_x0020_Status"] = "Save as Draft";
   dataArr["_vLookupID"] = vlookup;
   dataArr["Criticality"] = Criticality;
   dataArr["Area"] = Area;
   dataArr["Other_x0020_Area"] =  AreaOthers;
   dataArr["Change_x0020_Category"] = ChangeCategory;
   dataArr["Type_x0020_of_x0020_Change"] = ChangeType;
   dataArr["Type2"] = Platform;
   dataArr["Area2"] = PlatformArea;
   dataArr["Other2"] = PlatformAreaOthers;
   dataArr["Customer"] = Customer;
  //=========================================================================

  //General Information
  var Title = $("#idTitle").val();
  //  var RequesterName = $("#idRequesterName").val();
  var RequesterName = $("#idRequesterID").val();//===>>>>
  var Department = $("#idDepartment").val();
  var ContactNo = $("#idContact").val();
  //var DateRequested = $("#idReqDate").val();//no need for save as draft function
  var DateStart = $("#idSDateTimeGI").val();
  var DateEnd = $("#idEDateTimeGI").val();
   
  if(DateStart == ""){
    alert('Please add your Start Date before save.');
    $("#idDateReq").addClass('clsRequired');
    return false;
  }
  if(DateEnd == ""){
    alert('Please add your End Date before save.');
    $("#idEndDate").addClass('clsRequired');
    return false;
  }
   var DateDuration = $("#idDuration").val();

   var cbECN = $("#idECN").is(':checked');//checkbox
   var EmailContent = $("#idEmailContent").val();
   var cbNMC = $("#idNMC").is(':checked');//checkbox
   var Comment = $("#idNMCComment").val();
   var cbPTW = $("#idPTW").is(':checked');//checkbox

   dataArr["Title"] = Title;
   dataArr["Requester_x0020_Name"] = RequesterName;
   dataArr["Department"] =  Department;
   dataArr["Contact_x0020_No"] = ContactNo;
   //dataArr["Date_x0020_Requested"] = DateRequested;
   dataArr["Start_x0020_Date"] = DateStart;
   dataArr["End_x0020_Date"] = DateEnd;
   dataArr["Duration"] = DateDuration;
   dataArr["Customer_x0020_Notification"] = cbECN;
   dataArr["Email_x0020_Content"] = EmailContent;
   dataArr["NMC_x0020_Participation"] = cbNMC;
   dataArr["Comment"] = Comment;
   dataArr["PTW"] = cbPTW;
   debugger;
  //  //=========================================================================

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
      dataArr["GSA"] = gsaId;
      dataArr["Facility"] = facId;
    }
    if(ChangeType == "TT&C & Standard CM"){
      dataArr["SEO"] = seoId;
    }
    if(ChangeType == "TT&C & Power CM"){
      dataArr["SEO"] = seoId;
      dataArr["GSA"] = gsaId;
      dataArr["Facility"] = facId;
    }

    dataArr["Assign_x0020_to_x0020_another_x0"] = cbAAI;
    dataArr["Implementer"] = Implementer;//ask which group to get on this column
    dataArr["Implementer_x0020_Manager"] = ImplementerMgr;
    dataArr["Requester_x0020_Manager"] =  RequesterManagerID;
    dataArr["HOD"] = HOD;
    dataArr["Person_x0020_to_x0020_Inform_x00"] = PersontoInform;
    //=========================================================================
debugger;
    //  //Change Details
    var Justification = CKEDITOR.instances['idJustiChange'].getData();
    var Hardware = $("#idHardware").val();
    var Purpose = $("#idPurpose").val();
    var Action = $("#idSlctAction option:selected").val();
    var ChangeSummary = CKEDITOR.instances['idChangeSummary'].getData();

    dataArr["Justification_x0020_of_x0020_Cha"] = Justification;
    dataArr["Hardware_x0028_D_x0029_"] = Hardware;
    dataArr["Purpose"] =  Purpose;
    dataArr["Action"] = Action;
    dataArr["Change_x0020_Summary"] = ChangeSummary;


    //Table here.
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
   
   dataArr["Personnel_x0020_Name1"] = PersonnelName1;
   dataArr["Department_x002f_Company1"] = PersonnelDept1;
   dataArr["Personnel_x0020_Contact1"] = PersonnelContact1;

   dataArr["Personnel_x0020_Name2"] = PersonnelName2;
   dataArr["Department_x002f_Company2"] = PersonnelDept2;
   dataArr["Personnel_x0020_Contact2"] = PersonnelContact2;

   dataArr["Personnel_x0020_Name3"] = PersonnelName3;
   dataArr["Department_x002f_Company3"] = PersonnelDept3;
   dataArr["Personnel_x0020_Contact3"] = PersonnelContact3;

   dataArr["Personnel_x0020_Name4"] = PersonnelName4;
   dataArr["Department_x002f_Company4"] = PersonnelDept4;
   dataArr["Personnel_x0020_Contact4"] = PersonnelContact4;

   dataArr["Personnel_x0020_Name5"] = PersonnelName5;
   dataArr["Department_x002f_Company5"] = PersonnelDept5;
   dataArr["Personnel_x0020_Contact5"] = PersonnelContact5;
   
   //=========================================================================
   var Fallback = $("#idFallBack").val();
   dataArr["Fallback_x0020_Procedures"] = Fallback;
   // console.log(dataArr);
   checkDraftID('e-CM', dataArr, vlookup);
}

function checkDraftID(listName, datas, vLID){//checking id (if exist then update item function will called)
  console.log(vLID);
  console.log(listName);
  console.log(_spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items?$filter=OData__vLookupID eq '"+vLID+"'");
    debugger;
    $.ajax({
        //url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('"+listName+"')/items?OData__vLookupParentID eq'"+vLID+"'",
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('e-CM')/items?$filter=(OData__vLookupID eq'"+vLID+"')",
        method: "GET",
        headers: {
          "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
          if (data.d.results.length == 0) {
            //saveForm(datas, 0, _gListName);
            console.log("No results");
            console.log(data.d.results);
            debugger;
            saveFormDraft(listName, datas, 0);//0 means new item to save
          } else {//edit function
            console.log("Item Existing");
            console.log(data.d.results);
            debugger;
            saveFormDraft(listName, datas, callback, id);//0 means new item to save
          }
        },
        error: function (data) {
          console.log(JSON.stringify(data));
        }
      });
}
var listItem;
function saveFormDraft(listName, data, ID){
  //alert('saving..');
  console.log(data);
  debugger;
  _curListname = listName;
    var clientContext = new SP.ClientContext(siteURL);
  var list = clientContext.get_web().get_lists().getByTitle(listName);
  var ListItemInfo = new SP.ListItemCreationInformation();
  console.log("ID:"+ID);
  if(ID==0){
      listItem = list.addItem(ListItemInfo);
      console.log('New Item save in ' + listName);
      console.log(listItem);
  }else{
      listItem = list.getItemById(ID);
      console.log('Update Item '+ID+' in ' + listName);
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

  clientContext.executeQueryAsync(
    Function.createDelegate(this, onQuerySucceededSubmit),
    Function.createDelegate(this, onQueryFailedSubmit))

}

function onQuerySucceededSubmit(){
  var cID = listItem.get_id();
  
  if($('.inputFile').get(0).files.length === 0){
    setTimeout(function(){ $(".loader").show(); }, 4000);
      debugger;
      //uploadFileSP("e-CM", cID, filename, file);
      UploadAttachments(_curListname, cID);
      //setTimeout($(".loader").show(), 4000);
      $('#idbtnSaD').text('Saving...');
      debugger;
  }else{
      console.log('No Attachement Added');
      showSuccessModal();
  }
}

function onQueryFailedSubmit(sender, args){
  console.log('Failed: ' + args.get_stackTrace());
  _modalTxt = '<h4>Failed: ' + args.get_stackTrace() + '</h4>';
  openModalSaveAsDraft(_modalTxt, 'idModalDanger');
}

function showSuccessModal(){
  $(".loader").hide();
  _modalTxt = '<h4>Save as Draft.</h4>';
  openModalSaveAsDraft(_modalTxt, 'idModalSuccess');
  $('.modal-footer').html('<a href="https://measatsatellite.sharepoint.com/sites/ECM/" class="btn btn-default" >Close</a>')
}

function openModalSaveAsDraft(t, id){
  $('.clsModalContent').html(t);
  $('#'+id).modal('show');
}

//FUNCTION TO PROCESS THE MULTIPLE ATTACHMENT
var arraycount = 0;
var fileUploadeCount = 0; 
function UploadAttachments(listName, id){
    var rowCount = $('.tblAttachment tr').length;
    console.log(rowCount);
    if(rowCount >= 1){
        var fileArray = [];
        // $('.tblAttachment tr.tr1st').remove();
        $('.tblAttachment tr').each(function() {
            console.log($(this));
            var inputFile = $(this).find('input');
            var file = inputFile.get(0).files[0];
            fileArray.push({ "Attachment": file });
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