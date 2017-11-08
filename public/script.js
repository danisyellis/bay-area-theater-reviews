console.log('hello from the browser JavaScript');

//const trashButtons = document.getElementsByClassName('trashCan');
const trash = document.querySelectorAll('.delete');
const theReview = document.getElementById('review');

trash.forEach(dButton => {
  dButton.addEventListener("click", (e) => {
    var reallyDelete = confirm("Are you sure?");
    const albumId = e.target.getAttribute('data-album-id');
    const reviewId = e.target.getAttribute('data-review-id');
    if(reallyDelete) {
      window.location.href = `/albums/${albumId}/reviews/${reviewId}`
    }
  });
});






// console.log(trashButtons.length);
//
// for(var i=0; i<trashButtons.length; i++) {
//   console.log(trashButtons.length);
//     trashButtons[i].addEventListener("click", () => {
//       console.log("I was clicked!");
//       document.confirm("Are you sure?");
//     });
// }
