import React, { useContext } from 'react';
import ReactReduxContext from './Context';


/**
 * 直接将传进来的store放到context上，然后直接渲染children就行
 * @param {object} props 
 * @returns React.Node
 */
function Provider(props) {
  const { store, children } = props;

  const contextValue = { store };

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
function connect(mapStateToProps, mapDispatchToProps) {
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
      const context = useContext(ReactReduxContext);

      const { store } = context;
      const state = store.getState();

      // 执行mapStateToProps和mapDispatchToProps
      const stateProps = mapStateToProps(state);
      const dispatchProps = mapDispatchToProps(store.dispatch);

      // 组装最终的props
      const actualChildProps = Object.assign({}, stateProps, dispatchProps, wrapperProps);

      // 渲染WrappedComponent
      return <WrappedComponent {...actualChildProps}></WrappedComponent>
    }
    return ConnectFunction;
  }
}




export { Provider, connect }