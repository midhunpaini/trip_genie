window.gapi.load('auth2', function() {
    window.gapi.auth2.init({
      client_id: '690124610682-f4qq2ir2c4tk5k1ga6sg71hu8ao6eo4b.apps.googleusercontent.com',
    }).then(function(authInstance) {
      authInstance.attachClickHandler(document.querySelector('.g_id_signin'), {},
        function(googleUser) {
          console.log('Signed in as: ' + googleUser.getBasicProfile().getName());
          // add your sign-in logic here
        }, function(error) {
          console.error(JSON.stringify(error, undefined, 2));
        });
    });
  });
  