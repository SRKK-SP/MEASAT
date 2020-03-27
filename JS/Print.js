var siteURL = _spPageContextInfo.webAbsoluteUrl;
var cUser = _spPageContextInfo.userEmail;

function demoFromHTML() {
    var pdf = new jsPDF('p', 'pt', 'a4');
    source = $('#printContainer')[0];
    specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },
        function (dispose) {
            pdf.save('Test.pdf');
        }, margins
    );
}

//New Test Print
// var element = document.getElementById('printContainer');
// html2pdf(element);


function printPage() {
    alert();
}

$(document).ready(function () {
    var dt = new Date();

    // $.when(getRData()).done(function() {
    //     $("#printBtn").trigger( "click" );
    // });

    getData();
});

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
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

var vLookupID = "";

function getData() {
    //Get values from ID
    var url = window.location.href;
    //  //decodeURIComponent($.urlParam('?ID='))
    var id = url.split('?ID=')[1];
    console.log("ID: ", id);

    $.ajax({
        url: siteURL + "/_api/web/lists/getbytitle('e-CM')/items?$filter=ID eq  '" + id + "'&$select=*,Person_x0020_to_x0020_Inform_x00/Title&$expand=Person_x0020_to_x0020_Inform_x00&$select=*,Requester_x0020_Name/Title&$expand=Requester_x0020_Name&$select=*,Implementer/Title&$expand=Implementer&$select=*,HOD/Title&$expand=HOD",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            // Returning the results
            console.log(data);
            var item = data.d.results;
            if (data.d.results.length != 0) {
                var stat = item[0].Workflow_x0020_Status;
                var REF = item[0].REF;
                vLookupID = item[0].OData__vLookupID;
                var Criticality = item[0].Criticality;
                var Area = item[0].Area;
                var ChangeCategory = item[0].Change_x0020_Category;
                var ChangeType = item[0].Type_x0020_of_x0020_Change;
                var Platform = item[0].Type2;
                var PlatFormArea = item[0].Area2;
                var Customer = item[0].Customer;
                var Title = item[0].Customer + " : " + item[0].Title;
                var RequesterName = item[0].Requester_x0020_Name.Title;
                var Department = item[0].Department;
                var ContactNo = item[0].Contact_x0020_No;
                var DateRequested = item[0].Date_x0020_Requested.split("T")[0];
                var StartDate = item[0].Date_x0020_Requested.split("T")[0];
                var EndDate = item[0].End_x0020_Date.split("T")[0];
                var Duration = item[0].Duration;
                var EmailContent = item[0].Email_x0020_Content;

                var ECN = item[0].Customer_x0020_Notification;
                if (ECN) {
                    checkECN = "checked";
                } else {
                    checkECN = "";
                }

                var NMC = item[0].NMC_x0020_Participation;
                if (NMC) {
                    checkNMC = "checked";
                } else {
                    checkNMC = "";
                }

                var Comment = item[0].Comment;
                if (Comment == "" || Comment == null) {
                    Comment = "NA"
                }
                var PTW = item[0].PTW;
                if (PTW) {
                    checkPTW = "checked";
                } else {
                    checkPTW = "";
                }

                var ATAI = item[0].Assign_x0020_to_x0020_another_x0;
                if (ATAI) {
                    checkATAI = "checked";
                } else {
                    checkATAI = "";
                }
                var RequesterManager = item[0].Requester_x0020_Name.Title;
                var HOD = item[0].HOD.Title;
                var Justification = item[0].Justification_x0020_of_x0020_Cha;
                var Hardware = item[0].Hardware_x0028_D_x0029_;
                var Purpose = item[0].Purpose;
                var Action = item[0].Action;
                var ChangeSummary = item[0].Change_x0020_Summary;
                var FallBack = item[0].Fallback_x0020_Procedures;


                var tblItems = "<tr><td>Status</td><td>: " + stat + "</td></tr>" +
                    "<tr><td>REF</td><td>: " + REF + "</td></tr>" +
                    "<tr><td>Criticality</td><td>: " + Criticality + "</td></tr>" +
                    "<tr><td>Area</td><td>: " + Area + "</td></tr>" +
                    "<tr><td>Change Category</td><td>: " + ChangeCategory + "</td></tr>" +
                    "<tr><td>Change Type</td><td>: " + ChangeType + "</td></tr>" +
                    "<tr><td>Platform</td><td>: " + Platform + "</td></tr>" +
                    "<tr><td>Platform Area</td><td>: " + PlatFormArea + "</td></tr>" +
                    "<tr><td>Customer</td><td>: " + Customer + "</td></tr>" +
                    "<tr><td>Title</td><td>: " + Title + "</td></tr>" +
                    "<tr><td>Requester Name</td><td>: " + RequesterName + "</td></tr>" +
                    "<tr><td>Department</td><td>: " + Department + "</td></tr>" +
                    "<tr><td>Contact No</td><td>: " + ContactNo + "</td></tr>" +
                    "<tr><td>Date Requested</td><td>: " + DateRequested + "</td></tr>" +
                    "<tr><td>Start Date</td><td>: " + StartDate + "</td></tr>" +
                    "<tr><td>End Date</td><td>: " + EndDate + "</td></tr>" +
                    "<tr><td>Duration</td><td>: " + Duration + "</td></tr>" +
                    "<tr><td>External Customer Notification</td><td>: <input type='checkbox' " + checkECN + " disabled></td></tr>" +
                    "<tr><td style='page-break-after: always'>Email Content</td><td> " + EmailContent + "</td></tr>" +
                    "<tr><td>NMC Participation</td><td>: <input type='checkbox' " + checkNMC + " disabled></td></tr>" +
                    "<tr><td>Comment</td><td>: " + Comment + "</td></tr>" +
                    "<tr><td>PTW</td><td>: <input type='checkbox' " + checkPTW + " disabled></td></tr>" +
                    "<tr><td>Assign to another implementer</td><td>: <input type='checkbox' " + checkATAI + " disabled></td></tr>" +
                    "<tr><td>Requester Manager </td><td>: " + RequesterManager + "</td></tr>" +
                    "<tr><td>HOD </td><td>: " + HOD + "</td></tr>" +
                    "<tr><td>Justification of Change</td><td> " + Justification + "</td></tr>" +
                    "<tr><td>Hardware </td><td>: " + Hardware + "</td></tr>" +
                    "<tr><td>Purpose </td><td>: " + Purpose + "</td></tr>" +
                    "<tr><td>Action </td><td>: " + Action + "</td></tr>" +
                    "<tr><td>Change Summary</td><td> " + ChangeSummary + "</td></tr>";
                $("#tblPrint tbody").append(tblItems);
                var trfallback = "<tr><td width='25%'>Fallback Procedures</td><td width='55%'> " + FallBack + "</td></tr>";
                $("#tblFallback tbody").append(trfallback);
                //Table PErsonel

                var nullText = " - ";

                var p1 = item[0].Personnel_x0020_Name1 || nullText;
                var p2 = item[0].Personnel_x0020_Name2 || nullText;
                var p3 = item[0].Personnel_x0020_Name3 || nullText;
                var p4 = item[0].Personnel_x0020_Name4 || nullText;
                var p5 = item[0].Personnel_x0020_Name5 || nullText;

                var dept1 = item[0].Department_x002f_Company1 || nullText;
                var dept2 = item[0].Department_x002f_Company2 || nullText;
                var dept3 = item[0].Department_x002f_Company3 || nullText;
                var dept4 = item[0].Department_x002f_Company4 || nullText;
                var dept5 = item[0].Department_x002f_Company5 || nullText;

                var con1 = item[0].Personnel_x0020_Contact1 || nullText;
                var con2 = item[0].Personnel_x0020_Contact2 || nullText;
                var con3 = item[0].Personnel_x0020_Contact3 || nullText;
                var con4 = item[0].Personnel_x0020_Contact4 || nullText;
                var con5 = item[0].Personnel_x0020_Contact5 || nullText;

                // var personel = "<tr><td>REF</td><td>"+p1+"</td><td>"+dept1+"</td><td>"+con1+"</td></tr>"+
                // "<tr><td></td><td>"+p2+"</td><td>"+dept2+"</td><td>"+con2+"</td></tr>"+
                // "<tr><td></td><td>"+p3+"</td><td>"+dept3+"</td><td>"+con3+"</td></tr>"+
                // "<tr><td></td><td>"+p4+"</td><td>"+dept4+"</td><td>"+con4+"</td></tr>"+
                // "<tr><td></td><td>"+p5+"</td><td>"+dept5+"</td><td>"+con5+"</td></tr>";

                // var personel = "<tr>"+
                //     "<td id='tdPersonel'>Personel</td>"+
                //     "<td id='tdPersonel2'><table>"+
                //         "<tr><td>"+p1+"</td><td>"+dept1+"</td><td>"+con1+"</td></tr>"+
                //         "<tr><td>"+p2+"</td><td>"+dept2+"</td><td>"+con2+"</td></tr>"+
                //         "<tr><td>"+p3+"</td><td>"+dept3+"</td><td>"+con3+"</td></tr>"+
                //         "<tr><td>"+p4+"</td><td>"+dept4+"</td><td>"+con4+"</td></tr>"+
                //         "<tr><td>"+p5+"</td><td>"+dept5+"</td><td>"+con5+"</td></tr>"+
                //     "</table></td>"+
                // "</tr>";

                var personel = "<tr><td>" + p1 + "</td><td>" + dept1 + "</td><td>" + con1 + "</td></tr>" +
                    "<tr><td>" + p2 + "</td><td>" + dept2 + "</td><td>" + con2 + "</td></tr>" +
                    "<tr><td>" + p3 + "</td><td>" + dept3 + "</td><td>" + con3 + "</td></tr>" +
                    "<tr><td>" + p4 + "</td><td>" + dept4 + "</td><td>" + con4 + "</td></tr>" +
                    "<tr><td>" + p5 + "</td><td>" + dept5 + "</td><td>" + con5 + "</td></tr>";;


                $("#tblPersonel tbody").append(personel);
            } else {
                console.log('Data not found.');
            }
            getPreImp(vLookupID);
        }
    });
}

