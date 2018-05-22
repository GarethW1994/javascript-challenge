$(document).ready(() => {
    let beerContainer = document.getElementById("beersList");
    let listbeers = document.getElementById('beers');
    let beerListTemplate = Handlebars.compile(listbeers.innerHTML);

    let allbeers;
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
});