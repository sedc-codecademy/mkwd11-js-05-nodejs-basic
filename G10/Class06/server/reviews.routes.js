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
router.put(reviewsRoute, (req, res) => {
    try {

    } catch (error) {
        
    }
})

// method === PATCH
router.patch(reviewsRoute, (req, res) => {
    try {

    } catch (error) {
        
    }
})

// method === DELETE
router.delete(reviewsRoute, (req, res) => {
    try {

    } catch (error) {
        
    }
})

export default router;