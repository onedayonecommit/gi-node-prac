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
        // timestamps: true 로 하면 createAt과 updatedAt 컬럼들을 추가해주고
        // 생성 시간과 수정시간을 자동으로 입력해준다.
        timestamps: true,
        // underscored : 시퀄라이즈는 테이블 명과 컬럼명을 카멜표기법으로 표시해주는데
        // 스네이크 표기법으로 바꿔주는 옵션(aaaAa => aaa_aa) 이런식으로 변경.
        underscored: false,
        // modelName 은 모델의 이름을 설정 할 수 있음.
        modelName: "User",
      }
    );
  }
}
