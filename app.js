// app.js

import express from 'express';
import connect from './schemas/index.js';
import itemRouter from './routes/items.router.js';
import characterRouter from './routes/characters.router.js';

const app = express();
const PORT = 3000;

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("./assets")); // 정적 파일 서빙하는 미들웨어

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', [itemRouter, characterRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});

// app.js
connect();
