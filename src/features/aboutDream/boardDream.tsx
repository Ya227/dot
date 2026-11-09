import React, { useRef, useState, useCallback } from 'react';
import * as S from './boardDream.styles';

export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star' | 'pentagon' | 'none';

export interface BoardItem {
  id: string;
  type: 'photo' | 'text' | 'sticker' | 'link';
  content: string;
  title?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  textColor?: string;
  shape?: ShapeType;
}

const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

const createId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const SHAPE_OPTIONS: ShapeType[] = ['rectangle', 'circle', 'triangle', 'star', 'pentagon', 'none'];

const COLOR_PRESETS = [
  '#FFF5D9', '#EDE8FA', '#E8F5E9', '#FCE4EC', '#E3F2FD',
  '#FFF3E0', '#F3E5F5', '#E0F7FA', '#FFFFFF', '#34312D',
  '#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFE0B2', '#D1C4E9',
];

const shapeClipPath = (shape: ShapeType): string => {
  switch (shape) {
    case 'circle':
      return 'circle(50% at 50% 50%)';
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)';
    case 'star':
      return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
    case 'pentagon':
      return 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
    default:
      return 'none';
  }
};

export const DashboardDream: React.FC = () => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[now.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [activeSettingsId, setActiveSettingsId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'color' | 'bgColor' | 'shape'>('color');
  const [items, setItems] = useState<BoardItem[]>([
    {
      id: 'i1',
      type: 'sticker',
      title: '— Federico Fellini',
      content: '“A different language is a different vision of life.”',
      x: 54,
      y: 54,
      width: 270,
      height: 205,
      color: '#FFF5D9',
      textColor: '#34312D',
      shape: 'none',
    },
    {
      id: 'i2',
      type: 'photo',
      content: '',
      x: 370,
      y: 65,
      width: 300,
      height: 230,
      shape: 'rectangle',
      color: '#EFEFEF',
    },
    {
      id: 'i3',
      type: 'text',
      content: 'Open sketchbook on a warm desk',
      x: 105,
      y: 340,
      width: 250,
      height: 155,
      color: 'transparent',
      textColor: '#34312D',
      shape: 'none',
    },
    {
      id: 'i4',
      type: 'sticker',
      title: 'My why',
      content: 'Connect freely, travel slowly, and feel at home anywhere.',
      x: 700,
      y: 360,
      width: 285,
      height: 190,
      color: '#EDE8FA',
      textColor: '#34312D',
      shape: 'none',
    },
  ]);

  const boardRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizingId, setResizingId] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const addItem = (type: BoardItem['type']) => {
    const defaults: Record<BoardItem['type'], { content: string; title?: string; color?: string }> = {
      photo: { content: '', color: '#EFEFEF' },
      text: { content: 'Ваш текст...', color: 'transparent' },
      sticker: {
        content: 'Добавьте свою мысль...',
        title: 'Новая заметка',
        color: 'rgba(255, 245, 217, 0.4)',
      },
      link: { content: 'https://', title: 'Название ссылки', color: '#FFFFFF' },
    };

    const item = defaults[type];
    const board = boardRef.current;
    const offset = items.length * 18;
    const newItem: BoardItem = {
      id: createId(),
      type,
      ...item,
      x: Math.max(16, Math.min(80 + offset, (board?.clientWidth || 1200) - 260)),
      y: 80 + offset,
      width: type === 'photo' ? 280 : 250,
      height: type === 'sticker' ? 190 : 165,
      textColor: '#34312D',
      shape: type === 'text' || type === 'link' ? 'none' : type === 'photo' ? 'rectangle' : 'none',
    };

    setItems(prev => [...prev, newItem]);
    setActiveSettingsId(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      const board = boardRef.current;
      setItems(prev => [
        ...prev,
        {
          id: createId(),
          type: 'photo',
          content: reader.result as string,
          x: Math.max(16, Math.min(120, (board?.clientWidth || 1200) - 280)),
          y: 120,
          width: 280,
          height: 220,
          color: '#EFEFEF',
          shape: 'rectangle',
        },
      ]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, select, button, a, .settings-menu, .resize-handle')) return;

    const item = items.find(entry => entry.id === id);
    const boardRect = boardRef.current?.getBoundingClientRect();
    if (!item || !boardRect) return;

    setDraggingId(id);
    setDragOffset({
      x: e.clientX - boardRect.left - item.x,
      y: e.clientY - boardRect.top - item.y,
    });
  };

  const handleResizeStart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const item = items.find(entry => entry.id === id);
    if (!item) return;
    setResizingId(id);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: item.width,
      h: item.height,
    });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (resizingId && boardRef.current) {
        const dx = e.clientX - resizeStart.x;
        const dy = e.clientY - resizeStart.y;
        const newW = Math.max(80, resizeStart.w + dx);
        const newH = Math.max(40, resizeStart.h + dy);
        setItems(prev =>
          prev.map(i => (i.id === resizingId ? { ...i, width: newW, height: newH } : i)),
        );
        return;
      }

      if (!draggingId || !boardRef.current) return;
      const boardRect = boardRef.current.getBoundingClientRect();
      const currentItem = items.find(item => item.id === draggingId);
      if (!currentItem) return;

      const maxX = Math.max(0, boardRect.width - currentItem.width);
      const maxY = Math.max(0, boardRect.height - currentItem.height);
      const x = Math.max(0, Math.min(e.clientX - boardRect.left - dragOffset.x, maxX));
      const y = Math.max(0, Math.min(e.clientY - boardRect.top - dragOffset.y, maxY));

      setItems(prev => prev.map(item => (item.id === draggingId ? { ...item, x, y } : item)));
    },
    [draggingId, dragOffset, resizingId, resizeStart, items],
  );

  const handleMouseUp = () => {
    setDraggingId(null);
    setResizingId(null);
  };

  const updateItemProperty = <K extends keyof BoardItem>(id: string, key: K, value: BoardItem[K]) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setActiveSettingsId(current => (current === id ? null : current));
  };

  const renderShapeLabel = (shape: ShapeType) =>
    ({
      rectangle: '▰  Прямоугольник',
      circle: '●  Круг',
      triangle: '▲  Треугольник',
      star: '★  Звезда',
      pentagon: '⬠  Пятиугольник',
      none: '✕ Без формы (Свободно)',
    }[shape]);

  return (
    <S.DashboardContainer>
      <S.PageHeader>
        <div>
          <S.Eyebrow>YOUR PERSONAL SPACE</S.Eyebrow>
          <S.PageTitle>Dream board</S.PageTitle>
          <S.PageSubtitle>
            Собирайте идеи, сохраняйте вдохновение и создавайте планы.
          </S.PageSubtitle>
        </div>
        <S.HeaderMeta>
          <S.StatusDot />
          Ваше пространство
        </S.HeaderMeta>
      </S.PageHeader>

      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'stretch',
          width: '100%',
          flex: 1,
          minHeight: 0,
        }}
      >
        <S.BoardFrame>
          <S.BoardTopline>
            <div>
              <S.BoardHeading>Моя доска</S.BoardHeading>
              <S.BoardHint>
                Перетаскивайте карточки и меняйте их размеры по своему желанию
              </S.BoardHint>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <S.CalendarSelector>
                <label htmlFor="dream-month">ПЕРИОД</label>
                <select
                  id="dream-month"
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                >
                  {MONTHS.map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <input
                  aria-label="Год"
                  type="number"
                  value={selectedYear}
                  onChange={e => {
                    const value = Number(e.target.value);
                    if (Number.isInteger(value) && value >= 2000 && value <= 2100) {
                      setSelectedYear(value);
                    }
                  }}
                  min="2000"
                  max="2100"
                />
              </S.CalendarSelector>
              <S.ItemCounter>
                {items.length} {items.length === 1 ? 'элемент' : 'элементов'}
              </S.ItemCounter>
            </div>
          </S.BoardTopline>

          <S.BoardArea
            ref={boardRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => setActiveSettingsId(null)}
          >
            <S.YearBadge>
              {selectedMonth} <span>{selectedYear}</span>
            </S.YearBadge>

            {items.map(item => {
              const currentTextColor = item.textColor || '#34312D';
              const currentBgColor = item.color || 'transparent';
              const isText = item.type === 'text';
              const isSticker = item.type === 'sticker';
              const isPhoto = item.type === 'photo';
              const isLink = item.type === 'link';

              const shape: ShapeType = isText
                ? 'none'
                : isLink
                  ? 'rectangle'
                  : item.shape || (isPhoto ? 'rectangle' : 'none');

              const canChangeShape = isPhoto || isSticker;
              const showTextTab = !isPhoto; // у фото нет вкладки «Текст»
              const showBgTab = !isPhoto; // у фото нет фона
              const isFreeForm = shape === 'none';
              const isShaped = shape !== 'none' && shape !== 'rectangle';

              const settingsOpen = activeSettingsId === item.id;

              return (
                <S.DraggableCard
                  key={item.id}
                  style={{
                    left: item.x,
                    top: item.y,
                    width: item.width,
                    height: item.height,
                    cursor: draggingId === item.id ? 'grabbing' : 'grab',
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    padding: 0,
                    overflow: settingsOpen ? 'visible' : 'hidden',
                    filter: isShaped && !settingsOpen ? 'drop-shadow(0 4px 10px rgba(35, 39, 65, 0.15))' : undefined,
                  }}
                  onMouseDown={e => handleMouseDown(item.id, e)}
                  cardType={item.type}
                  bgColor="transparent"
                  shape="rectangle"
                  onClick={e => e.stopPropagation()}
                >
                  <S.CardActions>
                    <S.EditTriggerBtn
                      type="button"
                      onClick={() => {
                        setActiveSettingsId(activeSettingsId === item.id ? null : item.id);
                        setActiveTab(isPhoto ? 'shape' : 'color');
                      }}
                      title="Настройки карточки"
                      aria-label="Настройки карточки"
                    >
                      <span aria-hidden="true">⚙</span>
                    </S.EditTriggerBtn>
                    <S.DeleteBtn
                      type="button"
                      onClick={() => removeItem(item.id)}
                      title="Удалить карточку"
                      aria-label="Удалить карточку"
                    >
                      ×
                    </S.DeleteBtn>
                  </S.CardActions>

                  <div
                    className="resize-handle"
                    onMouseDown={e => handleResizeStart(item.id, e)}
                    style={{
                      position: 'absolute',
                      right: 2,
                      bottom: 2,
                      width: 14,
                      height: 14,
                      cursor: 'nwse-resize',
                      background:
                        'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.25) 50%)',
                      borderRadius: 2,
                      zIndex: 5,
                    }}
                    title="Изменить размер"
                  />

                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: currentBgColor,
                      clipPath: isShaped ? shapeClipPath(shape) : undefined,
                      borderRadius: shape === 'rectangle' ? 12 : isFreeForm ? 8 : 0,
                      border: isFreeForm
                        ? '1px dashed rgba(36, 40, 65, 0.18)'
                        : shape === 'rectangle'
                          ? '1px solid rgba(36, 40, 65, 0.07)'
                          : 'none',
                      boxShadow:
                        !isShaped && shape === 'rectangle'
                          ? '0 8px 24px rgba(35, 39, 65, 0.10)'
                          : 'none',
                      overflow: 'hidden',
                      padding: isPhoto ? 0 : isShaped ? '36px 28px 20px' : '28px 14px 14px',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >


                  {isPhoto && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: currentBgColor || '#EFEFEF',
                      }}
                    >
                      {item.content ? (
                        <img
                          src={item.content}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          draggable={false}
                        />
                      ) : (
                        <span style={{ color: '#999', fontSize: 13 }}>Фото</span>
                      )}
                    </div>
                  )}

                  {(isText || isSticker) && (
                    <div
                      style={{
                        padding: '4px 2px',
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {isSticker && item.title != null && (
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={e =>
                            updateItemProperty(item.id, 'title', e.currentTarget.textContent || '')
                          }
                          style={{
                            fontWeight: 600,
                            fontSize: 13,
                            color: currentTextColor,
                            marginBottom: 6,
                            outline: 'none',
                            opacity: 0.85,
                          }}
                        >
                          {item.title}
                        </div>
                      )}
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={e =>
                          updateItemProperty(item.id, 'content', e.currentTarget.textContent || '')
                        }
                        style={{
                          flex: 1,
                          fontSize: isText ? 16 : 14,
                          lineHeight: 1.45,
                          color: currentTextColor,
                          outline: 'none',
                          wordBreak: 'break-word',
                          overflow: 'auto',
                        }}
                      >
                        {item.content}
                      </div>
                    </div>
                  )}

                  {isLink && (
                    <div
                      style={{
                        padding: '4px 2px',
                        height: '100%',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={e =>
                          updateItemProperty(item.id, 'title', e.currentTarget.textContent || '')
                        }
                        style={{
                          fontWeight: 600,
                          fontSize: 14,
                          color: currentTextColor,
                          outline: 'none',
                        }}
                      >
                        {item.title || 'Ссылка'}
                      </div>
                      <input
                        type="url"
                        value={item.content}
                        onChange={e => updateItemProperty(item.id, 'content', e.target.value)}
                        onMouseDown={e => e.stopPropagation()}
                        placeholder="https://example.com"
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          border: '1px solid rgba(0,0,0,0.12)',
                          borderRadius: 6,
                          padding: '6px 8px',
                          fontSize: 12,
                          color: '#5B7CFA',
                          background: 'rgba(255,255,255,0.7)',
                          outline: 'none',
                        }}
                      />
                      {item.content && item.content !== 'https://' && (
                        <a
                          href={
                            item.content.startsWith('http')
                              ? item.content
                              : `https://${item.content}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: 11,
                            color: '#5B7CFA',
                            wordBreak: 'break-all',
                            textDecoration: 'underline',
                          }}
                          onClick={e => e.stopPropagation()}
                          onMouseDown={e => e.stopPropagation()}
                        >
                          Открыть →
                        </a>
                      )}
                    </div>
                  )}

                  </div>

                  {activeSettingsId === item.id && (
                    <div
                      className="settings-menu"
                      onClick={e => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: 6,
                        width: 220,
                        background: '#fff',
                        borderRadius: 10,
                        boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
                        padding: 12,
                        zIndex: 50,
                        border: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                        {showTextTab && (
                          <button
                            type="button"
                            onClick={() => setActiveTab('color')}
                            style={{
                              flex: 1,
                              padding: '5px 0',
                              fontSize: 11,
                              border: 'none',
                              borderRadius: 6,
                              cursor: 'pointer',
                              background: activeTab === 'color' ? '#34312D' : '#f0f0f0',
                              color: activeTab === 'color' ? '#fff' : '#333',
                            }}
                          >
                            Текст
                          </button>
                        )}
                        {showBgTab && (
                          <button
                            type="button"
                            onClick={() => setActiveTab('bgColor')}
                            style={{
                              flex: 1,
                              padding: '5px 0',
                              fontSize: 11,
                              border: 'none',
                              borderRadius: 6,
                              cursor: 'pointer',
                              background: activeTab === 'bgColor' ? '#34312D' : '#f0f0f0',
                              color: activeTab === 'bgColor' ? '#fff' : '#333',
                            }}
                          >
                            Фон
                          </button>
                        )}
                        {canChangeShape && (
                          <button
                            type="button"
                            onClick={() => setActiveTab('shape')}
                            style={{
                              flex: 1,
                              padding: '5px 0',
                              fontSize: 11,
                              border: 'none',
                              borderRadius: 6,
                              cursor: 'pointer',
                              background: activeTab === 'shape' ? '#34312D' : '#f0f0f0',
                              color: activeTab === 'shape' ? '#fff' : '#333',
                            }}
                          >
                            Форма
                          </button>
                        )}
                      </div>

                      {(activeTab === 'color' || activeTab === 'bgColor') && (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: 6,
                          }}
                        >
                          {COLOR_PRESETS.map(c => (
                            <button
                              key={c}
                              type="button"
                              title={c}
                              onClick={() =>
                                updateItemProperty(
                                  item.id,
                                  activeTab === 'color' ? 'textColor' : 'color',
                                  c,
                                )
                              }
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: 6,
                                background: c,
                                border:
                                  (activeTab === 'color' ? currentTextColor : currentBgColor) === c
                                    ? '2px solid #34312D'
                                    : '1px solid rgba(0,0,0,0.12)',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            />
                          ))}
                          {activeTab === 'bgColor' && (isText || isSticker) && (
                            <button
                              type="button"
                              title="Прозрачный"
                              onClick={() => updateItemProperty(item.id, 'color', 'transparent')}
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: 6,
                                background:
                                  'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 12px 12px',
                                border:
                                  currentBgColor === 'transparent'
                                    ? '2px solid #34312D'
                                    : '1px solid rgba(0,0,0,0.12)',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            />
                          )}
                        </div>
                      )}

                      {activeTab === 'shape' && canChangeShape && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {SHAPE_OPTIONS.map(s => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => updateItemProperty(item.id, 'shape', s)}
                              style={{
                                textAlign: 'left',
                                padding: '6px 8px',
                                fontSize: 12,
                                border: 'none',
                                borderRadius: 6,
                                cursor: 'pointer',
                                background:
                                  (item.shape || (isPhoto ? 'rectangle' : 'none')) === s
                                    ? '#EDE8FA'
                                    : 'transparent',
                                color: '#34312D',
                              }}
                            >
                              {renderShapeLabel(s)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </S.DraggableCard>
              );
            })}
          </S.BoardArea>
        </S.BoardFrame>

        <S.SidePanel>
          <S.SidePanelTitle>Добавить</S.SidePanelTitle>

          <S.SideBtn type="button" onClick={() => addItem('text')}>
            <span style={{ fontSize: 16 }}>Aa</span> Текст
          </S.SideBtn>

          <S.SideBtn type="button" onClick={() => addItem('sticker')}>
            <span style={{ fontSize: 16 }}>📌</span> Заметка
          </S.SideBtn>

          <S.SideUploadLabel>
            <span style={{ fontSize: 16 }}>🖼</span> Фото
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </S.SideUploadLabel>

          <S.SideBtn type="button" onClick={() => addItem('link')}>
            <span style={{ fontSize: 16 }}>🔗</span> Ссылка
          </S.SideBtn>
        </S.SidePanel>
      </div>
    </S.DashboardContainer>
  );
};
