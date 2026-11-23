import React, { useState } from "react";

import {
  useCreateStageMutation,
  useCreateTaskMutation,
  PlanDraftStage,
} from "../../services/dreamsApi";
import * as S from "./planDream.styles";

interface CreatePlanDreamProps {
  dreamId: string;
  onClose: () => void;
}

export const CreatePlanDream: React.FC<CreatePlanDreamProps> = ({ dreamId, onClose }) => {
  const [stages, setStages] = useState<PlanDraftStage[]>([
    { title: "Этап 1", tasks: [{ title: "", deadline: "", is_ai_generated: false }] },
  ]);
  const [createStage] = useCreateStageMutation();
  const [createTask] = useCreateTaskMutation();
  const [saving, setSaving] = useState(false);

  const updateStageTitle = (stageIndex: number, title: string) => {
    setStages((current) =>
      current.map((stage, index) => (index === stageIndex ? { ...stage, title } : stage)),
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

  const save = async () => {
    const validStages = stages
      .map((stage) => ({
        ...stage,
        title: stage.title.trim(),
        tasks: stage.tasks.filter((task) => task.title.trim()),
      }))
      .filter((stage) => stage.title && stage.tasks.length > 0);
    if (validStages.length === 0) return;

    setSaving(true);
    try {
      for (let stageIndex = 0; stageIndex < validStages.length; stageIndex += 1) {
        const stage = await createStage({
          dreamId,
          title: validStages[stageIndex].title,
          stage_order: stageIndex + 1,
        }).unwrap();
        for (let taskIndex = 0; taskIndex < validStages[stageIndex].tasks.length; taskIndex += 1) {
          const task = validStages[stageIndex].tasks[taskIndex];
          await createTask({
            stageId: stage.id,
            dreamId,
            title: task.title.trim(),
            deadline: task.deadline,
            task_order: taskIndex + 1,
            is_ai_generated: task.is_ai_generated,
          }).unwrap();
        }
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.ModalOverlay onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <S.Modal>
        <S.ModalTitle>Создать план</S.ModalTitle>
        {stages.map((stage, stageIndex) => (
          <S.DraftStage key={stageIndex}>
            <S.DraftInput
              value={stage.title}
              onChange={(event) => updateStageTitle(stageIndex, event.target.value)}
              placeholder={`Название этапа ${stageIndex + 1}`}
            />
            {stage.tasks.map((task, taskIndex) => (
              <S.DraftRow key={taskIndex}>
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
                          ? { ...item, tasks: item.tasks.filter((_, index) => index !== taskIndex) }
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
          <S.DraftButton type="button" onClick={onClose}>Отмена</S.DraftButton>
          <S.DraftButton type="button" onClick={save} disabled={saving}>
            {saving ? "Сохранение..." : "Создать план"}
          </S.DraftButton>
        </S.ModalActions>
      </S.Modal>
    </S.ModalOverlay>
  );
};
