import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { CompanyProfile } from '../../company';
import { useState } from 'react';
import { getCompanyProfile } from '../../api';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Title from '../../Components/Title/Title';
import Spinner from '../../Components/Spinner/Spinner';
import CompFinder from '../../Components/CompFinder/CompFinder';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';

interface Props {

}

function CompanyPage({}: Props) {

  let {ticker} = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    }
    getProfileInit();
  },[])

  return (
    <>
     {company ? (
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">

      <Sidebar />
      <CompanyDashboard ticker={ticker!}>
            <Title title="Company Name" subTitle={company.companyName} />
            <Title title="Price" subTitle={"$" + company.price.toString()} />
            <Title title="DCF" subTitle={"$" + company.dcf.toString()} />
            <Title title="Sector" subTitle={company.sector} />
            <CompFinder ticker={company.symbol} />
            <TenKFinder ticker={company.symbol} />
            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
    </div>
     ) : (
      <Spinner />
     )}
    </>
  )
}

export default CompanyPage