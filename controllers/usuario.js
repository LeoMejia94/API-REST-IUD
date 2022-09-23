const Usuario = require('../models/usuario')
const {request, response} = require('express')

const createUsuario = async (req = request, res = response) => {
    console.log(req.body)
    const usuarioBD = await Usuario.findOne({ email })
    if(usuarioBD){
        return res.status(400).json({msg: 'Ya existe usuario'})
    }
    const usuario = new Usuario(req.body)
    console.log(usuario)
    await usuario.save()
    res.status(201).json(usuario)
}
const getUsuarios = async (req = request,
    res = response) => {
    try{
        console.log(req.query)
        const usuario = req.query.usuario
        const query = {usuario: usuario}
        const usuarioDB = await Usuario.find(query)
        return res.json(usuarioDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
 }
 
 
 const getUsuarioByID  = async (req = request,
    res = response) => {
    try{
        console.log(req.query)
        console.log(req.params)
        const usuario = req.query.Usuario
        const id = req.params.id
        const query = {usuario: usuario, _id: id}
        const usuarioDB = await Usuario.findOne(query)
        return res.json(usuarioDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
 }
 
 
 const updateUsuarioByID = async (req = request,
    res = response) => {
        try{
            console.log(req.body)
            console.log(req.params)
            const data = req.body
            const id = req.params.id
            data.fechaActualizacion = new Date()
            const usuario = await Usuario.findByIdAndUpdate(id, data, {new: true})
            return res.json(usuario)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: e})  
        }
 }
 
 
 const deleteUsuarioByID = async (req = request,
    res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const usuarioDB = await Usuario.findById(id)
        if(!usuarioDB){
            return res.status(404).json({msg: 'No existe el usuario'})
        }
        await Usuario.findByIdAndDelete(id)
        return res.status(204).json({msg: 'Borrado', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
 }
module.exports = { 
    createUsuario,
    getUsuarios, 
    getUsuarioByID,
    updateUsuarioByID,
    deleteUsuarioByID
}