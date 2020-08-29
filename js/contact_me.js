$(function() {
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      // Envio de correo con js      
      Email.send("admin@iplataformacomercial.com",
      "info@iplataformacomercial.com",
      "Cliente solicita creación de cuenta en iPlataformaComercial",
      "Datos del cliente <br/>"+
      " - Nombre: " + name + " <br/>" +
      " - Email: " + email + " <br/>" +
      " - Celular: " + phone + " <br/>" +
      " - Mensaje: " + message,
      {
        token: "4b8bbf7e-c132-4331-85ba-4e5c1b107e9d"
        //token: "b3b0afbf-099f-46f8-8972-6393a87881b1",//PRD
        callback: function done(message) { 
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Su mensaje se ha enviado con éxito.</strong>");
          $('#success > .alert-success')
            .append('</div>');
          // Clear all fields
          $('#contactForm').trigger("reset");

          // Complete
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
