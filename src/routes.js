const express = require('express');
const { authController, projectController } = require('./app/controllers');
const authMiddleware = require("./app/middlewares/auth");

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Routes ok');
})

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - User
 *     description: Registra novo usuário
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                 name:
 *                     type: string
 *                 email:
 *                     type: string
 *                 password:
 *                     type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/register', authController.register);
/**
 * @swagger
 * /autenticate:
 *   post:
 *     tags:
 *       - User 
 *     description: Autenticar
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         schema:
 *             type: object
 *             properties:
 *                 email:
 *                     type: string
 *                 password:
 *                     type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/autenticate', authController.autenticate);
router.post('/forgot_password', authController.forgot_password);
router.post('/reset_password', authController.reset_password);
/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Project
 *     description: Busca projetos
 *     produces:
 *       - application/json
 *     security:
 *         - JWT: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/projects', authMiddleware, projectController.getProjects);

module.exports = router;