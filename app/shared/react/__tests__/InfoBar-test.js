import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { expect} from 'chai';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'shared/redux/store/createStore';
import ApiClient from 'shared/lib/ApiClient';
const client = new ApiClient();

// component
import InfoBar from 'shared/common/components/r_InfoBar';


describe('InfoBar', () => {
  const mockStore = {
    info: {
      load: () => {},
      loaded: true,
      loading: false,
      data: {
        message: 'This came from the api server',
        time: Date.now()
      }
    }
  };
  const store = createStore(browserHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key='provider'>
      <InfoBar/>
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render with correct value', () => {
    const text = dom.getElementsByTagName('strong')[0].textContent;
    expect(text).to.equal(mockStore.info.data.message);
  });

  it('should render with a reload button', () => {
    const text = dom.getElementsByTagName('button')[0].textContent;
    expect(text).to.be.a('string');
  });

  it('should render the correct className', () => {
    const styles = require('components/InfoBar/InfoBar.scss');
    expect(styles.infoBar).to.be.a('string');
    expect(dom.className).to.include(styles.infoBar);
  });
});
