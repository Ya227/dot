import React, { useEffect, useState } from "react";

import * as S from "./planDream.styles";
import {
  PlanStage,
  useUpdateDreamMutation,
  useUpdateStageMutation,
  useUpdateTaskMutation,
} from "../../services/dreamsApi";

interface PlanDreamProps {
  dreamId: string;
  stages: PlanStage[];
  onProgressChange: (percentage: number) => void;
}

export const PlanDream: React.FC<PlanDreamProps> = ({
  dreamId,
  stages: serverStages,
  onProgressChange,
}) => {
  const [stages, setStages] = useState(serverStages);
  const [openStages, setOpenStages] = useState<Set<string>>(
    new Set(serverStages.map((stage) => stage.id)),
  );
  const [updateTask] = useUpdateTaskMutation();
  const [updateStage] = useUpdateStageMutation();
  const [updateDream] = useUpdateDreamMutation();

  useEffect(() => setStages(serverStages), [serverStages]);

  const allTasks = stages.flatMap((stage) => stage.tasks);
  const completedCount = allTasks.filter((task) => task.is_completed).length;
  const totalCount = allTasks.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const completedStages = stages.filter((stage) => {
    const tasks = stage.tasks;
    return tasks.length > 0 && tasks.every((task) => task.is_completed);
  }).length;

  useEffect(() => onProgressChange(progressPercentage), [progressPercentage, onProgressChange]);

  const toggleTask = async (stage: PlanStage, taskId: string) => {
    const task = stage.tasks.find((item) => item.id === taskId);
    if (!task) return;
    const isCompleted = !task.is_completed;
    await updateTask({ id: taskId, dreamId, is_completed: isCompleted }).unwrap();

    const nextStages = stages.map((item) =>
      item.id === stage.id
        ? {
            ...item,
            tasks: item.tasks.map((entry) =>
              entry.id === taskId ? { ...entry, is_completed: isCompleted } : entry,
            ),
          }
        : item,
    );
    setStages(nextStages);

    const nextTasks = nextStages.flatMap((item) => item.tasks);
    const nextCompleted = nextTasks.filter((item) => item.is_completed).length;
    const nextProgress = nextTasks.length
      ? Math.round((nextCompleted / nextTasks.length) * 100)
      : 0;

    const changedStage = nextStages.find((item) => item.id === stage.id);
    if (changedStage) {
      const stageCompleted =
        changedStage.tasks.length > 0 && changedStage.tasks.every((item) => item.is_completed);
      const stageProgress = changedStage.tasks.length
        ? Math.round(
            (changedStage.tasks.filter((item) => item.is_completed).length /
              changedStage.tasks.length) *
              100,
          )
        : 0;
      await updateStage({
        id: changedStage.id,
        dreamId,
        title: changedStage.title,
        status: stageCompleted ? "completed" : stageProgress > 0 ? "in_progress" : "pending",
        progress: stageProgress,
      }).unwrap();
    }
    await updateDream({ id: dreamId, progress: nextProgress }).unwrap();
  };

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return "";
    const date = new Date(`${deadline.slice(0, 10)}T12:00:00`);
    return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" }).format(date);
  };

  return (
    <S.PlanSection>
      <S.PlanSectionHeader>
        <div>
          <S.PlanSectionSubtitle>План мечты</S.PlanSectionSubtitle>
          <S.PlanSectionTitle>Этапы и задачи</S.PlanSectionTitle>
        </div>
      </S.PlanSectionHeader>

      {stages.length > 0 && (
        <S.PlanSummary>
          <div>
            <S.SummaryLabel>Общий прогресс мечты</S.SummaryLabel>
            <S.SummaryValue>{progressPercentage}%</S.SummaryValue>
            <S.SummaryProgressTrack>
              <S.SummaryProgressFill width={progressPercentage} />
            </S.SummaryProgressTrack>
          </div>
          <S.SummaryStat>
            <S.SummaryStatValue>
              {completedStages} / {stages.length}
            </S.SummaryStatValue>
            <S.SummaryLabel>Этапов пройдено</S.SummaryLabel>
          </S.SummaryStat>
          <S.SummaryStat>
            <S.SummaryStatValue>
              {completedCount} / {totalCount}
            </S.SummaryStatValue>
            <S.SummaryLabel>Задач выполнено</S.SummaryLabel>
          </S.SummaryStat>
        </S.PlanSummary>
      )}

      {stages.length === 0 ? (
        <S.EmptyPlan>Для этой мечты пока нет плана.</S.EmptyPlan>
      ) : (
        <S.StepsContainer>
          {stages.map((stage, stageIndex) => {
            const stageCompleted = stage.tasks.filter((task) => task.is_completed).length;
            const stageProgress = stage.tasks.length
              ? Math.round((stageCompleted / stage.tasks.length) * 100)
              : 0;
            const isOpen = openStages.has(stage.id);
            return (
              <S.StageCard key={stage.id} $open={isOpen}>
                <S.StageHeader
                  type="button"
                  onClick={() =>
                    setOpenStages((current) => {
                      const next = new Set(current);
                      if (next.has(stage.id)) {
                        next.delete(stage.id);
                      } else {
                        next.add(stage.id);
                      }
                      return next;
                    })
                  }
                >
                  <S.StageChevron $open={isOpen}>
                    <svg viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </S.StageChevron>

                  <S.StageTitle>
                    {stageIndex + 1}. {stage.title}
                  </S.StageTitle>
                  {stageProgress === 100 && <S.StageBadge $completed>Выполнено</S.StageBadge>}
                  {stage.tasks.length > 0 && <S.StageProgress>{stageProgress}%</S.StageProgress>}
                </S.StageHeader>
                {isOpen && (
                  <S.StageTasks>
                    {stage.tasks.map((task) => (
                      <S.TaskRow key={task.id}>
                        <S.TaskCheckbox
                          type="checkbox"
                          checked={task.is_completed}
                          onChange={() => void toggleTask(stage, task.id)}
                        />
                        <S.TaskTitle $completed={task.is_completed}>
                          {task.title}
                          {task.is_ai_generated && <S.TaskAiBadge>ИИ</S.TaskAiBadge>}
                        </S.TaskTitle>
                        <S.TaskDeadline>{formatDeadline(task.deadline)}</S.TaskDeadline>
                      </S.TaskRow>
                    ))}
                  </S.StageTasks>
                )}
              </S.StageCard>
            );
          })}
        </S.StepsContainer>
      )}
    </S.PlanSection>
  );
};

export default PlanDream;
