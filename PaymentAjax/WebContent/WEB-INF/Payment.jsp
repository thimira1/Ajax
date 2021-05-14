<%@page import= "com.Payment" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="View/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Item.js"></script>
</head>
<body>

<div class="container"><div class="row"><div class="col-6">

<h1>Payment Service </h1>
<form id="formPayment" name="formPayment" method="post" action="Payment.jsp">
 Item code: 
<input id="paymentCode" name="paymentCode" type="text" 
 class="form-control form-control-sm">
<br> Payment name: 
<input id="paymentName" name="paymentName" type="text" 
 class="form-control form-control-sm">
<br> Payment Amount: 
<input id="paymentAmount" name="paymentAmount" type="text" 
 class="form-control form-control-sm">
<br> Payment Telephone: 
<input id="paymentDesc" name="payemntDesc" type="text" 
 class="form-control form-control-sm">
<br>
<input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
<input type="hidden" id="hidPaymentIDSave" name="hidPaymentIDSave" value="">
</form>

<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>


<br>
<div id="divItemsGrid">

<%
Payment paymentObj = new Payment(); 
 out.print(paymentObj.readPayments()); 
%>
</div>

</div></div></div>

</body>
</html>