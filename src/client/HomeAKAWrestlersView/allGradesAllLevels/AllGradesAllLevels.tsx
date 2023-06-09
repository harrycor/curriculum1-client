import React from "react";
import Moment from "react-moment";
import classNames from "classnames";
import NavigationBar from "../../NavigationBar";
import GradingDashboardMadeByLuke from "../../other/GradingDashboardMadeByLuke";

export default function AllGradesAllLevels() {
  const [grades, setGrades] = React.useState([]);

  let UID = localStorage.getItem("UID");
  let token = localStorage.getItem("token");

  React.useEffect(() => {
    fetch(`/api/grades/allCurrentGradesForASingleWrestler/${UID}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((results) => {
        setGrades(results);
      });
  }, []);

  return (
    <>
      <NavigationBar />

      <GradingDashboardMadeByLuke UID={Number(UID)} />

      <table className="table table-striped">
        <thead className="sticky-top">
          <tr className="bg-light">
            <th>Level</th>
            <th>Name</th>
            <th>Link to detailed video explanation</th>
            <th>Link to looped video</th>
            <th>Your grade</th>
            <th>Notes</th>
            <th>Last graded</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((video: any) => {
            return (
              <tr key={`${video.id}`}>
                <td>{video.curriculum_level}</td>
                <td>{video.name_of_video}</td>
                <td>
                  <a href={video.url_to_video} target="_blank">
                    Detailed Video
                  </a>
                </td>
                <td>
                  <a href={video.url_to_looped_video} target="_blank">
                    Looped Video
                  </a>
                </td>

                <td
                  className={classNames({
                    gradeOf3: video.grade === 3,
                    gradeOf2: video.grade === 2,
                    gradeOf1: video.grade === 1,
                    gradeOfIncorrect: video.grade > 3 || video.grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.grade === 3
                    ? "★★★"
                    : video.grade === 2
                    ? "★★"
                    : video.grade === 1
                    ? "★"
                    : "Not Graded"}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.grade === 3,
                    gradeOf2: video.grade === 2,
                    gradeOf1: video.grade === 1,
                    gradeOfIncorrect: video.grade > 3 || video.grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  {video.movement_notes}
                </td>
                <td
                  className={classNames({
                    gradeOf3: video.grade === 3,
                    gradeOf2: video.grade === 2,
                    gradeOf1: video.grade === 1,
                    gradeOfIncorrect: video.grade > 3 || video.grade < 0,
                    notGradeable: video.maximum_grade === 0,
                  })}
                >
                  <Moment fromNow>{video.grade_created_at}</Moment>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
