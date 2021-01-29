import { UniqueOperationTypesRule } from 'graphql'
import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    maxLength: 15,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    maxLength: 15,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  city: {
    type: String,
    maxLength: 15,
    required: true,
    trim: true,
  },
  listId: {
    type: String,
    required: true,
  },
})

export default model('user', UserSchema)
