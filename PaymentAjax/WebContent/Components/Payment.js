$(document).ready(function()
	{
	if ($("#alertSuccess").text().trim() == "")
	{
	$("#alertSuccess").hide();
	}
	$("#alertError").hide();
	});
	
// SAVE ============================================
	$(document).on("click", "#btnSave", function(event)
	{
		// Clear alerts---------------------
		$("#alertSuccess").text("");
		$("#alertSuccess").hide();
		$("#alertError").text("");
		$("#alertError").hide();
		
		// Form validation-------------------
	    var status = validatePaymentForm();
		if (status != true)
		{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
		}
		
		 // If valid------------------------
		 var type = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT"; 
		 $.ajax( 
		 { 
		 url : "PaymentAPI", 
		 type : type, 
		 data : $("#formPayment").serialize(), 
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onPaymentSaveComplete(response.responseText, status); 
		 } 
 	}); 
});
		
// UPDATE==========================================
	$(document).on("click", ".btnUpdate", function(event)
	{
	$("#hidPaymentIDSave").val($(this).data("paymentid"));
	$("#paymentCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#paymentName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#paymentPrice").val($(this).closest("tr").find('td:eq(2)').text());
	$("#paymentDesc").val($(this).closest("tr").find('td:eq(3)').text());
	});
	
// DELETE===========================================
	$(document).on("click", ".btnRemove", function(event)
	{ 
	 $.ajax( 
	 { 
	 url : "PaymentAPI", 
	 type : "DELETE", 
	 data : "paymentID=" + $(this).data("paymentid"),
	 dataType : "text", 
	 complete : function(response, status) 
	 { 
	 onPaymentDeleteComplete(response.responseText, status); 
	 } 
	 }); 
});
// CLIENT-MODEL================================================================
function validateItemForm()
	{
	// CODE
	if ($("#paymentCode").val().trim() == "")
	{
	return "Insert Payment Code.";
	}
	// NAME
	if ($("#paymentName").val().trim() == "")
	{
	return "Insert Payment Name.";
	}

	// PRICE-------------------------------
	if ($("#paymentPrice").val().trim() == "")
	{
	return "Insert Payment Price.";
	}
	// is numerical value
	var tmpPrice = $("#paymentPrice").val().trim();
	if (!$.isNumeric(tmpPrice))
	{
	return "Insert a numerical value for Payment Price.";
	}
	// convert to decimal price
	$("#paymentPrice").val(parseFloat(tmpPrice).toFixed(2));
	// DESCRIPTION------------------------
	if ($("#paymentDesc").val().trim() == "")
	{
	return "Insert Payment Description.";
	}
	return true;
}

function onPaymentSaveComplete(response, status)
	{ 
	if (status == "success") 
	 { 
	 var resultSet = JSON.parse(response); 
	 if (resultSet.status.trim() == "success") 
	 { 
	 $("#alertSuccess").text("Successfully saved."); 
	 $("#alertSuccess").show();
	 $("#divPaymentsGrid").html(resultSet.data); 
	 } else if (resultSet.status.trim() == "error") 
	 { 
	 $("#alertError").text(resultSet.data); 
	 $("#alertError").show(); 
	 } 
	 } else if (status == "error") 
	 { 
	 $("#alertError").text("Error while saving."); 
	 $("#alertError").show(); 
	 } else
	 { 
	 $("#alertError").text("Unknown error while saving.."); 
	 $("#alertError").show(); 
	 } 
	 $("#hidItemIDSave").val(""); 
	 $("#formItem")[0].reset(); 
}

function onPaymentDeleteComplete(response, status)
	{ 
	if (status == "success") 
	 { 
	 var resultSet = JSON.parse(response); 
	 if (resultSet.status.trim() == "success") 
	 { 
	 $("#alertSuccess").text("Successfully deleted."); 
	 $("#alertSuccess").show();
	 $("#divPaymentsGrid").html(resultSet.data); 
	 } else if (resultSet.status.trim() == "error") 
	 { 
	 $("#alertError").text(resultSet.data); 
	 $("#alertError").show(); 
	 } 
	 } else if (status == "error") 
	 { 
	 $("#alertError").text("Error while deleting."); 
	 $("#alertError").show(); 
	 } else
	 { 
	 $("#alertError").text("Unknown error while deleting.."); 
	 $("#alertError").show(); 
 } 
}




