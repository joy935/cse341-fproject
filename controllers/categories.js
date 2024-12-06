const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllCategories = async (req, res) => {

    try {
        //#swagger.tags=['Categories']
        //#swagger.summary = "Get all categories"
        const result = await mongodb.getDb().db().collection('Categories').find();
        result.toArray().then((categories) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(categories);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the categories.");
    }
};


const getSingleCategory = async (req, res) => {
    try {
        //#swagger.tags=['Categories']
        //#swagger.summary = "Get a category by ID"
        const categoryId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('Categories').find({_id: categoryId });
        result.toArray().then((categories) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(categories[0]);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the category.")
    }
    
};

const createCategory = async(req, res) => {
    //#swagger.tags=['Categories']
    //#swagger.summary = "Create a new category"
    const category = {
        categoryCode: req.body.categoryCode,
        categoryName: req.body.categoryName
    };
    const response = await mongodb.getDb().db().collection('Categories').insertOne(category);
    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the category.');
    }
};

const updateCategory = async(req, res) => {
    //#swagger.tags=['Categories']
    //#swagger.summary = "Update a category by ID"
    const categoryId = new ObjectId(req.params.id);
    const category = {
        categoryCode: req.body.categoryCode,
        categoryName: req.body.categoryName
    };
    const response = await mongodb.getDb().db().collection('Categories').replaceOne({_id: categoryId}, category);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the category.');
    }
}

const deleteCategory = async(req, res) => {
    //#swagger.tags=['Categories']
    //#swagger.summary = "Delete a category by ID"
    const categoryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('Categories').deleteOne({_id: categoryId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the category.');
    }

}

module.exports = {
    getAllCategories,
    getSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory
};