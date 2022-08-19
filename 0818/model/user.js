const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static init(sequelize) {
    // super.init 함수의 첫번째 매개변수는 테이블 컬럼에 대한 설정
    // 두 번째는 테이블 자체의 설정
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          allowNull: false, // Null 이면 안된다고 했기 때문에 아래 unique 사용 해야함
          unique: true, // 고유키 값이 중복되지 않고 중복되면 안되는 값들을 쓸 때 사용하는 것 반드시 입력할 필요는 X
          // primarykey 기본 키 값이 중복되지 않고 얘는 반드시 입력해야 되는 값이다
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      // 여기 부터가 테이블에 대한 설정
      {
        // sequelize : init 함수의 매개변수를 연결시켜주는 옵션
        sequelize,
        // timestamps : true 로 하면 createAt과 updatedAt 컬럼들을 추가해주고
        // 생성 시간과 수정시간을 자동으로 입력해준다.
        timestamps: true,
        // underscored : 시퀄라이즈는 테이블 명과 컬럼명을 카멜표기법으로 표시해주는데
        // 스네이크 표기법으로 바꿔주는 옵션(aaaAa => aaa_aa) 이런식으로 변경.
        underscored: false,
        // modelName 은 모델의 이름을 설정 할 수 있음.
        modelName: "User",
        // tableName : 실제로 데이터 베이스에 등록되는 이름, 보통 모델의 소문자로 만들고
        // 복수형으로 만들어준다.
        tableName: "users",
        // paranoid : true로 설정하면 deletedAt 이라는 컬럼도 추가된다.
        // 삭제하면 컬럼이 지워 지는 것이 아니라 삭제한 시간이 표기된다.
        // deletedAt 에 해당 컬럼을 지우면 삭제한 시간이 표기가 되고 실제 정보가 지워지는게 아닌 시간만 지워지고
        // 알아서 deletedAt 이 있으면 거르고 찾아줌
        paranoid: false,
        // charset, collate : 각각 아래처럼 선언해야 한글 입력 가능
        // 이모티콘도 사용하려면 uft8md4, utf8md4_general_ci 입력해줘야 한다.
        charset: "utf8",
        // collate: "uft8_general_ci",
      }
    );
  }
  // associate 함수에서 다른 모델과 관계를 적어준다.
  // mysql JOIN이라는 기능으로 여러 테이블 간의 관계를 만들어준다.
  // 테이블간의 관계성만 알려주면
  // 시퀄라이즈는 JOIN 기능도 알아서 구현한다.
  static associate(db) {}
}

module.exports = User;
