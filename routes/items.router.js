//아이템 목록 조회
// /routes/goods.js
import express from 'express';

// Express.js의 라우터를 생성합니다.
const itemRouter = express.Router();

const item = [
  {
    item_code: 1,
    item_name: '막대기',
    item_stat: { "health": 20, "power": 2 }
 
  },
  {
    item_code: 2,
    item_name: '너덜너덜한 고무신',
    item_stat: { "health": 20, "power": 2 }
  },
  {
    item_code: 3,
    item_name: '파멸의 반지_리뉴얼',
    item_stat: {"health": 20, "power": 2 }
  },
];

/** 아이템 목록 조회 **/
// localhost:3000/api/goods GET
itemRouter.get('/item', (req, res) => {
  return res.status(200).json({ item: (item_code)(item_name) });
});

export default itemRouter;

/** 아이템 상세 조회 **/
// localhost:3000/api/goods/:goodsId GET
itemRouter.get('/routes/:item_code', (req, res) => {
  const item_code = req.params.item_code;
  const findItem = item.find((item) => item.item_code === +item_code);

  return res.json({ item: findItem });
});

//아이템 등록 API
// localhost:3000/api/item POST
itemRouter.post('/item', (req, res) => {
  const item_name = req.body.item_name;
  const item_stat = (req.body.health)(req.body.power);

  const item_code = item[item.length - 1].item_code + 1;

  const newItem = {
    item_code: item_code,
    item_name: item_name,
    item_stat: item_stat,
  };
  item.push(newItem);

  return res.status(201).json({ item: newItem });
});

//아이템 수정 API
// /routes/todos.router.js
/** 순서 변경, 할 일 완료/해제, 할 일 내용 변경 **/
itemRouter.patch('/item.router.js/:item_code', async (req, res) => {
  // 변경할 '해야할 일'의 ID 값을 가져옵니다.
  const { item_code } = req.params;
  // 클라이언트가 전달한 순서, 완료 여부, 내용 데이터를 가져옵니다.
  const { item_name, item_stat } = req.body;

  // 변경하려는 '해야할 일'을 가져옵니다. 만약, 해당 ID값을 가진 '해야할 일'이 없다면 에러를 발생시킵니다.
  const currentItem = await item.findById(item_code).exec();
  if (!item_code) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 데이터입니다.' });
  }

  if (item_name) {
    // 변경하려는 order 값을 가지고 있는 '해야할 일'을 찾습니다.
    const targetItemName = await item.findOne({ item_name }).exec();
    if (targetItemName) {
      // 만약, 이미 해당 order 값을 가진 '해야할 일'이 있다면, 해당 '해야할 일'의 order 값을 변경하고 저장합니다.
      targetItemName.item_name = currentItem.item_name;
      await targetItemName.save();
    }
    // 변경하려는 '해야할 일'의 order 값을 변경합니니다.
    currentItem.item_name = item_name;
  }

  if (item_stat) {
    // 변경하려는 '해야할 일'의 내용을 변경합니다.
    currentItem.item_stat = item_stat;
  }

  // 변경된 '해야할 일'을 저장합니다.
  await currentTodo.save();

  return res.status(200).json({});
});
