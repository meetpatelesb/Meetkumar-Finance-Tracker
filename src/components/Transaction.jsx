import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Table from "../pages/transaction/compomnents/Table";
import { Dropdown } from "../components/Dropdown";
import { groupArr } from "../utils/constant";

const Transaction = () => {
  const navigate = useNavigate();
  const retrivedata = JSON.parse(localStorage.getItem("transactionForm"));
  const [groupby, setGroupby] = useState({});

  const groupBy = (e) => {
    let field = e.target.value;
    console.log("filed", field);

    const gData = [...retrivedata];

    let groupData = {};
    if (field === "none") {
      setGroupby(groupData);
    } else {
      gData.forEach((items) => {
        console.log("value");
        console.log(items[field]?.value);
        const item = items[field]?.value;
        groupData[item] = groupData[item] ?? [];
        groupData[item].push(items);
        setGroupby(groupData);
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("logindata");
    navigate("/public/login");
  };

  return (
    <>
      <div className="details">
        <>
          <label>Group By:</label>
          <select
            className="groupby"
            onChange={(e) => {
              groupBy(e);
            }}
          >
            <Dropdown for={groupArr} />
          </select>
        </>

        <Table records={retrivedata} />

        <button className="createBtn">
          <Link to={"/create"}>Create Transaction</Link>
        </button>

        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
        <div className="groupDetails">
          {Object.keys(groupby).map((d, index) => {
            if (d !== undefined) {
              return (
                <>
                  <h2>{d}</h2>
                  <Table records={groupby[d]} />
                </>
              );
            } else {
              <></>;
            }
          })}
        </div>
      </div>
    </>
  );
};
export default Transaction;
