import express from 'express';
import multer from 'multer';
import { addCar, getCars, getCarById, updateCar, deleteCar } from '../controllers/car.controllers.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure multer destination

// Define routes
router.post('/addcars', upload.array('images'), addCar);
router.get('/getcars', getCars);
router.get('/:id', getCarById);
router.put('/:id', upload.array('images'), updateCar);
router.delete('/:id', deleteCar);

export default router;
