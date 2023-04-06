import { useEffect, useMemo } from 'react'
import { usePagination, useTable } from 'react-table'
import activeIcon from 'assets/active.svg'
import inactiveIcon from 'assets/inactive.svg'
import fakeData from 'data/MOCK_DATA.json'

const CustomersTable = props => {
  const data = useMemo(() => fakeData, [])
  const columns = useMemo(
    () => [
      {
        Header: 'Customer Name',
        accessor: 'name',
        header: 'Customer Name'
      },
      {
        Header: 'Company',
        accessor: 'company',
        header: 'Company'
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number',
        header: 'Phone Number'
      },
      {
        Header: 'Email',
        accessor: 'email',
        header: 'Email'
      },
      {
        Header: 'Country',
        accessor: 'country',
        header: 'Country'
      },
      {
        Header: 'Status',
        accessor: 'status',
        header: 'Status',
        Cell: ({ value }) => (value ? <img src={activeIcon} alt='Active' /> : <img src={inactiveIcon} alt='Inactive' />)
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageOptions,
    setPageSize
  } = useTable({ columns, data }, usePagination)

  useEffect(() => {
    setPageSize(8)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='customers__table_container'>
      <div className='customers__table' {...getTableProps()}>
        <div className='customers__table_head'>
          {headerGroups.map(headerGroup => (
            <div className='customers__table_head_row' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div className='customers__table_head_cell' {...column.getHeaderProps()}>
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='customers__table_body' {...getTableBodyProps({ role: 'rowgroup' })}>
          {page.map(row => {
            prepareRow(row)
            return (
              <div className='customers__table_body_row' {...row.getRowProps({ role: 'row' })}>
                {row.cells.map(cell => (
                  <div
                    className='customers__table_body_cell'
                    {...cell.getCellProps({ 'data-label': cell.column.header })}
                  >
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
      <div className='customers__table_footer'>
        <div className='customers__table_showing_entries'>
          Showing data {pageIndex * page.length + 1} to {Math.min((pageIndex + 1) * page.length, data.length)} of{' '}
          {data.length} entries
        </div>
        <div className='customers__table_showing_pagination'>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>
          {window.innerWidth < 480 ? (
            <>
              {pageIndex > 1 && (
                <>
                  <button onClick={() => gotoPage(0)}>1</button>
                  {pageIndex > 2 && <span>...</span>}
                </>
              )}
              <button onClick={() => gotoPage(pageIndex)} className='active'>
                {pageIndex + 1}
              </button>
              {pageIndex < pageOptions.length - 2 && (
                <>
                  {pageIndex < pageOptions.length - 3 && <span>...</span>}
                  <button onClick={() => gotoPage(pageOptions.length - 1)}>{pageOptions.length}</button>
                </>
              )}
            </>
          ) : (
            <>
              {pageOptions.map((page, index) => {
                if (
                  index === 0 ||
                  index === pageOptions.length - 1 ||
                  (index >= pageIndex - 1 && index <= pageIndex + 1) ||
                  (index === pageIndex - 2 && pageIndex >= 3) ||
                  (index === pageIndex + 2 && pageIndex <= pageOptions.length - 4)
                ) {
                  return (
                    <button key={index} onClick={() => gotoPage(index)} className={pageIndex === index ? 'active' : ''}>
                      {index + 1}
                    </button>
                  )
                } else if (
                  (index === pageIndex - 3 && pageIndex >= 4) ||
                  (index === pageIndex + 3 && pageIndex <= pageOptions.length - 5)
                ) {
                  return <span key={index}>...</span>
                } else {
                  return null
                }
              })}
            </>
          )}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomersTable
