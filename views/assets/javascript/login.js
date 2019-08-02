$(document).ready(() => {
    // Getting out form and inputs

    const loginForm = $("#login");
    const emailInput = $("#emailInput");
    const passwordInput = $("#passwordInput");

    // When the user clicks submit, we validate there's an email and password entered

    loginForm.on("submit", (event) => {
        event.preventDefalut();
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    })

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (data) {

            window.location.replace(data);
            // If there's an error, log the error
        }).catch(function (err) {
            if (err.status === 401) {
                alert("Invalid email or password");
            }
        });
    }


})