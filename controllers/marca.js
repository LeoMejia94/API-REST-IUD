const Marca = require('../models/marca')
const { request, response } = require('express')

const createMarca = async (req = request, 
    res = response) => {
        try{
            console.log(req.body)
            const nombre = (req.body.nombre) 
            ? req.body.nombre.toUpperCase()
            : '';
            const marcaBD = await Marca.findOne({ nombre })
            if(marcaBD){
                return res.status(400).json({msg: 'Ya existe nombre'})
            }
            const datos = {
                nombre
            }
            const marca = new Marca(datos)
            console.log(marca)
            await marca.save()
            res.status(201).json(marca)
        }catch(e){
          console.log(e)
          return res.status(500).json({
            msg: e
          })
        }
}

const getMarcas = async (req = request,
    res = response) => {
    try{
        console.log(req.query)
        const marca = req.query.estado
        const query = {marca: marca}
        const marcaDB = await Marca.find(query)
        return res.json(marcaDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}

const getMarcaByID = async (req = request,
    res = response) => {
    try{
        console.log(req.query)
        console.log(req.params)
        const marca = req.query.marca
        const id = req.params.id
        const query = {marca: marca, _id: id}
        const marcaDB = await Marca.findOne(query)
        return res.json(marcaDB)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}


const updateMarcaByID = async (req = request,
    res = response) => {
        try{
            console.log(req.body)
            console.log(req.params)
            const data = req.body
            const id = req.params.id
            data.fechaActualizacion = new Date()
            const marca = await Marca.findByIdAndUpdate(id, data, {new: true})
            return res.json(marca)
        }catch(e){
            console.log(e)
            return res.status(500).json({msg: e})  
        }
}

const deleteMarcaByID = async (req = request,
    res = response) => {
    try{
        console.log(req.params)
        const id = req.params.id
        const marcaDB = await Marca.findById(id)
        if(!marcaDB){
            return res.status(404).json({msg: 'No existe la Marca'})
        }
        await Marca.findByIdAndDelete(id)
        return res.status(204).json({msg: 'Borrado', id})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg: e})  
    }
}
module.exports ={
    createMarca, 
    getMarcas, 
    getMarcaByID,
    updateMarcaByID,
    deleteMarcaByID
}