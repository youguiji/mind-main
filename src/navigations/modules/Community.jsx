/*
 * @Description: 社区导航
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-13 22:04:48
 * @LastEditors: Austral
 * @LastEditTime: 2023-09-22 16:46:26
 */
import { initStackNavigation } from '../navigation';
import React from 'react';

import { COMMUNITY } from '../navigationNames';

import Community from '../../screen/Community/Community';
import ArticleDetail from '../../screen/Community/Article/ArticleDetail';
import ForumDetail from '../../screen/Community/Forum/ForumDetail';
import ForumAdd from '../../screen/Community/Forum/ForumAdd';
import ArticleAdd from '../../screen/Community/Article/ArticleAdd';
import ArticleSelected from '../../screen/Community/Article/ArticleSelected';

export const CommunityNavigation = Stack => {
  return (
    <>
      {initStackNavigation(Stack, 'COMMUNITY', Community)}
      {initStackNavigation(Stack, 'ARTICLEDETAIL', ArticleDetail)}
      {initStackNavigation(Stack, 'FORUMDETAIL', ForumDetail)}
      {initStackNavigation(Stack, 'FORUMADD', ForumAdd)}
      {initStackNavigation(Stack,'ARTICLESELECT',ArticleSelected)}
      {initStackNavigation(Stack, 'ARTICLEADD', ArticleAdd)}
    </>
  );
};
