import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { PlanFormModal } from "./PlanFormModal";
import {
  dreamsApi,
  useCreateStageMutation,
  useCreateTaskMutation,
  PlanDraftStage,
} from "../../services/dreamsApi";

interface CreatePlanDreamProps {
  dreamId: string;
  onClose: () => void;
}

const INITIAL_STAGES: PlanDraftStage[] = [
  { title: "Этап 1", tasks: [{ title: "", deadline: "", is_ai_generated: false }] },
];

export const CreatePlanDream: React.FC<CreatePlanDreamProps> = ({ dreamId, onClose }) => {
  const dispatch = useDispatch();
  const [createStage] = useCreateStageMutation();
  const [createTask] = useCreateTaskMutation();
  const [saving, setSaving] = useState(false);

  const save = async (stages: PlanDraftStage[]) => {
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
      dispatch(dreamsApi.util.invalidateTags([{ type: "Plan", id: dreamId }]));
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <PlanFormModal
      title="Создать план"
      submitLabel="Создать план"
      initialStages={INITIAL_STAGES}
      saving={saving}
      onClose={onClose}
      onSubmit={save}
    />
  );
};
