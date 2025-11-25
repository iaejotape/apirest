import Loan from "./loan.model.js";

export const createLoan = async (loan) => {
    return Loan.create(loan);
};

export const findAllLoans = async () => {
    return Loan.findAll();
};

export const findLoanById = async (id) => {
    return Loan.findOne({ where: { id: id } });
};

export const findLoansByPerson = async (personId) => {
    return Loan.findAll({ where: { personId: personId } });
};

export const findLoansByObject = async (objectId) => {
    return Loan.findAll({ where: { objectId: objectId } });
};

export const findPendingLoans = async () => {
    return Loan.findAll({ where: { itIsBack: false } });
};

export const updateLoan = async (loan) => {
    return Loan.update(loan, { where: { id: loan.id } });
};

export const deleteLoan = async (id) => {
    return Loan.destroy({ where: { id: id } });
};
