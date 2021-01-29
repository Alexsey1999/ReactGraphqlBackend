import mongoose from 'mongoose'

import date from '../src/utils/date.js'

const { Schema, model } = mongoose

const ListSchema = new Schema({
  listname: {
    type: String,
    required: true,
    maxLength: 15,
    trim: true,
  },
  date: {
    type: String,
    default: date,
    required: true,
  },
})

export default model('list', ListSchema)
