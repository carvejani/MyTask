'use strict';

const mongoose = require('mongoose');
const list = mongoose.model('list');

exports.create = async(data) => {
    var lista = new list(data);
    await lista.save();
} 

exports.get = async() => {
    const res = await list.find({active: true}, 'title');
    return res;
}