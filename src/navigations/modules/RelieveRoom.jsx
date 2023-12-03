/*
 * @Description: 解忧室导航
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-17 16:15:14
 * @LastEditors: Austral
 * @LastEditTime: 2023-09-22 16:46:43
 */
import { initStackNavigation } from "../navigation";
import React from 'react';

import RelieveRoom from "../../screen/RelieveRoom/RelieveRoom";

export const RelieveRoomNavagation = (Stack) => {
  return (
    <>
      {initStackNavigation(Stack, 'RELIEVEROOM', RelieveRoom)}
    </>
  )
}