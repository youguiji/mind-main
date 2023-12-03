/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-24 15:12:06
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-29 10:44:39
 */

import {
  Get,
  Put,
  Post
} from '../requests'

/**
 * @description: 分页获取文章列表
 * @param {} type 类型，1为文章，2为动态 
 * @return {*}
 * @author: Austral
 */
export const getArticle = (type, pageNum, pageSize) => {
  return Post({
    url: `/publication/page/{type}`,
    data: {
      pageNum,
      pageSize,

    }
  })
}

/**
 * @description: 编辑文章
 * @param {string} id 文章id
 * @param {string} content 内容
 * @param {string} tags tag
 * @param {string} title 标题
 * @return {*}
 * @author: Austral
 */
export const editeArticle = (id, content, tags, title) => {
  return Put({
    url: '/publication',
    params: {
      id
    },
    data: {
      content,
      tags,
      title
    }
  })
}

/**
 * @description: 添加文章
 * @param {string} content 内容
 * @param {string} tags 标签
 * @param {string} title 标题
 * @return {*}
 * @author: Austral
 */
export const addArticle = (content, tags, title) => {
  return Post({
    url: '/publication/pagingPublication',
    data: {
      content,
      tags,
      title
    }
  })
}

/**
 * @description: 获取文章或动态详情
 * @param {*} publicationId
 * @return {*}
 * @author: Austral
 */
export const getArticleDetail = (publicationId) => {
  return Get({
    url: `/publication/${publicationId}`,
  })
}

/**
 * @description: 分页获取文章评论
 * @param {string} page 页数
 * @param {string} limit 
 * @param {string} publicationId 文章id
 * @return {*}
 * @author: Austral
 */
export const getComment = (publicationId,pageNum,pageSize,fetchAll) => {
  return Post({
    url: `/comment/page/${publicationId}`,
    body: {
      pageNum,
      pageSize,
      fetchAll,
    }
  })
}

/**
 * @description: 发布评论
 * @param {*} content
 * @param {*} publicationId
 * @return {*}
 * @author: Austral
 */
export const postComment = (content, publicationId) => {
  return Get({
    url: '/publicationComment/postComment',
    data: {
      content,
      publicationId,
    }
  })
}

/**
 * @description: 回复评论
 * @param {*} content 评论内容
 * @param {*} publicationId id
 * @param {*} toCommentId 被回复的id
 * @return {*}
 * @author: Austral
 */
export const replyComment = (content, publicationId, toCommentId) => {
  return Get({
    url: '/publicationComment/replyComment',
    data: {
      content,
      publicationId,
      toCommentId
    }
  })
}