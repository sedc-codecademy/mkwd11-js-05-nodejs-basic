import express from 'express';
import * as reviewsService from './reviews.service.js'

const router = express.Router();

// /api

const reviewsRoute = '/reviews';

// method === GET
router.get(reviewsRoute, (req, res) => {
    try {
        
    } catch (error) {

    }
})

// method === POST
router.post(reviewsRoute, (req, res) => {
    // Prepare data
    const body = req.body

    try {
        // Business logic (in service)
        reviewsService.addReview(body)
        // Send response
    } catch (error) {
        // Send error
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