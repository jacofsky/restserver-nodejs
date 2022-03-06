const mongoose = require("mongoose")

const dbConnection = async() => {
    
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log('BD Online')


    } catch (error) {
        throw new Error('Error en la inicializacion de la base de datos')
    }

}



module.exports = {
    dbConnection
}