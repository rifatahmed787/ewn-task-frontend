"use client";

import InfoWrapper from "@/components/common/InfoWrapper";
import { useEffect, useState } from "react";
import PaginationWrapper, {
  IPagination,
} from "@/components/common/PaginationWrapper";
import { useGithubUserGetByIdQuery } from "@/Redux/features/githubUser/githubuserApi";
import SearchInput from "@/components/ui/InputField/SearchInput";
import TableSkeleteon from "@/components/skeleton/TableSkeleton";
import GithubUser from "@/components/pages/GithubUser/GithubUser";
import Paragraph from "@/components/ui/paragraph";

export default function GithuUserList() {
  // SEARCH STATE
  const [userSearch, setUserSearch] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  // PAGINATION STATE
  const [pagination, setPagination] = useState<IPagination>({
    sort: "asc",
    page: 1,
    size: 10,
    meta: {
      page: null,
      size: null,
      total: null,
      totalPage: null,
    },
  });

  // the query params
  const queryParams = userSearch
    ? { username: triggerSearch && userSearch ? userSearch : "" }
    : {
        sort: pagination?.sort,
        page: pagination?.page,
        size: pagination?.size,
      };

  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useGithubUserGetByIdQuery(queryParams);

  // Update pagination.meta once data is loaded
  useEffect(() => {
    if (users?.data?.meta) {
      setPagination((prev) => ({
        ...prev,
        meta: {
          page: users.data.meta.page,
          size: users.data.meta.limit,
          total: users.data.meta.total,
          totalPage: Math.ceil(users.data.meta.total / users.data.meta.limit),
        },
      }));
    }
  }, [users]);

  // Handle search on button click
  const handleSearch = () => {
    setTriggerSearch(true);
  };

  return (
    <section defaultValue="all" className="py-5 px-5 md:px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-end gap-3">
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserSearch(e.target.value)
            }
            placeHolder="Search by username..."
            currentValue={userSearch}
            required
            type={"text"}
            handleFilterValue={handleSearch}
            className="text-black"
          />
        </div>

        <InfoWrapper heading={"GithubUsers List"}>
          {!error && !isError && isLoading ? (
            <TableSkeleteon />
          ) : (
            <>
              {users?.data?.data?.length > 0 ? (
                <>
                  <GithubUser users={users} />
                </>
              ) : (
                <Paragraph className="text-center min-h-[50vh] pt-10">
                  GithubUser Not Found
                </Paragraph>
              )}
            </>
          )}
          <PaginationWrapper
            pagination={pagination}
            setPagination={setPagination}
          />
        </InfoWrapper>
      </div>
    </section>
  );
}
