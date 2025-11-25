//definição dos dados
import { DataTypes } from "sequelize";
import conectDB from "../../database/db.js";
import User from "../user/user.model.js";

const sequelize = await conectDB();
const Collection = sequelize.define("Collections", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
});

// Relacionamento: User 1:N Collection
Collection.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasMany(Collection, { foreignKey: 'ownerId', as: 'collections' });

await Collection.sync();

export default Collection;
