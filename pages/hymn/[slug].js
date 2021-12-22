import { request, gql } from "graphql-request";

function SingleHymn({ hymn: { hymn } }) {
  const {
    hymnName,
    lyrics: { html: lyrics },
  } = hymn;

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-primary-900 items-center text-purple-50 p-8">
      <div
        className="flex items-start justify-center min-h-[10vh] pt-8"
        id="header"
      >
        <h1 className="text-center font-bold text-3xl text-primary-50">
          {hymnName}
        </h1>
      </div>
      <div
        className="max-w-screen-sm"
        dangerouslySetInnerHTML={{ __html: lyrics }}
      />
      ;
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
  return { paths: paths, fallback: false };
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
  };
}
