import { React, useState } from 'react'

// 리액트가 왜 리액트인지 반응한다.
// 자기 값이 변하면 반응해서 알려주고 리액트는
// 반응한 애를 그려줌
// 리렌더링
const Block = ({ num }) => {
    let count = 0;
    // useState() 함수를 사용해서 받는 값은
    // 배열의 첫번째는 실사용 값 우리가 사용할 값 및 주시하는 값
    // 이 값을 수정할 수 있는 함수 오로지 이 함수로만 변경 가능
    // 여기서는 setnum 함수를 사용해서만 값을 바꿀 수 있음
    // useState 함수의 매개변수가 초기 세팅값
    // setnum 함수를 사용해서 값을 수정할 땐 setnum 함수의 매개변수로 전달
    // 함수 사용
    // 일반 변수는 다시 그려주면 초기값으로 변한다.
    // 이유는 리 렌더링을 하기 때문이지만 useState 값은
    // 리액트가 보고 관리하기 때문에 그려주기 전 값을 보관해둔다.
    // react에서 제공해주는 useState이런 유용한 함수들이 많은데
    // 이런걸 통틀어 리액트 훅 이라고 부른다. (react hook)
    const [num1, setnum] = useState(count);
    function add() {
        setnum(num1 + 1)
        // 콘솔로그 찍으면 값이 1씩 밀리는데 이유는
        // 비동기 처리되서 값이 변하기 전에 num1을 콘솔에 찍어서 1씩 밀림 현상
        console.log(num1)
    }
    return (
        <>
            {/* 
                변수를 바꾼다고 태그에 넣은 변수값 바뀌지 않음
                document.querySelector('태그명').innerHtml = '내용'
                useState 리액트에게 값을 주시하게 만들고 변하면 내가 변했으니까 반응 알려줘 (재 렌더링)
                변수를 전부 보고 다 그리게 된다면 처음 dom 을 그리는 비용이 생각보다 비쌈
                이걸 변수 하나가 바뀌어서 전부 재 렌더를 할 경우 비효율
                위 useState 로 해당 변수가 바뀔 경우 해당 부분만 재 렌더
                그렇게 되면 더 효율적으로 관리 및 사용 가능 
             */}
            <div className='block'>{num1}</div>
            <button onClick={add}>더하기</button>
        </>
    )
}

export default Block