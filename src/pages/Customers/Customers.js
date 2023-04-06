import searchIcon from 'assets/search.svg'
import user from 'data/USER_INFO.json'

import CustomersTable from 'components/CustomersTable/CustomersTable'

const Customers = () => {
  return (
    <article className='customers'>
      <h3 className='customers__title'>Hello {user.name} 👋🏼,</h3>
      <section className='customers__table_wrapper'>
        <div className='customers__table_info'>
          <div className='customers__table_title'>
            <h4>All Customers</h4>
            <span>Active Members</span>
          </div>
          <label htmlFor='tableSearch'>
            <img src={searchIcon} alt='search icon' />
            <input type='text' id='tableSearch' placeholder='Search' />
          </label>
        </div>
        <CustomersTable />
      </section>
    </article>
  )
}

export default Customers
