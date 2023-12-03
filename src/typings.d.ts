/*
 * @Author: Marcus.ma
 * @Date: 2023-12-01 15:29:40
 * @LastEditors: Marcus.ma
 * @LastEditTime: 2023-12-01 15:29:41
 * @FilePath: /child-app/src/typings.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by Quectel / Marcus.ma, All Rights Reserved.
 */

//声明window上自定义属性，如事件总线
declare interface Window {
  eventBus: unknown;
}

export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_TOKEN_KEY?: string;
  readonly VITE_UPLOAD_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
