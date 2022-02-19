const express = require('express');
const router = express.Router();

const habitacionesModel = require("../models/habitaciones");

router.get('/', function (req, res, next) {
    habitacionesModel
        .obtener()
        .then(habitaciones => {
            res.render("habitaciones/ver", {
                habitaciones: habitaciones,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo habitaciones");
        });

});
router.get('/agregar', function (req, res, next) {
    res.render("habitaciones/agregar");
});
router.post('/insertar', function (req, res, next) {
 
    const { NumeroHabitacion, Imagenes, Descripcion, Precio } = req.body;
    if (!NumeroHabitacion || !Imagenes || !Descripcion || !Precio) {
        return res.status(500).send("No hay NumeroHabitacion, Imagenes, Descripcion ó Precio");
    }
    // Si todo va bien, seguimos
    habitacionesModel
        .insertar(nombre, precio)
        .then(idhabitacionesInsertado => {
            res.redirect("/habitaciones");
        })
        .catch(err => {
            return res.status(500).send("Error insertando habitaciones");
        });
});

router.get('/eliminar/:id', function (req, res, next) {
    habitacionesModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/habitaciones");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    habitacionesModel
        .obtenerPorId(req.params.id)
        .then(habitacion => {
            if (habitacion) {
                res.render("habitaciones/editar", {
                    habitacion: habitacion,
                });
            } else {
                return res.status(500).send("No existe habitacion con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo la habitacion");
        });
});
router.post('/actualizar/', function (req, res, next) {
    // Obtener el nombre y precio. Es lo mismo que
    // const nombre = req.body.nombre;
    // const precio = req.body.precio;
    const { id, nombre, precio } = req.body;
    if (!nombre || !precio || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    // Si todo va bien, seguimos
    habitacionesModel
        .actualizar(id, nombre, precio)
        .then(() => {
            res.redirect("/habitaciones");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando habitacion");
        });
});

module.exports = router;
