import React, { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { getQuestionSerice } from '../../../services/question'
// import '../../../_mock/index'
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from './index.module.scss'
import EditCanvas from "./EditCanvas";
import { useDispatch } from 'react-redux'
import { changeSelectId } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentsInfo'
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditHeader from "./EditHeader";

const Edit: FC = () => {
  const dispatch = useDispatch()
  const { componentList } = useGetComponentInfo()
  const { loading } = useLoadQuestionData()

  function clearSelectedId () {
    dispatch(changeSelectId({ componentList: [], selectId:'' }))
  }

  return (
    <div className={styles.container}>
      <EditHeader />
      {/* <div style={{ backgroundColor: '#fff', height: '40px' }}>header</div> */}
      <div className={styles['content-wrap']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrap']}>
              {/* <div style={{ height: '900px' }}>画布滚动测试</div> */}
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit