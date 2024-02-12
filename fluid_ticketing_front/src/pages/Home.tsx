import user_icon from "../assets/user_icon.svg";
import dashboard from "../assets/dashboard.svg";
import ticket from "../assets/ticket.svg";
import users from "../assets/users.svg";
import chart from "../assets/chart.svg";
import trending from "../assets/trending.svg";
import "../App.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Company } from "../../../server/src/Models/Company";
import { Project } from "../../../server/src/Models/Project";
import { useRef } from "react";
import { clearProject, setProject } from "../store/reducers/projectSlice";

export default function Home() {
  const userName: string = useSelector((state: any) => state.auth.user);
  const company: Company = useSelector(
    (state: any) => state.company.companyData,
  );
  const project: Project = useSelector(
    (state: any) => state.project.projectData,
  );
  const dispatch = useDispatch();
  const { companyId } = useParams();
  const projectRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  // If the company isn't set return an empty array else return the mapped projects.
  const projects = !company
    ? []
    : company.projects.map((project, index) => (
        <option
          key={project._id.toString()}
          value={index}
          className="hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5"
        >
          {project.name}
        </option>
      ));

  function switchProject(event: React.ChangeEvent<HTMLSelectElement>) {
    const id = event.target.value;
    if (id === "-1") {
      console.log("hit")
      dispatch(clearProject());
      navigate(`/${companyId}`);
      return;
    }
    if (id == '-2') {
      dispatch(clearProject());
      navigate(`/${companyId}`);
      return;
    }

    navigate(`/${companyId}/${company.projects[Number(id)]._id.toString()}`);
    dispatch(setProject(company.projects[Number(id)]))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-nav gap-4 h-full max-w-7xl mx-auto p-5">
      <div className="hidden bg-background-dark03 dark:bg-background-light03 rounded-xl py-10 px-5 md:flex flex-col gap-10">
        <Link
          to="/logout"
          className="flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5"
        >
          <img
            src={user_icon}
            alt="user icon"
            className="w-12 h-auto dark:invert"
          />
          <span>{userName.split(" ")[0]}</span>
        </Link>
        {company && (
          <>
            <div>
              <label htmlFor="project-list" className="text-lg">
                Projects
              </label>
              <select
                value={project != null ? company.projects.indexOf(project) : "-1"}
                ref={projectRef}
                onChange={switchProject}
                name="project-list"
                id="project-list"
                className="flex flex-row justify-between dark:bg-background-light03 items-center hover:backdrop-brightness-75 rounded-lg h-12 px-5"
              >
                <option value="-1" className="bg-background-light03">
                  Company View
                </option>
                {projects}
                <option value="-2">Create a Project</option>
              </select>
            </div>
            <Link
              to={`/${companyId}`}
              className="flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5"
            >
              <img
                src={dashboard}
                alt="ticket"
                className="w-10 h-auto dark:invert"
              />
              <span>Dashboard</span>
            </Link>
            <Link
              to={`/${companyId}/tickets`}
              className="flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5"
            >
              <img
                src={ticket}
                alt="ticket"
                className="w-10 h-auto dark:invert"
              />
              <span>Tickets</span>
            </Link>
            <button className="flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5">
              <img
                src={users}
                alt="ticket"
                className="w-10 h-auto dark:invert"
              />
              <span>Users</span>
            </button>
            <button className="flex flex-row justify-between items-center hover:backdrop-brightness-75  dark:hover:backdrop-brightness-200 dark:hover:backdrop-brightness-200transition-all duration-100 rounded-lg h-12 px-5">
              <img
                src={chart}
                alt="ticket"
                className="w-10 h-auto dark:invert"
              />
              <span>Reports</span>
            </button>
            <button className="flex flex-row justify-between items-center hover:backdrop-brightness-75 dark:hover:backdrop-brightness-200 transition-all duration-100 rounded-lg h-12 px-5">
              <img
                src={trending}
                alt="ticket"
                className="w-10 h-auto dark:invert"
              />
              <span>Performance</span>
            </button>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}
