let topics = [
   'batman',
   'superman',
   'iron man',
   'captain america',
   'thor',
   'aquaman',
   'wolverine',
   'spider-man'
];

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

   $('#add-btn').on('click', function(event) {
      event.preventDefault();
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
      let queryURL = `https://api.giphy.com/v1/gifs/search?q=${hero}&api_key=QG8Wk3B2nvT3HbdkWX8CFzG9eJHJIYEb&limit=10`;
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

            let cardTitle = $('<h2>').attr('class', 'card-title');
            cardTitle.text(results[i].title);

            let p = $('<p>').attr('class', 'card-text');
            p.text(`Rating: ${results[i].rating}`);

            cardTitle.appendTo(cardBody);
            p.appendTo(cardBody);
            gifImage.appendTo(gifCard);
            cardBody.appendTo(gifCard);
            $('#gif-display').append(gifCard);
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

   renderButtons();
});