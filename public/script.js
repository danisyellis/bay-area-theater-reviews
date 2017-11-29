const trashButtons = document.querySelectorAll('.delete');

trashButtons.forEach(dButton => {
  dButton.addEventListener("click", (e) => {
    var reallyDelete = confirm("Are you sure?");
    const albumId = e.target.getAttribute('data-album-id');
    const reviewId = e.target.getAttribute('data-review-id');
    if(reallyDelete) {
      const reviewToDelete = document.getElementById(`reviews-${reviewId}`);
      console.log(reviewToDelete, "to delete");
      fetch(`/albums/${albumId}/reviews/${reviewId}`, {method: 'DELETE', credentials: 'include'})
      .then((responseFromFetch) => {
        reviewToDelete.remove();
        //another way to do it: e.parentElement.remove();
      })
      .catch(err => {
        console.log("Fetch error is: ", err);
      });
    }
  });
});
