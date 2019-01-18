let topics = [
   'batman',
   'superman',
   'iron man',
   'captain america',
   'thor',
   'aquaman',
   'wolverine',
   'spider-man',
   'wonder woman',
   'hulk'
];

let gifLimit = 0;

let currentGifs = [];

let renderButtons = (() => {
   topics.forEach((element) => {
      let btn = $('<button>');
      btn.text(element);
      btn.attr('class', 'btn btn-primary hero-btn');
      btn.attr('hero-name', element);
      btn.appendTo('#btn-list');
   })
})

$(document).ready(() => {

   $('#add-btn').on('click', (e) => {
      e.preventDefault();
      let newHero = $('#add-hero').val().trim();
      if (!topics.includes(newHero)) {
         topics.push(newHero);
      }
      $('#add-hero').val('');
      $('#btn-list').empty();
      renderButtons();

   });

   function displayGifs() {
      $('#gif-display').empty();
      let hero = $(this).attr('hero-name');
      gifLimit = 10;

      let queryURL = `https://api.giphy.com/v1/gifs/search?q=${hero}&api_key=QG8Wk3B2nvT3HbdkWX8CFzG9eJHJIYEb&limit=${gifLimit}`;
      $.ajax(queryURL).then((response) => {
         let results = response.data;

         for (var i = 0; i < results.length; i++) {
            let gifCol = $('<div>').attr('class', 'col-sm-4');
            let gifCard = $('<div>').attr('class', 'card');
            let cardBody = $('<div>').attr('class', 'card-body');
            let gifImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
            gifImage.attr('class', 'card-image-top gif');
            gifImage.attr('data-state', 'still');
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);

            let cardTitle = $('<h2>').attr('class', 'card-title');
            cardTitle.text(results[i].title);

            let p = $('<p>').attr('class', 'card-text');
            p.text(`Rating: ${results[i].rating.toUpperCase()}`);

            cardTitle.appendTo(cardBody);
            p.appendTo(cardBody);
            gifImage.appendTo(gifCard);
            cardBody.appendTo(gifCard);
            gifCard.appendTo(gifCol)
            $('#gif-display').append(gifCol);

            currentGifs.push(results[i].id);
         }
      });

      $('#add-gifs').css('visibility', 'visible');
      $('#add-gifs').attr('hero-name', hero);
   };

   function addGifs() {
      let hero = $(this).attr('hero-name');
      gifLimit += 10;;

      let queryURL = `https://api.giphy.com/v1/gifs/search?q=${hero}&api_key=QG8Wk3B2nvT3HbdkWX8CFzG9eJHJIYEb&limit=${gifLimit}`;
      $.ajax(queryURL).then((response) => {
         let results = response.data;
         console.log(response);

         for (var i = 0; i < results.length; i++) {
            if (!currentGifs.includes(results[i].id)) {
               let gifCol = $('<div>').attr('class', 'col-sm-4');
               let gifCard = $('<div>').attr('class', 'card');
               let cardBody = $('<div>').attr('class', 'card-body');
               let gifImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
               gifImage.attr('class', 'card-image-top gif');
               gifImage.attr('data-state', 'still');
               gifImage.attr('data-animate', results[i].images.fixed_height.url);
               gifImage.attr('data-still', results[i].images.fixed_height_still.url);

               let cardTitle = $('<h2>').attr('class', 'card-title');
               cardTitle.text(results[i].title);

               let p = $('<p>').attr('class', 'card-text');
               p.text(`Rating: ${results[i].rating.toUpperCase()}`);

               cardTitle.appendTo(cardBody);
               p.appendTo(cardBody);
               gifImage.appendTo(gifCard);
               cardBody.appendTo(gifCard);
               gifCard.appendTo(gifCol)
               $('#gif-display').append(gifCol);

               currentGifs.push(results[i].id);
            }
         }
      });
   };

   function animateGifs() {
      let state = $(this).attr('data-state');
      if (state === 'still') {
         $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');
      }
      if (state === 'animate') {
         $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
      }
   };

   $(document).on('click', '.hero-btn', displayGifs);

   $(document).on('click', '.gif', animateGifs);

   $(document).on('click', '#add-gifs', addGifs);

   renderButtons();
});