function getPreImp(id) {
    //GEt PRe Imlementation
    // Pre Implementation
    console.log(siteURL + "/_api/lists/getbytitle('Pre Implementation')/items?$filter=OData__vLookupParentID eq '" + id + "'");
    $.ajax({
        url: siteURL + "/_api/lists/getbytitle('Pre Implementation')/items?$filter=OData__vLookupParentID eq '" + id + "'",
        type: "GET",
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        success: function (data) {
            var cTbody = $("#tblPreImp tbody");
            var item = data.d.results;
            var cListname = 'Pre Implementation';
            if (item.length != 0) {
                $.each(item, function (i, item) {
                    trID = cListname.split(" ")[0] + item.Id;
                    var startDate = (item.Start_x0020_Date_x0020_and_x0020).split("T")[0];
                    var startTime = ((item.Start_x0020_Date_x0020_and_x0020).split("T")[1]).substring(0, 5);
                    var endDate = (item.End_x0020_Date_x0020_and_x0020_T).split("T")[0];
                    var endTime = ((item.End_x0020_Date_x0020_and_x0020_T).split("T")[1]).substring(0, 5);
                    var tr = ("<tr id='{7}'>" +
                        "<td>{0}<br>{1}</td>" +
                        "<td>{2}<br>{3}</td>" +
                        "<td>{4}</td>" +
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
                        cListname
                    ]);
                    $(cTbody).append(tr);
                });
            } else {
                console.log("no data");
            }
            getImplementation();
        },
        error: function () {
            console.log("Error getting the change procedures data for Pre Implementation");
        }
    });
}

