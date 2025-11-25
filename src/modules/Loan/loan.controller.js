//CRUD de Loan
import {
    createLoan,
    findAllLoans,
    findLoanById,
    findLoansByPerson,
    findLoansByObject,
    findPendingLoans,
    updateLoan,
    deleteLoan
} from "./loan.services.js";

//CREATE
export const newLoan = async (req, res) => {
    try {
        const loan = req.body;
        await createLoan(loan);
        res.status(201).json({ message: "Empréstimo cadastrado com sucesso." });
    } catch (erro) {
        res.status(502).json({ erro: `${erro}` });
    }
};

//READ
export const listLoans = async (req, res) => {
    try {
        const loans = await findAllLoans();
        if (!loans || loans.length === 0) {
            return res.status(404).json({ message: "Não há empréstimos cadastrados." });
        }
        res.status(200).json({ message: "Lista carregada com sucesso.", loans });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getLoanById = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await findLoanById(id);
        if (!loan) {
            return res.status(404).json({ message: "Empréstimo não encontrado." });
        }
        res.status(200).json({ message: "Empréstimo encontrado.", loan });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getLoansByPerson = async (req, res) => {
    try {
        const { personId } = req.params;
        const loans = await findLoansByPerson(personId);
        if (!loans || loans.length === 0) {
            return res.status(404).json({ message: "Nenhum empréstimo encontrado para esta pessoa." });
        }
        res.status(200).json({ message: "Empréstimos encontrados.", loans });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getLoansByObject = async (req, res) => {
    try {
        const { objectId } = req.params;
        const loans = await findLoansByObject(objectId);
        if (!loans || loans.length === 0) {
            return res.status(404).json({ message: "Nenhum empréstimo encontrado para este objeto." });
        }
        res.status(200).json({ message: "Empréstimos encontrados.", loans });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

export const getPendingLoans = async (req, res) => {
    try {
        const loans = await findPendingLoans();
        if (!loans || loans.length === 0) {
            return res.status(404).json({ message: "Nenhum empréstimo pendente." });
        }
        res.status(200).json({ message: "Empréstimos pendentes encontrados.", loans });
    } catch (erro) {
        res.status(500).json({ message: `Erro interno: ${erro}` });
    }
};

//UPDATE
export const update = async (req, res) => {
    try {
        const loan = req.body;
        await updateLoan(loan);
        res.status(200).json({ message: "Empréstimo atualizado com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};

// Marcar como devolvido
export const returnLoan = async (req, res) => {
    try {
        const { id } = req.body;
        await updateLoan({ id: id, itIsBack: true, status: 'returned' });
        res.status(200).json({ message: "Empréstimo marcado como devolvido." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};

//DELETE
export const remove = async (req, res) => {
    try {
        const { id } = req.body;
        await deleteLoan(id);
        res.status(200).json({ message: "Empréstimo removido com sucesso." });
    } catch (erro) {
        res.status(400).json({ message: `Erro: ${erro}` });
    }
};
