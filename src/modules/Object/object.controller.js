//CRUD de Object
import {
    createObject,
    findAllObjects,
    findObjectById,
    findObjectsByCollection,
    updateObject,
    deleteObject
} from "./object.services.js";

//CREATE
export const newObject = async (req, res) => {
    try {
        const object = req.body;
        await createObject(object);
        res.status(201).json({ message: "Objeto cadastrado com sucesso." });
    } catch (erro) {
        res.status(502).json({ erro: `${erro}` });
    }
};

//READ
export const listObjects = async (req, res) => {
    try {
        const objects = await findAllObjects();
        if (!objects || objects.length === 0) {
            return res.status(404).json({ message: "Não há objetos cadastrados." });
        }
        res.status(200).json({ message: "Lista carregada com sucesso.", objects });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getObjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const object = await findObjectById(id);
        if (!object) {
            return res.status(404).json({ message: "Objeto não encontrado." });
        }
        res.status(200).json({ message: "Objeto encontrado.", object });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getObjectsByCollection = async (req, res) => {
    try {
        const { collectionId } = req.params;
        const objects = await findObjectsByCollection(collectionId);
        if (!objects || objects.length === 0) {
            return res.status(404).json({ message: "Nenhum objeto encontrado para esta coleção." });
        }
        res.status(200).json({ message: "Objetos encontrados.", objects });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

//UPDATE
export const update = async (req, res) => {
    try {
        const object = req.body;
        await updateObject(object);
        res.status(200).json({ message: "Objeto atualizado com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};

//DELETE
export const remove = async (req, res) => {
    try {
        const { id } = req.body;
        await deleteObject(id);
        res.status(200).json({ message: "Objeto removido com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};
