$(document).ready(() => {

    $("#updateBeer").on('click', (event) => {
        // get updated values
        let form = $('input');
        let updateBeer = {};
        let verified = false;

        for (let i = 0; i < form.length; i++) {
            let currentVal = form[i].value;
            let currentName = form[i].name;

            if (currentVal && currentName) {
                if (updateBeer[currentName] === undefined) {
                    if (currentName == 'ibu' || currentName == 'calories') {
                        updateBeer[currentName] = Number(currentVal);
                    } else {
                        updateBeer[currentName] = currentVal;
                    }
                    verified = true;
                };
            } else {
                verified = false;
            };
        };


        if (verified) {
            // update the beer;
            localStorage.removeItem('selectedBeer');

            let url = form[0].value;

            let beer = dataService().updateBeer("PUT", url, updateBeer);

            beer.done((beer) => {
                // having errors to resolve request
                console.log(beer);
            });

            // making a new call to request for the  updated beer
            dataService().getBeerById("GET", url)
                .done((beer) => {
                    console.log(beer);
                    localStorage.setItem('selectedBeer', JSON.stringify(beer));

                    alert('Updated Beer Successfully')


                    window.location.reload()
                });
        }
    });
});