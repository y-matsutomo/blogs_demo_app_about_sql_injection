import React from "react";
import BaseTemplate from "../templates/BaseTemplate";

const HomePage: React.FC = () => {
  return (
    <BaseTemplate title="Top">
      <p>
        This application demostrates how the SQL injection occurs with the
        modern development frameworks/modules such as React/Node/TypeScript.
      </p>
      <p>
        This has two User pages for the same purpose, which is to search users.
        However, one is safe but another is unsafe.
      </p>
    </BaseTemplate>
  );
};

export default HomePage;
