$(document).ready(() => {
    var beerContainer = document.getElementById("beersList");
    var listbeers = document.getElementById('beers');
    var beerListTemplate = Handlebars.compile(listbeers.innerHTML);

    var allbeers;

    // clear filtering
    $("#clearSearch").on('click', (event) => {
        renderBeerList(allbeers);
        $("#beerSearch").val("");
    });

    // render all the beers
    // get beers under specified category from data service
    dataService().getAllBeers('GET', "http://apichallenge.canpango.com/beers/")
        .done((beers) => {
            if (beers) {
                allbeers = beers;
                renderBeerList(beers);
            };
        });

    $('#categoryContainer').on('click', (event) => {
        // get the category number from selected category
        let categoryUrl = event.target.id;

        if (categoryUrl.includes('.com')) {
            let categoryNumber = getCategoryNum(categoryUrl);

            // get beers under specified category from data service
            dataService().getAllBeers('GET', "http://apichallenge.canpango.com/beers/")
                .done((beers) => {
                    if (beers) {
                        let resp = filterForCategory(beers, categoryNumber);

                        renderBeerList(resp);
                    };
                });
        } else if (categoryUrl == 'all') {
            renderBeerList(allbeers);
        }
    });

    // Handle Get Category Functionality
    const getCategoryNum = (url) => {
        let strippedUrl = url.replace(/^\D+/g, '');
        let categoryNumber = Number(strippedUrl.replace('/', ""));

        return categoryNumber;
    };

    // filter through beer list and find the corresponding 
    // beer by category selected 
    const filterForCategory = (beers, categoryNumber) => {
        let filteredBeers = [];

        beers.forEach(beer => {
            let currentBeerCategory = getCategoryNum(beer.category);

            if (currentBeerCategory == categoryNumber) {
                filteredBeers.push(beer);
            };
        });

        return filteredBeers;
    };

    const renderBeerList = (beers) => {
        beerContainer.innerHTML = beerListTemplate({
            beers: beers
        });
    };


    // search by beer name in text box
    $("#beerSearch").on('change', (event) => {
        // clear all the beers
        beerContainer.innerHTML = "";

        // show the loader
        $("#loader").removeClass("hidden");

        let query = event.target.value;

        if (query) {
            dataService().searchBeer("GET", "http://apichallenge.canpango.com/beers/search/?q=" + query.toLocaleLowerCase())
                .done((beer) => {
                    if (beer.length > 0) {
                        beerContainer.innerHTML = beerListTemplate({
                            beers: beer
                        });
                        // hide the loader
                        $("#loader").addClass("hidden");
                    } else {
                        // hide the loader
                        $("#loader").addClass("hidden");
                        alert('Beer Not Found :(');

                        beerContainer.innerHTML = beerListTemplate({
                            beers: allbeers
                        });
                    };
                });
        } else {
            // hide the loader
            $("#loader").addClass("hidden");
            beerContainer.innerHTML = beerListTemplate({
                beers: allbeers
            });
        };
    });
});