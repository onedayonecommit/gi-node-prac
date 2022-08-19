const Sql = require("sequelize");
// User 클래스에서 시퀄라이즈 안에 모듈 객체의 기능을 상속시켜주기 위해서
class User extends Sql.Model {
  // static init 메서드에서 테이블을 생성해주는건데
  // 사용하면 테이블을 생성 및 연결까지(매핑) 구성
  static init(sequelize) {
    // 상속받은 함수를 쓰려면
    // super 사용
    // init함수의 첫번째 매개변수가 테이블의 구성
    // 컬럼이 뭐뭐있는지 그 타입과 속성이 뭔지
    // 여기에 정리해서 매핑해줌
    return super.init(
      {
        // name 컬럼 하나
        name: {
          // 시퀄라이즈 모델 안에 있는 데이터 타입을 사용해야함
          // 그래서 가져온 시퀄라이즈 모듈 안에 있는 STRING 객체를 사용
          // varchar(80)
          type: Sql.STRING(20),
          // 이값이 무조건 있어야 하는지 이 컬럼값이 없으면 안된다고 표시하는것,
          // false면 없으면 불가
          // true면 없어도 가능
          // notnull
          allowNull: false,
          unique: true,
          // 여기서는 컬럼에 name값이 겹치지 않도록 사용
          // 주민번호나 전화번호 겹치지 않는 값들 혹여나 겹치지 않도록

          primaryKey: true,
          // 기본키로 설정을 할 것 인지 기본키 한개는 무조건 있어야한다.
          // 중복되지 않는 키
        },
        age: {
          // 나이의 값은 숫자형
          //int
          type: Sql.INTEGER,

          //notnull
          allowNull: false,
        },
        msg: {
          // 문자로 받기때문 TEXT
          type: Sql.TEXT,
          // null 허용
          allowNull: true,
        },
        // 생성한 시간이 필요하다 할 때 사용 이 구문 또는 테이블자체에 timestamps: true 로 설정하거나
        created_at: {
          // 시간타입으로 받고
          type: Sql.DATE,
          allowNull: false,
          defaultValue: Sql.NOW,
        },
      },
      {
        // 매개변수 db
        sequelize,
        // 컬럼을 자동으로 만들어 줌
        timestamps: true, // 좀 더 좋은게 업데이트 된 시간도 표시해줌 created_at 만 생기는게 아니라
        // updated_at도 생겨서 우리가 수정을 했을 때 시간도 같이 기록해줌

        // underscored 는 카멜 => 스네이크 표기법으로 바꿔주는거
        // underScore 이게 카멜 표기 => under_scored 스네이크 표기
        // false 로 하면 under_scored => underScore 로 바뀜
        underscored: false,
        // 얘는 모델의 이름을 설정 할 수 있다.
        modelName: "User", // 관경형으로 구성할 때 사용됌
        tableName: "users", // 데이터 베이스의 테이블의 이름을 설정한다.
        // paranoid true 로 설정하면 deleted_at 이라는 컬럼이 자동 생성됌
        // 컬럼값은 남아있고 deletedAt이 값에 삭제한 시간이 추가된다.
        paranoid: false,
        // charset, collate 이 둘은 각각 설정해주면 한글 입력이 가능하고
        // 이모티콘 쓰려면 uft8 뒤에 mb4
        // 자음떨어지면 인코딩 방식 확인
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = User;
