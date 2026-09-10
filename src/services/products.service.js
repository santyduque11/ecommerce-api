const prisma = require("../config/prisma");

const createProduct = async (data) => {
    const { name, description, price, stock, categoryId } = data;

    if (!name || price === undefined || categoryId === undefined) {
        const error = new Error(
            "El nombre, precio y categoría son obligatorios"
        );

        error.status = 400;

        throw error;
    }

    if (price <= 0) {
        const error = new Error("El precio debe ser mayor que 0");

        error.status = 400;

        throw error;
    }

    if (stock !== undefined && stock < 0) {
        const error = new Error("El stock no puede ser negativo");

        error.status = 400;

        throw error;
    }

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            stock: stock ?? 0,
            categoryId
        }
    });

    return product;
};

const getProducts = async () => {
    return prisma.product.findMany({
        orderBy: {
            id: "asc"
        },
        include: {
            category: true
        }
    });
};

const getProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    });

    if (!product) {
        const error = new Error("Producto no encontrado");

        error.status = 404;

        throw error;
    }

    return product;
};

const updateProduct = async (id, data) => {
    const { name, description, price, stock, categoryId } = data;

    const existingProduct = await prisma.product.findUnique({
        where: {
            id
        }
    });

    if (!existingProduct) {
        const error = new Error("Producto no encontrado");

        error.status = 404;

        throw error;
    }

    if (price !== undefined && price <= 0) {
        const error = new Error("El precio debe ser mayor que 0");

        error.status = 400;

        throw error;
    }

    if (stock !== undefined && stock < 0) {
        const error = new Error("El stock no puede ser negativo");

        error.status = 400;

        throw error;
    }

    return prisma.product.update({
        where: {
            id
        },
        data: {
            ...(name !== undefined && { name }),
            ...(description !== undefined && { description }),
            ...(price !== undefined && { price }),
            ...(stock !== undefined && { stock }),
            ...(categoryId !== undefined && { categoryId })
        }
    });
};

const deleteProduct = async (id) => {
    const existingProduct = await prisma.product.findUnique({
        where: {
            id
        }
    });

    if (!existingProduct) {
        const error = new Error("Producto no encontrado");

        error.status = 404;

        throw error;
    }

    await prisma.product.delete({
        where: {
            id
        }
    });
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};