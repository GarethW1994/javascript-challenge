$(document).ready(() => {
    // compile category list 
    let categoryContainer = document.getElementById('categoryContainer');
    let listSource = document.getElementById('categoryList');
    let categoryTemplate = Handlebars.compile(listSource.innerHTML);

    // list of categories
    let categoryList;

    var selectedBeer;

    let baseURL = "//apichallenge.canpango.com";

    // Get ALL categories
    dataService().getCategories("GET", baseURL + "/categories/")
        .done((categories) => {
            categoryList = categories;

            //Populate category in list on html
            categoryContainer.innerHTML = categoryTemplate({
                categories: categoryList
            });
        });

    // delete / view details button clicks
    $("#beersList").on('click', (event) => {
        let url = event.target.id;
        let value = event.target.value;


        if (value == "details") {
            //clear local storage
            localStorage.removeItem('selectedBeer');

            dataService().getBeerById("GET", url)
                .done((beer) => {
                    localStorage.setItem('selectedBeer', JSON.stringify(beer));
                    window.location = 'details.html';
                });
        } else if (value == "delete") {
            console.log(value);

            dataService().deleteBeer("DELETE", url)
                .done((beer) => {
                    alert("Successfully deleted beer");
                    // Get ALL categories
                    window.location.reload();
                });
        };
    });


    // add new beer button click
    $("#addNewBeerBtn").on('click', (event) => {
        window.location = "addBeer.html";
    });
});