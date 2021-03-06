import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/styles.scss";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    }) // attachAuthIsReady a property for firebaseAuthIsReady
  )
);

store.firebaseAuthIsReady.then(() => {
  // when firebaseAuthIsReady render app
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // for material-ui typography warning
