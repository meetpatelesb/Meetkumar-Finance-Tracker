import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatter } from "../../../utils/helper";
import { MonthArr } from "../../../utils/constant";

const Table = (props) => {
  let records = props.records;

  let [sortedData, setSortedData] = useState(records);
  const [sortedField, setSortedField] = useState({});

  const sorting = (key) => {
    setCurrentPage(1);
    let direction = "ascending";

    if (sortedField.key === key && sortedField.direction === "ascending") {
      direction = "descending";
    } else if (
      sortedField.key === key &&
      sortedField.direction === "descending"
    ) {
      direction = "normal";
    }
    setSortedField({ key, direction });
    console.log(key, "keyyy2", direction);
  };

  useEffect(() => {
    if (sortedField.direction === "normal") {
      setSortedData(sortedData);
    } else if (sortedField.key === "transactionAmount") {
      let newData = [...sortedData];
      if (sortedField.direction === "ascending") {
        newData.sort((a, b) => {
          return a[sortedField?.key]?.value - b[sortedField?.key]?.value;
        });
      } else if (sortedField.direction === "descending") {
        newData.sort((a, b) => {
          return b[sortedField?.key]?.value - a[sortedField?.key]?.value;
        });
      }
      setSortedData(newData);
    } else if (sortedField.key === "transactionDate") {
      let newData = [...sortedData];
      if (sortedField.direction === "ascending") {
        newData.sort((a, b) => {
          return (
            new Date(a[sortedField?.key]?.value) -
            new Date(b[sortedField?.key]?.value)
          );
        });
      } else if (sortedField.direction === "descending") {
        newData.sort((a, b) => {
          return (
            new Date(b[sortedField?.key]?.value) -
            new Date(a[sortedField?.key]?.value)
          );
        });
      }
      setSortedData(newData);
    } else if (sortedField.key === "monthYear") {
      let newData = [...sortedData];
      if (sortedField.direction === "ascending") {
        newData.sort((a, b) => {
          return (
            MonthArr.indexOf(a[sortedField?.key]?.value) -
            MonthArr.indexOf(b[sortedField?.key]?.value)
          );
        });
      } else if (sortedField.direction === "descending") {
        newData.sort((a, b) => {
          return (
            MonthArr.indexOf(b[sortedField?.key]?.value) -
            MonthArr.indexOf(a[sortedField?.key]?.value)
          );
        });
      }
      setSortedData(newData);
    } else {
      let newData = [...sortedData];

      newData.sort((a, b) => {
        if (
          a[sortedField?.key]?.value?.toLowerCase() <
          b[sortedField?.key]?.value?.toLowerCase()
        ) {
          return sortedField.direction === "ascending" ? -1 : 1;
        }

        if (
          a[sortedField?.key]?.value?.toLowerCase() >
          b[sortedField?.key]?.value?.toLowerCase()
        ) {
          return sortedField.direction === "ascending" ? 1 : -1;
        }
        setSortedData(newData);
        return 0;
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedField]);

  // searching.....

  const search = (e) => {
    console.log(e.target.value);
    console.log(records);

    // let removeRecords = [...records];
    // delete index.receipt
    if (e.target.value === "") {
      setSortedData(records);
    } else {
      let searchData = records.filter(
        (index) =>
          index.fromAccount.value.toLowerCase().includes(e.target.value) ||
          index.monthYear.value.toLowerCase().includes(e.target.value) ||
          index.notes.value.toLowerCase().includes(e.target.value) ||
          index.toAccount.value.toLowerCase().includes(e.target.value) ||
          index.transactionDate.value.toLowerCase().includes(e.target.value) ||
          index.transactionType.value.toLowerCase().includes(e.target.value) ||
          index.transactionAmount.value.toLowerCase().includes(e.target.value)
        // console.log(index.id,index.receipt)

        // console.log(index['id'])
      );
      // for (let field in index) {
      //   console.log(index[field]);
      //   console.log(index[field].value);
      //   if (index[field] !== "receipt"){
      //   if(index[field].value !== undefined){

      //     index[field].value.toLowerCase().includes(e.target.value);
      //   }
      // }
      // }
      console.log(searchData);
      setSortedData(searchData);
    }
  };

  // pagination.........

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  let pagiData = [...sortedData];
  const paginationData = pagiData.slice(firstPostIndex, lastPostIndex);

  let totalPosts = pagiData.length;
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }
  let nThPage = pages.length;

  return (
    <>
      <input
        type="text"
        onChange={search}
        placeholder="Search here"
        className="search"
      ></input>

      <table>
        <thead>
          <th
            onClick={() => {
              sorting("transactionDate");
            }}
          >
            Transaction Date
          </th>
          <th
            onClick={() => {
              sorting("monthYear");
            }}
          >
            Month Year
          </th>
          <th
            onClick={() => {
              sorting("transactionType");
            }}
          >
            Transaction Type
          </th>
          <th
            onClick={() => {
              sorting("fromAccount");
            }}
          >
            From Account
          </th>
          <th
            onClick={() => {
              sorting("toAccount");
            }}
          >
            To Account
          </th>
          <th
            onClick={() => {
              sorting("transactionAmount");
            }}
          >
            Amount
          </th>
          <th>Receipt</th>
          <th
            onClick={() => {
              sorting("notes");
            }}
          >
            Notes
          </th>
          <th>Edit</th>
          <th>Action</th>
        </thead>
        <tbody>
          {paginationData &&
            paginationData.map((transaction, count) => (
              <tr>
                <td>{transaction.transactionDate.value}</td>
                <td>{transaction.monthYear.value}</td>
                <td>{transaction.transactionType.value}</td>
                <td>{transaction.fromAccount.value}</td>
                <td>{transaction.toAccount.value}</td>
                <td>{formatter.format(transaction.transactionAmount.value)}</td>
                <td>
                  <img
                    src={transaction.receipt.value}
                    width={50}
                    height={50}
                    alt=""
                  />
                </td>
                <td>{transaction.notes.value}</td>
                <td>
                  <Link to={`/create/${transaction.id}`}>Edit</Link>
                </td>
                <td>
                  <Link
                    to={`/transaction/${transaction.id}`}
                    className="btn-text"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* <Pagination paginationRecords={sortedData}/> */}

      <div className="pagination">
        <button
          className="page"
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Prev
        </button>

        {pages.map((page, index) => {
          return (
            <button
              key={index}
              className={page === currentPage ? "active" : "page"}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          className="page"
          onClick={() => {
            if (currentPage !== nThPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};
export default Table;