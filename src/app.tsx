import React, { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('Нажмите кнопку, чтобы отправить запрос.');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestGreeting = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/hello');
      if (!response.ok) {
        throw new Error(`Сервер ответил с ошибкой: ${response.status}`);
      }

      const data: unknown = await response.json();
      if (
        typeof data !== 'object' ||
        data === null ||
        !('message' in data) ||
        typeof data.message !== 'string'
      ) {
        throw new Error('Сервер вернул неожиданный ответ.');
      }

      setMessage(data.message);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Не удалось связаться с сервером.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Проект dot</h1>
      <p>React отправляет запрос в Express API.</p>
      <button type="button" onClick={requestGreeting} disabled={loading}>
        {loading ? 'Отправка...' : 'Проверить сервер'}
      </button>
      <p role="status">{message}</p>
      {error && <p role="alert">{error}</p>}
    </main>
  );
};

export default App;