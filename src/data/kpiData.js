import { FiUser, FiUserPlus, FiActivity, FiDollarSign } from "react-icons/fi";

const kpiData = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12% from last month",
    changeType: "positive",
    icon: FiUser,
    color: "blue",
  },
  {
    title: "New Signups",
    value: "341",
    change: "+8% from last week",
    changeType: "positive",
    icon: FiUserPlus,
    color: "green",
  },
  {
    title: "Active Sessions",
    value: "1,246",
    change: "-3% from yesterday",
    changeType: "negative",
    icon: FiActivity,
    color: "purple",
  },
  {
    title: "Revenue",
    value: "$48,290",
    change: "+15% from last month",
    changeType: "positive",
    icon: FiDollarSign,
    color: "orange",
  },
];

export default kpiData;
