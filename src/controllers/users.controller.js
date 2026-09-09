const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../services/users.service");

const create = async (req, res, next) => {
    try {
        const user = await createUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = await getUsers();

        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const user = await getUserById(Number(req.params.id));

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const user = await updateUser(
            Number(req.params.id),
            req.body
        );

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await deleteUser(Number(req.params.id));

        res.json({
            message: "Usuario eliminado correctamente"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};