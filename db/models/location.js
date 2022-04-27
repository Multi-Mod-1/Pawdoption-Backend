const { db, DataTypes, Model } = require('../db')

class Location extends Model {

}

Location.init({
  state: DataTypes.STRING
}, {
  sequelize: db,
  timestamps: false
})

module.exports = Location