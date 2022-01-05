---
title: react优化小技巧
tags:
---

## 如何从 useCallback 读取一个经常变化的值

```tsx
import { useState, useCallback, useRef, useEffect } from "react";

// 下面这段代码中，`handleSubmit` 用 `useCallback` 进行了包裹，目的是在渲染时复用这个函数。
// 但由于 `useCallback` 依赖了 `text` 这个变量，而这个变量是会随着用户输入频繁变化的，因此 `handleSubmit` 实际上还是会比较频繁的重新生成。

function Form() {
  const [text, updateText] = useState("");
  const handleSubmit = useCallback(() => {
    const currentText = text;
  }, [text]);
  return (
    <>
      <input value={text} onChange={(e) => updateText(e.target.value)} />
      {/* 如果此组件渲染每次渲染时非常耗费性能 */}
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}

// 可通过两种方式解决
// 1.通过useRef保存 useCallback 依赖的 text 变量

function Form() {
  const [text, updateText] = useState("");
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text;
  });

  const handleSubmit = useCallback(() => {
    // const currentText = text
    const currentText = textRef.current; // 从 ref 读取它
  }, []);

  return (
    <>
      <input value={text} onChange={(e) => updateText(e.target.value)} />
      {/* 如果此组件渲染每次渲染时非常耗费性能 */}
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}

// 2.抽取成一个自定义hook

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(
    (...arg) => {
      const fn = ref.current;
      return fn(arg);
    },
    [ref]
  );
}

function Form() {
  const [text, updateText] = useState("");

  const handleSubmit = useEventCallback(() => {
    const currentText = text;
  }, [text]);

  return (
    <>
      <input value={text} onChange={(e) => updateText(e.target.value)} />
      {/* 如果此组件渲染每次渲染时非常耗费性能 */}
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

## 如何获取前一个 state 值

```tsx
// 在使用Class Component,通过 componentDidUpdate 接收先前的props和state
// 通过Hooks时，可以使用useRef来实现类似的能力
import { useState, useEffect, useRef } from "react";

function usePrevious<T>(value: T) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

function App() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  // Display both current and previous count value
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
