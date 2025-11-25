//CRUD de Person
import {
    createPerson,
    findAllPersons,
    findPersonById,
    findPersonByCpf,
    findPersonByEmail,
    updatePerson,
    deletePerson
} from "./person.services.js";

//CREATE
export const newPerson = async (req, res) => {
    try {
        const person = req.body;
        await createPerson(person);
        res.status(201).json({ message: "Pessoa cadastrada com sucesso." });
    } catch (erro) {
        res.status(502).json({ erro: `${erro}` });
    }
};

//READ
export const listPersons = async (req, res) => {
    try {
        const persons = await findAllPersons();
        if (!persons || persons.length === 0) {
            return res.status(404).json({ message: "Não há pessoas cadastradas." });
        }
        res.status(200).json({ message: "Lista carregada com sucesso.", persons });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getPersonById = async (req, res) => {
    try {
        const { id } = req.params;
        const person = await findPersonById(id);
        if (!person) {
            return res.status(404).json({ message: "Pessoa não encontrada." });
        }
        res.status(200).json({ message: "Pessoa encontrada.", person });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getPersonByCpf = async (req, res) => {
    try {
        const { cpf } = req.params;
        const person = await findPersonByCpf(cpf);
        if (!person) {
            return res.status(404).json({ message: "Pessoa não encontrada." });
        }
        res.status(200).json({ message: "Pessoa encontrada.", person });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

//UPDATE
export const update = async (req, res) => {
    try {
        const person = req.body;
        await updatePerson(person);
        res.status(200).json({ message: "Pessoa atualizada com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};

//DELETE
export const remove = async (req, res) => {
    try {
        const { id } = req.body;
        await deletePerson(id);
        res.status(200).json({ message: "Pessoa removida com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};
