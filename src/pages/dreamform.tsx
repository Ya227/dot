import React from "react";

import { CreateDreamForm, DreamFormData } from "../features/createDreamForm/createDreamForm";

export const FormDreams = () => {
  const handleCreateDream = (data: DreamFormData) => {
    console.log("Данные новой мечты:", data);
  };

  return (
    <div style={{ padding: "40px 20px" }}>
      <CreateDreamForm onSubmit={handleCreateDream} />
    </div>
  );
};

export default FormDreams;