// schemas/index.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connect = () => {
  mongoose
    .connect(
      // 빨간색으로 표시된 부분은 대여한 ID, Password, 주소에 맞게끔 수정해주세요!
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@express-mongo.rgnp9iz.mongodb.net/?retryWrites=true&w=majority&appName=express-mongo`,
      {
        dbName: 'node_lv1', // todo_memo 데이터베이스명을 사용합니다.
      }
    )
    .then(() => console.log('MongoDB 연결에 성공하였습니다.'))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on('error', (err) => {
  console.error('MongoDB 연결 에러', err);
});

export default connect;
