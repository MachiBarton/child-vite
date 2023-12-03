/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";

const Mod: any = import.meta.glob("/src/pages/**/*.tsx"); // 动态引入所有组件地址

// 快速导入工具函数
const lazyLoad = (moduleName: string) => {
  let mod;

  switch (moduleName) {
    case "/404":
      mod = Mod["/src/pages/404.tsx"];
      break;
    default:
      mod = Mod[`/src/pages${moduleName}/index.tsx`];
  }
  const Module = lazy(mod);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Module />
    </Suspense>
  );
};

export { lazyLoad };
