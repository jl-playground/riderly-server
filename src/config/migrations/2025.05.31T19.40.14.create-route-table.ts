import type { QueryInterface} from "sequelize";
import { DataTypes } from "sequelize";
import type { MigrationFn } from "umzug";

export const up: MigrationFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.createTable("route", {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waypoints: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    user_uuid: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "uuid",
      },
      onDelete: "CASCADE",
    },
    distance_km: DataTypes.FLOAT,
    duration_min: DataTypes.FLOAT,
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
