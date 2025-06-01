import { Table, Model, Column, PrimaryKey, Default, HasMany, DataType } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes, CreateOptions } from 'sequelize';
import { Route } from '../route/route.model';
import { Alert } from '../alert/alert.model';
import { Motorcycle } from '../motorcycle/motorcycle.model';

@Table({
  tableName: 'user',
  timestamps: true,
  underscored: true,
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  uuid?: CreationOptional<string>; // Optional when creating

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [3, 50],
    },
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [5, 255],
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [4, 100],
    },
  })
  password!: string;

  @HasMany(() => Route)
  routes?: Route[];

  @HasMany(() => Alert)
  alerts?: Alert[];

  @HasMany(() => Motorcycle)
  motorcycles?: Motorcycle[];
}
