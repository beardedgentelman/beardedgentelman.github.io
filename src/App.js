import Customers from 'pages/Customers/Customers'

import Main from 'components/containers/Main/Main'
import SidePanel from 'components/containers/SidePanel/SidePanel'

import logo from './assets/logo-icon.svg'

import './App.scss'

function App() {
  return (
    <div className='App'>
      <SidePanel logo={logo} />
      <Main>
        <Customers />
      </Main>
    </div>
  )
}

export default App
