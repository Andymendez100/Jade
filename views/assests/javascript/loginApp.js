$(document).ready(() => {

    const loginForm = $('#loginButton');
    const emailInput = $("#emailInput")
    const passwordInput = $('#passwordInput')

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("click", (event) => {
        event.preventDefault();
        var userData = {
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
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    let loginUser = (email, password) => {
        $.post("/api/login", {
            email: email,
            password: password
        }).then((data) => {
            // console.log(data);
            sessionStorage.setItem("id", data)
            window.location.replace("/members");
            // If there's an error, log the error
        }).catch((err) => {
            if (err.status === 401) {
                alert("Incorrect email or password");


            }
        });
    }


})