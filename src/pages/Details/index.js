import { Breadcrumb, Icon, Tabs } from "../../components";

import { getTestResults } from "../../services";
import { useEffect, useState } from "react";
import { TableDetails } from "./_components/TableDetails";
import "./styles.css";
import { useTranslation } from "react-i18next";

export default function Details({ allData, ele }) {
  const { t } = useTranslation();

  const url = allData?.rawUrl;
  // const textHeading = jsonPt.ELEMS[ele];
  const textHeading = t(`ELEMS.${ele}`);
  const [dataTable, setDataTable] = useState([]);

  const dataBreadCrumb = [
    {
      title: "Acessibilidade.gov.pt",
      href: "/",
    },
    {
      title: "Access Monitor",
      href: "/",
    },
    {
      title: url,
      href: url,
    },

    {
      title: textHeading,
      href: "#",
    },
  ];

  function getDetails() {
    const response = getTestResults(ele, allData);
    setDataTable(response);
  }

  useEffect(() => {
    getDetails();
  }, []);

  const detailsTabs = [
    {
      eventKey: "tab1",
      title: "Elements",
      component: (
        <>
          <div className="tabContent_container-details">
            <TableDetails data={dataTable?.elements} />
          </div>
        </>
      ),
    },
  ];

  let iconName;

  if (dataTable?.result === "R") {
    iconName = "AMA-Wrong-Line";
  } else if (dataTable?.result === "Y") {
    iconName = "AMA-Middle-Line";
  } else {
    iconName = "AMA-Check-Line";
  }

  let tdClassName;

  if (dataTable?.result === "R") {
    tdClassName = "error-cell";
  } else if (dataTable?.result === "Y") {
    tdClassName = "warning-cell";
  } else {
    tdClassName = "success-cell";
  }

  return (
    <>
      <div className="container">
        <div className="link_breadcrumb_container">
          <Breadcrumb data={dataBreadCrumb} />
        </div>

        <div className="report_container">
          <div className="acess_monitor">AcessMonitor</div>

          <h1 className="report_container_title url_content">
            {dataTable?.finalUrl}
          </h1>

          <p className="report_container_subtitle test_result">
            {t("ELEMENT_RESULTS.subtitle")}
          </p>
        </div>

        <div className="bg-white show_details">
          <div className="d-flex flex-row justify-content-between align-items-center show_details-container">
            <div className="d-flex flex-row align-items-center">
              <div className={`image_container_warning ${tdClassName}`}>
                <Icon name={iconName} />
              </div>

              <span
                className="textHeader"
                dangerouslySetInnerHTML={{ __html: textHeading }}
              />
            </div>

            <div className="result_left_container">
              <span>{dataTable?.size}</span>
              <span>{t("ELEMENT_RESULTS.total_elements")}</span>
            </div>
          </div>
        </div>

        <Tabs
          tabs={detailsTabs && detailsTabs}
          defaultActiveKey="tab1"
          vertical={false}
        />
      </div>
    </>
  );
}
