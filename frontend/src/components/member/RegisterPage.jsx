import React, { useState } from 'react';
import axios from 'axios';
import '../style/register.css';

function RegisterPage() {
    const [userData, setUserData] = useState({
        userId: '',
        userName: '',
        userNickname: '',
        userPwd: '',
        userPwdConfirm: '',
        userGender: 'male',
        userTel: '',
        userAge: ''
    });

    const [isPwdMatch, setIsPwdMatch] = useState(true);
    const [isUserIdAvailable, setIsUserIdAvailable] = useState(true);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });

        if (e.target.name === 'userPwd' || e.target.name === 'userPwdConfirm') {
            setIsPwdMatch(userData.userPwd === e.target.value || e.target.value === '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:8080/user/registerRequest', userData);
            console.log(response.data);
            // 회원가입 성공 로직 (예: 페이지 리디렉션)
        } catch (error) {
            console.error('회원가입 실패:', error);
        }
    };


    const checkUserIdAvailability = async () => {
        try {
            const response = await axios.post('/api/check-userid', { userId: userData.userId });
            setIsUserIdAvailable(response.data.isAvailable);
        } catch (error) {
            console.error('아이디 중복 확인 실패:', error);
        }
    };


    const isFormValid = () => {
        return userData.userId && userData.userName && userData.userNickname && userData.userPwd &&
            userData.userPwdConfirm && userData.userTel && userData.userAge && isPwdMatch && isUserIdAvailable;
    };


    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2>회원가입</h2>

                <div className="input-group">
                    <label htmlFor="userId">아이디</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={userData.userId}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={checkUserIdAvailability}>아이디 중복 확인</button>
                    {!isUserIdAvailable && <div className="error-message">이미 사용중인 아이디입니다.</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="userName">이름</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userData.userName}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="userNickname">닉네임</label>
                    <input
                        type="text"
                        id="userNickname"
                        name="userNickname"
                        value={userData.userNickname}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="userPwd">비밀번호</label>
                    <input
                        type="password"
                        id="userPwd"
                        name="userPwd"
                        value={userData.userPwd}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="userPwdConfirm">비밀번호 확인</label>
                    <input
                        type="password"
                        id="userPwdConfirm"
                        name="userPwdConfirm"
                        value={userData.userPwdConfirm}
                        onChange={handleChange}
                    />
                    {!isPwdMatch && <div className="error-message">비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="userGender">성별</label>
                    <select
                        id="userGender"
                        name="userGender"
                        value={userData.userGender}
                        onChange={handleChange}
                    >
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="userTel">전화번호</label>
                    <input
                        type="tel"
                        id="userTel"
                        name="userTel"
                        value={userData.userTel}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="userAge">나이</label>
                    <input
                        type="number"
                        id="userAge"
                        name="userAge"
                        value={userData.userAge}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={!isFormValid()}>회원가입</button>
            </form>
        </div>
    );
}

export default RegisterPage;