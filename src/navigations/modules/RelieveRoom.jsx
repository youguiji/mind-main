/*
 * @Description: 解忧室导航c
 * @Version:
 * @Autor: Austral
 * @Date: 2023-07-17 16:15:14
 * @LastEditors: Austral
 * @LastEditTime: 2024-02-24 20:53:04
 */
import { initStackNavigation } from '../navigation';
import React from 'react';

import RelieveRoom from '../../screen/RelieveRoom/RelieveRoom';
import Music from '../../screen/RelieveRoom/Music/Music';

import AIDialogue from '../../screen/RelieveRoom/AIDialogue/AIDialogue';

import ConsultingRoom from '../../screen/RelieveRoom/ConsultingRoom/ConsultingRoom';
import ConsultingDetail from '../../screen/RelieveRoom/ConsultingRoom/ConsultingDetail';

import EmotionalMailbox from '../../screen/RelieveRoom/EmotionalMailbox/EmotionalMailbox';

import Assessment from '../../screen/RelieveRoom/Assessment/Assessment';
import AssessmentDetail from '../../screen/RelieveRoom/Assessment/AssessmentDetail';
import AssessmentTest from '../../screen/RelieveRoom/Assessment/AssessmentTest';
import AssessmentResult from '../../screen/RelieveRoom/Assessment/AssessmentResult';

export const RelieveRoomNavagation = Stack => {
  return (
    <>
      {initStackNavigation(Stack, 'RELIEVEROOM', RelieveRoom)}
      {/* 云音乐 */}
      {initStackNavigation(Stack, 'MUSIC', Music)}
      {/* ai对话 */}
      {initStackNavigation(Stack, 'AIDialogue', AIDialogue)}
      {/* 咨询师 */}
      {initStackNavigation(Stack, 'ConsultingRoom', ConsultingRoom)}
      {initStackNavigation(Stack, 'ConsultingDetail', ConsultingDetail)}
      {/* 情绪信箱 */}
      {initStackNavigation(Stack, 'EmotionalMailbox', EmotionalMailbox)}
      {/* 心理测评 */}
      {initStackNavigation(Stack, 'Assessment', Assessment)}
      {initStackNavigation(Stack, 'AssessmentDetail', AssessmentDetail)}
      {initStackNavigation(Stack, 'AssessmentTest', AssessmentTest)}
      {initStackNavigation(Stack,'AssessmentResult',AssessmentResult)}
    </>
  );
};
