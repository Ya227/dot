import React, { useState } from 'react';

import * as S from './ProfilePage.styles';

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'subscription'>('settings');
  
  const [dailyCheckIns, setDailyCheckIns] = useState(true);
  const [weeklyReflection, setWeeklyReflection] = useState(true);
  const [planAdjustments, setPlanAdjustments] = useState(false);

  return (
    <S.PageWrapper>
      <S.Container>
        <S.PageHeader>
          <span>ЛИЧНОЕ ПРОСТРАНСТВО</span>
          <h1>Профиль и настройки</h1>
          <p>Сделайте DotDream по-настоящему своим.</p>
        </S.PageHeader>

        <S.ContentGrid>
          {/* ЛЕВАЯ КОЛОНКА - ПРОФИЛЬ */}
          <S.ProfileCard>
            <S.AvatarWrapper>
              <div className="avatar">АН</div>
              <div className="edit-icon">
                <CameraIcon />
              </div>
            </S.AvatarWrapper>

            <S.ProfileName>Анна Нгуен</S.ProfileName>
            <S.ProfileEmail>anna.nguyen@example.com</S.ProfileEmail>
            <S.ChangePhotoBtn>Изменить фото</S.ChangePhotoBtn>

            <S.Divider />

            <S.DreamingSince>
              <SparklesIcon />
              <div>
                <strong>Мечтает с марта 2025</strong>
                2 мечты · 12 дней подряд
              </div>
            </S.DreamingSince>
          </S.ProfileCard>

          {/* ПРАВАЯ КОЛОНКА - НАСТРОЙКИ */}
          <S.SettingsCard>
            <S.Tabs>
              <S.Tab 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
              >
                Настройки
              </S.Tab>
              <S.Tab 
                active={activeTab === 'subscription'} 
                onClick={() => setActiveTab('subscription')}
              >
                Подписка
              </S.Tab>
            </S.Tabs>

            {/* Секция Личные данные */}
            <S.Section>
              <h3>Личные данные</h3>
              <p>Обновите, как отображаются ваше имя и почта.</p>

              <S.FormRow>
                <S.InputGroup>
                  <label>Полное имя</label>
                  <input type="text" defaultValue="Анна Нгуен" />
                </S.InputGroup>
                <S.InputGroup>
                  <label>Электронная почта</label>
                  <input type="email" defaultValue="anna.nguyen@example.com" />
                </S.InputGroup>
              </S.FormRow>

              <S.InputGroup>
                <label>Пароль</label>
                <S.PasswordInputWrapper>
                  <input type="text" defaultValue="••••••••••••••••" readOnly style={{ letterSpacing: '2px' }} />
                  <button className="change-link">Изменить пароль</button>
                </S.PasswordInputWrapper>
              </S.InputGroup>
            </S.Section>

            {/* Секция Уведомления */}
            <S.Section style={{ borderBottom: 'none' }}>
              <h3>Уведомления</h3>
              <p>Выберите, какие напоминания вы хотите получать.</p>

              <S.NotificationRow>
                <div>
                  <h4>Ежедневные отметки</h4>
                  <p>Короткое напоминание о плане на сегодня.</p>
                </div>
                <S.ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={dailyCheckIns} 
                    onChange={() => setDailyCheckIns(!dailyCheckIns)} 
                  />
                  <span></span>
                </S.ToggleSwitch>
              </S.NotificationRow>

              <S.NotificationRow>
                <div>
                  <h4>Еженедельный итог</h4>
                  <p>Воскресный обзор вашего прогресса.</p>
                </div>
                <S.ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={weeklyReflection} 
                    onChange={() => setWeeklyReflection(!weeklyReflection)} 
                  />
                  <span></span>
                </S.ToggleSwitch>
              </S.NotificationRow>

              <S.NotificationRow>
                <div>
                  <h4>Корректировка плана</h4>
                  <p>Когда Dot замечает, что план можно улучшить.</p>
                </div>
                <S.ToggleSwitch>
                  <input 
                    type="checkbox" 
                    checked={planAdjustments} 
                    onChange={() => setPlanAdjustments(!planAdjustments)} 
                  />
                  <span></span>
                </S.ToggleSwitch>
              </S.NotificationRow>
            </S.Section>

            <S.Footer>
              <S.SaveButton>Сохранить изменения</S.SaveButton>
            </S.Footer>
          </S.SettingsCard>

        </S.ContentGrid>
      </S.Container>
    </S.PageWrapper>
  );
};

export default ProfilePage;