function getImplementation() {
    // Implementation
    $.ajax({
        url: siteURL + "/_api/lists/getbytitle('Implementation')/items?$filter=OData__vLookupParentID eq '" + vLookupID + "'",
        type: "GET",
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        success: function (data) {
            var cTbody = $("#tblImp tbody");
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
                    var tr = ("<tr>" +
                        "<td>{0}<br>{1}</td>" +
                        "<td>{2}<br>{3}</td>" +
                        "<td>{4}</td>" +
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
                        cListname
                    ]);
                    $(cTbody).append(tr);
                });
            } else {
                console.log("no data");
            }
            getPostImp();
        },
        error: function () {
            console.log("Error getting the change procedures data for Implementation");
        }
    });
}

function getPostImp() {
    // Post Implementation
    $.ajax({
        url: siteURL + "/_api/lists/getbytitle('Post Implementation')/items?$filter=OData__vLookupParentID eq '" + vLookupID + "'",
        type: "GET",
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        success: function (data) {
            var cTbody = $("#tblPostImp tbody");
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
                        "<td width='10%'>{0}<br>{1}</td>" +
                        "<td width='10%'>{2}<br>{3}</td>" +
                        "<td width='60%'>{4}</td>" +
                        "<td width='20%'>{5}</td>" +

                        "</tr>");
                    tr = tr.format([startDate,
                        startTime,
                        endDate,
                        endTime,
                        item.Title,
                        item.Implementer,
                        item.Id,
                        trID,
                        cListname
                    ]);
                    $(cTbody).append(tr);
                });
            } else {
                console.log("no data");
            }
            getImpact();
        },
        error: function () {
            console.log("Error getting the change procedures data for Post Implementation");
        }
    });
}

function getImpact() {
    // Impact Assessment
    $.ajax({
        url: siteURL + "/_api/lists/getbytitle('Impact Assessment')/items?$filter=OData__vLookupParentID eq '" + vLookupID + "'",
        type: "GET",
        headers: {
            "ACCEPT": "application/json;odata=verbose"
        },
        success: function (data) {
            console.log(data);
            var cTbody = $("#tblImpact");
            var item = data.d.results;
            var cListname = 'Impact Assessment';
            if (item.length != 0) {
                $("#idImpactDesc").append(item[0].Title);
                $("#idImpactScale").append(item[0].Scale);
                $("#idImpactMitigationAction").append(item[0].Mitigation_x0020_Actions);
                $.each(item, function (i, item) {
                    trID = cListname.split(" ")[0] + item.Id;
                    var tr = ("<tr>" +
                        "<td>{0}</td>" +
                        "<td>{1}</td>" +
                        "<td>{2}</td>" +
                        "</tr>");
                    tr = tr.format([item.Title,
                        item.Scale,
                        item.Mitigation_x0020_Actions,
                        item.Id,
                        trID
                    ]);
                    $(cTbody).append(tr);
                });
            } else {
                console.log("no data");
            }
            myFunction(); //call the convert to pdf
        },
        error: function () {
            console.log("Error getting the change procedures data for Impact Assessment");
        }
    });
    console.log("Hello")
    window.print();
}

