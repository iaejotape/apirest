//definição dos dados
import { DataTypes } from "sequelize";
import conectDB from "../../database/db.js";
import Collection from "../collection/collection.model.js";
import User from "../user/user.model.js";

const sequelize = await conectDB();
const CollectionManager = sequelize.define("CollectionManagers", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    collectionId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    canManage: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
});

// Relacionamentos N:M entre User e Collection através de CollectionManager
CollectionManager.belongsTo(Collection, { foreignKey: 'collectionId', as: 'collection' });
Collection.hasMany(CollectionManager, { foreignKey: 'collectionId', as: 'managers' });

CollectionManager.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(CollectionManager, { foreignKey: 'userId', as: 'managedCollections' });

// Relacionamento N:M
User.belongsToMany(Collection, { through: CollectionManager, foreignKey: 'userId', otherKey: 'collectionId', as: 'sharedCollections' });
Collection.belongsToMany(User, { through: CollectionManager, foreignKey: 'collectionId', otherKey: 'userId', as: 'sharedWith' });

await CollectionManager.sync();

export default CollectionManager;
