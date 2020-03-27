<script type="text/javascript" src="https://intranet.hq.measat.com/sites/eCM/SiteAssets/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="https://intranet.hq.measat.com/sites/eCM/SiteAssets/js/jquery.SPServices-2014.02.min.js"></script>
<script language="javascript" type="text/javascript">

//to avoid jquery conflict
var $j = jQuery.noConflict();
var Pid1 = getURLParameter('ID'); 
var myQuery1 = "<Query><Where><Eq><FieldRef Name='Item' /><Value Type=' Integer'>" + Pid1 + "</Value></Eq></Where></Query>";

$j(document).ready(function() {
  $j().SPServices({
    operation: "GetListItems",
    async: false,
    listName: "Workflow History",
    CAMLViewFields: "<ViewFields><FieldRef Name='Description' /><FieldRef Name='Created' /><FieldRef Name='Outcome' /></ViewFields>",
    CAMLQuery: myQuery1,
    completefunc: function (xData, Status) {
      $j(xData.responseXML).SPFilterNode("z:row").each(function() {
      	console.log(this);
        var liHtml = "<li style='list-style-position: inside;'>" + $j(this).attr("ows_Created") + " : " + $j(this).attr("ows_Description") + "</li>";
        $j("#tasksUL").append(liHtml);
        
          
       
      });
    }
  });
  $j("input[title='History']").val(liHtml);
});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

</script>

Authorize Workflow History:<br/>
<div id="tasksUL" style="border:1px solid #ccc;padding:10px;"></div>
