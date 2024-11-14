import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  tags: {
    car_type: { type: String, trim: true },
    company: { type: String, trim: true },
    dealer: { type: String, trim: true },
  },
});


const Car = mongoose.model('Car', carSchema);

export default Car;
