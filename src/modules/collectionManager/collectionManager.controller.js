//CRUD de CollectionManager
import {
    createCollectionManager,
    findAllCollectionManagers,
    findCollectionManagerById,
    findManagersByCollection,
    findCollectionsByManager,
    findManagerByCollectionAndUser,
    updateCollectionManager,
    deleteCollectionManager
} from "./collectionManager.services.js";

//CREATE
export const newCollectionManager = async (req, res) => {
    try {
        const collectionManager = req.body;
        // Verificar se já existe o relacionamento
        const existing = await findManagerByCollectionAndUser(collectionManager.collectionId, collectionManager.userId);
        if (existing) {
            return res.status(400).json({ message: "Este usuário já é gestor desta coleção." });
        }
        await createCollectionManager(collectionManager);
        res.status(201).json({ message: "Gestor adicionado à coleção com sucesso." });
    } catch (erro) {
        res.status(502).json({ erro: `${erro}` });
    }
};

//READ
export const listCollectionManagers = async (req, res) => {
    try {
        const collectionManagers = await findAllCollectionManagers();
        if (!collectionManagers || collectionManagers.length === 0) {
            return res.status(404).json({ message: "Não há gestores cadastrados." });
        }
        res.status(200).json({ message: "Lista carregada com sucesso.", collectionManagers });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getManagersByCollection = async (req, res) => {
    try {
        const { collectionId } = req.query;
        if (!collectionId) {
            return res.status(400).json({ message: "ID da coleção é obrigatório." });
        }
        const managers = await findManagersByCollection(collectionId);
        if (!managers || managers.length === 0) {
            return res.status(404).json({ message: "Nenhum gestor encontrado para esta coleção." });
        }
        res.status(200).json({ message: "Gestores encontrados.", managers });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getCollectionsByManager = async (req, res) => {
    try {
        const userId = res.user.userId;
        const collections = await findCollectionsByManager(userId);
        if (!collections || collections.length === 0) {
            return res.status(404).json({ message: "Nenhuma coleção encontrada para este gestor." });
        }
        res.status(200).json({ message: "Coleções encontradas.", collections });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

//UPDATE
export const update = async (req, res) => {
    try {
        const collectionManager = req.body;
        await updateCollectionManager(collectionManager);
        res.status(200).json({ message: "Gestor atualizado com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};

//DELETE
export const remove = async (req, res) => {
    try {
        const { id } = req.body;
        await deleteCollectionManager(id);
        res.status(200).json({ message: "Gestor removido com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};
