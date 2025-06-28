import React from 'react';
import notFoundIcon from "../../icons/not-found.png";

const NotFoundPage = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
    <img src={notFoundIcon} alt="Not Found" />
      <h1>404 - Страница не найдена</h1>
      <p>Извините, такой страницы не существует.</p>
    </div>
  );
};

export default NotFoundPage;