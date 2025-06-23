/**
 * @Description
 * 조건부 렌더링을 위한 컴포넌트입니다.
 * - `when` 값이 falsy하거나 빈 배열이면 `fallback`을 렌더링합니다.
 * - `children`이 함수일 경우, `when` 값을 인자로 호출해 렌더링합니다.
 * - 그 외에는 `children` 자체를 그대로 렌더링합니다.
 *
 * @Example
 * <ConditionalComponent when={data} fallback={<div>데이터 없음</div>}>
 *   {(validData) => <div>{validData.name}</div>}
 * </ConditionalComponent>
 */

import React from "react";

function ConditionalComponent<T>({
  when,
  fallback,
  children,
}: {
  when: T | undefined | null | false | boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode | ((_data: T) => React.ReactNode);
}) {
  if (
    !when ||
    (Array.isArray(when) && when.length === 0) ||
    Object.keys(when).length === 0
  )
    return <>{fallback}</>;

  if (typeof children === "function" && typeof when !== "boolean") {
    return <>{children(when)}</>;
  }

  return <>{children}</>;
}

export default ConditionalComponent;
