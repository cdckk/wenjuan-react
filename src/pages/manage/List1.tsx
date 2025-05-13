import React, { FC } from "react";
import './pages/List1.module.scss';  

const List : FC = () => {
  const questionList = [
    { id: 'q1', title: '问卷4', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: false },
    { id: 'q3', title: '问卷3', isPublished: false },
  ]
  function edit(id: string) {
    console.log(`编辑问卷${id}`)
  }
  return <div>
    <h1>问卷列表页</h1>
      <div>
        {questionList.map(question => {
          const { id, title, isPublished } = question
          return <div key={id} className='list-item'>
            <strong>{title}</strong>
            &nbsp;
            { isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
            &nbsp;
            <button onClick={ () => edit(id) }>编辑问卷</button>
          </div>
        })}
      </div>
  </div>
}

export default List;