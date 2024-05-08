import React from "react";
import UserForm from "../../_components/UserForm/form";
import { getUserById } from "@/dbqueries/users/get-by-id";

const getData = async (userId: string) => {
  const user = await getUserById(userId);
  return user;
};

const Page = async ({ params }: { params: { userId: string } }) => {
  const data = await getData(params.userId);

  return (
    <main className="w-full">
      <section className="w-full">
        <UserForm mode="edit" user={data} />
      </section>
    </main>
  );
};

export default Page;
