var _modalHeader;
var _modalTxt;
var _modalBody;
var _modalFooter;
var vlookup;
var listName;
var cListname;
var cValues;
var editData;
var ctrID;

var dataArrPreImp = [];
var dataArrImp = [];
var dataArrPostImp = [];
var dataArrImpactAs = [];

var cTable;
var cmodalID;
var cTbody;

function showPreImpModal(itemId) {
    // debugger;
    listName = 'Pre Implementation Test';
    _modalHeader = "New Pre Implementation";
    _modalBody = '<div class="col-md-8">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Start Date</label>' +
        '</div>' +
        '<div class="col-md-5">' +
        '<input type="datetime-local" class="form-control" id="idStartDate">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>End Date</label>' +
        '</div>' +
        '<div class="col-md-5">' +
        '<input type="datetime-local" class="form-control" id="idEndDate">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Action Taken</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea class="form-control" id="idActionTaken" rows="4"></textarea>' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Implementor</label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="idImplementer">' +
        '</div>' +
        '</div>' +
        '</div>';
    
        _modalFooter = '<a class="btn btn-primary" onclick="PreImpSave('+itemId+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    openModal('#tblPreImp', 'modalIMP', '#tbodyPreImp', _modalHeader, _modalBody, _modalFooter, itemId);
}

function showImplementationModal(itemId) {
    listName = 'Implementation Test';
    _modalHeader = "New Implementation Test";
    _modalBody = '<div class="col-md-8">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Start Date</label>' +
        '</div>' +
        '<div class="col-md-5">' +
        '<input type="datetime-local" class="form-control" id="idStartDate">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>End Date</label>' +
        '</div>' +
        '<div class="col-md-5">' +
        '<input type="datetime-local" class="form-control" id="idEndDate">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Action Taken</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea class="form-control" id="idActionTaken" rows="4"></textarea>' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Implementor</label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="idImplementer">' +
        '</div>' +
        '</div>' +
        '</div>';
        _modalFooter = '<a class="btn btn-primary" onclick="ImpSave('+itemId+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
        openModal('#tblImp', 'modalIMP', '#tbodyImp', _modalHeader, _modalBody, _modalFooter, itemId);

}

function showPostImpModal(itemId) {
    // alert('test');
    listName = 'Post Implementation Test';
    _modalHeader = "New Post Implementation";
    _modalBody = '<div class="col-md-8">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Start Date</label>' +
        '</div>' +
        '<div class="col-md-5">' +
        '<input type="datetime-local" class="form-control" id="idStartDate">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>End Date</label>' +
        '</div>' +
        '<div class="col-md-5">' +
        '<input type="datetime-local" class="form-control" id="idEndDate">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Action Taken</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea class="form-control" id="idActionTaken" rows="4"></textarea>' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Implementor</label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="idImplementer">' +
        '</div>' +
        '</div>' +
        '</div>';
    _modalFooter = '<a class="btn btn-primary" onclick="PostImpSave('+itemId+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    openModal('#tblPostImp', 'modalIMP', '#tbodyPostImp', _modalHeader, _modalBody, _modalFooter, itemId);
}

function showImpactModal(itemId) {
    // alert('test');
    listName = 'Impact Assessment Test';
    _modalHeader = "New Impact Assessment";
    _modalBody = '<div class="col-md-8">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Impact Description</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea class="form-control" id="idImpactDesc" rows="4"></textarea>' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Scale</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input type="number" class="form-control" id="idImpactScale">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Mitigation Actions</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea rows="4" class="form-control" id="idImpactMitigationAction">' +
        '</div>' +
        '</div>' +
        '</div>';

    _modalFooter = '<a class="btn btn-primary" onclick="ImpactSave('+itemId+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    openModal('#tblImpact', 'modalIMP', '#tbodyImpact', _modalHeader, _modalBody, _modalFooter, itemId);
}

