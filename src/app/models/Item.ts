import mongoose, { Model, Schema, Document } from "mongoose";

export interface ItemI extends Document {
  name: string;
  content: string;
}

const ItemSchema: Schema<ItemI> = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
});

const Item: Model<ItemI> = mongoose.model("Item", ItemSchema);
export default Item;
