import dva from 'dva';
import createLoading from 'dva-loading';
// import logger from 'redux-logger';
import "./index.less";
// // 1. Initialize
const app = dva(
    // process.env.NODE_ENV === "development" ? {
    //    onAction: logger,
    // } : {}
);

// 2. Plugins
app.use(createLoading());

// 3. Register global model
// app.model();

// 4. Router
app.router(require('./router.js').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
