import { Tab } from "@headlessui/react";
import { request, gql } from "graphql-request";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function index({ hymnsByName, hymnsByNumber }) {
  return (
    <Tab.Group>
      <Tab.List className="flex py-1 space-x-1 bg-primary-900">
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full py-3 text-sm leading-5 font-medium text-primary-700 rounded",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-400 ring-purple-50 ring-opacity-60",
              selected
                ? "bg-purple-50 shadow"
                : "text-primary-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          A-Z
        </Tab>
        <Tab
          className={({ selected }) =>
            classNames(
              "w-full py-2.5 text-sm leading-5 font-medium text-primary-700 rounded",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-400 ring-purple-50 ring-opacity-60",
              selected
                ? "bg-white shadow"
                : "text-primary-100 hover:bg-white/[0.12] hover:text-white"
            )
          }
        >
          1, 2, 3...
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          {hymnsByName.map((hymn) => (
            <a
              key={hymn.slug}
              href={`/hymn/${hymn.slug}`}
              className="block bg-purple-50 border-b border-primary-100 py-4 px-8 text-primary-900 text-lg font-semibold truncate"
            >
              {hymn.hymnName}
            </a>
          ))}
        </Tab.Panel>
        <Tab.Panel>
          <div className="grid grid-cols-4 items-center justify-items-center bg-purple-50 text-primary-900 gap-2 py-2">
            {hymnsByNumber.map((hymn) => (
              <a
                key={hymn.slug}
                href={`/hymn/${hymn.slug}`}
                className="p-4 w-full h-full text-center"
              >
                {hymn.hymnNumber}
              </a>
            ))}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default index;

export async function getStaticProps() {
  const nameQuery = gql`
    {
      hymns(orderBy: hymnName_ASC, first: 300) {
        hymnName
        slug
      }
    }
  `;

  const numberQuery = gql`
    {
      hymns(orderBy: hymnNumber_ASC, first: 300) {
        hymnNumber
        slug
      }
    }
  `;

  const { hymns: hymnsByName } = await request(
    "https://api-ap-northeast-1.graphcms.com/v2/ckw3avyfo66d101wcgai50uyd/master",
    nameQuery
  );

  const { hymns: hymnsByNumber } = await request(
    "https://api-ap-northeast-1.graphcms.com/v2/ckw3avyfo66d101wcgai50uyd/master",
    numberQuery
  );

  return {
    props: {
      hymnsByName,
      hymnsByNumber,
    },
    revalidate: 3600,
  };
}
