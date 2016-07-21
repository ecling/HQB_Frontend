jQuery(document).ready(function($) {
	$().ready(function() {
	    $("#commentForm").validate({
	    	errorElement: "p",
	    	rules: {
	    	      firstname: "required",
	    	      lastname: "required",
	    	      username: {
	    	        required: true,
	    	        minlength: 2
	    	      },
	    	      password: {
	    	        required: true,
	    	        minlength: 5
	    	      },
	    	      confirm_password: {
	    	        required: true,
	    	        minlength: 5,
	    	        equalTo: "#password"
	    	      },
	    	      email: {
	    	        required: true,
	    	        email: true
	    	      },
	    	      topic: {
	    	        required: "#newsletter:checked",
	    	        minlength: 2
	    	      },
	    	      agree: "required",
	    	    },
	    	    messages: {
	    	    	required: "This field is required.",
	    	    	remote: "Please fix this field.",
	    	    	email: "Please enter a valid email address.",
	    	    	url: "Please enter a valid URL.",
	    	    	date: "Please enter a valid date.",
	    	    	dateISO: "Please enter a valid date ( ISO ).",
	    	    	number: "Please enter a valid number.",
	    	    	digits: "Please enter only digits.",
	    	    	creditcard: "Please enter a valid credit card number.",
	    	    	equalTo: "Please enter the same value again.",
	    	    	maxlength: $.validator.format( "Please enter no more than {0} characters." ),
	    	    	minlength: $.validator.format( "Please enter at least {0} characters." ),
	    	    	rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
	    	    	range: $.validator.format( "Please enter a value between {0} and {1}." ),
	    	    	max: $.validator.format( "Please enter a value less than or equal to {0}." ),
	    	    	min: $.validator.format( "Please enter a value greater than or equal to {0}." )
	    	    }
	    });
	});
});