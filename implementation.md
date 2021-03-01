# Implementation details

## Components

1. Wizard - Data component which stores user selection in a state.
   - It has two states one to store pretrained intetns and another one to support "select all" functionality.
   - UI is built like a table view to keep it very simple and user-friendly.
   - Expressions are displayed in a filtered view. If there are more than two expressions, first two expressions are displayed as a default view with ability to view all the expressions with the help of "View more" button. Expanded view can be collapsed by clicking on the "View less" button.
2. Expression - Presentation component which displays training expressions.

## Libraries used

1. react-tooltip - To display tooltip.
2. classnames - To apply CSS classes conditioanlly.
3. lodash - Utility functions.
