import React, { lazy } from 'react';
// import {createBrowserRouter} from 'react-router-dom';
import { createHashRouter } from 'react-router-dom';

import { HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME } from '@/config/constants';

import MainLayout from '../layouts/MainLayout';
import ManageLayout from '../layouts/ManageLayout';
import QuestionLayout from '../layouts/QuestionLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import List from '../pages/manage/List';
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';

const Edit = lazy(() => import(/* webpackChunkName: "editPage" */ '../pages/question/Edit'));
const Stat = lazy(() => import(/* webpackChunkName: "statPage" */ '../pages/question/Stat'));

// history 模式
// const router = createBrowserRouter ([
const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: 'manage',
        element: <ManageLayout></ManageLayout>,
        children: [
          {
            path: 'list',
            element: <List></List>,
          },
          {
            path: 'star',
            element: <Star></Star>,
          },
          {
            path: 'trash',
            element: <Trash></Trash>,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout></QuestionLayout>,
    children: [
      {
        path: 'edit/:id',
        element: <Edit></Edit>,
      },
      {
        path: 'stat/:id',
        element: <Stat></Stat>,
      },
    ],
  },
]);

export default router;

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}

// 判断是否需要用户信息，不需要用户信息的页面有：首页、登录页、注册页
export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true;
  }
  return false;
}
