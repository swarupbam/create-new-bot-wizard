interface Expression {
  readonly id: string;
  readonly text: string;
}

interface TrainingData {
  readonly expressionCount: number;
  readonly expressions: Expression[];
}
export interface Intent {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly trainingData: TrainingData;
  readonly reply: Expression;
}

export interface TransformedIntent extends Intent{
    readonly isChecked: boolean;
    readonly isExpanded: boolean;
}

export interface ExpressionProps {
  readonly expressions: Expression[];
}