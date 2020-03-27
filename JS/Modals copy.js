var _modalHeader;
var _modalTxt;
var _modalBody;
var _modalFooter;
var vlookup;
var listName;
var cListname;
var cValues;

var dataArrPreImp = [];
var dataArrImp = [];
var dataArrPostImp = [];
var dataArrImpactAs = [];

var cTable;
var cmodalID;
var cTbody;

function showPreImpModal() {
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
    _modalFooter = '<a class="btn btn-primary" onclick="PreImpSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';

    openModal('#tblPreImp', 'modalIMP', '#tbodyPreImp', _modalHeader, _modalBody, _modalFooter);
}

function showImpModal() {
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
    _modalFooter = '<a class="btn btn-primary" onclick="ImpSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';

    openModal('#tblImp', 'modalIMP', '#tbodyImp', _modalHeader, _modalBody, _modalFooter);
}

function showPostImpModal() {
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
    _modalFooter = '<a class="btn btn-primary" onclick="PostImpSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';

    openModal('#tblPostImp', 'modalIMP', '#tbodyPostImp', _modalHeader, _modalBody, _modalFooter);
}

function showImpactModal() {
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
    _modalFooter = '<a class="btn btn-primary" onclick="ImpactSave();"> Save </a> <a class="btn btn-default" data-dismiss="modal">Close</a>';

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
    SaveItem(listName, dataArrPreImp);

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
    SaveItem(listName, dataArrImp);
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
    SaveItem(listName, dataArrPostImp);
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
    SaveItem(listName, dataArrImpactAs);
}
// var ListItem = null;
var listItem;
function SaveItem(listName, val) {
    debugger;
    cValues = val;
    var clientContext = new SP.ClientContext(siteURL);
    var list = clientContext.get_web().get_lists().getByTitle(listName);
    var ListItemInfo = new SP.ListItemCreationInformation();

    listItem = list.addItem(ListItemInfo);
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

// //SavePTotalToCYear
// onQuerySucceeded2 = function () {
//     alert('save item');
//     // alert('PTotal Save');
//     console.log(listItem.get_id());
// }

// onQueryFailed2 = function (sender, args) {
//     console.log(args.get_stackTrace());
//     // alert('Failed: ' + args.get_stackTrace());
//     // _modalTxt = '<h4>Failed: ' + args.get_stackTrace() + '</h4>';
//     // openModal(_modalTxt, 'idModalDanger');
// }

function addItems(listName, v, id) {
    debugger;
    cListname = listName;
    $(cTable).removeClass("hidden");
    var tr = "<tr>" +
        "<td>" + v.Start_x0020_Date_x0020_and_x0020 + "</td>" +
        "<td>" + v.End_x0020_Date_x0020_and_x0020_T + "</td>" +
        "<td>" + v.Title + "</td>" +
        "<td>" + v.Implementer + "</td>" +
        "<td><a class='waves-effect waves-light' onclick='editItem(" + id + ")'><i class='far fa-edit'></i></a></td>" +
        "<td><a class='waves-effect waves-light' onclick='deleteItem(" + id + ")'><i class='far fa-trash-alt'></i></a></td>" +
        "</tr>";
    $(cTbody).append(tr);
    $('#' + cmodalID).modal('hide');
    $(cTable).closest('div.container').addClass('show');
    debugger;
}

function addItemsMitigation(listName, v, id) {
    debugger;
    cListname = listName;
    $(cTable).removeClass("hidden");
    var tr = "<tr>" +
        "<td>" + v.Title + "</td>" +
        "<td>" + v.Scale + "</td>" +
        "<td>" + v.Mitigation_x0020_Actions + "</td>" +
        "<td><a class='waves-effect waves-light' onclick='editItem(" + id + ")'><i class='far fa-edit'></i></a></td>" +
        "<td><a class='waves-effect waves-light' onclick='deleteItem(" + id + ")'><i class='far fa-trash-alt'></i></a></td>" +
        "</tr>";
    $(cTbody).append(tr);
    $('#' + cmodalID).modal('hide');
    $(cTable).closest('div.container').addClass('show');
    debugger;
}

function editItem(id) {
    alert(cListname + " : " + id);
    var requestUri = siteURL + "/_api/web/lists/getByTitle('"+cListname+"')/getItemById("+id+")";
    // $.ajax({  
    //     url: requestUri,  
    //     type: "POST",  
    //     headers: {  
    //         "accept": "application/json;odata=verbose",  
    //         "X-RequestDigest": $("#__REQUESTDIGEST").val(),  
    //         "content-Type": "application/json;odata=verbose",  
    //         "IF-MATCH": "*",  
    //         "X-HTTP-Method": "MERGE"  
    //     },  
    //     data: "{__metadata:{'type':'SP.Data.YourlistnameListItem'},
        
    //     }",  
    //     /*where Title is column name and add your desired new data*/  
    //     success: function(data) {  
    //         console.log(data.d.results);  
    //     },  
    //     error: function(error) {  
    //         alert(JSON.stringify(error));  
    //     }  
    // });  
}

function deleteItem(id) {
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
            //retriveListItem();
            console.log(data);
            console.log(status);
            console.log(xhr);
            alert('item deleted');

        },  
        error: function(xhr, status, error)  
        {  
            //$("#ResultDiv").empty().text(data.responseJSON.error);  
            alert("item cannot delete" + error);
        }  
    });  
}