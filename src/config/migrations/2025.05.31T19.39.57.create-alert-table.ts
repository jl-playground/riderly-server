import type { QueryInterface} from "sequelize";
import { DataTypes } from "sequelize";
import type { MigrationFn } from "umzug";
import { ALERT_TYPES } from "../../features/alert/alert.types";

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.createTable("alert", {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.ENUM(...ALERT_TYPES), // replace with actual ALERT_TYPES
      allowNull: false,
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    created_by: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "uuid",
      },
      onDelete: "CASCADE",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
