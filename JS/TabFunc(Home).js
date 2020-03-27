<link  type="text/css" rel="stylesheet" href="/sites/eCM/SiteAssets/css/jquery-ui.css" /> 
<script type="text/javascript" src="/sites/eCM/SiteAssets/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="/sites/eCM/SiteAssets/js/jquery.cookie.min.js"></script> 
<style type="text/css">
#MSOZoneCell_WebPartWPQ2 {
    margin-top: -15px;
}
.ms-acal-summary-itemrow td div {
    margin: 0px 1px 0px 1px;
    height: 3em;
}

#s4-workspace {
    
    position: relative;
}
#MSOZoneCell_WebPartWPQ4{margin-top:-33px;}
.ms-webpart-chrome-title{display:none;}
.ms-acal-item{height:auto !important;}
.ms-acal-time{display:none;}
.ms-acal-sdiv{
text-indent:-9999em;
height:11px;
padding-bottom: 6px;
}
.ms-acal-sdiv a{
            text-indent:0;
            top:0;
            display:block;
            position:absolute;
}
.ms-acal-summary-itemrow > td:nth-child(6){background-color:#D9F0FC;}
.ms-acal-summary-itemrow > td:nth-child(7){background-color:#D9F0FC;}
.ms-acal-summary-dayrow > td:nth-child(7){background-color:#D9F0FC;}
.ms-acal-summary-dayrow > td:nth-child(8){background-color:#D9F0FC;}
.ms-acal-summary-dayrow > th {border-bottom:none;border-top:none;}
.ms-acal-month{margin-left:-10px;}

#searchInputBox {
display:none;
}

#titleAreaBox{
display:none;
]

#sideNavBox {
margin-top:-27px;
}

#tabsContainer {
margin-top : -27px;
}



/**** Small Calendar *
.ms-acal-item{height: 10px !important; }/*width: 30px !important;
.ms-acal-sdiv, 
.ms-acal-mdiv, 
.ms-acal-ctrlitem, 
.ms-acal-month-weeksel, 
.ms-acal-title, 
.ms-acal-month-top span, 
.ms-acal-rootdiv table{
width:0px;
height:55px;
}
.ms-acal-summary-itemrow TD DIV{height: 15px !important; width: 5px !important;} 



.ms-acal-item{height: 20px !important;} 
.ms-acal-sdiv, 
.ms-acal-mdiv, 
.ms-acal-ctrlitem, 
.ms-acal-month-weeksel, 
.ms-acal-title, 
.ms-acal-vlink a{display:none;}
.ms-acal-month-top span{display: none;} 
.ms-acal-summary-itemrow TD DIV{height: 15px !important;} 
.ms-acal-rootdiv table{
width:0px;
height:55px;
}*/

</style>
 
<script type="text/javascript">
     jQuery(document).ready(function($) {
     
        var webPartTitles = ["CM Calendar","Upcoming Changes (14 days)"];
         HillbillyTabs(webPartTitles);   
 		
    });
 
 
 
function HillbillyTabs(webPartTitles)
    {
	alert('test!');
        if(webPartTitles == undefined)
        {
            var CEWPID = "";
            $("#tabsContainer").closest("div [id^='MSOZoneCell_WebPart']").find("span[id^='WebPartCaptionWPQ']").each(function()
            {
                CEWPID = $(this).attr("id");
            });
 
            var index = 0;
            $("span[id^='WebPartCaptionWPQ']").each(function()
            {
                if($(this).attr("id") != CEWPID)
                {
                    var title = $(this).prev("span").text();
                    
                    $("#HillbillyTabs").append('<li><a href="#Tab'+index+'" id="TabHead'+index+'" onclick="HillbillyTabClick(this.id);">'+
                        title+'</a></li>').after('<div id="Tab'+index+'"></div>');
                    
                    var webPart = $(this).prev("span").hide().closest("span").closest("[id^='MSOZoneCell_WebPart']");
                    
                    $("#Tab" + index).append((webPart));
                    index++;
                }
            });
        } else {
        for(index in webPartTitles)
            {
                var title = webPartTitles[index];
                var tabContent = title.split(";#");
                if (tabContent.length > 1)
                {
                    $("#HillbillyTabs").append('<li><a href="#Tab'+index+'" id="TabHead'+index+'" onclick="HillbillyTabClick(this.id);">'+
                        tabContent[0]+'</a></li>').after('<div id="Tab'+index+'"></div>');
                
                    for(i = 1; i < tabContent.length; i++)
                    {
                        $("span[id^='WebPartCaptionWPQ']").each(function()
                        {
                            $(this).prev("span:contains('"+tabContent[i]+"')").each(function()
                            {
                                 if ($(this).text() == tabContent[i]){
                                    
                                    var webPart = $(this).closest("span").closest("[id^='MSOZoneCell_WebPart']");
                                    
                                    $("#Tab" + index).append((webPart));
                                 }
                                
                            });
                        });
                    }
                }
                else
                {
                    $("span[id^='WebPartCaptionWPQ']").each(function()
                    {
                        $(this).prev("span:contains('"+title+"')").each(function()
                        {
                             if ($(this).text() == title){
                                $("#HillbillyTabs").append('<li><a href="#Tab'+index+'" id="TabHead'+index+'" onclick="HillbillyTabClick(this.id);">'+
                                    title+'</a></li>').after('<div id="Tab'+index+'"></div>');
                                
                                var webPart = $(this).hide().closest("span").closest("[id^='MSOZoneCell_WebPart']");
                                
                                $("#Tab" + index).append((webPart));
                             }
                            
                        });
                    });
                }
            }
        }
        $("#tabsContainer").tabs();
        
        /*ShowActiveTab();*/
    
    }
    
    
    function HillbillyTabClick(id)
    {
        $.cookie("ActiveTab",id,{ path: '/' });
    }
    /*
    function ShowActiveTab()
    {
        $("#" + $.cookie("ActiveTab")).click();
    }*/



</script>
<div id="tabsContainer"><ul id="HillbillyTabs"></ul></div>

