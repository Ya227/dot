import React, { useEffect, useState } from "react";

import * as S from "./ProfilePage.styles";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangeEmailMutation,
  useChangePasswordMutation,
} from "../../services/authApi";
import { getApiErrorMessage } from "../../services/dreamsApi";

const CameraIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
);

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

// 8–72 байта, как требует бэкенд
const passwordByteLength = (s: string) => new TextEncoder().encode(s).length;

type Feedback = { type: "error" | "success"; text: string } | null;

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"settings" | "subscription">("settings");

  // уведомления остаются локальными — эндпоинта для них у бэкенда нет
  const [dailyCheckIns, setDailyCheckIns] = useState(true);
  const [weeklyReflection, setWeeklyReflection] = useState(true);
  const [planAdjustments, setPlanAdjustments] = useState(false);

  const { data: me, isLoading, isError, refetch } = useGetMeQuery();
  const [updateProfile, { isLoading: savingProfile }] = useUpdateProfileMutation();
  const [changeEmail, { isLoading: savingEmail }] = useChangeEmailMutation();
  const [changePassword, { isLoading: savingPassword }] = useChangePasswordMutation();

  // локальные стейты форм, инициализируем данными с сервера
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");

  const [pwdOpen, setPwdOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [feedback, setFeedback] = useState<Feedback>(null);
  const setError = (text: string) => setFeedback({ type: "error", text });
  const setSuccess = (text: string) => setFeedback({ type: "success", text });

  useEffect(() => {
    if (me) {
      setFirstName(me.first_name ?? "");
      setLastName(me.last_name ?? "");
      setNewEmail(me.email);
    }
  }, [me]);

  // ---- Сохранить имя/фамилию ----
  const handleSaveProfile = async () => {
    setFeedback(null);
    try {
      await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      }).unwrap();
      setSuccess("Имя сохранено");
    } catch (err) {
      setError(getApiErrorMessage(err, "Не удалось сохранить имя"));
    }
  };

  // ---- Сменить email ----
  const handleChangeEmail = async () => {
    setFeedback(null);
    if (!me) return;
    if (newEmail.trim().toLowerCase() === me.email.toLowerCase()) {
      setError("Новый email совпадает с текущим");
      return;
    }
    if (!emailPassword) {
      setError("Введите текущий пароль для смены email");
      return;
    }
    try {
      await changeEmail({
        email: newEmail.trim().toLowerCase(),
        current_password: emailPassword,
      }).unwrap();
      setEmailPassword("");
      setSuccess("Email обновлён");
      refetch();
    } catch (err: any) {
      if (err?.status === 409) setError("Этот email уже занят");
      else if (err?.status === 400) setError("Проверьте email и пароль");
      else setError(getApiErrorMessage(err, "Не удалось сменить email"));
    }
  };

  // ---- Сменить пароль ----
  const handleChangePassword = async () => {
    setFeedback(null);
    if (!currentPassword || !newPassword) {
      setError("Заполните текущий и новый пароль");
      return;
    }
    const len = passwordByteLength(newPassword);
    if (len < 8 || len > 72) {
      setError("Новый пароль должен быть от 8 до 72 байт");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Новые пароли не совпадают");
      return;
    }
    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      }).unwrap();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPwdOpen(false);
      setSuccess("Пароль обновлён");
    } catch (err: any) {
      if (err?.status === 400) setError("Текущий пароль неверен");
      else setError(getApiErrorMessage(err, "Не удалось сменить пароль"));
    }
  };

  if (isLoading) return <S.PageWrapper><S.Container>Загрузка профиля…</S.Container></S.PageWrapper>;
  if (isError || !me) {
    return (
      <S.PageWrapper><S.Container>
        Не удалось загрузить профиль. <button onClick={() => refetch()}>Повторить</button>
      </S.Container></S.PageWrapper>
    );
  }

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "??";

  return (
    <S.PageWrapper>
      <S.Container>
        <S.PageHeader>
          <span>ЛИЧНОЕ ПРОСТРАНСТВО</span>
          <h1>Профиль и настройки</h1>
          <p>Сделайте DotDream по-настоящему своим.</p>
        </S.PageHeader>

        <S.ContentGrid>
          {/* ЛЕВАЯ КОЛОНКА */}
          <S.ProfileCard>
            <S.AvatarWrapper>
              {me.avatar_url ? (
                <img src={me.avatar_url} alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              ) : (
                <div className="avatar">{initials}</div>
              )}
              <div className="edit-icon"><CameraIcon /></div>
            </S.AvatarWrapper>

            <S.ProfileName>
              {[firstName, lastName].filter(Boolean).join(" ") || "Без имени"}
            </S.ProfileName>
            <S.ProfileEmail>{me.email}</S.ProfileEmail>
            <S.ChangePhotoBtn>Изменить фото</S.ChangePhotoBtn>

            <S.Divider />

            <S.DreamingSince>
              <SparklesIcon />
              <div>
                <strong>В Dot с {me.created_at ? new Date(me.created_at).toLocaleDateString("ru-RU", { month: "long", year: "numeric" }) : "недавно"}</strong>
              </div>
            </S.DreamingSince>
          </S.ProfileCard>

          {/* ПРАВАЯ КОЛОНКА */}
          <S.SettingsCard>
            <S.Tabs>
              <S.Tab active={activeTab === "settings"} onClick={() => setActiveTab("settings")}>Настройки</S.Tab>
              <S.Tab active={activeTab === "subscription"} onClick={() => setActiveTab("subscription")}>Подписка</S.Tab>
            </S.Tabs>

            {feedback && (
              <div style={{
                color: feedback.type === "error" ? "#ef4444" : "#22c55e",
                fontSize: 14, padding: "8px 0",
              }}>
                {feedback.text}
              </div>
            )}

            {/* Личные данные */}
            <S.Section>
              <h3>Личные данные</h3>
              <p>Обновите, как отображаются ваше имя и почта.</p>

              <S.FormRow>
                <S.InputGroup>
                  <label>Имя</label>
                  <input type="text" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                </S.InputGroup>
                <S.InputGroup>
                  <label>Фамилия</label>
                  <input type="text" value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />
                </S.InputGroup>
              </S.FormRow>
              <S.SaveButton type="button" onClick={handleSaveProfile} disabled={savingProfile}>
                {savingProfile ? "Сохранение…" : "Сохранить имя"}
              </S.SaveButton>

              <S.Divider />

              <h4 style={{ margin: "8px 0" }}>Смена email</h4>
              <S.FormRow>
                <S.InputGroup>
                  <label>Новый email</label>
                  <input type="email" value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)} />
                </S.InputGroup>
                <S.InputGroup>
                  <label>Текущий пароль</label>
                  <input type="password" value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)} />
                </S.InputGroup>
              </S.FormRow>
              <S.SaveButton type="button" onClick={handleChangeEmail} disabled={savingEmail}>
                {savingEmail ? "Сохранение…" : "Сменить email"}
              </S.SaveButton>

              <S.Divider />

              <S.InputGroup>
                <label>Пароль</label>
                <S.PasswordInputWrapper>
                  <input type="text" value="••••••••••••••••" readOnly
                    style={{ letterSpacing: "2px" }} />
                  <button type="button" className="change-link"
                    onClick={() => setPwdOpen((v) => !v)}>
                    {pwdOpen ? "Отмена" : "Изменить пароль"}
                  </button>
                </S.PasswordInputWrapper>
              </S.InputGroup>

              {pwdOpen && (
                <>
                  <S.InputGroup>
                    <label>Текущий пароль</label>
                    <input type="password" value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)} />
                  </S.InputGroup>
                  <S.FormRow>
                    <S.InputGroup>
                      <label>Новый пароль</label>
                      <input type="password" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />
                    </S.InputGroup>
                    <S.InputGroup>
                      <label>Повторите новый пароль</label>
                      <input type="password" value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </S.InputGroup>
                  </S.FormRow>
                  <S.SaveButton type="button" onClick={handleChangePassword} disabled={savingPassword}>
                    {savingPassword ? "Сохранение…" : "Сменить пароль"}
                  </S.SaveButton>
                </>
              )}
            </S.Section>

            {/* Уведомления */}
            <S.Section style={{ borderBottom: "none" }}>
              <h3>Уведомления</h3>
              <p>Выберите, какие напоминания вы хотите получать.</p>

              <S.NotificationRow>
                <div><h4>Ежедневные отметки</h4><p>Короткое напоминание о плане на сегодня.</p></div>
                <S.ToggleSwitch>
                  <input type="checkbox" checked={dailyCheckIns}
                    onChange={() => setDailyCheckIns(!dailyCheckIns)} /><span></span>
                </S.ToggleSwitch>
              </S.NotificationRow>

              <S.NotificationRow>
                <div><h4>Еженедельный итог</h4><p>Воскресный обзор вашего прогресса.</p></div>
                <S.ToggleSwitch>
                  <input type="checkbox" checked={weeklyReflection}
                    onChange={() => setWeeklyReflection(!weeklyReflection)} /><span></span>
                </S.ToggleSwitch>
              </S.NotificationRow>

              <S.NotificationRow>
                <div><h4>Корректировка плана</h4><p>Когда Dot замечает, что план можно улучшить.</p></div>
                <S.ToggleSwitch>
                  <input type="checkbox" checked={planAdjustments}
                    onChange={() => setPlanAdjustments(!planAdjustments)} /><span></span>
                </S.ToggleSwitch>
              </S.NotificationRow>
            </S.Section>
          </S.SettingsCard>
        </S.ContentGrid>
      </S.Container>
    </S.PageWrapper>
  );
};

export default ProfilePage;