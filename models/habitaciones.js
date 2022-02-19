const conexion = require("../conexion")
module.exports = {
    insertar(NumeroHabitacion, Imagenes, Descripcion, Precio, idplanhabitacion ) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into habitaciones
            (NumeroHabitacion, Imagenes, Descripcion, Precio, idplanhabitacion)
            values
            (?, ?)`,
                [NumeroHabitacion, Imagenes, Descripcion, Precio, idplanhabitacion], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, precio from habitaciones`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, precio from habitaciones where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },
    actualizar(id, nombre, precio) {
        return new Promise((resolve, reject) => {
            conexion.query(`update habitaciones
            set nombre = ?,
            precio = ?
            where id = ?`,
                [nombre, precio, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from habitaciones
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}