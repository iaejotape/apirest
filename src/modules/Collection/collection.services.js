import Collection from "./collection.model.js";

export const createCollection = async (collection) => {
    return Collection.create(collection);
};

export const findAllCollections = async () => {
    return Collection.findAll();
};

export const findCollectionById = async (id) => {
    return Collection.findOne({ where: { id: id } });
};

export const findCollectionsByOwner = async (ownerId) => {
    return Collection.findAll({ where: { ownerId: ownerId } });
};

export const updateCollection = async (collection) => {
    return Collection.update(collection, { where: { id: collection.id } });
};

export const deleteCollection = async (id) => {
    return Collection.destroy({ where: { id: id } });
};
