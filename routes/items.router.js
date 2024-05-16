//아이템 목록 조회
// /routes/goods.js
import express from 'express';
import item from '../schemas/items.schema.js'

// Express.js의 라우터를 생성합니다.
const itemRouter = express.Router();

/** 아이템 목록 조회 **/
// localhost:3000/api/goods GET


itemRouter.get('/items', async (req, res) => {
  // Todo모델을 이용해, MongoDB에서 'order' 값이 가장 높은 '해야할 일'을 찾습니다.
  const itemlist = await items.find().sort('-Object').exec();

  // 찾은 '해야할 일'을 클라이언트에게 전달합니다.
  return res.status(200).json({ itemlist });
});



/** 아이템 상세 조회 **/
// localhost:3000/api/goods/:goodsId GET
itemRouter.get('/routes/:item_code', (req, res) => {
  const item_code = req.params.item_code;
  const findItem = items.find((item) => item.item_code === +item_code);

  return res.json({ item: findItem });
});

//아이템 등록 API
// localhost:3000/api/item POST
itemRouter.post('/item', async (req, res) => {
  const { item_code, item_name, item_stat } = req.body;

  if (!item_code) {
    return res.status(400);
  } else if (!item_name) {
    return res.status(400);
  } else if (await item.findOne({ item_code }).exec()) {
    return res.status(404);
  }

  //item_code = items[items.length - 1].item_code + 1;

  const addItem = new Item({
    item_code: item_code,
    item_name: item_name,
    item_stat: item_stat,
  });
  await addItem.save();

  const newItem = {
    item_code: addItem.item_code,
    item_name: addItem.item_name,
    item_stat: addItem.item_stat,
  }

  return res.status(201).json({ item: newItem });
});

//아이템 수정 API
// /routes/todos.router.js
/** 순서 변경, 할 일 완료/해제, 할 일 내용 변경 **/
itemRouter.patch('/items/:item_code', async (req, res) => {
  // 변경할 '해야할 일'의 ID 값을 가져옵니다.
  const { item_code } = req.params;
  if (isNaN(item_code)) {
    return res.status(400);
  }
  // 클라이언트가 전달한 순서, 완료 여부, 내용 데이터를 가져옵니다.
  const { item_name, item_stat } = req.body;
  if (!item_name) {
    return res.status(400);
  } else if (!item_stat) {
    return res.status(400);
  }
  // 변경하려는 '해야할 일'을 가져옵니다. 만약, 해당 ID값을 가진 '해야할 일'이 없다면 에러를 발생시킵니다.
  const currentItem = await items.findOne({ item_code }).exec();
  if (!currentItem) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 데이터입니다.' });
  }

  if (item_name) currentItem.item_name = item_name;
  if (item_stat) currentItem.item_stat = item_stat;

  await currentItem.save();

  const changedItem = {
    item_name: currentItem.item_name,
    item_stat: currentItem.item_stat,
  }

  return res.status(200).json({ changedItem });
});

export default itemRouter;
