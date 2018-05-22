   // Data Service
   const dataService = () => {
       const getCategories = (method, url) => {
           let categories = $.ajax({
               method: method,
               url: url,
               success: ((categories) => {
                   return categories;
               }),
               fail: ((jqXHR, errorText) => {
                   alert(jqXHR, errorText);
               })
           });

           return categories
               .done((categories) => {
                   return categories
               });
       };

       const getAllBeers = (method, url) => {
           let beers = $.ajax({
               method: method,
               url: url,
               success: ((beers) => {
                   return beers;
               }),
               fail: ((jqXHR, errorText) => {
                   alert(jqXHR, errorText);
               })
           });

           return beers
               .done((beers) => {
                   return beers
               });
       };

       const getBeerById = (method, url) => {
           let queryBeer = $.ajax({
               method: method,
               url: url,
               success: ((queryBeer) => {
                   return queryBeer;
               }),
               fail: ((jqXHR, errorText) => {
                   alert(jqXHR, errorText);
               })
           });

           return queryBeer
               .done((beer) => {
                   return beer
               });
       }

       const updateBeer = (method, url, data) => {
           let newBeer = $.ajax({
               method: method,
               url: url,
               data: data,
               dataType: 'application/json',
               success: ((resp) => {
                   console.log(resp)
                   return resp
               }),
               fail: ((jqXHR, errorText) => {
                   alert(jqXHR, errorText);
               })
           });

           return newBeer;
       };

       const deleteBeer = (method, url) => {
           let removedBeer = $.ajax({
               method: method,
               url: url,
               success: ((resp) => {
                   return "successfully deleted";
               }),
               fail: ((jqXHR, errorText) => {
                   alert(jqXHR, errorText);
               })
           });

           return removedBeer.done((beer) => {
               return beer;
           });
       };

       const addBeer = (method, url, data) => {
           let addedBeer = $.ajax({
               method: method,
               data: data,
               dataType: "application/json",
               url: url,
               success: ((resp) => {
                   alert("successfully added new beer");
                   return resp;
               }),
               fail: ((jqXHR, errorText) => {
                   alert(jqXHR, errorText);
               })
           });

           return addedBeer.done((beer) => {
               return beer;
           });
       };
       return {
           getCategories,
           getAllBeers,
           getBeerById,
           updateBeer,
           deleteBeer,
           addBeer
       };
   };