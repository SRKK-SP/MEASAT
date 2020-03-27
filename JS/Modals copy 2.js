var _modalHeader;
var _modalTxt;
var _modalBody;
var _modalFooter;
var vlookup;
var listName;
var cListname;
var cValues;
var editData;

var dataArrPreImp = [];
var dataArrImp = [];
var dataArrPostImp = [];
var dataArrImpactAs = [];

var cTable;
var cmodalID;
var cTbody;


function showPreImpModal(id) {
    //alert('test');
    listName = 'Pre Implementation Test';
    _modalHeader = "New Pre Implementation";
    _modalBody = '<div class="col-md-8">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Start Date</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input type="date" class="form-control" id="idStartDatePreImp">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>End Date</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input type="date" class="form-control" id="idEndDatePreImp">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Action Taken</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea class="form-control" id="idActionTakenPreImp" rows="4"></textarea>' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Implementor</label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="idImplementerPreImp">' +
        '</div>' +
        '</div>' +
        '</div>';
    if(id == 0){
        _modalFooter = '<a class="btn btn-primary" onclick="PreImpSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }else{
        _modalFooter = '<a class="btn btn-primary" onclick="PreImpSave('+id+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }
    openModal('#tblPreImp', 'modalIMP', '#tbodyPreImp', _modalHeader, _modalBody, _modalFooter);
}

function showImpModal(id) {
    listName = 'Implementation Test';
    _modalHeader = "New Implementation";
    _modalBody = '<div class="col-md-8">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Start Date</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input type="date" class="form-control" id="idStartDateImp">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>End Date</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input type="date" class="form-control" id="idEndDateImp">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Action Taken</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea class="form-control" id="idActionTakenImp" rows="4"></textarea>' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Implementor</label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="idImplementerImp">' +
        '</div>' +
        '</div>' +
        '</div>';
    
    if(id == 0){
        _modalFooter = '<a class="btn btn-primary" onclick="ImpSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }else{
        _modalFooter = '<a class="btn btn-primary" onclick="ImpSave('+id+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }
    openModal('#tblImp', 'modalIMP', '#tbodyImp', _modalHeader, _modalBody, _modalFooter);
}

function showPostImpModal(id) {
    // alert('test');
    listName = 'Post Implementation Test';
    _modalHeader = "New Post Implementation";
    _modalBody = '<div class="col-md-8">' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Start Date</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input type="date" class="form-control" id="idStartDatePostImp">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>End Date</label>' +
        '</div>' +
        '<div class="col-md-4">' +
        '<input type="date" class="form-control" id="idEndDatePostImp">' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Action Taken</label>' +
        '</div>' +
        '<div class="col-md-7">' +
        '<textarea class="form-control" id="idActionTakenPostImp" rows="4"></textarea>' +
        '</div>' +
        '</div><br>' +
        '<div class="row">' +
        '<div class="col-md-3">' +
        '<label>Implementor</label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="idImplementerPostImp">' +
        '</div>' +
        '</div>' +
        '</div>';
    
    if(id == 0){
        _modalFooter = '<a class="btn btn-primary" onclick="PostImpSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }else{
        _modalFooter = '<a class="btn btn-primary" onclick="PostImpSave('+id+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }
    openModal('#tblPostImp', 'modalIMP', '#tbodyPostImp', _modalHeader, _modalBody, _modalFooter);
}

