const { Router } = require('express');
const { Op, Country, Activity, Country_Activity } = require('../db');
const router = Router();
 

router.get('/all',async(req,res)=>{
 const resu = await Activity.findAll()
 res.json(resu)
})



router.get('/c',async(req,res)=>{
    const {id} = req.body
    const resu = await Country.findOne({
        where:{id},
        include:Activity
    })
    res.send(resu)
   })

router.get('/cya',async(req,res)=>{
    
    try {
        const char = await Country_Activity.findAll({attributes: ['CountryId', 'ActivityId']})
            res.json(char)
    } catch (error) {
        res.send(error)
    }
})

router.get('/one',async(req,res)=>{
    const {name} = req.query
   
    
    try {
        if(!name) throw 'Falta ingresar el nombre de la actividad'
        const resu = await Activity.findOne({where:{name:{[Op.iLike]: name}}, include: Country})
        console.log(resu)
        if(!resu) throw 'La actividad '+name+ ' no se encuentra'


         return res.status(201).json(resu)
        
    } catch (error) {
        return res.status(404).send(error)
    }
   })

router.post('/',async (req,res,next)=>{
    try {
        const { dificultad, name, duracion, temporada, id_pais, opcion, id_activity, opcion_nueva_actividad} = req.body
        //id_pais es un array con los pais a los cuales se le asignará la actividad
        //opcion true: Asigna país
        //opcion false: no asigna país, solo crea actividad 
        //opcion_nueva_actividad: true crea actividad
        //opcion_nueva_actividad: false asigna actividad
        let activity = undefined
        let respuesta= {}
        console.log(req.body)
        if(opcion && !id_pais) throw 'Falta indicar id de el/los país/es'
        
        if(opcion_nueva_actividad ){
                activity = await Activity.create({
                name, 
                dificultad,
                duracion,
                temporada 
                })
                respuesta={msg: 'Actividad creada'}
        } else if (!id_activity) {throw  'Falta indicar el id de la actividad'}
               else {  activity = await Activity.findByPk(id_activity)}

        if (!activity ) throw 'id de actividad inválido' 
        if(opcion)  {
            const promises = id_pais.map(async id=>{
                const pais = await Country.findOne({
                    where:{id},
                    include:Activity
                })
                
                if(!pais) throw 'El pais con id '+id+' es invalido.'
                pais.Activities.map(act=>{
                    if(act.id===activity.id)throw 'El país ya posee la actividad'
                })
                
                
                pais.addActivity(activity)
            })
            await Promise.all(promises)
            
            respuesta = {   
                            msg:"Datos asignados correctamente",
                            actividad: activity,
                            paises:id_pais
                        }
        }
            res.status(200).json(respuesta)
        
    } catch (error) {
            res.status(400).json({"msg":error})
    }
})

module.exports = router;
/* 
router.post('/',async (req,res,next)=>{
    try {
        const { dificultad, name, duracion, temporada, id_pais, opcion, id_activity, opcion_nueva_actividad} = req.body
        //id_pais es un array con los pais a los cuales se le asignará la actividad
        //opcion true: Asigna país
        //opcion false: no asigna país, solo crea actividad 
        //opcion_nueva_actividad: true crea actividad
        //opcion_nueva_actividad: false asigna actividad
        
        if(!id_pais.length && !opcion_nueva_actividad ){throw new Error ('Para asignar actividad debe ingresar el/los id pais/es')}
        else if (!id_activity) {throw new Error ('Falta indicar el id de la actividad')}
        else{    //        opcion_nueva_actividad && !opcion
           
            let activity = undefined
            if(opcion_nueva_actividad){
                activity = await Activity.create({
                name, 
                dificultad,
                duracion,
                temporada 
            })}
            else { activity = await Activity.findByPk(id_activity)}  
            
            const promises = id_pais.map(async id=>{
                const pais = await Country.findByPk(id)
                if(!pais) throw 'El pais con id '+id+' es invalido.'
                pais.addActivity(activity)
            })
            await Promise.all(promises)
            res.status(200).json({
                "msg":"Datos asignados correctamente",
                "paises":id_pais,
                "data":activity})
        }
    } catch (error) {
            res.status(400).json({"msg":error})
    }
}) */