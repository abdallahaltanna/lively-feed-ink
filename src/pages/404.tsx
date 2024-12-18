import { Link, useRouteError } from "react-router-dom";
import img from "../assets/not-found.svg";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <img
          src={img}
          alt="not found"
          className="w-[90vw] max-w-[600px] block mb-8 mt-[-3rem]"
        />
        <h3 className="mb-2">Ohh! page not found</h3>
        <p className="leading-6 mt-2 mb-4 text-gray-600">
          we can't seem to find the page you are looking for
        </p>
        <Link to="/" className="text-blue-500 capitalize">
          back home
        </Link>
      </div>
    </div>
  );
};
export default Error;
