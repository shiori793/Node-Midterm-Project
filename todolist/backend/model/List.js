import mongoose from "mongoose";

const itemsSchema = {
    name: String,
    like: Boolean,
    comment: String
}

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

export { Item, List };