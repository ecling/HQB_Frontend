jQuery(document).ready(function($) {
	$("#commentForm2").validate({errorElement: "p",});
	$("#commentForm").validate({errorElement: "p",	});
	$("#signIn_form").validate({
	 	errorElement: "em",
	 	rules: {
	 	   email: {
	 	    required: true,
	 	    email: true
	 	   },
	 	   password: {
	 	    required: true,
	 	    minlength: 8
	 	   },
	 	},
	 	messages: {
	 		email: "Please enter a valid email address.",
	 		password:"Please enter your password.",
	 	},
	});

	$("#register_form").validate({errorElement: "em",	
	 	errorElement: "em",
	 	rules: {
	 	   email: {
	 	    required: true,
	 	    email: true
	 	   },
	 	   password: {
	 	    required: true,
	 	    minlength: 8
	 	   },
	 	   confirm_password: {
	 	    required: true,
	 	    equalTo: "#password"
	 	    },
	 	},
	 	messages: {
	 		email: "Please enter a valid email address.",
	 		password:"Please enter your password.",
	 		confirm_password: "Enter your password again.",
	 	},

	});
});