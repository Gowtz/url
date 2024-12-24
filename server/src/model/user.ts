import mongoose, { Document, Schema, Model } from "mongoose";

// Define an interface for the User document
export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  avatar: string;
}
export interface IUserModel extends Model<IUser> {
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
  }): Promise<IUser>;
}
// Create a schema for the User model
const userSchema = new Schema<IUser>({
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
  console.log(googleId);
  let user = await this.findOne({ googleId });
  if (!user) {
    user = await this.create({ googleId, name, email, avatar });
  }
  return user;
};

// Create the User model
const User = mongoose.model<IUser, IUserModel>("User", userSchema);
export default User;
