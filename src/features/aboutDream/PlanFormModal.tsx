import React, { useState } from "react";

import { PlanDraftStage } from "../../services/dreamsApi";
import * as S from "./planDream.styles";

interface PlanFormModalProps {
  title: string;
  submitLabel: string;
  initialStages: PlanDraftStage[];
  saving: boolean;
  onClose: () => void;
  onSubmit: (stages: PlanDraftStage[]) => Promise<void> | void;
}

export const PlanFormModal: React.FC<PlanFormModalProps> = ({
  title,
  submitLabel,
  initialStages,
  saving,
  onClose,
  onSubmit,
}) => {
  const [stages, setStages] = useState<PlanDraftStage[]>(initialStages);

  const updateStageTitle = (stageIndex: number, stageTitle: string) => {
    setStages((current) =>
      current.map((stage, index) => (index === stageIndex ? { ...stage, title: stageTitle } : stage)),
    );
  };

  const updateTask = (
    stageIndex: number,
    taskIndex: number,
    field: "title" | "deadline" | "is_ai_generated",
    value: string | boolean,
  ) => {
    setStages((current) =>
      current.map((stage, index) =>
        index === stageIndex
          ? {
              ...stage,
              tasks: stage.tasks.map((task, taskPosition) =>
                taskPosition === taskIndex ? { ...task, [field]: value } : task,
              ),
            }
          : stage,
      ),
    );
  };

  return (
    <S.ModalOverlay onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <S.Modal>
        <S.ModalTitle>{title}</S.ModalTitle>
        {stages.map((stage, stageIndex) => (
          <S.DraftStage key={stage.id || stageIndex}>
            <S.DraftStageHeader>
                <S.DraftStageNumber>Этап {stageIndex + 1}</S.DraftStageNumber>
            </S.DraftStageHeader>
            <S.DraftStageTitleInput
                value={stage.title}
                onChange={(event) => updateStageTitle(stageIndex, event.target.value)}
                placeholder={`Название этапа ${stageIndex + 1}`}
            />

            {stage.tasks.map((task, taskIndex) => (
              <S.DraftRow key={task.id || taskIndex}>
                <S.DraftInput
                  value={task.title}
                  onChange={(event) => updateTask(stageIndex, taskIndex, "title", event.target.value)}
                  placeholder="Название пункта"
                />
                <S.DraftInput
                  type="date"
                  value={task.deadline}
                  onChange={(event) => updateTask(stageIndex, taskIndex, "deadline", event.target.value)}
                />
                <input
                  type="checkbox"
                  checked={task.is_ai_generated}
                  onChange={(event) =>
                    updateTask(stageIndex, taskIndex, "is_ai_generated", event.target.checked)
                  }
                  title="ИИ-пункт"
                />
                <S.DraftButton
                  type="button"
                  onClick={() =>
                    setStages((current) =>
                      current.map((item, index) =>
                        index === stageIndex
                          ? { ...item, tasks: item.tasks.filter((_, idx) => idx !== taskIndex) }
                          : item,
                      ),
                    )
                  }
                >
                  ×
                </S.DraftButton>
              </S.DraftRow>
            ))}
            <S.DraftButton
              type="button"
              onClick={() =>
                setStages((current) =>
                  current.map((item, index) =>
                    index === stageIndex
                      ? { ...item, tasks: [...item.tasks, { title: "", deadline: "", is_ai_generated: false }] }
                      : item,
                  ),
                )
              }
            >
              + Добавить пункт
            </S.DraftButton>
          </S.DraftStage>
        ))}
        <S.DraftButton
          type="button"
          onClick={() =>
            setStages((current) => [
              ...current,
              { title: `Этап ${current.length + 1}`, tasks: [{ title: "", deadline: "", is_ai_generated: false }] },
            ])
          }
        >
          + Добавить этап
        </S.DraftButton>
        <S.ModalActions>
          <S.DraftButton type="button" onClick={onClose}>
            Отмена
          </S.DraftButton>
          <S.DraftButton type="button" onClick={() => void onSubmit(stages)} disabled={saving}>
            {saving ? "Сохранение..." : submitLabel}
          </S.DraftButton>
        </S.ModalActions>
      </S.Modal>
    </S.ModalOverlay>
  );
};
