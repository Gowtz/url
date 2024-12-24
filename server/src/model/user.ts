import mongoose, { Document, Model } from "mongoose";

// Define an interface for the User document
export interface UserType extends Document {
  googleId: string;
  name: string;
  email: string;
  avatar: string;
}
export interface UserModelType extends Model<UserType> {
  findOrCreate({
    googleId,
    email,
    name,
    avatar,
  }: {
    googleId: string;
    email: string;
    name: string;
    avatar?: string;
  }): Promise<UserType>;
}
// Create a schema for the User model
const userSchema = new mongoose.Schema<UserType>({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: false },
});

// Add a static method to find or create a user (for Google OAuth)
userSchema.statics.findOrCreate = async function ({
  googleId,
  email,
  name,
  avatar,
}: {
  googleId: string;
  email: string;
  name: string;
  avatar: string;
}) {
  let user = await this.findOne({ googleId });
  if (!user) {
    user = await this.create({ googleId, name, email, avatar });
  }
  return user;
};

// Create the User model
const User = mongoose.model<UserType, UserModelType>("User", userSchema);
export default User;
