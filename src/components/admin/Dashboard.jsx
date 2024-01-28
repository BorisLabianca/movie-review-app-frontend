import { useEffect, useState } from "react";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";
import { getAppInfo } from "../../api/admin";
import { useMovies, useNotification } from "../../hooks";
import MostRatedMovies from "../MostRatedMovies";

const Dashboard = () => {
  const { updateNotitication } = useNotification();
  const [appInfo, setAppInfo] = useState({
    movieCount: 0,
    reviewCount: 0,
    userCount: 0,
  });
  const { latestUploads } = useMovies();
  const fetchAppInfo = async () => {
    const { appInfo, error } = await getAppInfo();
    if (error) return updateNotitication("error", error);
    setAppInfo({ ...appInfo });
  };

  useEffect(() => {
    fetchAppInfo();
  }, [latestUploads]);

  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox
        title="Total Uploads"
        subtitle={appInfo.movieCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Reviews"
        subtitle={appInfo.reviewCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Users"
        subtitle={appInfo.userCount.toLocaleString()}
      />

      <LatestUploads />
      <MostRatedMovies />
    </div>
  );
};
export default Dashboard;
