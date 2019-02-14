// set names buttons that will always display on load
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
   'hulk',
   'jean grey',
   'luke cage',
   'deadpool',
   'ant-man'
];

let gifLimit = 0;

let currentGifs = [];

// display default buttons
let renderButtons = (() => {
   topics.forEach((element) => {
      let btn = $('<button>');
      btn.text(element);
      btn.attr('class', 'btn btn-primary hero-btn');
      btn.attr('hero-name', element);
      btn.appendTo('#btn-list');
   })
   let selectHeader = $('<h2>').text('Choose a Character');
   $('#btn-list').prepend(selectHeader);
})

$(document).ready(() => {

   // lets the user add another search button
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

   // initial gif function - displays 10 gifs after GIPHY API call finishes
   function displayGifs() {
      $('#gif-display').empty();
      $('#gif-title').css('visibility', 'visible');
      let hero = $(this).attr('hero-name');
      gifLimit = 10;

      let queryURL = `https://api.giphy.com/v1/gifs/search?q=${hero}&api_key=QG8Wk3B2nvT3HbdkWX8CFzG9eJHJIYEb&limit=${gifLimit}`;
      $.ajax(queryURL).then((response) => {
         let results = response.data;

         for (var i = 0; i < results.length; i++) {
            let gifCard = $('<div>').attr('class', 'card');
            let cardBody = $('<div>').attr('class', 'card-body');
            let gifImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
            gifImage.attr('class', 'card-image-top gif');
            gifImage.attr('data-state', 'still');
            gifImage.attr('data-animate', results[i].images.fixed_height.url);
            gifImage.attr('data-still', results[i].images.fixed_height_still.url);

            let cardTitle = $('<h4>').attr('class', 'card-title');
            cardTitle.text(results[i].title);

            let p = $('<p>').attr('class', 'card-text');
            p.text(`Rating: ${results[i].rating.toUpperCase()}`);

            cardTitle.appendTo(cardBody);
            p.appendTo(cardBody);
            gifImage.appendTo(gifCard);
            cardBody.appendTo(gifCard);
            $('#gif-display').append(gifCard);

            currentGifs.push(results[i].id);
         }

         // add button to load more gifs
         let moreGifBtn = $('<button>');
         moreGifBtn.attr('class', 'btn btn-primary btn-lg btn-block');
         moreGifBtn.attr('id', 'add-gifs');
         moreGifBtn.attr('hero-name', hero);
         moreGifBtn.text('Load more gifs!');
         moreGifBtn.appendTo('#gif-display');
      });
   };

   // adds more gifs to the page after GIPHY API call finishes and deletes add-gif button
   function addGifs() {
      let hero = $(this).attr('hero-name');
      gifLimit += 10;;
      $('#add-gifs').remove();

      let queryURL = `https://api.giphy.com/v1/gifs/search?q=${hero}&api_key=QG8Wk3B2nvT3HbdkWX8CFzG9eJHJIYEb&limit=${gifLimit}`;
      $.ajax(queryURL).then((response) => {
         let results = response.data;

         for (var i = 0; i < results.length; i++) {
            if (!currentGifs.includes(results[i].id)) {
               let gifCard = $('<div>').attr('class', 'card');
               let cardBody = $('<div>').attr('class', 'card-body');
               let gifImage = $('<img>').attr('src', results[i].images.fixed_height_still.url);
               gifImage.attr('class', 'card-image-top gif');
               gifImage.attr('data-state', 'still');
               gifImage.attr('data-animate', results[i].images.fixed_height.url);
               gifImage.attr('data-still', results[i].images.fixed_height_still.url);

               let cardTitle = $('<h4>').attr('class', 'card-title');
               cardTitle.text(results[i].title);

               let p = $('<p>').attr('class', 'card-text');
               p.text(`Rating: ${results[i].rating.toUpperCase()}`);

               cardTitle.appendTo(cardBody);
               p.appendTo(cardBody);
               gifImage.appendTo(gifCard);
               cardBody.appendTo(gifCard);
               $('#gif-display').append(gifCard);

               currentGifs.push(results[i].id);
            }
         }

         // adds button back to the end of the gif column
         let moreGifBtn = $('<button>');
         moreGifBtn.attr('class', 'btn btn-primary btn-lg btn-block');
         moreGifBtn.attr('id', 'add-gifs');
         moreGifBtn.attr('hero-name', hero);
         moreGifBtn.text('Load more gifs!');
         moreGifBtn.appendTo('#gif-display');
      });
   };

   // allows gifs to animate/stop on click
   function animateGifs() {
      let state = $(this).attr('data-state');
      if (state === 'still') {
         $(this).attr('src', $(this).attr('data-animate')).attr('data-state', 'animate');
      }
      if (state === 'animate') {
         $(this).attr('src', $(this).attr('data-still')).attr('data-state', 'still');
      }
   };

   // displays poster & title for movies that correspond to selected hero
   function displayMovies() {
      $('#mov-display').empty();
      $('#mov-title').css('visibility', 'visible');
      let hero = $(this).attr('hero-name');

      let queryURL = `https://www.omdbapi.com/?apikey=trilogy&s=${hero}`;
      $.ajax(queryURL).then((response) => {
         let results = response.Search;

         for (var i = 0; i < results.length; i++) {
            let movCard = $('<div>').attr('class', 'card');
            let cardBody = $('<div>').attr('class', 'card-body');
            let movImage = $('<img>').attr('src', results[i].Poster);
            movImage.attr('class', 'card-image-top');

            let cardTitle = $('<h4>').attr('class', 'card-title');
            cardTitle.text(results[i].Title);

            let p = $('<p>').attr('class', 'card-text');
            p.text(`Year: ${results[i].Year}`);

            cardTitle.appendTo(cardBody);
            p.appendTo(cardBody);
            movImage.appendTo(movCard);
            cardBody.appendTo(movCard);
            $('#mov-display').append(movCard);
         }
      });
   }

   function displayBio() {
      $('#bio-display').empty();
      $('#bio-title').css('visibility', 'visible');
      let hero = $(this).attr('hero-name');

      let queryURL = `https://superheroapi.com/api.php/10107201640381837/search/${hero}`;
      $.ajax(queryURL).then((response) => {
         let results = response.results;

         for (var i = 0; i < results.length; i++) {
            let bioCard = $('<div>').attr('class', 'card');
            let cardBody = $('<div>').attr('class', 'card-body');
            let bioImage = $('<img>').attr('src', results[i].image.url);
            bioImage.attr('class', 'card-image-top');

            let cardTitle = $('<h4>').attr('class', 'card-title');
            cardTitle.text(results[i].name);

            let heroName = $('<p>').attr('class', 'card-text');
            heroName.text(`Real Name: ${results[i].biography['full-name']}`);

            let heroHome = $('<p>').attr('class', 'card-text');
            heroHome.text(`Birthplace: ${results[i].biography['place-of-birth']}`);

            let heroFirst = $('<p>').attr('class', 'card-text');
            heroFirst.text(`First Appearance: ${results[i].biography['first-appearance']}`);

            cardTitle.appendTo(cardBody);
            heroName.appendTo(cardBody);
            heroHome.appendTo(cardBody);
            heroFirst.appendTo(cardBody);
            bioImage.appendTo(bioCard);
            cardBody.appendTo(bioCard);
            $('#bio-display').append(bioCard);
         }
      });
   }

   // click handlers for the page
   $(document).on('click', '.hero-btn', displayGifs);

   $(document).on('click', '.hero-btn', displayMovies);

   $(document).on('click', '.hero-btn', displayBio);

   $(document).on('click', '.gif', animateGifs);

   $(document).on('click', '#add-gifs', addGifs);

   renderButtons();
});