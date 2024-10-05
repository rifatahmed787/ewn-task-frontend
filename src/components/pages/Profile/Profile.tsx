"use client";

import SkeletonProfile from "@/components/skeleton/ProfileSkeleton";
import Paragraph from "@/components/ui/paragraph";
import SubTitle from "@/components/ui/subTitle";
import ICONS from "@/icons/AllIcons";
import { useUserGetByIdQuery } from "@/Redux/features/user/userApi";
import { IUser } from "@/types/auth.type";
import Image from "next/image";

const Profile = () => {
  const { data: users, isLoading: profileDataLoading } = useUserGetByIdQuery(
    {}
  );
  const users_data: IUser = users?.data;

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            {profileDataLoading ? (
              <>
                <SkeletonProfile />
              </>
            ) : (
              <>
                {" "}
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-center">
                    <div className="text-gray-600 relative pb-5">
                      {users_data?.avatar ? (
                        <Image
                          src={users_data?.avatar}
                          alt="profile"
                          width={150}
                          height={150}
                          className="object-cover w-40 h-40 md:w-48 md:h-48 relative mx-auto rounded-full shadow-xl  flex items-center justify-center"
                        />
                      ) : (
                        <div className="w-28 h-28 bg-indigo-100 mx-auto p-2 rounded-full flex items-center justify-center text-indigo-500">
                          {ICONS.my_profile}
                        </div>
                      )}
                    </div>

                    <SubTitle SubTitle={users_data?.username} />
                    <Paragraph>{users_data?.email}</Paragraph>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-3 my-3 py-3 px-5 border-2 border-primary-100 rounded-md">
                        <Paragraph>
                          {users_data?.username || "Not found"}
                        </Paragraph>
                      </div>
                      <div className="md:col-span-3 my-3 py-3 px-5 border-2 border-primary-100 rounded-md">
                        <Paragraph>
                          {users_data?.email || "Email not found."}
                        </Paragraph>
                      </div>
                      <div className="md:col-span-3 my-3 py-3 px-5 border-2 border-primary-100 rounded-md">
                        <Paragraph>
                          {users_data?.language || "Language not found."}
                        </Paragraph>
                      </div>
                      <div className="md:col-span-3 my-3 py-3 px-5 border-2 border-primary-100 rounded-md">
                        <Paragraph>
                          {users_data?.verified && "Your email is verified!" || "Not verified yet"}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
