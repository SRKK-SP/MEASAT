<script>
    //var docurl = document.URL;
   // var beginindex = docurl.indexOf('?ID=') + 4;
    //var endindex = docurl.indexOf('&Source=');
   // var itemid = docurl.substring(beginindex, endindex);
    //alert(itemid);
 	//window.location = "https://measatsatellite.sharepoint.com/sites/ECM/Pages/DisplayForm.aspx?ID=" + itemid; 
 	
    var url = window.location.href;
    var sp =  url.split('?ID=')[1];
    id = sp.split('&Source=')[0];
    var source = sp.split('&Source=')[1];

    if(source == undefined){
        console.log(true)
        window.location = "https://measatsatellite.sharepoint.com/sites/ECM/Pages/DisplayForm.aspx?ID=" + id;
    }else{
        console.log(false)
        window.location = "https://measatsatellite.sharepoint.com/sites/ECM/Pages/DisplayForm.aspx?ID=" + id /*+ "&Source=" + source*/; 
    }


</script>