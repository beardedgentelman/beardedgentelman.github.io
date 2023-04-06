import { createContext, memo, useState } from 'react'
import { Menu, Sidebar, useProSidebar } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import user from 'data/USER_INFO'
import { Squash as Hamburger } from 'hamburger-react'
import useWindowSize from 'hooks/useWindowSize'

import CustomMenuItem from 'components/ui/CustomMenuItem/CustomMenuItem'
import IconSlideBar from 'components/ui/IconSlideBar/IconSlideBar'
import UserSideBar from 'components/ui/UserSideBar/UserSideBar'

import './side-panel.scss'

export const ActiveItemContext = createContext()

function SidePanel(props) {
  const [hoverItem, setHoverItem] = useState(null)
  const { collapseSidebar, collapsed } = useProSidebar()
  const [windowWidth] = useWindowSize()

  const windowLg = windowWidth <= 1280
  const windowXs = windowWidth <= 480

  const btnStyleOptions = {
    button: ({ level, active }) => {
      if (level === 0)
        return {
          padding: '11px 8px',
          height: 'auto',
          borderRadius: '8px',
          color: active ? '#ffffff' : '#9197B3',
          backgroundColor: active ? '#5932EA' : undefined,
          marginTop: '17px',
          marginBottom: '0',
          transition: 'all .3s',
          '&:hover': {
            color: '#ffffff',
            backgroundColor: '#9197B3'
          },
          '& span:first-of-type': {
            width: windowLg ? (collapsed ? '100%' : '35px') : '35px',
            marginInline: windowLg ? (collapsed ? '0' : '10px') : '10px'
          },
          '& span:last-child': {
            display: windowLg ? (collapsed ? 'none' : 'inline') : 'inline'
          }
        }
    }
  }

  const burgerClick = e => {
    e.preventDefault()
    collapseSidebar()
  }

  return (
    <ActiveItemContext.Provider value={hoverItem}>
      <Sidebar
        className='side_bar'
        backgroundColor='#ffffff'
        width={windowLg && !collapsed ? '100%' : '360px'}
        collapsedWidth={windowXs ? '80px' : '100px'}
        defaultCollapsed={windowLg ? true : false}
      >
        <Link
          to='#'
          onClick={windowLg && burgerClick}
          className='side_bar__logo'
          style={{ justifyContent: windowLg && collapsed ? 'center' : 'flex-start' }}
        >
          <div style={{ display: !windowLg && 'none' }}>
            <Hamburger />
          </div>
          <div className='side_bar__logo_img' style={{ display: windowLg && collapsed ? 'none' : 'block' }}>
            <img src={props.logo} alt='Logo' />
          </div>
          <span style={{ display: windowLg && collapsed ? 'none' : 'block' }}>
            Dashboard
            <span>v.01</span>
          </span>
        </Link>
        <Menu className='side_bar__menu' menuItemStyles={btnStyleOptions}>
          <CustomMenuItem
            icon={<IconSlideBar name='dashboard' />}
            onMouseEnter={() => setHoverItem('dashboard')}
            onMouseLeave={() => setHoverItem(null)}
          >
            Dashboard
          </CustomMenuItem>
          <CustomMenuItem
            icon={<IconSlideBar name='product' />}
            onMouseEnter={() => setHoverItem('product')}
            onMouseLeave={() => setHoverItem(null)}
          >
            Product
          </CustomMenuItem>
          <CustomMenuItem
            icon={<IconSlideBar name='customers' active />}
            active
            onMouseEnter={() => setHoverItem('customers')}
            onMouseLeave={() => setHoverItem(null)}
          >
            Customers
          </CustomMenuItem>
          <CustomMenuItem
            icon={<IconSlideBar name='income' />}
            onMouseEnter={() => setHoverItem('income')}
            onMouseLeave={() => setHoverItem(null)}
          >
            Income
          </CustomMenuItem>
          <CustomMenuItem
            icon={<IconSlideBar name='promote' />}
            onMouseEnter={() => setHoverItem('promote')}
            onMouseLeave={() => setHoverItem(null)}
          >
            Promote
          </CustomMenuItem>
          <CustomMenuItem
            icon={<IconSlideBar name='help' />}
            onMouseEnter={() => setHoverItem('help')}
            onMouseLeave={() => setHoverItem(null)}
          >
            Help
          </CustomMenuItem>
        </Menu>
        <UserSideBar picture={user.picture} name={user.name} position={user.position} collapsed={collapsed} />
      </Sidebar>
    </ActiveItemContext.Provider>
  )
}

export default memo(SidePanel)
