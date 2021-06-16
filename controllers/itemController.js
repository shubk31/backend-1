const Item = require('../models/item');
module.exports.get_items = (req,res) => {
    Item.find().sort({date:-1}).then(items => res.json(items));
}
module.exports.post_item = (req,res) => {
    const newItem = new Item(req.body);
    newItem.save().then(
        res.render('additems'),
        console.log('item successfully added!!!!')
        );
}
module.exports.update_item = (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item),
            console.log('item successfully updated!!!!')
            ;
        });
    });
// module.exports.delete_item = (req,res) => {
//     Item.findByIdAndDelete({_id: req.params.id})
//     .then(
//         console.log('item deleted successfully')
//     )
//     .catch((err) => console.log('error from delete_get'));
// }
}