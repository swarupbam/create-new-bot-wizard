import react from "react";
import { ExpressionProps } from "../../types";

export const Expression: React.FC<ExpressionProps> = (props) => {
  return (
    <>
      {props.expressions.map((expression, index) => (
        <div key={expression.id} className="expression">
          <span>{index + 1}. </span>
          {expression.text}
        </div>
      ))}
    </>
  );
};
