const TipoEquipo = require('../models/TipoEquipo') 
const {request, response} = require('express')

const createTipoEquipo = async (req = request, res = response) =>{
     console.log(req.body) 
     ? req.body.nombre.toUpperCase()
     : '';
     const tipoEquipoBD = await TipoEquipo.findOne ({ nombre })
     if(tipoEquipoBD){
        return res.status(400).json({msg: 'ya existe nombre'})
     }
     const datos = {
        nombre
        
     }
     const tipoEquipo = new TipoEquipo(datos)
     console.log(tipoEquipo)
     await tipoEquipo.save()
     res.status(201).json(tipoEquipo)
}


const getTiposEquipo =  async (req = request,
    res = response) => {
   try{
   const estado = req.query.estado
      const query = {estado: estado}
      const tipoEquipoDB = await TipoEquipo.find(query)
      return res.json(tipoEquipoDB)   
   }catch(e){
   console.log(e)
   return res.status(500).json({msg: e})
}}


const getTipoEquipoByID =  async (req = request,
    res = response) => {
   try{
      console.log(req.query)
      console.log(req.params)
      const estado = req.query.estado
      const id = req.params.id
         const query = {estado: estado, _id: id}
         const tipoEquipoDB = await TipoEquipo.find(query)
         return res.json(tipoEquipoDB)   
      }catch(e){
      console.log(e)
      return res.status(500).json({msg: e})
   }
   

}

const updateTipoEquipoByID = async (req = request,
   res = response) => {
   try{
      console.log(req.body)
      console.log(req.params)
      const data = req.body
      const id = req.params.id
      const tipoequipoDB = await TipoEquipo.findById(id)
      if(!tipoequipoDB){
          return res.json({msg: 'No existe el tipo equipo'})
      }
      data.fechaActualizacion = new Date()
      console.log(data)
      const tipoEquipo = await TipoEquipo.findByIdAndUpdate(id, data, {new: true})
      return res.json(tipoEquipo)
  }catch(e){
      console.log(e)
      return res.status(500).json({msg: e})  
  }

}


 
const deleteTipoEquipoByID = async (req = request,
   res = response) => {
   try{
       console.log(req.params)
       const id = req.params.id
       const tipoequipoDB = await TipoEquipo.findById(id)
       if(!tipoequipoDB){
           return res.status(404).json({msg: 'No existe el tipo equipo'})
       }
       await TipoEquipo.findByIdAndDelete(id)
       return res.status(204).json({msg: 'Borrado', id})
   }catch(e){
       console.log(e)
       return res.status(500).json({msg: e})  
   }

}

module.exports = { 
    createTipoEquipo,
    getTiposEquipo, 
    getTipoEquipoByID,
    updateTipoEquipoByID,
    deleteTipoEquipoByID
}
