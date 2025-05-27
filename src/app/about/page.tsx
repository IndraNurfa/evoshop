import { Navbar } from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <h1 className="mt-25 mb-5 text-center text-4xl font-extrabold">
          About
        </h1>
        <p className="mx-auto max-w-xl text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste a ut,
          saepe quo esse accusantium perspiciatis nesciunt velit deleniti,
          facere eum laboriosam repudiandae porro adipisci impedit,
          necessitatibus cum eligendi soluta.
        </p>
      </div>
    </>
  );
}
