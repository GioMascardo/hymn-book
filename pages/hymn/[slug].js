import { request, gql } from "graphql-request";

function SingleHymn({ hymn: { hymn } }) {
  const {
    hymnName,
    lyrics: { html: lyrics },
  } = hymn;

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-primary-900 items-center text-purple-50 py-8 px-4">
      <header className=" container md:max-w-screen-sm justify-start mb-4">
        <a href=".././">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 fill-primary-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </a>
      </header>
      <div
        className="flex items-center justify-start md:justify-center min-h-[10vh] max-w-screen-sm w-full"
        id="title"
      >
        <h1 className="font-bold text-3xl text-purple-50">{hymnName}</h1>
      </div>
      <div
        className="max-w-screen-sm"
        dangerouslySetInnerHTML={{ __html: lyrics }}
      />
    </div>
  );
}

export default SingleHymn;

export async function getStaticPaths() {
  const query = gql`
    query MyQuery {
      hymns {
        slug
      }
    }
  `;

  const { hymns } = await request(
    "https://api-ap-northeast-1.graphcms.com/v2/ckw3avyfo66d101wcgai50uyd/master",
    query
  );

  const paths = hymns.map((hymn) => ({
    params: {
      slug: hymn["slug"],
    },
  }));
  console.log();
  return { paths: paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const query = gql`
    query Hymn {
      hymn(where: {slug: \"${params["slug"]}\"}) {
        hymnName
        hymnNumber
        slug
        lyrics {
          html
        }
      }
    }
  `;
  const hymn = await request(
    "https://api-ap-northeast-1.graphcms.com/v2/ckw3avyfo66d101wcgai50uyd/master",
    query
  );
  return {
    props: {
      hymn,
    },
    revalidate: 3600,
  };
}
