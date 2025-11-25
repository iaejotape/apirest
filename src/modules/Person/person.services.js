import Person from "./person.model.js";

export const createPerson = async (person) => {
    return Person.create(person);
};

export const findAllPersons = async () => {
    return Person.findAll();
};

export const findPersonById = async (id) => {
    return Person.findOne({ where: { id: id } });
};

export const findPersonByCpf = async (cpf) => {
    return Person.findOne({ where: { cpf: cpf } });
};

export const findPersonByEmail = async (email) => {
    return Person.findOne({ where: { email: email } });
};

export const updatePerson = async (person) => {
    return Person.update(person, { where: { id: person.id } });
};

export const deletePerson = async (id) => {
    return Person.destroy({ where: { id: id } });
};
