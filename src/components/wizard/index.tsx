import react, { useState } from "react";
import "./index.scss";
import { cloneDeep } from "lodash";
import classNames from "classnames";
import { ReactComponent as InfoIcon } from "../../assets/info.svg";
import Tooltip from "react-tooltip";
import { DUMMY_INTENTS } from "../../dummyIntentes";
import { TransformedIntent } from "../../types";
import { Expression } from "../expression";

// this will be fetched from from API in real world.
// Adding two more keys to each row to keep track of selection and expansion.
const TRANSFORMED_INTENTS: TransformedIntent[] = DUMMY_INTENTS.map(
  (intent) => ({
    ...intent,
    isChecked: false,
    isExpanded: false,
  })
);

export const Wizard: React.FC = () => {
  const [intents, setIntents] = useState<TransformedIntent[]>(
    TRANSFORMED_INTENTS
  );
  const [isAllIntentsSelected, setIsAllIntentsSelected] = useState<boolean>(
    false
  );

  const selectAllIntents = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllIntentsSelected(checked);
    const checkedIntents = cloneDeep(intents).map((intent) => ({
      ...intent,
      isChecked: checked,
    }));
    setIntents(checkedIntents);
  };

  const handleIntentSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedIntents = cloneDeep(intents).map((intent) => {
      return {
        ...intent,
        isChecked:
          intent.id === e.target.value ? e.target.checked : intent.isChecked,
      };
    });
    setIntents(checkedIntents);
  };

  const showAllExpressions = (
    id: string,
    isAllExpressionsToBeDisplayed: boolean
  ) => {
    const checkedIntents = cloneDeep(intents).map((intent) => {
      return {
        ...intent,
        isExpanded:
          intent.id === id ? isAllExpressionsToBeDisplayed : intent.isExpanded,
      };
    });
    setIntents(checkedIntents);
  };

  const uncheckAllIntents = () => {
    const checkedIntents = cloneDeep(intents).map((intent) => {
      return {
        ...intent,
        isChecked: false,
      };
    });
    setIntents(checkedIntents);
    setIsAllIntentsSelected(false);
  };

  return (
    <div className="wizard">
      <h2>Create your bot</h2>
      <h4>Configure your bot by choosing pretrained intents</h4>
      <div className="wizard__table">
        {/* Table header */}
        <div className="header-row">
          <div
            className={classNames(
              "header-row-cell",
              "header-row-cell--checkbox"
            )}
          >
            <input
              type="checkbox"
              checked={isAllIntentsSelected}
              onChange={selectAllIntents}
            />
          </div>
          <div
            className={classNames("header-row-cell", " header-row-cell--name")}
          >
            Name
          </div>
          <div
            className={classNames(
              "header-row-cell",
              "header-row-cell--description"
            )}
          >
            Description
          </div>
          <div
            className={classNames(
              "header-row-cell",
              "header-row-cell--expressions"
            )}
          >
            Expressions
            <span
              className="icon-container"
              data-for="expressions"
              data-tip="The sentences which<br/>are used to train the intent"
            >
              <InfoIcon />
            </span>
          </div>
          <div
            className={classNames("header-row-cell", "header-row-cell--reply")}
          >
            Reply
            <span
              className="icon-container"
              data-for="reply"
              data-tip="The text which is sent<br/>as a response to a user"
            >
              <InfoIcon />
            </span>
          </div>
        </div>

        {/* Table body */}
        {intents.map((intent) => (
          <div className="body-row" key={intent.id}>
            <div
              className={classNames("body-row-cell", "body-row-cell--checkbox")}
            >
              <input
                type="checkbox"
                value={intent.id}
                checked={intent.isChecked}
                onChange={handleIntentSelection}
              />
            </div>
            <div className={classNames("body-row-cell", "body-row-cell--name")}>
              {intent.name}
            </div>
            <div
              className={classNames(
                "body-row-cell",
                "body-row-cell--description"
              )}
            >
              {intent.description}
            </div>
            <div
              className={classNames(
                "body-row-cell",
                "body-row-cell--expressions"
              )}
            >
              {/* Display two expressions with view more button if there are more two expressions*/}
              {intent.trainingData.expressions.length > 1 ? (
                !intent.isExpanded ? (
                  <>
                    <Expression
                      expressions={intent.trainingData.expressions.slice(0, 2)}
                    />
                    <button
                      type="button"
                      className={classNames("button", "button__view-more")}
                      onClick={() => showAllExpressions(intent.id, true)}
                    >
                      View more
                    </button>
                  </>
                ) : (
                  <>
                    <Expression expressions={intent.trainingData.expressions} />
                    <button
                      type="button"
                      className={classNames("button", "button__view-more")}
                      onClick={() => showAllExpressions(intent.id, false)}
                    >
                      View less
                    </button>
                  </>
                )
              ) : (
                <Expression expressions={intent.trainingData.expressions} />
              )}
            </div>
            <div
              className={classNames("body-row-cell", "body-row-cell--reply")}
            >
              {intent.reply.text}
            </div>
          </div>
        ))}
      </div>
      <div className="wizard__footer">
        {/*  button to reset the selection */}
        <button
          type="button"
          onClick={uncheckAllIntents}
          className={classNames("button", "button__reset")}
        >
          Reset
        </button>
        {/*  dummy submit button */}
        <button
          type="button"
          disabled={
            intents.filter((intent) => intent.isChecked === true).length === 0
          }
          className={classNames("button", "button__submit", {
            "button--disabled":
              intents.filter((intent) => intent.isChecked === true).length ===
              0,
          })}
        >
          Submit
        </button>
      </div>

      <Tooltip id="expressions" place="right" multiline={true} />
      <Tooltip id="reply" place="right" multiline={true} />
    </div>
  );
};
