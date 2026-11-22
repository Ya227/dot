import React from "react";

import { useNavigate } from "react-router-dom";

import { CreateDreamForm, DreamFormData } from "../features/createDreamForm/createDreamForm";

export const FormDreams = () => {
  const navigate = useNavigate();

  const handleCreateDream = (data: DreamFormData) => {
    console.log("Данные новой мечты:", data);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px 20px" }}>
      <CreateDreamForm onSubmit={handleCreateDream} />
    </div>
  );
};

export default FormDreams;
