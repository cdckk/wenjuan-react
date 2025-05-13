import React, { FC } from "react";
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import styles from  './Home.module.scss'

const { Title, Paragraph } =  Typography

const Home: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    nav({
      pathname: '/login',
      search: 'b=21'
    })
  }

  return (
    // <div>
    //   首页1111111111
    //   {/* <div>header</div>
    //   <div>
    //     <Outlet />
    //   </div>
    //   <div>footer</div> */}

    //   <p>Home</p>
    //   <div>
    //     <button onClick={clickHandler}>登录</button>
    //     <Button type="primary">点击</Button>
    //   </div>
    // </div>

    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建100份</Paragraph>
        <div>
          <Button type="primary" onClick={() => nav('/manage/list2')}>开始使用</Button>
        </div>
      </div>
    </div>
  )
}

export default Home