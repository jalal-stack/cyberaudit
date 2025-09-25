import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Scanner = () => {
  const { t } = useTranslation();
  const [target, setTarget] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/scan', { target });
      setResult(res.data);
    } catch (err) {
      alert('Ошибка сканирования');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scanner-page">
      <h1>{t('scanner.title')}</h1>
      <div className="scanner-card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>{t('scanner.input_label')}</label>
            <div className="input-with-icon">
              <span>🌐</span>
              <input
                type="text"
                placeholder="example.com"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="scan-types">
            <h3>{t('scanner.scan_types')}</h3>
            <div className="types-grid">
              {['ssl', 'ports', 'headers', 'cms', 'leaks', 'ddos'].map(type => (
                <div key={type} className="type-card">
                  <span>✓</span>
                  <span>{t(`types.${type}`)}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="start-scan-btn" disabled={loading}>
            {loading ? 'Сканирую...' : t('scanner.start_button')}
          </button>
        </form>
      </div>

      {result && (
        <div className="result-card">
          <h2>Результат</h2>
          <p><strong>Цель:</strong> {result.target}</p>
          <p><strong>Баллы:</strong> {result.score}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;