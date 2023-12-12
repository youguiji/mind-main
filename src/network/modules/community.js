/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-24 15:12:06
 * @LastEditors: Austral
 * @LastEditTime: 2023-12-10 16:52:39
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
export const getArticle = (type, pageNum, pageSize, fetchAll) => {
  return Post({
    url: `/publication/publication/page/${type}`,
    data: {
      pageNum,
      pageSize,
      fetchAll,
    }
  })
}

/**
 * @description: 增加或者修改文章
 * @param {string} content 内容
 * @param {number} id 右值为编辑，无值为新增
 * @param {number} type 1为文章，2为动态
 * @param {Array} tags 标签数组
 * @param {string} title 标题
 * @param {Array} pictures 图片数组
 * @return {*}
 * @author: Austral
 */
export const addArticle = (content, tags, title) => {
  return Post({
    url: '/publication/publication/manage',
    data: {
      id,
      type,
      title,
      content,
      tags,
      pictures,

    }
  })
}

/**
 * @description: 获取文章详情
 * @param {*} publicationId
 * @return {*}
 * @author: Austral
 */
export const getArticleDetail = (publicationId) => {
  return Get({
    url: `/publication/publication/${publicationId}`,
  })
}

/**
 * @description: 删除文章
 * @param {*} publicationId 文章id
 * @return {*}
 * @author: Austral
 */
export const deleteArticle = (publicationId) => {
  return Post({
    url: `/publication/publication/delete/${publicationId}`,
  })
}

/**
 * @description: 文章点赞/取消点赞
 * @param {number} publicationId 文章id
 * @param {number} type 1为给文章点赞，2为给动态点赞
 * @param {number} option 1表示点赞，2表示取消点赞
 * @return {*}
 * @author: Austral
 */
export const upArticle = (publicationId, type, option) => {
  return Post({
    url: `/publication/like/publication/${publicationId}/${type}/${option}`
  })
}

/**
 * @description: 分页获取文章评论
 * @param {number} publicationId 文章id
 * @param {number} pageNum 
 * @param {number} pageSize 
 * @param {boolean} fetchAll 全部
 * @return {*}
 * @author: Austral
 */
export const getComment = (publicationId, pageNum, pageSize, fetchAll) => {
  return Post({
    url: `/publication/comment/page/${publicationId}`,
    data: {
      pageNum,
      pageSize,
      fetchAll,
    }
  })
}

/**
 * @description: 发表评论
 * @param {string} content 评论内容（必须）
 * @param {number} publicationId 文章id
 * @param {number} toCommentId 被回复者id
 * @return {*}
 * @author: Austral
 */
export const postComment = (publicationId, content, toCommentId) => {
  return Post({
    url: '/publication/comment/add',
    data: {
      content,
      publicationId,
      toCommentId,
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
    url: '/publication/publicationComment/replyComment',
    data: {
      content,
      publicationId,
      toCommentId
    }
  })
}

/**
 * @description: 获取用户动态
 * @param {string} userId 用户id
 * @param {String} type 1文章，2动态
 * @param {Number} pageNum
 * @param {Number} pageSize
 * @param {Boolean} fetchAll
 * @return {*}
 * @author: Austral
 */
export const getUserArticle = (type, userId, pageNum, pageSize, fetchAll) => {
  return Post({
    url: `/publication/page/getPublicationByUserId/${type}/${userId}`,
    data: {
      pageNum,
      pageSize,
      fetchAll,
    }
  })
}