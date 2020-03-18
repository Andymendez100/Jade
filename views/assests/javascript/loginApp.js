$(document).ready(() => {
  const loginForm = $('#loginButton');
  const emailInput = $('#emailInput');
  const passwordInput = $('#passwordInput');

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  const loginUser = (email, password) => {
    $.post('/api/login', {
      email,
      password,
    }).then((data, err) => {
      if (err.status === 401) {
        alert('Incorrect email or password');
      }
      if (err.status === 500) {
        alert('No user found');
      }
      // console.log(data);
      // sessionStorage.setItem("id", data)
      window.location.replace('/members');
      // If there's an error, log the error
    });
  };
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('click', event => {
    console.log('working');

    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });
});
