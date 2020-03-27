$(document).ready(function() {
	//APPEND SHAREPOINT NAVIGATION TO CUSTOM NAVIGATION
	$( "#collapseButton" ).after( $("#DeltaTopNavigation") );
	$( "#DeltaTopNavigation" ).attr("class","collapse navbar-collapse navbar-right");
	$( "#DeltaTopNavigation > div > ul > li > ul" ).attr("class","nav navbar-nav");
	$( "#DeltaTopNavigation > div > ul > li > ul" ).appendTo("#DeltaTopNavigation");
	$( "#DeltaTopNavigation > div" ).remove();
	
	//LOOK FOR ITEMS WITH CHILD ELEMENTS
	$( "li.dynamic-children" ).each(function() {
		$( "li.dynamic-children" ).addClass("dropdown");
	});
	
	//ADD CUSTOM CLASSES TO LI CHILD ELEMENTS
	$( "#DeltaTopNavigation > ul li.dropdown > ul" ).attr("class","dropdown-menu");
	$( "#DeltaTopNavigation > ul li.dropdown > a" ).attr("class","dropdown-toggle");
	$( "#DeltaTopNavigation > ul li.dropdown > a" ).attr("data-toggle","dropdown");
	$( "#DeltaTopNavigation > ul li.dropdown" ).removeClass("dynamic-children");

	$('ul.nav li.dropdown').hover(function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
	  }, function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
	});

	$(function() {
		$(".navbar-nav > li > a > .menu-item-text").click(function() {
		   // remove classes from all
		   $(".navbar-nav > li").removeClass("active");
		   // add class to the one we clicked
		   $(this).closest("li").addClass("active");
		});
	 });
	
	$("#RibbonContainer-TabRowLeft").click(function(){
	    $('.navbar').css('position','relative');
	});
	
	$("ul.ms-cui-tts").click(function(){
	    $('.navbar').css('position','relative');
	});
	
	/*show hide the msribbon*/
	$('#slideUP').click(function(){
		//$("#ms-designer-ribbon").css('height', '85px');
		if($('#ms-designer-ribbon').css('height') > '1px') {
			$('#ms-designer-ribbon').css({'height': '0px'});
			$("#s4-workspace").css("cssText", "height: 100vh !important;");
			icon = $('#slideUP i');
  			icon.toggleClass("fa-chevron-up fa-chevron-down");
		}
		else {
			$('#ms-designer-ribbon').css({'height': 'auto'});
			$("#s4-workspace").css("cssText", "height: calc(100vh - 85px) !important;");
			icon = $('#slideUP i');
  			icon.toggleClass("fa-chevron-up fa-chevron-down");
		}
	});
});
