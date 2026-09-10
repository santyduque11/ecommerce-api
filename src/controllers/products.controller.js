const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../services/products.service");

const create = async (req, res, next) => {
    try {
        const product = await createProduct(req.body);

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const products = await getProducts();

        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const product = await getProductById(Number(req.params.id));

        res.json(product);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const product = await updateProduct(
            Number(req.params.id),
            req.body
        );

        res.json(product);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await deleteProduct(Number(req.params.id));

        res.json({
            message: "Producto eliminado correctamente"
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