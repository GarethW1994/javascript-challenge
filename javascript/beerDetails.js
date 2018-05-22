$(document).ready(() => {
    let beerContainer = document.getElementById("detailedBeer");
    let listbeers = document.getElementById('beers');
    let beerListTemplate = Handlebars.compile(listbeers.innerHTML);

    let viewBeer = document.getElementById("detailed");
    let beerDetailed = document.getElementById('beerItem');
    let detailedTemplate = Handlebars.compile(beerDetailed.innerHTML);

    let beer = localStorage.getItem('selectedBeer');

    let detailedBeer = JSON.parse(beer);


    const renderBeer = (beer) => {
        // render beer
        viewBeer.innerHTML = detailedTemplate({
            beer: detailedBeer
        });

        beerContainer.innerHTML = beerListTemplate({
            beer: detailedBeer
        })
    }

    renderBeer(detailedBeer);
});