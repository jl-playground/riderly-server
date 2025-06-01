import {
  Table,
  Model,
  Column,
  PrimaryKey,
  Default,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import { User } from "../user/user.model";

@Table({
  tableName: "route",
  timestamps: true, // Enable createdAt and updatedAt fields
  underscored: true, // Use snake_case for column names
})
export class Route extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  uuid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [1, 255], // Ensure name is between 1 and 255 characters
    },
  })
  name!: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    defaultValue: [],
  })
  waypoints!: Array<{
    lat: number;
    lng: number;
    label?: string;
    position?: number;
    pointType?: string;
  }>;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_uuid!: string;

  @Column
  distance_km!: number;

  @Column
  duration_min!: number;
}
