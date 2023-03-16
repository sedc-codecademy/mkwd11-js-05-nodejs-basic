import express from 'express';
import * as reviewsService from './reviews.service.js'

const router = express.Router();

// /api

const reviewsRoute = '/reviews';

// method === GET
router.get(reviewsRoute, (req, res) => {
    try {
        // get data from the service
        const reviews = reviewsService.getReviews()
        // return data as response
        res.status(200).send(reviews)
    } catch (error) {
        // return error
        // res.sendStatus(500)
        res.status(500).send('Problem while fetching reviews')
    }
})

// method === POST
router.post(reviewsRoute, (req, res) => {
    // Prepare data
    const body = req.body

    try {
        // Business logic (in service)
        const review = reviewsService.addReview(body)
        // Send response
        res.status(200).send(review)
    } catch (error) {
        // Send error
        res.status(500).send(error.message)
    }
})

// method === PUT
router.put(`${reviewsRoute}/:id`, (req, res) => {
    // Prepare data
    const id = req.params.id;
    const body = req.body;

    try {
        // Send data to service
        const updatedReview = reviewsService.updateReview(id, body)
        // Send response
        res.status(200).send(updatedReview);
    } catch (error) {
        // Send error
        res.status(400).send(error.message)
    }
})

// method === PATCH
router.patch(`${reviewsRoute}/:id`, (req, res) => {
    // Prepare data
    const id = req.params.id;
    const body = req.body;

    try {
        // send data to service
        const updatedReview = reviewsService.partiallyUpdateReview(id, body)
        // send response
        res.status(200).send(updatedReview)
    } catch (error) {
        // send error
        res.status(400).send(error.message)
    }
})

// method === DELETE
router.delete(`${reviewsRoute}/:id`, (req, res) => {
    // Prepare data
    const id = req.params.id

    try {
        // send id to service
        reviewsService.deleteReview(id)
        // send response
        res.sendStatus(200)
    } catch (error) {
        // send error
        res.status(500).send('Cannot delete review')
    }
})

export default router;