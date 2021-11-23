import React from "react";
import MaterialInput from "@material-ui/core/Input";

import InputMask from "react-input-mask";
export const TimeMask = (props) => (
  <InputMask
    mask="99:99"
    value={props.value}
    className="form-control input-color"
    onChange={props.onChange}
    onBlur={props.onBlur}
  >
    {(inputProps) => (
      <MaterialInput {...inputProps} type="tel" disableUnderline />
    )}
  </InputMask>
);
