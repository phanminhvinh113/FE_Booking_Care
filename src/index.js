import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from './hoc/IntlProviderWrapper';
import GlobalStyles from './components/GlobalStyle';
import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';
import ScrollToTop from './components/ScrollToTop';

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <IntlProviderWrapper>
                <GlobalStyles>
                    <App persistor={persistor} />
                </GlobalStyles>
            </IntlProviderWrapper>
        </Provider>,
        document.getElementById('root'),
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//serviceWorker.checkValidServiceWorker();
