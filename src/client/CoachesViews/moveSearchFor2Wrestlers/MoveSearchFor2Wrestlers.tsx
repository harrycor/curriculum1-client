import React from "react";
import Select from "react-select";
import Moment from "react-moment";
import classNames from "classnames";
// import DropDownForMovesAndWrestlers from "../DropDownForMovesAndWrestlers";

function MoveSearchFor2Wrestlers(props: any) {
  ///DROPDOWN START 1/3
  let [displayDropDown, setDisplayDropDown] = React.useState(false);
  let [dropDownInputValue, setDropDownInputValue] = React.useState("");
  let wrapperRef = React.useRef(null); //this closes autocomplete list when mouse clicks off of it
  ///DROP END
  let [searchedMoveId, setSearchedMoveId] = React.useState();
  const [allGrades, setAllGrades] = React.useState([]);
  const [wrestler1NewGrade, setWrestler1NewGrade] = React.useState();
  const [wrestler2NewGrade, setWrestler2NewGrade] = React.useState();
  const [wrestler1NewNote, setWrestler1NewNote] = React.useState();
  const [wrestler2NewNote, setWrestler2NewNote] = React.useState();
  const [allMoves, setAllMoves] = React.useState([]);
  const [searchedMoveObject, setSearchedMoveObject] = React.useState<any>({});
  const [uselessState4, setUselessState4] = React.useState(0);
  const [uselessState4_1, setUselessState4_1] = React.useState(0);

  let incrementUselessState4 = () => {
    setUselessState4(uselessState4 + 1);
  };

  // Upon further examination I see that we probably don't need to us theTrick for the state to be updated.
  // There is only one object for each wrestler so I dont see how the state could linger here?

  let token = localStorage.getItem("token");
  let UID = localStorage.getItem("UID");

  // let onMoveChange = (event: any) => {
  //   let whereToSliceFrom = event.target.value.lastIndexOf("-+-") + 3;
  //   let moveIdAfterSlice = event.target.value.slice(
  //     whereToSliceFrom,
  //     event.target.value.length
  //   );

  //   setSearchedMoveId(moveIdAfterSlice);
  // };
  //DROPDOWN START 2/3
  React.useEffect(() => {
    for (let x = 0; x < allMoves.length; x++) {
      if (allMoves[x].id === Number(searchedMoveId)) {
        setSearchedMoveObject(allMoves[x]);
      }
    }
  }, [searchedMoveId]);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickedOutsideDropdown);

    return () => {
      document.removeEventListener("mousedown", handleClickedOutsideDropdown);
    };
  }, []);

  let handleClickedOutsideDropdown = (e: any) => {
    let { current: wrap }: any = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplayDropDown(false);
    }
  };
  //DROPDOWN END

  React.useEffect(() => {
    if (uselessState4 > 0) {
      console.log("**");
      fetch(
        `/api/grades/allGradesForTwoWrestlers/${props.wrestler1Id}/${props.wrestler2Id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((results) => {
          console.log("hey");
          setAllGrades(results);
          setUselessState4_1(uselessState4_1 + 1);
        });
    }
  }, [uselessState4]);

  React.useEffect(() => {
    if (props.wrestler1Id) {
      try {
        //this fetches all of the moves, not all of the grades. Terrible variable naming...
        fetch(
          `/api/grades/allCurrentGradesForASingleWrestler/${props.wrestler1Id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((res) => res.json())
          .then((results) => {
            setAllMoves(results);
          });
      } catch (error) {
        console.log("something is not working here");
      }
    }
  }, [props.wrestler1Id, props.wrestler2Id]);

  React.useEffect(() => {
    if (props.wrestler1Id) {
      console.log("running");
      try {
        fetch(
          `/api/grades/allGradesForTwoWrestlers/${props.wrestler1Id}/${props.wrestler2Id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          .then((res) => res.json())
          .then((results) => {
            setAllGrades(results);
          });
      } catch (error) {
        console.log("something is not working here");
      }
    }
  }, [searchedMoveId]);

  React.useEffect(() => {
    for (let x = 0; x < allGrades.length; x++) {
      if (allGrades[x].id === Number(searchedMoveId)) {
        setSearchedMoveObject(allGrades[x]);
      }
    }
  }, [searchedMoveId, uselessState4_1]);

  const onWrestler1GradeChange = (event: any) => {
    setWrestler1NewGrade(event.target.value);
  };
  const onWrestler1NoteChange = (event: any) => {
    setWrestler1NewNote(event.target.value);
  };
  const onWrestler2GradeChange = (event: any) => {
    setWrestler2NewGrade(event.target.value);
  };
  const onWrestler2NoteChange = (event: any) => {
    setWrestler2NewNote(event.target.value);
  };

  let submitGrade = (
    video_id: number,
    user_id: number,
    grade: number,
    note: string,
    max_grade: number
  ) => {
    if (grade > max_grade) {
      console.log("whoops");
      alert(
        "GRADE NOT SUBMITTED! You cannot submit a grade higher than the maximum grade"
      );
    } else if (grade < 0) {
      alert(
        "GRADE NOT SUBMITTED! You cannot submit a grade of a negative number"
      );
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          video_id: video_id,
          coach_user_id: UID,
          student_user_id: user_id,
          grade: grade,
          movement_notes: note,
        }),
      };
      fetch(`/api/grades/`, requestOptions).then((res) => {
        if (res.ok) {
          alert(
            `A grade of ${grade} was entered for wrestler with user ID: ${user_id}`
          );
          props.incrementUselessStateFunction();
          incrementUselessState4();
        } else {
          alert("it didn't work!");
        }
      });
    }
  };

  return (
    <>
      {/* ///DROPDOWN START 3/3*/}
      <div className="d-flex flex wrap justify-content-start col-11 p-0">
        <div
          style={{ width: "400px" }}
          className="d-flex flex-wrap justify-content-start align-items-center col-11 p-0"
        >
          <label className="h4 p-0 text-center">Search by move:</label>

          <Select
            options={allMoves}
            getOptionLabel={(option: any) => option.name_of_video}
            getOptionValue={(option: any) => option.name_of_video}
            onChange={(event: any) => {
              console.log({ event });
              setSearchedMoveId(event.id);
            }}
          />
        </div>
      </div>

      <div className="divForLevel" key={`${allGrades}`}>
        <div key={searchedMoveObject.id}>
          <div className="mt-5">
            <div className="" style={{ width: "100vw" }}>
              <h4 className="text text-center">
                {searchedMoveObject.number_for_ordering}.{" "}
                {searchedMoveObject.name_of_video}
              </h4>
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div className="m-2">
                <a href={searchedMoveObject.url_to_video} target="_blank">
                  <h6>Link to Detailed Video</h6>
                </a>
              </div>
              <div className="m-2">
                <a
                  href={searchedMoveObject.url_to_looped_video}
                  target="_blank"
                >
                  <h6>Link to Looped Video</h6>
                </a>
              </div>
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <div
                className={`${classNames({
                  gradeOf3: searchedMoveObject.wrestler_1_grade === 3,
                  gradeOf2: searchedMoveObject.wrestler_1_grade === 2,
                  gradeOf1: searchedMoveObject.wrestler_1_grade === 1,
                  gradeOfIncorrect:
                    searchedMoveObject.wrestler_1_grade > 3 ||
                    searchedMoveObject.wrestler_1_grade < 0,
                  notGradeable: searchedMoveObject.maximum_grade === 0,
                })} my-1 p-2`}
                style={{ border: "solid black 1px" }}
              >
                <h6 className="text text-center">
                  {searchedMoveObject.wrestler_1_first_name}{" "}
                  {searchedMoveObject.wrestler_1_last_name}
                </h6>
                <p>Current grade: {searchedMoveObject.wrestler_1_grade}</p>
                <p>
                  Current notes: {searchedMoveObject.wrestler_1_movement_notes}
                </p>
                <p>
                  Last graded:{" "}
                  <Moment fromNow>
                    {searchedMoveObject.wrestler_1_grade_creation_date}
                  </Moment>
                </p>
                <p>
                  By coach with ID of:{" "}
                  {searchedMoveObject.wrestler_1_grade_graded_by}{" "}
                </p>

                <label>New grade: </label>
                <input
                  type="number"
                  onChange={onWrestler1GradeChange}
                  placeholder="0, 1, 2, or 3"
                />
                <div className="" style={{ width: "50%" }}></div>
                <label>Notes: </label>
                <textarea
                  rows={5}
                  cols={30}
                  onChange={onWrestler1NoteChange}
                ></textarea>
                <div className="" style={{ width: "50%" }}></div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    submitGrade(
                      searchedMoveObject.id,
                      props.wrestler1Id,
                      wrestler1NewGrade,
                      wrestler1NewNote,
                      searchedMoveObject.maximum_grade
                    );
                  }}
                >
                  Update grade and notes for{" "}
                  {searchedMoveObject.wrestler_1_first_name}{" "}
                  {searchedMoveObject.wrestler_1_last_name}
                </button>
              </div>
              <div
                className={`${classNames({
                  gradeOf3: searchedMoveObject.wrestler_2_grade === 3,
                  gradeOf2: searchedMoveObject.wrestler_2_grade === 2,
                  gradeOf1: searchedMoveObject.wrestler_2_grade === 1,
                  gradeOfIncorrect:
                    searchedMoveObject.wrestler_2_grade > 3 ||
                    searchedMoveObject.wrestler_2_grade < 0,
                  notGradeable: searchedMoveObject.maximum_grade === 0,
                })} my-1 p-2`}
                style={{ border: "solid black 1px" }}
              >
                <h6 className="text text-center">
                  {searchedMoveObject.wrestler_2_first_name}{" "}
                  {searchedMoveObject.wrestler_2_last_name}
                </h6>
                <p>Current grade: {searchedMoveObject.wrestler_2_grade}</p>
                <p>
                  Current notes: {searchedMoveObject.wrestler_2_movement_notes}
                </p>
                <p>
                  Last graded:{" "}
                  <Moment fromNow>
                    {searchedMoveObject.wrestler_2_grade_creation_date}
                  </Moment>
                </p>
                <p>
                  By coach with ID of:{" "}
                  {searchedMoveObject.wrestler_2_grade_graded_by}{" "}
                </p>

                <label>New grade: </label>
                <input
                  type="number"
                  onChange={onWrestler2GradeChange}
                  placeholder="0, 1, 2, or 3"
                />
                <div className="" style={{ width: "50%" }}></div>
                <label>Notes: </label>
                <textarea
                  rows={5}
                  cols={30}
                  onChange={onWrestler2NoteChange}
                ></textarea>
                <div className="" style={{ width: "50%" }}></div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    submitGrade(
                      searchedMoveObject.id,
                      props.wrestler2Id,
                      wrestler2NewGrade,
                      wrestler2NewNote,
                      searchedMoveObject.maximum_grade
                    );
                  }}
                >
                  Update grade and notes for{" "}
                  {searchedMoveObject.wrestler_2_first_name}{" "}
                  {searchedMoveObject.wrestler_2_last_name}
                </button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}

export default MoveSearchFor2Wrestlers;
