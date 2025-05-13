import React, { FC } from 'react';
// import logo from './logo.svg';
// import './App.css';
import List from './pages/manage/List1';
import List2 from './pages/manage/List2'
import { useGetInfo } from './hooks/useGetInfo';
import { RouterProvider } from 'react-router-dom'
import router from './router'
import 'antd/dist/reset.css'

const App : FC = () => {

  const { loading, info } = useGetInfo()

  return (
    // <div className="App">
    //   <div>{ loading ? '加载中...' : info }</div>
    //   <List></List>
    //   <List2></List2>
    // </div>

    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
