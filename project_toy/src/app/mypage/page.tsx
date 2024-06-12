import FilteredPostList from "@/components/FilteredPostList";

type Props = {};

function MyPage({}: Props) {
  // myPostListState;
  return (
    <main className="flex flex-col min-h-screen items-center">
      <FilteredPostList />
    </main>
  );
}

export default MyPage;
