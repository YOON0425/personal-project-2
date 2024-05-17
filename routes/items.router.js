//아이템 목록 조회
// /routes/goods.js
import express from 'express';
import items from '../schemas/items.schema.js'

// Express.js의 라우터를 생성합니다.
const itemRouter = express.Router();

/** 아이템 목록 조회 **/
itemRouter.get('/items', async (req, res) => {
  try{
    const itemList = await items.find({}, 'item_code item_name -_id');
  return res.status(200).json(itemList);
} catch (error){
  console.error('Error', error);
  res.status(500).json({message: "Error"});
}});



/** 아이템 상세 조회 **/
// localhost:3000/api/goods/:goodsId GET
itemRouter.get('/items/:item_code', async (req, res) => {
  try{
    const item_code = pareInt(req.params.item_code ,10);
    const viewItem = await items.findOne({item_code}).exec();

    if(!viewItem) {
      return res.status(404).json({message: "not found"});
    }
    const itemInfo = {
      item_code: viewItem.item_code,
      item_name: viewItem.item_name,
      item_stat: viewItem.item_stat,
    };
} catch (error){
  console.error('Error', error);
  res.status(500).json({message: "Error"});
}});

//아이템 등록 API
// localhost:3000/api/item POST
itemRouter.post('/item', async (req, res) => {
  try{
  const { item_code, item_name, item_stat } = req.body;

 // if (!item_code) {
  //  return res.status(400);
  //} else if (!item_name) {
  //  return res.status(400);
  //} else if (await item.findOne({ item_code }).exec()) {
   // return res.status(404);
  //}

  //item_code = items[items.length - 1].item_code + 1;

  const addItem = new Item({
    item_code,
    item_name,
    item_stat,
  });
  await addItem.save();
  return res.status(201).send(item);
} catch (error){
  console.error("Error creating item: error");
  res.status(500).json({message:'Failed to create item'});
}
});

//아이템 수정 API
// /routes/todos.router.js
/** 순서 변경, 할 일 완료/해제, 할 일 내용 변경 **/
itemRouter.put('/items/:item_code', async (req, res) => {
  const { item_code } = parseInt(req.params.item_code, 10);
  // if (isNaN(item_code)) {
  //   return res.status(400);
  // }
  const { item_name, item_stat } = req.body;
 
  const updatedItem = await items.findOneAndUpdate(
    {item_code},{item_name, item_stat},{new:true}
  );

  if (!updatedItem){
    return res.status(404),json({message: "item not found"})
  }

  return res.status(200).json(updatedItem);
});

export default itemRouter;
