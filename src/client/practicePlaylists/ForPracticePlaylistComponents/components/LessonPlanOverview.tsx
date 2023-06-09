import * as React from "react";
import { useParams } from "react-router-dom";
import { IAllVideosInPlan } from "../EditLessonPlan";

let LessonPlanOverview = () => {
  let [videosInLessonPlan, setVideosInLessonPlan] = React.useState<
    Array<IAllVideosInPlan>
  >([]);
  let { planId }: any = useParams();

  let getAllVideosInLessonPlanFunc = () => {
    fetch(`/api/lessonplans/getAllVideosInPlan/${planId}`)
      .then((res) => res.json())
      .then((res) => setVideosInLessonPlan(res));
  };

  React.useEffect(() => {
    getAllVideosInLessonPlanFunc();
  }, []);

  return (
    <div className="mt-3">
      <div className="sticky-top bg-white">
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Move</th>
              <th>Video</th>
              <th>Looped Video</th>
              {/* <th>Play Time</th> */}
            </tr>
          </thead>
          <tbody>
            {videosInLessonPlan.map((video) => {
              return (
                <tr key={video.lpvID} style={{ height: "10rem" }}>
                  <td>{video.orderNumber}</td>
                  <td className="col-3">{video.videoName}</td>

                  <td>
                    <a
                      style={{ color: "blue" }}
                      href={video.videoURL}
                      target="_blank"
                    >
                      Detailed video
                    </a>
                    {/* <iframe
                      width="200px"
                      height="95%"
                      src={`https://www.youtube.com/embed/${video.videoURL}`}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    ></iframe> */}
                  </td>

                  <td>
                    <a
                      style={{ color: "blue" }}
                      href={video.loopedVideoURL}
                      target="_blank"
                    >
                      Looped video
                    </a>
                    {/* <iframe
                      width="200px"
                      height="95%"
                      src={`https://www.youtube.com/embed/${video.loopedVideoURL}`}
                      title="YouTube video player"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
                    ></iframe> */}
                  </td>
                  {/* <td>{video.lengthToDisplay} seconds</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonPlanOverview;
