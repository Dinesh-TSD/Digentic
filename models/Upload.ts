import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUpload extends Document {
  _id: mongoose.Types.ObjectId;
  filename: string;
  contentType: string;
  size: number;
  data: Buffer;
  uploadedBy?: string | null;
  createdAt: Date;
}

const UploadSchema = new Schema<IUpload>(
  {
    filename: {
      type: String,
      required: [true, 'Filename is required'],
      trim: true,
      maxlength: [200, 'Filename cannot exceed 200 characters'],
    },
    contentType: {
      type: String,
      required: [true, 'Content type is required'],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, 'File size is required'],
      min: [1, 'File cannot be empty'],
    },
    // Binary file contents stored as BSON BinData (max ~16MB per document)
    data: {
      type: Buffer,
      required: true,
    },
    uploadedBy: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: 'uploads',
  }
);

export const Upload: Model<IUpload> =
  mongoose.models.Upload || mongoose.model<IUpload>('Upload', UploadSchema);

export default Upload;