function openModal(tableId, id, tbody, header, body, footer, itemID) {
    // alert(itemID + " ID of item to EDIT");
    debugger;
    cTable = tableId
    cmodalID = id;
    cTbody = tbody;
    $('.IMPModalTitle').empty();
    $('.IMPModalBody').empty();
    $('.IMPModalFooter').empty();
    $('.IMPModalTitle').html(header);
    $('.IMPModalBody').html(body);
    // alert("Hello World!");
    // debugger;

    if(itemID != 0){//if item is edit function mode
        console.log(siteURL + "/_api/web/lists/getbytitle('"+listName+"')/items?$filter=ID eq '"+itemID+"'");
        getEditItem(listName, itemID);
        
    }else{
        console.log('New mode')
    }

    $('.IMPModalFooter').html(footer);
    $("#"+ id).modal('show');
    // debugger;
}

function getEditItem(listName, itemId){

    if(listName == "Impact Assessment Test"){
        // debugger;
        $.ajax({
            url: siteURL + "/_api/web/lists/getbytitle('"+listName+"')/items?$filter=ID eq '"+itemId+"'",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                // Returning the results
                var item = data.d.results;
                if(data.d.results.length != 0){
                    $("#modalIMP #idImpactDesc").val(item[0].Title);
                    $("#modalIMP #idImpactScale").val(item[0].Scale);
                    $("#modalIMP #idImpactMitigationAction").val(item[0].Mitigation_x0020_Actions);
                }else{
                    alert('Why tjis shows up? Value cannot be found ()')
                }
            },
            error: function (data) {
    
            }
        });

    }else{
        console.log("hello peeps");
        debugger;
        //console.log(siteURL + "/_api/web/lists/getbytitle('"+listName+"')/items?$filter=ID eq "+itemId+"");
        
        $.ajax({
            url: siteURL + "/_api/web/lists/getbytitle('"+listName+"')/items?$filter=ID eq "+itemId+"",
            // url: siteURL + "/_api/web/lists/getbytitle('Implementation')/items?$filter=ID eq 131",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                // Returning the results
                var item = data.d.results;
                if(data.d.results.length != 0){
                    $("#modalIMP #idStartDate").val((item[0].Start_x0020_Date_x0020_and_x0020).split(":00Z")[0]);//remove the seconds to work
                    $("#modalIMP #idEndDate").val((item[0].End_x0020_Date_x0020_and_x0020_T).split(":00Z")[0]);
                    $("#modalIMP #idActionTaken").val(item[0].Title);
                    $("#modalIMP #idImplementer").val(item[0].Implementer);

                    
                }else{
                    alert('Value cannot be found');
                }
            },
            error: function (data) {
    
            }
        });
    }
}

//PRE IMPLEMENTATION
function PreImpSave(id) {
    vlookup = $("#idPreVlookUp").val();

    var PreImpStartDate = $("#modalIMP input#idStartDate").val();
    var PreImpEndDate = $("#modalIMP input#idEndDate").val();
    var PreImpActionTaken = $("#modalIMP textarea#idActionTaken").val();
    var PreImpImplementer = $("#modalIMP input#idImplementer").val();
    // debugger;
    dataArrPreImp["_vLookupParentID"] = vlookup;
    dataArrPreImp["Start_x0020_Date_x0020_and_x0020"] = PreImpStartDate;
    dataArrPreImp["End_x0020_Date_x0020_and_x0020_T"] = PreImpEndDate;
    dataArrPreImp["Title"] = PreImpActionTaken;
    dataArrPreImp["Implementer"] = PreImpImplementer;

    console.log(dataArrPreImp);
    if(id!=0){
        SaveItemModal(listName, dataArrPreImp, id);//update function
    }else{
        SaveItemModal(listName, dataArrPreImp, 0);//new item to save
    }
}

//IMPLEMENTATION
function ImpSave(id) {
    vlookup = $("#idPreVlookUp").val();

    var ImpStartDate = $("#modalIMP input#idStartDate").val();
    var ImpEndDate = $("#modalIMP input#idEndDate").val();
    var ImpActionTaken = $("#modalIMP textarea#idActionTaken").val();
    var ImpImplementer = $("#modalIMP input#idImplementer").val();
    
    dataArrImp["_vLookupParentID"] = vlookup;
    dataArrImp["Start_x0020_Date_x0020_and_x0020"] = ImpStartDate;
    dataArrImp["End_x0020_Date_x0020_and_x0020_T"] = ImpEndDate;
    dataArrImp["Title"] = ImpActionTaken;
    dataArrImp["Implementer"] = ImpImplementer;

    console.log(dataArrImp);
    // SaveItemModal(listName, dataArrImp, id);
    if(id!=0){
        SaveItemModal(listName, dataArrImp, id);//update function
    }else{
        SaveItemModal(listName, dataArrImp, 0);//new item to save
    }
}

