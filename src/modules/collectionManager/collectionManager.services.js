import CollectionManager from "./collectionManager.model.js";

export const createCollectionManager = async (collectionManager) => {
    return CollectionManager.create(collectionManager);
};

export const findAllCollectionManagers = async () => {
    return CollectionManager.findAll();
};

export const findCollectionManagerById = async (id) => {
    return CollectionManager.findOne({ where: { id: id } });
};

export const findManagersByCollection = async (collectionId) => {
    return CollectionManager.findAll({ where: { collectionId: collectionId } });
};

export const findCollectionsByManager = async (userId) => {
    return CollectionManager.findAll({ where: { userId: userId } });
};

export const findManagerByCollectionAndUser = async (collectionId, userId) => {
    return CollectionManager.findOne({ where: { collectionId: collectionId, userId: userId } });
};

export const updateCollectionManager = async (collectionManager) => {
    return CollectionManager.update(collectionManager, { where: { id: collectionManager.id } });
};

export const deleteCollectionManager = async (id) => {
    return CollectionManager.destroy({ where: { id: id } });
};
