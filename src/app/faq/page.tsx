import { Navbar } from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <h1 className="mt-25 mb-5 text-center text-4xl font-extrabold">FAQ</h1>
        <ul className="mx-auto max-w-xl space-y-4 text-lg">
          <li>
            <strong>Q:</strong> What is RevoShop?
            <br />
            <strong>A:</strong> RevoShop is a demo e-commerce platform.
          </li>
          <li>
            <strong>Q:</strong> Who made this site?
            <br />
            <strong>A:</strong> This site was created by <em>Me.</em>
          </li>
          <li>
            <strong>Q:</strong> Is this a real store?
            <br />
            <strong>A:</strong> No, this is just a dummy project.
          </li>
        </ul>
      </div>
    </>
  );
}