//POST IMPLEMENTATION
function PostImpSave(id) {
    vlookup = $("#idPreVlookUp").val();

    var PostImpStartDate = $("#modalIMP input#idStartDate").val();
    var PostImpEndDate = $("#modalIMP input#idEndDate").val();
    var PostImpActionTaken = $("#modalIMP textarea#idActionTaken").val();
    var PostImpImplementer = $("#modalIMP input#idImplementer").val();

    dataArrPostImp["_vLookupParentID"] = vlookup;
    dataArrPostImp["Start_x0020_Date_x0020_and_x0020"] = PostImpStartDate;
    dataArrPostImp["End_x0020_Date_x0020_and_x0020_T"] = PostImpEndDate;
    dataArrPostImp["Title"] = PostImpActionTaken;
    dataArrPostImp["Implementer"] = PostImpImplementer;

    console.log(dataArrPostImp);
    // SaveItemModal(listName, dataArrPostImp, id);
    if(id!=0){
        SaveItemModal(listName, dataArrPostImp, id);//update function
    }else{
        SaveItemModal(listName, dataArrPostImp, 0);//new item to save
    }
}

//IMPACT ASSESSMENT
function ImpactSave(id) {
    vlookup = $("#idPreVlookUp").val();

    var ImpactDescription = $("#modalIMP textarea#idImpactDesc").val();
    var ImpactScale = $("#modalIMP input#idImpactScale").val();
    var ImpactMitigations = $("#modalIMP input#idImpactMitigationAction").val();

    dataArrImpactAs["_vLookupParentID"] = vlookup;
    dataArrImpactAs["Title"] = ImpactDescription;
    dataArrImpactAs["Scale"] = ImpactScale;
    dataArrImpactAs["Mitigation_x0020_Actions"] = ImpactMitigations;

    console.log(dataArrImpactAs);
    // SaveItemModal(listName, dataArrImpactAs, id);
    if(id!=0){
        SaveItemModal(listName, dataArrImpactAs, id);//update function
    }else{
        SaveItemModal(listName, dataArrImpactAs, 0);//new item to save
    }
}
// var ListItem = null;
var listItemModal;
function SaveItemModal(listName, val, ID) {
    debugger;
    cValues = val;
    var clientContext = new SP.ClientContext(siteURL);
    var list = clientContext.get_web().get_lists().getByTitle(listName);
    var ListItemInfo = new SP.ListItemCreationInformation();

    if(ID==0){
        // ctrID = 0;
        listItemModal = list.addItem(ListItemInfo);
        console.log('New Item save in ' + listName);
        console.log(listItem);
    }else{
        listItemModal = list.getItemById(ID);
        console.log('Update Item '+ID+' in ' + listName);
    }
    for (var property in val) {
        if (property != "__metadata")
            if (!property.startsWith("$"))
                if (property != "ID")
                    if (property != "Id") {
                        listItemModal.set_item(property, val[property]);
                        console.log(property);
                        console.log(property, val[property]);
                    }
    }

    listItemModal.update();//update/create the list
    clientContext.load(listItemModal);//load all the items
    clientContext.executeQueryAsync(
        Function.createDelegate(this, onQuerySucceededModal),
        Function.createDelegate(this, onQueryFailedModal))

    // clientContext.executeQueryAsync(
    //     function() {
    //         // debugger;
    //         if(ID!=0){
    //             $('#'+ctrID).closest("tr").remove();
    //         }
    //         OnItemAdded(listItemModal); 
            
    //     },
    //     OnItemError
    // );
}

function onQuerySucceededModal(){
    console.log("List Item Modal");
    console.log(listItemModal);
    var itemID = listItemModal.get_id();
    if (listName == 'Impact Assessment') {
        addItemsMitigation(listName, cValues, itemID);
    } else {
        addItems(listName, cValues, itemID);
    }
}

function onQueryFailedModal(args){
    // console.log("Fail!" + args.get_message() + "\n" + args.get_stackTrace());
    console.log(args.get_stackTrace());
    console.log("Just DFail");
}