function convertDate2(d) {
    var d = new Date(d);
    //console.log(d);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    rmonth = months[d.getMonth()]; //get month
    var ddate = d.getDate();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    rdayname = days[d.getDay()]; //get day name
    // console.log('rdayname: ' +rdayname);
    ryear = d.getFullYear(); //get year

    //convert Time
    var h = d.getHours();
    var m = d.getMinutes();
    m = m > 9 ? m : '0' + m;
    var ampm = (h >= 12) ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    // h = h<10?'0'+h:h;//with 0
    h = h < 10 ? h : h; //remove 0 if h < 10
    rtime = h + ":" + m + " " + ampm;

    //get date Ordinal (1st 2nd 3rd 4th)
    getGetOrdinal(ddate);
}

function getGetOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
        v = n % 100;
    day = n + (s[(v - 20) % 10] || s[v] || s[0]);
}

var myVar;

function myFunction() {
    myVar = setTimeout(getPDF, 2000);
    //myVar = setTimeout(makeHighResScreenshot, 4000);
}

function getPDF() {
    //alert('updating PDF resolution');
    var HTML_Width = $("#printContainer").width();
    var HTML_Height = $("#printContainer").height();
    var top_left_margin = 3;
    var PDF_Width = HTML_Width + (top_left_margin * 1);
    // var PDF_Height = ((PDF_Width*1.5)+(top_left_margin*2));
    var PDF_Height = ((PDF_Width * 1.5) + (top_left_margin * 2));
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
    //scale:2 will get the correct resolution (fix for blurry)
    html2canvas($("#printContainer")[0], {
        scale: 2
    }).then(function (canvas) {
        canvas.getContext('2d');
        //canvas.getContext('2d');

        // console.log(canvas.height+"  "+canvas.width);


        var imgData = canvas.toDataURL("image/jpeg", "image/octet-stream");
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        // var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


        for (var i = 1; i <= totalPDFPages; i++) {
            // pdf.addPage(PDF_Width, PDF_Height);
            pdf.addPage([PDF_Width, PDF_Height]);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 2), canvas_image_width, canvas_image_height);
        }

        //    pdf.save("eCM.pdf");
    });
};

var src = $("#printContainer");
var img = $("#imgDes");
//makeHighResScreenshot(src, img, 192); // DPI of 192 is 4x resolution (2x normal DPI for both width and height)

function makeHighResScreenshot(srcEl, destIMG, dpi) {
    debugger;
    var scaleFactor = Math.floor(dpi / 96);
    // Save original size of element
    var originalWidth = srcEl.offsetWidth;
    var originalHeight = srcEl.offsetHeight;
    // Save original document size
    var originalBodyWidth = document.body.offsetWidth;
    var originalBodyHeight = document.body.offsetHeight;

    // Add style: transform: scale() to srcEl
    srcEl.style.transform = "scale(" + scaleFactor + ", " + scaleFactor + ")";
    srcEl.style.transformOrigin = "left top";

    // create wrapper for srcEl to add hardcoded height/width
    var srcElWrapper = document.createElement('div');
    srcElWrapper.id = srcEl.id + '-wrapper';
    srcElWrapper.style.height = originalHeight * scaleFactor + 'px';
    srcElWrapper.style.width = originalWidth * scaleFactor + 'px';
    // insert wrapper before srcEl in the DOM tree
    srcEl.parentNode.insertBefore(srcElWrapper, srcEl);
    // move srcEl into wrapper
    srcElWrapper.appendChild(srcEl);

    // Temporarily remove height/width constraints as necessary
    document.body.style.width = originalBodyWidth * scaleFactor + "px";
    document.body.style.height = originalBodyHeight * scaleFactor + "px";

    window.scrollTo(0, 0); // html2canvas breaks when we're not at the top of the doc, see html2canvas#820
    html2canvas(srcElWrapper, {
        onrendered: function (canvas) {
            destIMG.src = canvas.toDataURL("image/png");
            srcElWrapper.style.display = "none";
            // Reset height/width constraints
            document.body.style.width = originalBodyWidth + "px";
            document.body.style.height = originalBodyHeight + "px";
        }
    });
};