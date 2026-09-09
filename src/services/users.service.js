const prisma = require("../config/prisma");

const createUser = async (data) => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
        const error = new Error(
            "El nombre, email y contraseña son obligatorios"
        );

        error.status = 400;

        throw error;
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

    return user;
};

const getUsers = async () => {
    return prisma.user.findMany({
        orderBy: {
            id: "asc"
        }
    });
};

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!user) {
        const error = new Error("Usuario no encontrado");

        error.status = 404;

        throw error;
    }

    return user;
};

const updateUser = async (id, data) => {
    const { name, email, password } = data;

    const existingUser = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!existingUser) {
        const error = new Error("Usuario no encontrado");

        error.status = 404;

        throw error;
    }

    return prisma.user.update({
        where: {
            id
        },
        data: {
            ...(name !== undefined && { name }),
            ...(email !== undefined && { email }),
            ...(password !== undefined && { password })
        }
    });
};

const deleteUser = async (id) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if (!existingUser) {
        const error = new Error("Usuario no encontrado");

        error.status = 404;

        throw error;
    }

    await prisma.user.delete({
        where: {
            id
        }
    });
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};