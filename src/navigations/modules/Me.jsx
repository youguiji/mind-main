/*
 * @Description: 我的导航
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-13 22:04:23
 * @LastEditors: Austral
 * @LastEditTime: 2023-11-18 10:55:09
 */
import { initStackNavigation } from '../navigation';
import React from 'react';

import Me from '../../screen/Me/Me';
import MeSetting from '../../screen/Me/MeSetting/MeSetting';
import MeSettingInfo from '../../screen/Me/MeSetting/MeSettingInfo/MeSettingInfo';
import MeSettingPrivacy from '../../screen/Me/MeSetting/MeSettingPrivacy/MeSettingPrivacy';
import MeSettingSecrity from '../../screen/Me/MeSetting/MeSettingSecrity/MeSettingSecrity';
import MeSettingChangeBirth from '../../screen/Me/MeSetting/MeSettingInfo/MeSettingChangeInfo/MeSettingChangeBirth';
import MeSettingThank from '../../screen/Me/MeSetting/MeSettingThank/MeSettingThank';
import MeSettingChangeName from '../../screen/Me/MeSetting/MeSettingInfo/MeSettingChangeInfo/MeSettingChangeName';
import MeSettingChangeAvatar from '../../screen/Me/MeSetting/MeSettingInfo/MeSettingChangeInfo/MeSettingChangeAvatar';
import MeSettingChangeSex from '../../screen/Me/MeSetting/MeSettingInfo/MeSettingChangeInfo/MeSettingChangeSex';

import MeAttentionFans from '../../screen/Me/MeAttention/MeAttentionFans';
import MeAttentionFollow from '../../screen/Me/MeAttention/MeAttentionFollow';
import MeAttentionPerPage from '../../screen/Me/MeAttention/MeAttentionPerPage';

import MeDiary from '../../screen/Me/MeDiary/MeDiary';

import MeUserPage from '../../screen/Me/MeUserPage/MeUserPage';

export const MeNavigation = Stack => {
  return (
    <>
      {initStackNavigation(Stack, 'ME', Me)}
      {initStackNavigation(Stack, 'MESETTING', MeSetting)}
      {initStackNavigation(Stack, 'MESETTINGINFO', MeSettingInfo)}
      {initStackNavigation(Stack, 'MESETTINGPRIVACY', MeSettingPrivacy)}
      {initStackNavigation(Stack, 'MESETTINGSECRITY', MeSettingSecrity)}
      {initStackNavigation(Stack, 'MESETTINGCHANGEBIRTH', MeSettingChangeBirth)}
      {initStackNavigation(Stack, 'MESETTINGCHANGSEX', MeSettingChangeSex)}
      {initStackNavigation(Stack, 'MESETTINGCHANGENAME', MeSettingChangeName)}
      {initStackNavigation(
        Stack,
        'MESETTINGCHANGEAVATAR',
        MeSettingChangeAvatar,
      )}
      {initStackNavigation(Stack, 'MESETTINGTHANK', MeSettingThank)}
      {initStackNavigation(Stack, 'MEATTENTIONFANS', MeAttentionFans)}
      {initStackNavigation(Stack, 'MEATTENTIONFOLLOW', MeAttentionFollow)}
      {initStackNavigation(Stack, 'MEATTENTIONPERPAGE', MeAttentionPerPage)}

      {initStackNavigation(Stack, 'MEDIARY', MeDiary)}

      {initStackNavigation(Stack,'MEUSERPAGE',MeUserPage)}
    </>
  );
};
