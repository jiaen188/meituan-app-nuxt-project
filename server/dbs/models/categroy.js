import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Categroy = new Schema({
  city: {
    type: String
  },
  types: {
    type: Array,
    required: true
  },
  areas: {
    type: Array,
    required: true
  }
})

export default mongoose.model('Categroy', Categroy)
