import React from 'react';
import Header from './components/common/Header'
import { Menu, MenuItemsGroup } from './components/common/Menu'
import MainContentPanel from './components/pages/MainContentPanel'
import Footer from './components/common/Footer'
import {BrowserRouter as Router} from 'react-router-dom';

const menuItemsGroups: MenuItemsGroup[] = [
  {
    id: `configuration`,
    name: `Configuration`,
    href: `#`,
    items: [
      {
        id: `dataLogger`,
        name: `DataLogger`,
        href: `/data-logger`
      },
      {
        id: `notifications`,
        name: `Notifications`,
        href: `/notifications`
      }
    ]
  }
];

function App() {
  return (
      <Router>
        <div id="pxc-all">
          <Header
              deviceName={`AXC F 2152`}
              projectName={`PLCnext Datalogger Web App`}
          />
          <div id="pxc-main">
            <div className="cf pxc-grid-2">
              <div className="pxc-r pxc-sl">
                <div className="pxc-r pxc-sr">
                  <div className="cf pxc-bdy">
                    <div className="cf pxc-grid-5">
                      <Menu
                          deviceName={`AXC F 2152`}
                          deviceArticle={`2404267`}
                          menuItemsGroups={menuItemsGroups}
                      />
                    </div>
                    <MainContentPanel/>
                  </div>
                </div>
              </div>
              <div className="pxc-r pxc-bl">
                <div className="pxc-r pxc-br">
                </div>
              </div>
            </div>
            <div className="cf pxc-grid-6">
              <div className="pxc-plt-ctrl">
                <div className="cf pxc-grid-6">
                  <Footer/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;
