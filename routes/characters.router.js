//캐릭터 생성/삭제/수정 API
// /routes/characters.js

import express from 'express';

// Express.js의 라우터를 생성합니다.
const characterRouter = express.Router();

const characters = [
  {
    //-id 생성 방법? 
    character_id: 321,
    name: '호호아줌마',
    health: 500,
    power: 100,
  },
];

characterRouter.get('/characters', (req, res) => {
  return res.status(200).json({ characters: characters });
});

export default characterRouter;

//캐릭터 상세조회API
// localhost:3000/api/goods/:goodsId GET
characterRouter.get('/characters.router.js/:character_id', (req, res) => {
  const character_id = req.params.character_id; //경로 파라미터 통해 일치 하는거 찾기
  const findCharacter = characters.find((character) => character.character_id === +character_id);

  return res.json({ characters: findCharacter });
});

//캐릭터 생성 API
// /routes/todos.router.js

characterRouter.post('/characters', async (req, res) => {
  // 클라이언트에게 전달받은 value 데이터를 변수에 저장합니다.
  const { value } = req.body;

  // value가 존재하지 않을 때, 클라이언트에게 에러 메시지를 전달합니다.
  if (!value) {
    return res
      .status(400)
      .json({ errorMessage: '데이터가 존재하지 않습니다.' });
  }

  // Todo모델을 사용해, MongoDB에서 'order' 값이 가장 높은 '해야할 일'을 찾습니다.
  const characterMaxId = await characters.findOne().sort('-character_id').exec();

  // 'order' 값이 가장 높은 도큐멘트의 1을 추가하거나 없다면, 1을 할당합니다.
  const characterNum = characterMaxId ? characterMaxId.character_id + 1 : 1;

  // Todo모델을 이용해, 새로운 '해야할 일'을 생성합니다.
  const character = new character({ character_id: characterNum, value  });

  // 생성한 '해야할 일'을 MongoDB에 저장합니다.
  await character.save();

  const newID = {character_id: character.character_id,}

  return res.status(201).json({ newID });
});


//캐릭터 삭제 API
characterRouter.delete('/characters.routers.js/:characters_id', async (req, res) => {
  // 삭제할 '해야할 일'의 ID 값을 가져옵니다.
  const { characterID } = req.params;

  // 삭제하려는 '해야할 일'을 가져옵니다. 만약, 해당 ID값을 가진 '해야할 일'이 없다면 에러를 발생시킵니다.
  const character = await characters.findById(characterID).exec();
  if (!character) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 캐릭터 데이터입니다.' });
  }

  // 조회된 '해야할 일'을 삭제합니다.
  await character.deleteOne({ _id: characterID }).exec();

  return res.status(200).json({});
});