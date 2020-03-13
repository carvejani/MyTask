'use stritc';

const repository = require('../repository/list-repository');
const guid = require('guid');

exports.post = async(req, res, next) => {
    try {
        await repository.create({
        title: req.body.title
        });
        res.status(201).send({
            message: 'Tarefa cadastrada com sucesso!'
        });
    } catch (error) {
        res.status(500).sen({
            message: error.message
        });
    }
}