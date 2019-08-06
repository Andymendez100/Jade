// Created JS page for feed.

$(document).ready(function () {
    const getUserFeed = () => {
        $.get("/api/userFeed").then((data) => {
            console.log(data);

        })
    }

    getUserFeed();
})