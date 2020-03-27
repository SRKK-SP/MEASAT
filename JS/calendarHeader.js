$(document).ready(function(){
	 $("#AsynchronousViewDefault_CalendarView .ms-acal-header table tbody tr td:nth-child(2)").insertAfter("#AsynchronousViewDefault_CalendarView .ms-acal-header table tbody tr td:last-child()");
	 $("#AsynchronousViewDefault_CalendarView .ms-acal-header table tbody tr td:nth-child(2)").addClass('text-center')
	 
	 console.log('test');

	//  $($('.ms-acal-sdiv').get(0).nextSibling).remove();

	// $('.ms-acal-sdiv').contents().filter(function() {
	// 	return this.nodeType === 3;
	// }).remove();
	
	// $(".ms-acal-sdiv").html($(".ms-acal-sdiv").find("a"));
});