// function OnItemAdded(v){
//     console.log(v.get_id());
//     // debugger;
    

    
// }
// function OnItemError(){
//     console.log('error');
// }

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
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
function addItems(listName, v, id) {
    debugger;
    editData = v;
    // debugger;
    cListname = listName;
    var idname = listName.split(" ")[0] + id;//change the split accprdong to real list name after testing


    $(cTable).removeClass("hidden");
    var tr = "<tr id='{5}'>"+
                "<td>{0}</td>"+
                "<td>{1}</td>"+
                "<td> {2}</td>"+
                "<td> {3}</td>"+
                "<td><a class='waves-effect waves-light' onclick=\"editItem({4}, '{5}', '{6}')\"><i class='far fa-edit'></i></a></td>"+
                "<td><a class='waves-effect waves-light' onclick=\"deleteCon({4},'{5}')\"><i class='far fa-trash-alt'></i></a></td></tr>";
    tr = tr.format([v.Start_x0020_Date_x0020_and_x0020, 
                    v.End_x0020_Date_x0020_and_x0020_T, 
                    v.Title, 
                    v.Implementer, 
                    id, 
                    idname, 
                    cListname]);
    // debugger;
    $('#'+idname).remove();
    $(cTbody).append(tr);
    $('#' + cmodalID).modal('hide');
    $(cTable).closest('div.container').addClass('show');
    // debugger;
}
function addItemsMitigation(listName, v, id) {
    debugger;
    cListname = listName;
    var idname = listName.split(" ")[0] + id;

    $(cTable).removeClass("hidden");
    var tr = "<tr id='{4}'><td>{0}</td>"+
                "<td>{1}</td>"+
                "<td>{2}</td>"+
                "<td><a class='waves-effect waves-light' onclick=\"editItem({3}, '{4}', '{5}')\"><i class='far fa-edit'></i></a></td>"+
                "<td><a class='waves-effect waves-light' onclick=\"deleteCon({3},'{4}')\"><i class='far fa-trash-alt'></i></a></td></tr>";
    tr = tr.format([v.Title, 
                    v.Scale, 
                    v.Mitigation_x0020_Actions, 
                    id, 
                    idname, 
                    cListname]);
    //alert(tr);
    $('#'+idname).remove();
    $(cTbody).append(tr);
    $('#' + cmodalID).modal('hide');
    //$(cTable).closest('div.container').addClass('show');
    // debugger;
}

function editItem(id, trID, listName) {
    ctrID = trID;
    debugger;
    if(listName =="Pre Implementation Test"){
        showPreImpModal(id);
    }else if(listName =="Implementation Test"){
        showImplementationModal(id);
    }else if(listName =="Post Implementation Test"){
        showPostImpModal(id);
    }else if(listName =="Impact Assessment Test"){
        showImpactModal(id);
    }else{
        alert("Error with editItem")
    }

}

function deleteCon(id, tdId){
    _modalHeader = "Delete confirmation";
    _modalBody = '<h4>Are you sure to delete this item?</h4>';
    //_modalFooter = '<a class="btn btn-danger" onclick="deleteItem(' + id + ', "modalDelete", '+tdId+')"> Yes </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    _modalFooter = "<a class='btn btn-danger' onclick=\"deleteItem({0},'{1}','{2}')\"> Yes </a> <a class='btn btn-default' data-dismiss='modal'>No</a>";
    _modalFooter = _modalFooter.format([id, "modalDelete", tdId]);
    openModal('', 'modalDelete', '', _modalHeader, _modalBody, _modalFooter);
}
function deleteItem(id, modal, delId) {
    //alert(cListname + " : " + id);
    $.ajax({  
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getByTitle('"+cListname+"')/getItemById("+id+")",  
        type: "POST",  
        headers:  
        {  
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
            "IF-MATCH": "*",  
            "X-HTTP-Method": "DELETE"  
        },  
        success: function(data, status, xhr)  
        {  
            $('#' + modal).modal('hide');
            $('#'+delId).remove();
        },  
        error: function(xhr, status, error)  
        {  
            //$("#ResultDiv").empty().text(data.responseJSON.error);  
            alert("item cannot delete" + error);
        }  
    });  
}


