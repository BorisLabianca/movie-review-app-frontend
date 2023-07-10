import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox title="Total Uploads" subtitle="100" />
      <AppInfoBox title="Total Reviews" subtitle="1500" />
      <AppInfoBox title="Total Users" subtitle="200" />

      <LatestUploads />
    </div>
  );
};
export default Dashboard;
