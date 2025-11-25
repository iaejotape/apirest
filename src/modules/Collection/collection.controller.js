//CRUD de Collection
import {
    createCollection,
    findAllCollections,
    findCollectionById,
    findCollectionsByOwner,
    updateCollection,
    deleteCollection
} from "./collection.services.js";

//CREATE
export const newCollection = async (req, res) => {
    try {
        const collection = req.body;
        // ownerId vem do token do usuário autenticado
        collection.ownerId = res.user.userId;
        await createCollection(collection);
        res.status(201).json({ message: "Coleção cadastrada com sucesso." });
    } catch (erro) {
        res.status(502).json({ erro: `${erro}` });
    }
};

//READ
export const listCollections = async (req, res) => {
    try {
        const collections = await findAllCollections();
        if (!collections || collections.length === 0) {
            return res.status(404).json({ message: "Não há coleções cadastradas." });
        }
        res.status(200).json({ message: "Lista carregada com sucesso.", collections });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getCollectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await findCollectionById(id);
        if (!collection) {
            return res.status(404).json({ message: "Coleção não encontrada." });
        }
        res.status(200).json({ message: "Coleção encontrada.", collection });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getCollectionsByOwner = async (req, res) => {
    try {
        const ownerId = res.user.userId;
        const collections = await findCollectionsByOwner(ownerId);
        if (!collections || collections.length === 0) {
            return res.status(404).json({ message: "Nenhuma coleção encontrada para este usuário." });
        }
        res.status(200).json({ message: "Coleções encontradas.", collections });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

//UPDATE
export const update = async (req, res) => {
    try {
        const collection = req.body;
        await updateCollection(collection);
        res.status(200).json({ message: "Coleção atualizada com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};

//DELETE
export const remove = async (req, res) => {
    try {
        const { id } = req.body;
        await deleteCollection(id);
        res.status(200).json({ message: "Coleção removida com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};
