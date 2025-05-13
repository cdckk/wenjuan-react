import React, { FC } from "react";
import { Outlet } from 'react-router-dom'
// import useLoadQuestionData from "../../../hooks/useLoadQuestionData";

const Stat: FC = () => {

  // const { loading, questionData } = useLoadQuestionData()

  return (
    <div>
      <p>Stat page</p>
      {/* {loading ? loading : JSON.stringify(questionData)} */}
    </div>
  )
}

export default Stat