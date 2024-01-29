import { useSelector } from "react-redux";
import { Company } from "../../../server/src/Models/Company";

export default function CompanyDashboard() {
  const company: Company = useSelector((state: any) => state.company.companyData);
  console.log(company.projects);

  const projects = company.projects.map((project) => (
    <div key={project._id.toString()}>
      <h1>{project.name}</h1>
    </div>
  ));

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-5'>
      <div className="bg-secondary-light30 dark:bg-background-light03 row-span-2 rounded-2xl flex flex-col justify-between items-center p-5">
        <h2>Active Projects</h2>
        <div className="flex-1 flex items-center">
          {projects.length ? projects : (<div>Looks like you don't have any projects started.</div>)}
        </div>
      </div>
      <div className="bg-secondary-light30 dark:bg-background-light03 row-span-1 rounded-2xl flex flex-col justify-between items-center p-5">
        <h2>Recently Opened Tickets</h2>
        <div className="flex-1 flex items-center">
        </div>
      </div>
      <div className="bg-secondary-light30 dark:bg-background-light03 row-span-1 rounded-2xl flex flex-col justify-between items-center p-5">
        <h2>Recently Closed Tickets</h2>
        <div className="flex-1 flex items-center">
        </div>
      </div>
    </div>
  );
}