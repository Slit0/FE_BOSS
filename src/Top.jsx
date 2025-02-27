import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Link 추가
import './App.css';

function Top() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('userId');
    const userNameFromUrl = urlParams.get('userName');

    if (userIdFromUrl && userNameFromUrl) {
      setUserId(userIdFromUrl);
      setUserName(userNameFromUrl);
    } else {
      fetchUserInfo();
    }
  }, [location]);

  // 사용자 정보를 서버에서 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/user-info', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('로그인 정보 조회 실패');
      }

      const data = await response.json();
      setUserId(data.userId);
      setUserName(data.userName);
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error.message);
    }
  };

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleSignInClick = async () => {
    const currentUrl = location.pathname + location.search;
    console.log('현재 URL:', currentUrl);

    await fetch('http://localhost:5000/save-redirect-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ redirectUrl: currentUrl }),
      credentials: 'include',
    });

    navigate('/signin');
  };

  // 로그아웃 버튼 클릭 시 실행되는 함수
  const handleLogoutClick = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUserId(null);
    setUserName(null);
    navigate('/');
  };

  // 🔍 검색 실행 함수
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className='top-bar'>
      <div>Top Bar</div>

      {/* 🔍 검색바 추가 */}
      <form className='search-form' onSubmit={handleSearch}>
        <input
          type='text'
          className='search-input'
          placeholder='검색어를 입력하세요...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type='submit' className='search-button'>
          🔍
        </button>
      </form>

      <div className='welcome-message'>
        {userId && userName && <p>{userName}님, 어서 오세요!</p>}

        {userId ? (
          <>
            <button className='TopSigninBt' onClick={handleLogoutClick}>
              로그아웃
            </button>
            <button className='MypageBt' onClick={() => navigate('/mypage')}>
              마이페이지
            </button>
          </>
        ) : (
          <button className='TopSigninBt' onClick={handleSignInClick}>
            로그인
          </button>
        )}
      </div>

      {/* 사용자 얼굴 인식 테스트 버튼 추가 */}
      <Link to='/camera' className='menu-link'>
        <button className='face-test-button'>사용자 얼굴 인식 TEST</button>
      </Link>
    </div>
  );
}

export default Top;
