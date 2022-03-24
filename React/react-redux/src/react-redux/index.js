
import ReactReduxContext from './Context';

function Provider(props) {
  const { store, children } = props;

  const contextValue = { store };

  return (
    <ReactReduxContext.Provider value={contextValue}>
      { children }
    </ReactReduxContext.Provider>
  )
}


export { Provider }