'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Título Obrigatório'],
    trim: true
  }
});


module.exports = mongoose.model('List', this.schema)