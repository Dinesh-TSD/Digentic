import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITag extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Tag slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'tags',
  }
);

export const Tag: Model<ITag> =
  mongoose.models.Tag || mongoose.model<ITag>('Tag', TagSchema);

export default Tag;
