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
	$("#account_setting_form").validate({errorElement: "p",
		rules: {
	 	   email: {
	 	    required: true,
	 	    email: true
	 	   },
	 	   username:{
	 	   	required: true,
	 	   },
	 	   number:{
	 	   	required: true,
	 	   },
	 	},
	 	messages: {
	 		email: "Please enter a valid email address.",
	 		username:"Please enter your username",
	 		number:"Please enter your PhoneNumber",
	 	},
	});
	$("#change_email_form").validate({errorElement: "p",
		rules: {
	 	   email: {
	 	    required: true,
	 	    email: true,
	 	   },
	 	   confirm_emails:{
	 	   	required: true,
	 	    email: true,
	 	   },
	 	},
	 	messages:{
	 		email: "Please enter a valid email address.",
	 		confirm_emails:"Please enter a valid email address again.",
	 	},
	});
	$("#change_password_form").validate({errorElement: "p",
		rules: {
	 	   password1: {
	 	    required: true,
	 	    minlength: 8
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
	 		password1: "Please enter you original password.",
	 		password:"Please enter your password.",
	 		confirm_password: "Enter your password again.",
	 	},
	});
});