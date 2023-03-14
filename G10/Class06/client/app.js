const API_URL = 'http://localhost:3000/api';

let editFlag = false;
let currentEditReviewId = '';
let cachedReviews = [];

const getReviewsBtn = document.querySelector("#get-reviews");
const postReviewsBtn = document.querySelector("#post-review");

const titleInput = document.querySelector("#film-title");
const scoreInput = document.querySelector("#film-score");
const textInput = document.querySelector("#film-text");

const reviewsListSection = document.querySelector("#posts-list");

getReviewsBtn.addEventListener('click', () => {
    getReviews();
});

postReviewsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let review;
    
    if (editFlag) {
        review = getFormInput();
        putExistingReview(currentEditReviewId, review);
    } else {
        review = getFormInput();
        onAddNewReview(review);
    }
})

reviewsListSection.addEventListener('click', (e) => {
    const id = e.target.id;
    const reviewId = id.substr(4, id.length);

    if (id.startsWith('del')) {
        onDeleteReview(reviewId);
    }

    if (id.startsWith('edt')) {
        // Raise EDIT flag
        // Now we're in EDIT mode
        editFlag = true;
        currentEditReviewId = reviewId;
        // Get the review we want to edit
        const editReview = cachedReviews.filter((review) => review.id === reviewId)[0];
        
        titleInput.value = editReview.title;
        scoreInput.value = editReview.score;
        textInput.value = editReview.text;
    }
});

const getFormInput = () => {
    const title = titleInput.value;
    const score = scoreInput.value;
    const text = textInput.value;

    const newReview = {
        title,
        score,
        text
    };

    return newReview;
}

const putExistingReview = (currentRevId, rev) => {
    fetch(`${API_URL}/reviews/${currentRevId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rev)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        editFlag = false;
        currentEditReviewId = '';
    })
}

const onDeleteReview = (reviewId) => {
    fetch(`${API_URL}/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    })
}

const onAddNewReview = (newReview) => {
    fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    })
    .then((response) => response.json())
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })  
}

const getReviews = () => {
    fetch(`${API_URL}/reviews`)
        .then((response) => response.json())
        .then((result) => {
            // Since the db, holds an object that has a reviews property
            cachedReviews = result;
            renderReviews(cachedReviews);
    })
}

const renderReviews = (reviews) => {
    let inner = '';
    console.log(reviews);
    reviews.forEach((review) => {
        inner += 
        `
        <div class="film-card">
          <div class="film-card__header">
            <span class="film-card__header-title">
              ${review.title}
            </span>
            <span class="film-card__header-score"> ${review.score} </span>
            <button class="btn-delete" id="del-${review.id}">Delete</button>
            <button class="btn-edit" id="edt-${review.id}">Edit</button>
          </div>
          <div class="film-card__content">
            ${review.text}
          </div>
        </div>
        `
    })
    reviewsListSection.innerHTML = inner;
}