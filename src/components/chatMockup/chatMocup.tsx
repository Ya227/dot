import React from "react";

import * as S from "./chatMocup.styles";

// --- Встроенные иконки (чтобы не подключать лишние библиотеки) ---
const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
  </svg>
);

export const ChatMockup = () => {
  return (
    <S.MockupContainer>
        <S.MockupHead>
            <S.AiAvatar>
                <SparklesIcon />
            </S.AiAvatar>
            <S.HeadInfo>
                <strong>Dot - ваш помощник по воплощению мечты</strong>
                <span>На связи и готов приступить к планированию</span>
            </S.HeadInfo>
            <S.MoreButton>•••</S.MoreButton>
        </S.MockupHead>

        <S.MockupBody>
            <S.Bubble isUser>
                Я хочу научиться разговаривать на английском языке к началу лета
            </S.Bubble>

            <S.Bubble>
                Это замечательная мечта! Давайте сделаем так, чтобы она была достижимой.

                <S.MiniPlan>
                    <strong>Ваша первая неделя</strong>
                    <S.PlanItem>
                        <S.StatusDot checked><CheckIcon /></S.StatusDot>
                        Выучите 20 фраз для повседневного общения
                    </S.PlanItem>
                    <S.PlanItem>
                        <S.StatusDot checked><CheckIcon /></S.StatusDot>
                        Две 15-минутные разговорные сессии
                    </S.PlanItem>
                    <S.PlanItem>
                        <S.StatusDot>3</S.StatusDot>
                        Посмотреть 1 серию с субтитрами на английском языке
                    </S.PlanItem>
                </S.MiniPlan>
            </S.Bubble>
        </S.MockupBody>

        <S.MockupInput>
            Расскажи,что сегодня вы сделали для своей мечты
            <button aria-label="Отправить сообщение">
                <SendIcon />
            </button>
        </S.MockupInput>
    </S.MockupContainer>
  );
};

export default ChatMockup;