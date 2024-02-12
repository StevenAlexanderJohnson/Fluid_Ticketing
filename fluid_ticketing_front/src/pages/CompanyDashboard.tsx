import { useSelector } from "react-redux";
import { Company } from "../../../server/src/Models/Company";
import { useNavigate } from "react-router-dom";

export default function CompanyDashboard() {
  const company: Company = useSelector(
    (state: any) => state.company.companyData,
  );
  const navigate = useNavigate();

  const projects = company ? company.projects.map((project) => (
    <button
      key={project._id.toString()}
      className="w-full"
      onClick={() => navigate(`/${company._id}/${project._id}`)}
    >
      <div className="bg-secondary-light dark:bg-secondary-dark w-full flex flex-col rounded-2xl">
        <h1>{project.name}</h1>
        <span>{project.description}</span>
        <span>Owner: {project.owner}</span>
      </div>
    </button>
  )): [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
      <div className="bg-secondary-light30 dark:bg-background-light03 row-span-2 rounded-2xl flex flex-col justify-between items-center p-5">
        <h2>Active Projects</h2>
        <div className="flex-1 flex flex-col items-center gap-5 mt-5 w-full">
          {projects.length ? (
            projects
          ) : (
            <div>Looks like you don't have any projects started.</div>
          )}
        </div>
      </div>
      <div className="bg-secondary-light30 dark:bg-background-light03 row-span-1 rounded-2xl flex flex-col justify-between items-center p-5">
        <h2>Recently Opened Tickets</h2>
        <div className="flex-1 flex items-center"></div>
      </div>
      <div className="bg-secondary-light30 dark:bg-background-light03 row-span-1 rounded-2xl flex flex-col justify-between items-center p-5">
        <h2>Recently Closed Tickets</h2>
        <div className="flex-1 flex items-center"></div>
      </div>
    </div>
  );
}
