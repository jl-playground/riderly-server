import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../user/user.model";
import { AlertType, ALERT_TYPES } from "./alert.types";

@Table({
  tableName: "alert",
  timestamps: true, // Enable createdAt and updatedAt fields
  underscored: true, // Use snake_case for column names
})
export class Alert extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  uuid!: string;

  @Column({
    type: DataType.ENUM(...ALERT_TYPES),
    allowNull: false,
    validate: {
      isIn: {
        args: [ALERT_TYPES],
        msg: `Alert type must be one of the following: ${ALERT_TYPES.join(", ")}`,
      },
    },
  })
  type!: AlertType;

  @Column(DataType.FLOAT)
  latitude!: number;

  @Column(DataType.FLOAT)
  longitude!: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  created_by!: string;

  @BelongsTo(() => User)
  user!: User;
}
