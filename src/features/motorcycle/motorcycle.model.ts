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

@Table({
  tableName: "motorcycle",
  timestamps: true, // Enable createdAt and updatedAt fields
  underscored: true, // Use snake_case for column names
})
export class Motorcycle extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  uuid!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.FLOAT)
  weight!: number;

  @Column(DataType.FLOAT)
  height!: number;

  @Column(DataType.FLOAT)
  width!: number;

  @Column(DataType.STRING)
  engine_type!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_uuid!: string;

  @BelongsTo(() => User)
  user!: User;
}
