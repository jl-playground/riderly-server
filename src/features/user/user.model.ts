import { Table, Model, Column, PrimaryKey, Default, HasMany, DataType } from "sequelize-typescript";
import { Route } from "../route/route.model";
import { Alert } from "../alert/alert.model";
import { Motorcycle } from "../motorcycle/motorcycle.model";

@Table({
  tableName: "user",
  timestamps: true, // Enable createdAt and updatedAt fields
  underscored: true, // Use snake_case for column names
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  uuid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensure username is unique
    validate: {
      len: [3, 50], // Username must be between 3 and 50 characters
    },
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      isEmail: true, // Validate email format
      len: [5, 255], // Email must be between 5 and 255 characters
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [4, 100], // Password must be between 8 and 100 characters
    },
  })
  password!: string;

  @HasMany(() => Route)
  routes!: Route[];

  @HasMany(() => Alert)
  alerts!: Alert[];

  @HasMany(() => Motorcycle)
  motorcycles!: Motorcycle[];
}
