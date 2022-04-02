import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 注意这里，sagaMiddleware作为中间件放入Redux后
// 还需要手动启动他来运行rootSaga
sagaMiddleware.run(rootSaga);

export default store;