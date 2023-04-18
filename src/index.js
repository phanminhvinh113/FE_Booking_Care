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
