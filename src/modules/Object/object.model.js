//definição dos dados
import { DataTypes } from "sequelize";
import conectDB from "../../database/db.js";
import Collection from "../collection/collection.model.js";

const sequelize = await conectDB();
const ObjectModel = sequelize.define("Objects", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.FLOAT, allowNull: true },
    collectionId: { type: DataTypes.INTEGER, allowNull: false },
});

// Relacionamento: Collection 1:N Object
ObjectModel.belongsTo(Collection, { foreignKey: 'collectionId', as: 'collection' });
Collection.hasMany(ObjectModel, { foreignKey: 'collectionId', as: 'objects' });

await ObjectModel.sync();

export default ObjectModel;
