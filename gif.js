$(document).ready(function () {

    console.log("running")
    var categories = ["cat", "dog", "turtle", "fish"];

    function pageLoad() {
        for (let i = 0; i < categories.length; i++) {
            var button = $("<button>")
            button.text(categories[i])
            button.attr("data-animal", categories[i])
            button.attr("class", "imageBtn")
            $("#buttons").append(button)
        }
    }


    $(document).on("click", ".imageBtn", function () {
        var animal = $(this).attr("data-animal")
        var query = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=hs5bf305VJ4yXzAnPMbBhciEyL3mf3RW"
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            console.log("success got data", response);
            var gifsArray = response.data
            $("#images").empty()
            for (let i = 0; i < gifsArray.length; i++) {
                var img = $("<img>")
                img.addClass("gif")
                img.attr("src", gifsArray[i].images.original_still.url)
                img.attr("data-state", "still")
                img.attr("data-still", gifsArray[i].images.original_still.url)
                img.attr("data-animate", gifsArray[i].images.preview_gif.url)
                $("#images").append(img)
            }
        });
    })

    // trying to make the gifs move and pause on click
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    // add a new animal in the "add an animal" field/button
    $("#addBtn").on("click", function () {
        $("#buttons").empty()
        var animalType = $("#animalInput").val()
        categories.push(animalType)
        pageLoad()
    })

    pageLoad()
})