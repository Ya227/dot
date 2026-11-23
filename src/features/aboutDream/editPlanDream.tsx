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
import { PlanFormModal } from "./PlanFormModal";

interface EditPlanDreamProps {
  dreamId: string;
  stages: PlanStage[];
  onClose: () => void;
}

export const EditPlanDream: React.FC<EditPlanDreamProps> = ({ dreamId, stages: initialStages, onClose }) => {
  const [createStage] = useCreateStageMutation();
  const [updateStage] = useUpdateStageMutation();
  const [deleteStage] = useDeleteStageMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [saving, setSaving] = useState(false);

  const mappedInitialStages: PlanDraftStage[] = initialStages.map((stage) => ({
    id: stage.id,
    title: stage.title,
    tasks: stage.tasks.map((task) => ({
      id: task.id,
      title: task.title,
      deadline: task.deadline ? task.deadline.slice(0, 10) : "",
      is_ai_generated: task.is_ai_generated,
      is_completed: task.is_completed,
    })),
  }));

  const save = async (stages: PlanDraftStage[]) => {
    setSaving(true);
    try {
      const validStages = stages
        .map((stage) => ({
          ...stage,
          title: stage.title.trim(),
          tasks: stage.tasks.filter((task) => task.title.trim()),
        }))
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
    <PlanFormModal
      title="Изменить план"
      submitLabel="Сохранить план"
      initialStages={mappedInitialStages}
      saving={saving}
      onClose={onClose}
      onSubmit={save}
    />
  );
};
