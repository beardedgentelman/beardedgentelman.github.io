import { memo, useCallback } from 'react'
import { MenuItem } from 'react-pro-sidebar'

const CustomMenuItem = props => {
  const { icon, active, children, onMouseEnter, onMouseLeave } = props

  const handleMouseEnter = useCallback(() => {
    onMouseEnter()
  }, [onMouseEnter])

  const handleMouseLeave = useCallback(() => {
    onMouseLeave()
  }, [onMouseLeave])

  return (
    <MenuItem icon={icon} active={active} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </MenuItem>
  )
}

export default memo(CustomMenuItem)
