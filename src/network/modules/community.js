/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-24 15:12:06
 * @LastEditors: Austral
 * @LastEditTime: 2024-06-28 11:04:48
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
 * @param {Array} tags 标签数组 (可选，默认为 [])
 * @param {string} title 标题
 * @param {Array} selectedImages 已选择的图片数组 (可选，默认为 [])
 * @param {number|null} id 文章的 id (可选，默认为 null)
 * @param {number|null} type 文章的类型 (1为文章，2为动态)
 * @return {*}
 * @author: Austral
 */
export const addArticle = (content, title, tags = [], selectedImages = [], id = null, type = null) => {
  // 创建一个 FormData 对象
  const formData = new FormData();
  formData.append('content', content);
  formData.append('title', title);

  // 添加 tags 数组
  // tags.forEach((tag, index) => {
  //   formData.append(`tags[${index}]`, tag);
  // });

  // 添加图片文件到 FormData
  selectedImages.forEach((image, index) => {
    // 使用 index 作为文件名，根据实际情况设置文件名
    formData.append(`pictures[${index}]`, {
      uri: image.uri,
      type: image.type, // 设置文件类型
      name: `image_${index}.jpg`, // 设置文件名
    });
  });

  // 如果提供了 id 和 type，添加到 FormData
  if (id !== null) {
    formData.append('id', id);
  }

  if (type !== null) {
    formData.append('type', type);
  }

  return Post({
    url: '/publication/publication/manage',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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