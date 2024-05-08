import React from "react";
import UserForm from "../_components/UserForm/form";

const Page = () => {
  return (
    <main className="w-full">
      <section className="w-full">
        <UserForm mode="create" />
      </section>
    </main>
  );
};

export default Page;
