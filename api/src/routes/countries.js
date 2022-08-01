const { Router } = require('express');
const { Op, Country, Activity } = require('../db');
const router = Router();
const API_URL = "https://restcountries.com/v3/all";
var axios = require("axios");
 
router.get('/', async (req,res)=>{
    const {name} = req.query

    try { 
        const loaded = await Country.findByPk('DEN')
        if(!loaded){    
            const respuesta = await axios(API_URL);  
            // en .data Llega como array de 250 de largo
            const countriesPromises = respuesta.data.map(async(e)=>{ 
                let identi = 0
                let capi = undefined
                let flag = undefined
                const {cca3, cioc, flags, region, capital, subregion, area, population} = e;
                if(capital) capi = capital[0];
                else (capi='No se encuentra en la BD')
                flag = flags[0] 
                if(cioc) identi = cioc;
                else if(cca3) identi = cca3
                const pais = Country.create({
                    id:identi,
                    name:e.name.common,
                    img:flag,
                    region,
                    capital: capi,
                    subregion,
                    area,
                    population
                }) 
                return pais  
            })
            await Promise.all(countriesPromises) 
            /* .then(async c=>{
                if(!name) return res.status(201).json(c)  
                const namee='%'+name+'%'
                result = await Country.findAll({where:{name:{[Op.iLike]: namee}}})
                //const pais = c.findOne({where:{name}})
                res.send(result)
            })         */
        }
        
        if(!name) result = await Country.findAll({include: Activity})
        else {
            const namee='%'+name+'%'
            result = await Country.findAll({
                where:{name:{[Op.iLike]: namee}},include: Activity})
        };
        if(result.length===0){throw ('No se encuentra el pais '+name)}
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).send(error)
    }
})

router.get('/a',async(req,res)=>{
    let {name}=req.query;
     //const respuesta = await axios(API_URL);  
    /* const array = respuesta.data.map(e=>{
        return e.capital
        if(e.cioc) return e.cioc;
        if(e.cca3) return e.cca3
        return null
    })  */
    const namee='%'+name+'%'
    const result = await Country.findAll({
        where:{
                name:{[Op.regexp]: '[a|r|g]'}
            }
    }
    )
    //const arrFil = array.filter(e=>{return e==='BDI'})
    res.json(result)
})


router.get('/:idPais', async (req,res,next)=>{
    const  {idPais} = req.params;
    try {
        const pais = await Country.findOne({
            where:{id:idPais.toUpperCase()},
            include: Activity
        })
        if (!pais) return res.status(400).json({msj:'No existe registro con ese ID'})
        //Set area//
        if(pais.area >= 1000000){
            let array = pais.area.toString().split('')
            array.splice(-6,0,',')
            pais.area = array.join('').slice(0,-4) + ' millones de Km2'
        }
        else pais.area += ' Km2'
        ////
        return res.status(201).json(pais)

    } catch (error) {
        res.status(404).json(error)
    }
})


router.post('/create', async (req,res,next)=>{
    const {name, id, img, region, capital, subregion, area, population} = req.body;
    try {
        const pais = await Country.create({
            id,
            name,
            img,
            region,
            capital,
            subregion,
            area,
            population
        }) 
        
        return res.status(201).json(pais)
    }
     catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router;
