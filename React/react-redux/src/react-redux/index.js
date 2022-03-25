import React, { useContext, useLayoutEffect, useReducer, useRef, useMemo, useEffect } from 'react';
import ReactReduxContext from './Context';
import { shallowEqual } from './util';
import Subscription from './Subscription';

function storeStateUpdatesReducer(count) {
  return count + 1;
}


/**
 * 直接将传进来的store放到context上，然后直接渲染children就行
 * @param {object} props 
 * @returns React.Node
 */
function Provider(props) {
  const { store, children } = props;

  // 这是要传递的context
  // 里面放入store和subscription实例
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store);

    // 注册回调为通知子组件，这样就可以开始层级通知了
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store,
      subscription,
    }
  }, [store]);

  // 拿到之前的state值
  const previousState = useMemo(() => store.getState(), [store]);

  // 每次contextValue或者previousState变化的时候
  // 用notifyNestedSubs通知子组件
  useEffect(() => {
    const { subscription } = contextValue;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

  }, [contextValue, previousState])

  return (
    <ReactReduxContext.Provider value={contextValue}>
      { children }
    </ReactReduxContext.Provider>
  )
}


/**
 * 
 * @param {*} mapStateToProps 
 * @param {*} mapDispatchToProps 
 * @returns 
 */
function connect(
  mapStateToProps = () => {},
  mapDispatchToProps = () => {}
  ) {

  function childPropsSelector(store, wrapperProps) {
    const state = store.getState();
  
      // 执行mapStateToProps和mapDispatchToProps
      const stateProps = mapStateToProps(state);
      const dispatchProps = mapDispatchToProps(store.dispatch);
    
      return Object.assign({}, stateProps, dispatchProps, wrapperProps);
  }

  // 第一层函数接收mapStateToProps和mapDispatchToProps
  // 第二层函数是个高阶组件，里面获取context
  // 然后执行mapStateToProps和mapDispatchToProps
  // 再将这个结果组合用户的参数作为最终参数渲染WrappedComponent
  // WrappedComponent就是我们使用connext包裹的自己的组件

  return function connectHOC(WrappedComponent) {

    function ConnectFunction(props) {
      // 复制一份props到wrapperProps
      const { ... wrapperProps } = props;

      // 获取context的值
      const contextValue = useContext(ReactReduxContext);

      const { store, subscription: parentSub } = contextValue;  // 解构出store和parentSub

      const actualChildProps = childPropsSelector(store, wrapperProps);


      // 记录上次渲染参数
      const lastChildProps = useRef();
      useLayoutEffect(() => {
        lastChildProps.current = actualChildProps;
      }, []);

      // 使用useReducer触发强制更新
      const [
        ,
        forceComponentUpdateDispatch
      ] = useReducer(storeStateUpdatesReducer, 0);


      // 新建一个subscription实例
      const subscription = new Subscription(store, parentSub);

      // state回调抽出来成为一个方法
      const checkForUpdates = () => {
        const newChildProps = childPropsSelector(store, wrapperProps);
        // 如果参数变了，记录新的值到lastChildProps上
        // 并且强制更新当前组件
        if(!shallowEqual(newChildProps, lastChildProps.current)) {
          lastChildProps.current = newChildProps;

          // 需要一个API来强制更新当前组件
          forceComponentUpdateDispatch();

          // 然后通知子级更新
          subscription.notifyNestedSubs();
        }
      };


      // 使用subscription注册回调
      subscription.onStateChange = checkForUpdates;
      subscription.trySubscribe();

      // 修改传给子级的context
      // 将subscription替换为自己的
      const overriddenContextValue = {
        ...contextValue,
        subscription
      }

      // 渲染WrappedComponent
      return <WrappedComponent {...actualChildProps}></WrappedComponent>
    }
    return ConnectFunction;
  }
}




export { Provider, connect }