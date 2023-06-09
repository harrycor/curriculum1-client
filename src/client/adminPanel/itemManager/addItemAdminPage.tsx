// @ts-nocheck
import React from "react";
import ShirtSelector from "./ShirtSelector";
import ShirtDisplayer from "./ShirtDisplayer";
import { useState } from "react";

interface Props {}

const addItemAdminPage: React.FC<Props> = () => {
  const [clothing, setClothing] = useState("");
  const [color, setColor] = useState("");
  const [percent, setPercent] = useState<number | string>(0);

  let STATES: any = {
    clothing,
    color,
    percent,
  };

  let SetSTATES: any = {
    setClothing,
    setColor,
    setPercent,
  };

  return (
    <div>
      <ShirtSelector
        statesFromAddItemAdminPage={STATES}
        setStatesFromAddItemAdminPage={SetSTATES}
      />
      <ShirtDisplayer />
    </div>
  );
};

export default addItemAdminPage;
