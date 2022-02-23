import React, { useState, useEffect, isValidElement } from "react";
import axios from "axios";
import Pagination from "react-bootstrap-4-pagination";

function Main() {
  const [stateAPI, setStateAPI] = useState({});
  const [distAPI, setDistAPI] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [centerSlotData, setCenterSlotData] = useState({});
  const [districtVal, setDistrictVal] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [date2Data, setDate2Data] = useState([]);
  const [date3Data, setDate3Data] = useState([]);
  let flag1 = false;
  const [flagSt, setFlagSt] = useState(false);
  let capacity = "";
  //const [startDate, setstartDate] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [dumyArrState, setDumyArrState] = useState([]);
  const monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      var someDate = new Date();
      var numberOfDaysToAdd = i;
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
      // console.log(someDate);
      setDumyArrState((prev) => [...prev, someDate]);
      var month = monthNames[someDate.getMonth()];
      var day = String(someDate.getDate()).padStart(2, "0");
      var year = someDate.getFullYear();
      const output = day + "-" + month + "-" + year;
      // console.log(output)
      // setDateArr([...dateArr,output])
      setDateArr((prev) => [...prev, output]);
    }
  }, []);
  console.log(dateArr);
  useEffect(() => {
    axios.get(`http://api.ngminds.com/states.json`).then((res) => {
      console.log(res);
      setStateAPI(res.data);
      setIsLoading(true);
    });
  }, []);
  console.log(stateAPI.states);

  const changeTab = (e) => {
    console.log(e.target.id);
    if (e.target.id == "find_by_pin_anchor") {
      document.getElementById("find_by_dist").style.display = "none";
      document.getElementById("find_by_pin").style.display = "";
    } else if (e.target.id == "find_by_dist_anchor") {
      document.getElementById("find_by_dist").style.display = "";
      document.getElementById("find_by_pin").style.display = "none";
    }
  };

  const handleClick = (e) => {
    //alert(e.target.value);
    axios.get(`http://api.ngminds.com/${e.target.value}.json`).then((res) => {
      console.log(res.data);
      setDistAPI(res.data);
    });
  };
  useEffect(() => {
    // setIsLoading(true);
  });
  console.log(distAPI);

  const setSlotByDistrict = () => {
    console.log(districtVal);
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtVal}&date=${dateArr[0]}`
      )
      .then((res) => {
        console.log(res.data);
        setCenterSlotData(res.data);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtVal}&date=${dateArr[1]}`
      )
      .then((res) => {
        console.log(res.data);
        setDate2Data(res.data);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtVal}&date=${dateArr[2]}`
      )
      .then((res) => {
        console.log(res.data);
        setDate3Data(res.data);
      });
  };
  const handlePinCode = () => {
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${dateArr[0]}`
      )
      .then((res) => {
        console.log(res.data);
        setCenterSlotData(res.data);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${dateArr[1]}`
      )
      .then((res) => {
        console.log(res.data);
        setDate2Data(res.data);
      });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${dateArr[2]}`
      )
      .then((res) => {
        console.log(res.data);
        setDate3Data(res.data);
      });
  };
  useEffect(() => {
    console.log(pinCode);
    console.log(dateArr[2]);
    if (districtVal != "") {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtVal}&date=${dateArr[0]}`
        )
        .then((res) => {
          console.log(res.data);
          setCenterSlotData(res.data);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtVal}&date=${dateArr[1]}`
        )
        .then((res) => {
          console.log(res.data);
          setDate2Data(res.data);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtVal}&date=${dateArr[2]}`
        )
        .then((res) => {
          console.log(res.data);
          setDate3Data(res.data);
        });
    } else if (pinCode != "") {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${dateArr[0]}`
        )
        .then((res) => {
          console.log(res.data);
          setCenterSlotData(res.data);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${dateArr[1]}`
        )
        .then((res) => {
          // console.log(res.data);
          setDate2Data(res.data);
        });
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${dateArr[2]}`
        )
        .then((res) => {
          //console.log(res.data);
          setDate3Data(res.data);
        });
    }
  }, [dateArr]);

  console.log(centerSlotData);

  let flag = false;

  const prevBtnhandler = () => {
    //console.log(dumyArrState[0])
    let temp = [...dateArr];
    var result = dumyArrState[0].setDate(dumyArrState[0].getDate() - 1);
    console.log(dumyArrState[0]);
    var month = monthNames[dumyArrState[0].getMonth()];
    var day = String(dumyArrState[0].getDate()).padStart(2, "0");
    var year = dumyArrState[0].getFullYear();
    const output = day + "-" + month + "-" + year;

    temp.splice(2, 1);
    temp.unshift(output);

    setDateArr(temp);
  };

  const NextBtnhandler = () => {
    let temp = [...dateArr];
    var result = dumyArrState[2].setDate(dumyArrState[2].getDate() + 1);
    var month = monthNames[dumyArrState[2].getMonth()];
    var day = String(dumyArrState[2].getDate()).padStart(2, "0");
    var year = dumyArrState[2].getFullYear();
    const output = day + "-" + month + "-" + year;
    temp.splice(0, 1);
    temp.push(output);
    setDateArr(temp);
  };
  console.log(centerSlotData);
  return (
    <div>
      {isLoading && (
        <body>
          <div className="container my-5">
            <h3 className="text-center mb-5">
              Search Your Nearest Vaccination Center
            </h3>
            <div className="w-50 mx-auto">
              <div class="mt-4 mb-5">
                <ul className="nav nav-pills justify-content-center">
                  <li className="nav-item">
                    <button
                      id="find_by_dist_anchor"
                      className="nav-link active"
                      aria-current="page"
                      href="javascript:;"
                      onClick={changeTab}
                    >
                      Find by District
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      id="find_by_pin_anchor"
                      className="nav-link"
                      href="javascript:;"
                      onClick={changeTab}
                    >
                      Find by PIN
                    </button>
                  </li>
                </ul>
              </div>
              <div className="row" id="find_by_dist">
                <div className="col">
                  <div className="form-group">
                    <select
                      name=""
                      id="stateId"
                      className="form-control"
                      onClick={handleClick}
                      style={{ display: "" }}
                    >
                      <option value="">Select State</option>
                      {stateAPI &&
                        stateAPI.states.map((index) => {
                          return (
                            <option value={index.state_id}>
                              {index.state_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <select
                      name=""
                      id="distId"
                      className="form-control"
                      style={{ display: "" }}
                      onClick={(e) => setDistrictVal(e.target.value)}
                    >
                      <option value="">Select District</option>
                      {distAPI.districts &&
                        distAPI.districts.map((index) => {
                          return (
                            <option value={index.district_id}>
                              {index.district_name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div className="col-auto">
                  <button className="btn btn-info" onClick={setSlotByDistrict}>
                    Search
                  </button>
                </div>
              </div>
              <div style={{ display: "none" }} id="find_by_pin">
                <div className="col">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter your PIN"
                      className="form-control"
                      id="pincode"
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-auto">
                  <button className="btn btn-info" onClick={handlePinCode}>
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-5">
                <h6>Slot Search Results (81 Center(s) Found)</h6>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-3 text-end pt-2">
                    <button
                      href="javascript:;"
                      className="text-decoration-none text-secondary"
                      style={{ border: "none" }}
                      onClick={prevBtnhandler}
                    >
                      <h2>&#x3008;</h2>
                    </button>
                  </div>

                  {dateArr.map((val, index) => {
                    return (
                      <div className="col">
                        <div className="card my-2">
                          <div className="card-body py-1 my-1">
                            <strong>
                              <small>{val}</small>
                            </strong>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="col-auto pt-2">
                    <button
                      className="text-decoration-none text-secondary"
                      style={{ border: "none" }}
                      onClick={NextBtnhandler}
                    >
                      <h2>&#12297;</h2>
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {centerSlotData.sessions &&
                  centerSlotData.sessions.map((index) => {
                    flag1 = false;
                    capacity = 0;
                    return (
                      <div className="row py-3 border-bottom">
                        <div className="col-3">
                          <div className="text-primary">{index.name}</div>
                          <div className="text-muted">
                            <small>{index.address}</small>
                          </div>
                          <div>
                            <span className="me-1">{index.vaccine}</span>

                            {index.fee_type == "Free" ? (
                              <span className="badge bg-success">Free</span>
                            ) : (
                              <>
                                <span className="badge bg-warning">paid</span>
                                <span>Fee:{index.fee}</span>
                              </>
                            )}
                          </div>
                          <small className="d-block">
                            <span className="text-primary me-3">
                              Age: {index.min_age_limit} & Above
                            </span>
                            <span>Dose: #1</span>
                          </small>
                        </div>
                        <div className="col">
                          <div className="card h-100">
                            <div className="card-body d-table">
                              <div className="d-table-cell h-100 align-middle text-center">
                                {index.available_capacity == 0 ? (
                                  <strong className="text-danger">
                                    Booked
                                  </strong>
                                ) : (
                                  <>
                                    {index.available_capacity > 10 ? (
                                      <strong className="text-success">
                                        {index.available_capacity} Slots
                                      </strong>
                                    ) : (
                                      <strong className="text-warning">
                                        {index.available_capacity} Slots
                                      </strong>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card h-100">
                            <div className="card-body d-table">
                              <div className="d-table-cell h-100 align-middle text-center">
                                {date2Data.sessions &&
                                  date2Data.sessions.map((index2) => {
                                    if (
                                      index2.center_id === index.center_id &&
                                      index2.vaccine == index.vaccine
                                    ) {
                                      flag1 = true;
                                      capacity = index2.available_capacity;
                                    }
                                  })}
                                {flag1 === true ? (
                                  capacity == 0 ? (
                                    <>
                                      <strong className="text-danger">
                                        Booked
                                      </strong>
                                    </>
                                  ) : (
                                    <>
                                      {capacity > 10 ? (
                                        <>
                                          <strong className="text-success">
                                            {capacity} Slots
                                          </strong>
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <strong className="text-warning">
                                            {capacity} Slots
                                          </strong>
                                        </>
                                      )}
                                    </>
                                  )
                                ) : (
                                  <strong className="text-muted">N/A</strong>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card h-100">
                            <div className="card-body d-table">
                              <div className="d-table-cell h-100 align-middle text-center">
                                {date3Data.sessions &&
                                  date3Data.sessions.map((index3) => {
                                    if (
                                      index3.center_id === index.center_id &&
                                      index3.vaccine == index.vaccine
                                    ) {
                                      flag1 = true;
                                      capacity = index3.available_capacity;
                                    }
                                  })}
                                {flag1 === true ? (
                                  capacity == 0 ? (
                                    <>
                                      <strong className="text-danger">
                                        Booked
                                      </strong>
                                    </>
                                  ) : (
                                    <>
                                      {capacity > 10 ? (
                                        <>
                                          <strong className="text-success">
                                            {capacity} Slots
                                          </strong>
                                        </>
                                      ) : (
                                        <>
                                          {" "}
                                          <strong className="text-warning">
                                            {capacity} Slots
                                          </strong>
                                        </>
                                      )}
                                    </>
                                  )
                                ) : (
                                  <strong className="text-muted">N/A</strong>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </body>
      )}
    </div>
  );
}

export default Main;
