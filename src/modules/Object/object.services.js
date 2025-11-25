import ObjectModel from "./object.model.js";

export const createObject = async (object) => {
    return ObjectModel.create(object);
};

export const findAllObjects = async () => {
    return ObjectModel.findAll();
};

export const findObjectById = async (id) => {
    return ObjectModel.findOne({ where: { id: id } });
};

export const findObjectsByCollection = async (collectionId) => {
    return ObjectModel.findAll({ where: { collectionId: collectionId } });
};

export const updateObject = async (object) => {
    return ObjectModel.update(object, { where: { id: object.id } });
};

export const deleteObject = async (id) => {
    return ObjectModel.destroy({ where: { id: id } });
};
