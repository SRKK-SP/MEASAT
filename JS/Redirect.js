<script>
    var docurl = document.URL;
    var beginindex = docurl.indexOf('?ID=') + 4;
    var endindex = docurl.indexOf('&Source=');
    var itemid = docurl.substring(beginindex, endindex);
    //alert(itemid);
 	window.location = "https://measatsatellite.sharepoint.com/sites/ECM/Pages/EditForm.aspx?ID=" + itemid;

</script>