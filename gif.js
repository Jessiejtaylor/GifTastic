var categories = ["cat", "dog", "turtle", "fish"]

function pageLoad() {

    for (let i = 0; i < categories.length; i++) {
        var button = $("<button>")
        button.text(categories[i])
        button.attr("class", "imageBtn")
        $("#buttons").append(button)
        $(".imageBtn").on("click", function () {

            var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + categories[i] + "&api_key=hs5bf305VJ4yXzAnPMbBhciEyL3mf3RW");
            xhr.done(function (response) {
                console.log("success got data", response);
                var gifsArray = response.data
                $("#images").empty()
                for (let i = 0; i < gifsArray.length; i++) {

                    var img = $("<img>")
                    img.attr("src", gifsArray[i].images.original_still.url)
                    $("#images").append(img)


                }
            });
        })
    }

}
pageLoad()



$("#addBtn").on("click", function () {
    $("#buttons").empty()
    var animalType = $("#animalInput").val()
    categories.push(animalType)
    pageLoad()
})



// $("#buttons").empty()
// categories.push("shark")

// pageLoad()