function showImpactModal(id) {
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
        '<label>Implementor</label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<input type="text" class="form-control" id="idImpactMitigationAction">' +
        '</div>' +
        '</div>' +
        '</div>';
    if(id == 0){
        _modalFooter = '<a class="btn btn-primary" onclick="ImpactSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }else{
        _modalFooter = '<a class="btn btn-primary" onclick="ImpactSave('+id+');"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    }

    openModal('#tblImpact', 'modalIMP', '#tbodyImpact', _modalHeader, _modalBody, _modalFooter);
}

function openModal(tableId, id, tbody, header, body, footer) {
    cTable = tableId
    cmodalID = id;
    cTbody = tbody;
    $('.modal-title').html(header);
    $('.modal-body').html(body);
    $('.modal-footer').html(footer);
    $('#' + id).modal('show');
}

//PRE IMPLEMENTATION
function PreImpSave() {
    vlookup = $("#idPreVlookUp").val();

    var PreImpStartDate = $("#modalIMP input#idStartDatePreImp").val();
    var PreImpEndDate = $("#modalIMP input#idEndDatePreImp").val();
    var PreImpActionTaken = $("#modalIMP textarea#idActionTakenPreImp").val();
    var PreImpImplementer = $("#modalIMP input#idImplementerPreImp").val();
    // debugger;
    dataArrPreImp["_vLookupParentID"] = vlookup;
    dataArrPreImp["Start_x0020_Date_x0020_and_x0020"] = PreImpStartDate;
    dataArrPreImp["End_x0020_Date_x0020_and_x0020_T"] = PreImpEndDate;
    dataArrPreImp["Title"] = PreImpActionTaken;
    dataArrPreImp["Implementer"] = PreImpImplementer;

    console.log(dataArrPreImp);
    SaveItem(listName, dataArrPreImp, 0);

}

//IMPLEMENTATION
function ImpSave() {
    vlookup = $("#idPreVlookUp").val();

    var ImpStartDate = $("#modalIMP input#idStartDateImp").val();
    var ImpEndDate = $("#modalIMP input#idEndDateImp").val();
    var ImpActionTaken = $("#modalIMP textarea#idActionTakenImp").val();
    var ImpImplementer = $("#modalIMP input#idImplementerImp").val();
    dataArrImp["_vLookupParentID"] = vlookup;
    dataArrImp["Start_x0020_Date_x0020_and_x0020"] = ImpStartDate;
    dataArrImp["End_x0020_Date_x0020_and_x0020_T"] = ImpEndDate;
    dataArrImp["Title"] = ImpActionTaken;
    dataArrImp["Implementer"] = ImpImplementer;

    console.log(dataArrImp);
    SaveItem(listName, dataArrImp, '0');
}

//POST IMPLEMENTATION
function PostImpSave() {
    vlookup = $("#idPreVlookUp").val();

    var PostImpStartDate = $("#modalIMP input#idStartDatePostImp").val();
    var PostImpEndDate = $("#modalIMP input#idEndDatePostImp").val();
    var PostImpActionTaken = $("#modalIMP textarea#idActionTakenPostImp").val();
    var PostImpImplementer = $("#modalIMP input#idImplementerPostImp").val();

    dataArrPostImp["_vLookupParentID"] = vlookup;
    dataArrPostImp["Start_x0020_Date_x0020_and_x0020"] = PostImpStartDate;
    dataArrPostImp["End_x0020_Date_x0020_and_x0020_T"] = PostImpEndDate;
    dataArrPostImp["Title"] = PostImpActionTaken;
    dataArrPostImp["Implementer"] = PostImpImplementer;

    console.log(dataArrPostImp);
    SaveItem(listName, dataArrPostImp, '0');
}

//IMPACT ASSESSMENT
function ImpactSave() {
    vlookup = $("#idPreVlookUp").val();

    var ImpactDescription = $("#modalIMP textarea#idImpactDesc").val();
    var ImpactScale = $("#modalIMP input#idImpactScale").val();
    var ImpactMitigations = $("#modalIMP input#idImpactMitigationAction").val();

    dataArrImpactAs["_vLookupParentID"] = vlookup;
    dataArrImpactAs["Title"] = ImpactDescription;
    dataArrImpactAs["Scale"] = ImpactScale;
    dataArrImpactAs["Mitigation_x0020_Actions"] = ImpactMitigations;

    console.log(dataArrImpactAs);
    SaveItem(listName, dataArrImpactAs, '0');
}
// var ListItem = null;
var listItem;
function SaveItem(listName, val, ID) {
    // debugger;
    cValues = val;
    var clientContext = new SP.ClientContext(siteURL);
    var list = clientContext.get_web().get_lists().getByTitle(listName);
    var ListItemInfo = new SP.ListItemCreationInformation();

    if(ID==0){
        var listItem = list.addItem(ListItemInfo);
        console.log('New Item save in ' + listName);
        console.log(listItem);
    }else{
        var listItem = list.getItemById(ID);
        console.log('Update Item '+ID+' in ' + listName);
    }
    for (var property in val) {
        if (property != "__metadata")
            if (!property.startsWith("$"))
                if (property != "ID")
                    if (property != "Id") {
                        listItem.set_item(property, val[property]);
                        // console.log(property);
                        // console.log(property, val[property]);
                    }
    }

    listItem.update();//update/create the list
    clientContext.load(listItem);//load all the items
    clientContext.executeQueryAsync(
        function() {
            OnItemAdded(listItem);  
        },
        OnItemError
    );
}
function OnItemAdded(v){
    console.log(v.get_id());
    var itemID = v.get_id();
    if (listName == 'Impact Assessment Test') {
        addItemsMitigation(listName, cValues, itemID);
    } else {
        addItems(listName, cValues, itemID);
    }

    
}
function OnItemError(){
    console.log('error');
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
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
function addItems(listName, v, id) {
    editData = v;
    debugger;
    cListname = listName;
    var idname = listName.split(" ")[0] + id;


    $(cTable).removeClass("hidden");
    var tr = "<tr id='{5}'><td>{0}</td><td>{1}</td><td> {2}</td><td> {3}</td><td><a class='waves-effect waves-light' onclick='editItem({4})'><i class='far fa-edit'></i></a></td><td><a class='waves-effect waves-light' onclick=\"deleteCon({4},'{5}')\"><i class='far fa-trash-alt'></i></a></td></tr>";
    tr = tr.format([v.Start_x0020_Date_x0020_and_x0020, v.End_x0020_Date_x0020_and_x0020_T, v.Title, v.Implementer, id, idname]);
    $(cTbody).append(tr);
    $('#' + cmodalID).modal('hide');
    $(cTable).closest('div.container').addClass('show');
    // debugger;
}
function addItemsMitigation(listName, v, id) {
    
    cListname = listName;
    var idname = listName.split(" ")[0] + id;

    $(cTable).removeClass("hidden");
    var tr = "<tr id='{4}'><td>{0}</td><td>{1}</td><td> {2}</td><td><a class='waves-effect waves-light' onclick='editItem({3})'><i class='far fa-edit'></i></a></td><td><a class='waves-effect waves-light' onclick=\"deleteCon({3},'{4}')\"><i class='far fa-trash-alt'></i></a></td></tr>";
    tr = tr.format([v.Title, v.Scale, v.Mitigation_x0020_Actions, id, idname]);
    alert(tr);
    $(cTbody).append(tr);
    $('#' + cmodalID).modal('hide');
    $(cTable).closest('div.container').addClass('show');
    // debugger;
}

function editItem(id) {
    alert(cListname + " : " + id);

    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle("+cListname+")/items?$filter=ID eq '"+id+"'",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // Returning the results
            var item = data.d.results;
            if(data.d.results.length != 0){

            }else{
                alert('Value cannot be found')
            }
        },
        error: function (data) {

        }
    });
 
}

function deleteCon(id, tdId){
    // alert(id);
    // debugger;
    _modalHeader = "Delete confirmation";
    _modalBody = '<h4>Are you sure to delete this item?</h4>';
    //_modalFooter = '<a class="btn btn-danger" onclick="deleteItem(' + id + ', "modalDelete", '+tdId+')"> Yes </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';
    _modalFooter = "<a class='btn btn-danger' onclick=\"deleteItem({0},'{1}','{2}')\"> Yes </a> <a class='btn btn-default' data-dismiss='modal'>No</a>";
    _modalFooter = _modalFooter.format([id, "modalDelete", tdId]);
    openModal('', 'modalDelete', '', _modalHeader, _modalBody, _modalFooter);
}
function deleteItem(id, modal, delId) {
    alert(cListname + " : " + id);
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
            $('#'+delId).closest("tr").remove();
        },  
        error: function(xhr, status, error)  
        {  
            //$("#ResultDiv").empty().text(data.responseJSON.error);  
            alert("item cannot delete" + error);
        }  
    });  
}


function getEditItem(){
    
}