import React from 'react'
import { useTable } from 'react-table'

export default function ReactTable({ columns, data, tblClassName, hasView = false, handleAnotherView,
  hasEditInAnotherView = false, hasEdit = false, handleEdit, hasDelete = false, handleDel }) {
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})
  return (
    <table {...getTableProps()} className={tblClassName}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                if(cell.column.Header === 'Action')
                  return(
                    <td {...cell.getCellProps()}>
                      <div className="flex-display-noWrap btn-action-admin">
                        {
                          hasView &&
                          <button className="btn-b btn btn-round" onClick={() => handleAnotherView('view', row.original.id)}>
                            <i className="fa fa-eye"></i>
                          </button>
                        }
                        {
                          hasEdit &&
                          <button className="btn-b btn btn-round" onClick={() => handleEdit(row.original)}>
                            <i className="fa fa-edit"></i>
                          </button>
                        }
                        {
                          hasEditInAnotherView &&
                          <button className="btn-b btn btn-round" onClick={() => handleAnotherView('edit', row.original.id)}>
                            <i className="fa fa-edit"></i>
                          </button>
                        }
                        {
                          hasDelete &&
                          <button className="btn-danger btn btn-round" onClick={() => handleDel(row.original.id)}>
                            <i className="fa fa-times"></i>
                          </button>
                        }
                      </div>
                    </td>
                  )
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
