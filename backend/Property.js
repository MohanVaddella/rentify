import { Schema, model } from 'mongoose';

const PropertySchema = new Schema({
  place: { type: String, required: true },
  area: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  hospitalsNearby: { type: String },
  collegesNearby: { type: String }
  // Add other property attributes here
});

export default model('Property', PropertySchema);
