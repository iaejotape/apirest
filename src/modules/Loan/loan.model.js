//definição dos dados
import { DataTypes } from "sequelize";
import conectDB from "../../database/db.js";
import Person from "../person/person.model.js";
import ObjectModel from "../object/object.model.js";

const sequelize = await conectDB();
const Loan = sequelize.define("Loans", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    loanDate: { type: DataTypes.DATEONLY, allowNull: false },
    repaymentDate: { type: DataTypes.DATEONLY, allowNull: false },
    itIsBack: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
    notes: { type: DataTypes.TEXT, allowNull: true },
    personId: { type: DataTypes.INTEGER, allowNull: false },
    objectId: { type: DataTypes.INTEGER, allowNull: false },
});

// Relacionamentos
Loan.belongsTo(Person, { foreignKey: 'personId', as: 'person' });
Person.hasMany(Loan, { foreignKey: 'personId', as: 'loans' });

Loan.belongsTo(ObjectModel, { foreignKey: 'objectId', as: 'object' });
ObjectModel.hasMany(Loan, { foreignKey: 'objectId', as: 'loans' });

// Relacionamento N:M entre Person e Object através de Loan
Person.belongsToMany(ObjectModel, { through: Loan, foreignKey: 'personId', otherKey: 'objectId' });
ObjectModel.belongsToMany(Person, { through: Loan, foreignKey: 'objectId', otherKey: 'personId' });

await Loan.sync();

export default Loan;
