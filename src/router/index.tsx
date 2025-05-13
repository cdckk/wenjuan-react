import React from "react";
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from "../pages/layout/MainLayout";
import ManageLayout from "../pages/layout/ManageLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List2 from "../pages/manage/List2";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
import Stat from "../pages/question/Stat";
import Edit from "../pages/question/Edit";
import QuestionLayout from "../pages/layout/QuestionLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'star',
            element: <Star />
          },
          {
            path: 'trash',
            element: <Trash />
          },
          {
            path: 'list2',
            element: <List2 />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />
      },
      {
        path: 'stat/:id',
        element: <Stat />
      }
    ]
  },
])

export default router

//--------------分割线------------
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'