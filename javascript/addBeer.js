$(document).ready(() => {
    $("#addBeer").on('click', async () => {
        let form = $("#addBeerForm")[0];

        let newBeer = {};
        let valid = false;

        for (var i = 0; i < form.length - 1; i++) {
            let currentVal = form[i].value;
            let currentKey = form[i].id;


            if (!currentVal) {
                $("#" + currentKey)[0].style.border = "1px solid red";
                valid = false;
            } else {
                $("#" + currentKey)[0].style.border = "1px solid green";

                if (currentKey == "url" || currentKey == "calories" || currentKey == "ibu" || currentKey == "category") {
                    if (Number(currentVal) == currentVal) {
                        currentVal = Number(currentVal);
                        $("#" + currentKey)[0].style.border = "1px solid green";
                        valid = true;
                    } else {
                        $("#" + currentKey)[0].style.border = "1px solid red";
                        valid = false;
                    };
                };

                if (currentKey == "created_on") {
                    let date = new Date(currentVal);

                    if (date !== "Invalid Date") {
                        $("#" + currentKey)[0].style.border = "1px solid green";
                        valid = true;
                    } else {
                        $("#" + currentKey)[0].style.border = "1px solid red";
                        valid = false;
                    };
                };
            };

            if (valid) {
                if (newBeer[currentKey] === undefined) {
                    newBeer[currentKey] = currentVal;
                };
            };
        };

        if (valid) {
            newBeer.url = "http://apichallenge.canpango.com/beers/" + newBeer.url + "/";
            newBeer.category = "http://apichallenge.canpango.com/category/" + newBeer.category + "/";



            try {
                let result = await dataService().addBeer("POST", "http://apichallenge.canpango.com/beers/", newBeer);
            } catch (result) {
                if (result) {
                    if (result.statusText == "Created") {
                        window.location = "index.html";

                    };
                };
            };
        };
    });
});