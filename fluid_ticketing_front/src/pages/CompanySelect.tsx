import { useEffect, useState } from "react"
import { Company } from '../../../server/src/Models/Company';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CompanySelect() {
    const [companies, setCompanies] = useState<Company[]>([])
    const navigate = useNavigate();

    const auth_token = useSelector((state: any) => state.auth.token);
    useEffect(() => {
        fetch('http://localhost:3000/api/company', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${auth_token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json() as Promise<Company[]>
            })
            .then(data => {
                if (data.length === 1) {
                    navigate(`/${data[0]._id}`);
                }
                setCompanies(data)
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('It looks like an error occurred while looking up companies that you belong to.');
            });
    }, [])

    const companyList = companies.map((company: Company) => (
        <button className="bg-background-dark03 dark:bg-background-light03 rounded-xl py-10 px-5 md:flex flex-col gap-10" onClick={() => navigate(`/${company._id}`)}>
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-xl">{company.description}</p>
        </button>
    ))

    return (
        <div>
            {
                companyList.length === 0 ? (
                    <div className="h-full grid grid-rows-2">
                        <h1 className="text-3xl font-bold">It looks like you don't belong to a company yet.</h1>
                        <div>
                            <p>To get started get your superviser to invite your to the company.</p>
                            <p>Or if you are adventurous, you can
                                &nbsp;<button className="bg-primary-light dark:bg-primary-dark h-10 px-3 rounded-3xl" onClick={() => console.log('clicked')}>start your own company</button>!
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <h1 className="text-3xl font-bold">It looks like you belong to multiple companies.</h1>
                            <p className="text-xl">Please select the company you would like to view.</p>
                        </div>
                        <div className="flex flex-row gap-5">
                            {companyList}
                        </div>
                    </>
                )}

        </div>
    )
}