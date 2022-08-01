const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Country', {
      id:{
        type: DataTypes.STRING(3),
        primaryKey:true,
        unique:true,
        allowNull: false
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      img:{
        type: DataTypes.STRING,
        allowNull: false
      },
      region:{
        type: DataTypes.STRING
      },
      capital:{
        type: DataTypes.STRING,
        allowNull:false
       
      },
      subregion:{
        type: DataTypes.STRING
      },
      area: {
        type: DataTypes.REAL 
        /* ,get() {
          const rawValue = this.getDataValue("area");
          if(rawValue >= 1000000){
              const array = rawValue.toString().split('');
              array.splice(-6,0,',')
              rawValue = array.join('').slice(0,-4) + ' millones de Km2'
          }
          else rawValue += ' Km2'
          return rawValue 
          } */
      },
      population:{
        type: DataTypes.INTEGER
      }
    
    },{timestamps: false});
  
};
