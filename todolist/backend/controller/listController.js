import _ from "lodash"
import { Item, List } from '../model/List.js'

const listItems = (req, res) => {
    const customListName = req.user.username;

    List.findOne({name: customListName}, function(err,foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: []
                })
            
                list.save();
                res.redirect("/list/" + customListName);
            } else {
                res.render("list", {
                    listTitle: foundList.name,
                    newListItems: foundList.items,
                });
            }
        }
    })
}

const saveItem = (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const newComment = req.body.newComment;

    const item = new Item({
        name: itemName,
        like: false,
        comment: newComment
    });

    List.findOne({name: listName}, function(err, foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/list/" + listName);
    })
}

const deleteItem = (req, res) => {
    const listName = req.body.listName;
    const itemId = req.body.itemId;
    
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}}, function(err, foundList) {
        if (!err) {
            res.redirect("/list/" + listName);
        }
    })
};

const toggleLike = (req, res) => {
    const listName = req.body.listName;
    const itemId = req.body.itemId;

    List.findOne({name: listName}, function(err, foundItem){
        const toggledValue = !foundItem.items.find(item => item.id === itemId).like
        List.findOneAndUpdate({name: listName, 'items._id': itemId} , {$set: {'items.$.like': toggledValue}}, function(err, foundList) {
            if(!err){
                res.redirect("/list/" + listName);
            }
        });
    });
};

const toggleComment = (req, res) => {
    
}

const updateItem = (req, res) => {
    const listName = req.body.listName;
    const itemId = req.body.itemId;

    const itemName = req.body.itemName;
    const comment = req.body.comment

    List.findOne({name: listName}, function(err, foundItem){
        if(!err){
            List.findOneAndUpdate({name: listName, 'items._id': itemId} , {$set: {'items.$.name': itemName, 'items.$.comment': comment}}, function(err, foundList) {
                if(!err){
                    res.redirect("/list/" + listName);
                }
            });
        }
    });
}

export { listItems, saveItem, deleteItem, toggleLike, updateItem }