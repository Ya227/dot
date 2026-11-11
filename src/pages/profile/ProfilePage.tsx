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
          <span>YOUR SPACE</span>
          <h1>Profile & settings</h1>
          <p>Make DotDream feel like your own.</p>
        </S.PageHeader>

        <S.ContentGrid>
          {/* ЛЕВАЯ КОЛОНКА - ПРОФИЛЬ */}
          <S.ProfileCard>
            <S.AvatarWrapper>
              <div className="avatar">AN</div>
              <div className="edit-icon">
                <CameraIcon />
              </div>
            </S.AvatarWrapper>

            <S.ProfileName>Anna Nguyen</S.ProfileName>
            <S.ProfileEmail>anna.nguyen@example.com</S.ProfileEmail>
            <S.ChangePhotoBtn>Change photo</S.ChangePhotoBtn>

            <S.Divider />

            <S.DreamingSince>
              <SparklesIcon />
              <div>
                <strong>Dreaming since March 2025</strong>
                2 dreams · 12 day streak
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
                Settings
              </S.Tab>
              <S.Tab 
                active={activeTab === 'subscription'} 
                onClick={() => setActiveTab('subscription')}
              >
                Subscription
              </S.Tab>
            </S.Tabs>

            {/* Секция Personal details */}
            <S.Section>
              <h3>Personal details</h3>
              <p>Update how your name and email appear.</p>

              <S.FormRow>
                <S.InputGroup>
                  <label>Full name</label>
                  <input type="text" defaultValue="Anna Nguyen" />
                </S.InputGroup>
                <S.InputGroup>
                  <label>Email address</label>
                  <input type="email" defaultValue="anna.nguyen@example.com" />
                </S.InputGroup>
              </S.FormRow>

              <S.InputGroup>
                <label>Password</label>
                <S.PasswordInputWrapper>
                  <input type="text" defaultValue="••••••••••••••••" readOnly style={{ letterSpacing: '2px' }} />
                  <button className="change-link">Change password</button>
                </S.PasswordInputWrapper>
              </S.InputGroup>
            </S.Section>

            {/* Секция Notifications */}
            <S.Section style={{ borderBottom: 'none' }}>
              <h3>Notifications</h3>
              <p>Choose which gentle nudges you'd like to receive.</p>

              <S.NotificationRow>
                <div>
                  <h4>Daily check-ins</h4>
                  <p>A short reminder about today's plan.</p>
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
                  <h4>Weekly reflection</h4>
                  <p>A Sunday summary of your progress.</p>
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
                  <h4>Plan adjustments</h4>
                  <p>When Dot notices your plan could feel better.</p>
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
              <S.SaveButton>Save changes</S.SaveButton>
            </S.Footer>
          </S.SettingsCard>

        </S.ContentGrid>
      </S.Container>
    </S.PageWrapper>
  );
};

export default ProfilePage;