import React, { useState } from "react";

import {
  PlanDraftStage,
  PlanStage,
  useCreateStageMutation,
  useCreateTaskMutation,
  useDeleteStageMutation,
  useDeleteTaskMutation,
  useUpdateStageMutation,
  useUpdateTaskMutation,
} from "../../services/dreamsApi";
import * as S from "./planDream.styles";

interface EditPlanDreamProps {
  dreamId: string;
  stages: PlanStage[];
  onClose: () => void;
}

export const EditPlanDream: React.FC<EditPlanDreamProps> = ({ dreamId, stages: initialStages, onClose }) => {
  const [stages, setStages] = useState<PlanDraftStage[]>(
    initialStages.map((stage) => ({
      id: stage.id,
      title: stage.title,
      tasks: stage.tasks.map((task) => ({
        id: task.id,
        title: task.title,
        deadline: task.deadline ? task.deadline.slice(0, 10) : "",
        is_ai_generated: task.is_ai_generated,
        is_completed: task.is_completed,
      })),
    })),
  );
  const [createStage] = useCreateStageMutation();
  const [updateStage] = useUpdateStageMutation();
  const [deleteStage] = useDeleteStageMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [saving, setSaving] = useState(false);

  const updateStageTitle = (stageIndex: number, title: string) =>
    setStages((current) => current.map((stage, index) => (index === stageIndex ? { ...stage, title } : stage)));

  const save = async () => {
    setSaving(true);
    try {
      const validStages = stages
        .map((stage) => ({ ...stage, title: stage.title.trim(), tasks: stage.tasks.filter((task) => task.title.trim()) }))
        .filter((stage) => stage.title);
      const originalTaskIds = new Set(initialStages.flatMap((stage) => stage.tasks.map((task) => task.id)));
      const keptTaskIds = new Set(validStages.flatMap((stage) => stage.tasks.map((task) => task.id).filter(Boolean)));

      for (const taskId of originalTaskIds) {
        if (!keptTaskIds.has(taskId)) await deleteTask({ id: taskId, dreamId }).unwrap();
      }

      const originalStageIds = new Set(initialStages.map((stage) => stage.id));
      const keptStageIds = new Set(validStages.map((stage) => stage.id).filter(Boolean));
      for (const stageId of originalStageIds) {
        if (!keptStageIds.has(stageId)) await deleteStage({ id: stageId, dreamId }).unwrap();
      }

      for (let stageIndex = 0; stageIndex < validStages.length; stageIndex += 1) {
        const draft = validStages[stageIndex];
        let stageId = draft.id;
        if (stageId) {
          await updateStage({ id: stageId, dreamId, title: draft.title }).unwrap();
        } else {
          stageId = (await createStage({ dreamId, title: draft.title, stage_order: stageIndex + 1 }).unwrap()).id;
        }

        for (let taskIndex = 0; taskIndex < draft.tasks.length; taskIndex += 1) {
          const task = draft.tasks[taskIndex];
          if (task.id) {
            await updateTask({
              id: task.id,
              dreamId,
              title: task.title.trim(),
              deadline: task.deadline || null,
              is_completed: task.is_completed,
            }).unwrap();
          } else {
            await createTask({
              stageId,
              dreamId,
              title: task.title.trim(),
              deadline: task.deadline,
              task_order: taskIndex + 1,
              is_ai_generated: task.is_ai_generated,
            }).unwrap();
          }
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
        <S.ModalTitle>Изменить план</S.ModalTitle>
        {stages.map((stage, stageIndex) => (
          <S.DraftStage key={stage.id || stageIndex}>
            <S.DraftInput
              value={stage.title}
              onChange={(event) => updateStageTitle(stageIndex, event.target.value)}
            />
            {stage.tasks.map((task, taskIndex) => (
              <S.DraftRow key={task.id || taskIndex}>
                <S.DraftInput
                  value={task.title}
                  onChange={(event) =>
                    setStages((current) =>
                      current.map((item, index) =>
                        index === stageIndex
                          ? { ...item, tasks: item.tasks.map((value, pos) => pos === taskIndex ? { ...value, title: event.target.value } : value) }
                          : item,
                      ),
                    )
                  }
                />
                <S.DraftInput
                  type="date"
                  value={task.deadline}
                  onChange={(event) =>
                    setStages((current) =>
                      current.map((item, index) =>
                        index === stageIndex
                          ? { ...item, tasks: item.tasks.map((value, pos) => pos === taskIndex ? { ...value, deadline: event.target.value } : value) }
                          : item,
                      ),
                    )
                  }
                />
                <input
                  type="checkbox"
                  checked={task.is_ai_generated}
                  onChange={(event) =>
                    setStages((current) =>
                      current.map((item, index) =>
                        index === stageIndex
                          ? { ...item, tasks: item.tasks.map((value, pos) => pos === taskIndex ? { ...value, is_ai_generated: event.target.checked } : value) }
                          : item,
                      ),
                    )
                  }
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
            {saving ? "Сохранение..." : "Сохранить план"}
          </S.DraftButton>
        </S.ModalActions>
      </S.Modal>
    </S.ModalOverlay>
  );
};
