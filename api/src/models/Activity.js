const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Activity', {
        /*   id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            unique:true,
            allowNull: false
        },   */
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
         dificultad:{
            type:DataTypes.INTEGER,
             validate:{
                min:1,
                max:5 
            } 
        },
        duracion:{
            type: DataTypes.TIME
        },
        temporada:{
            type: DataTypes.ENUM('Verano','Otoño','Invierno','Primavera')
        }
    },{timestamps: false})
}